import preact from "preact";
import { Provider } from "preact-redux";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import invariant from "redux-immutable-state-invariant";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import enquire from 'enquire.js';

import { fetchIchingJSON } from "./actions/IchingLoader";
import { getAsset , parseQS } from "./constants/utils";

import { AppContainer } from "./pages";
import reducers from "./reducers";

// force to import&compile css
import "./styles/main.scss";

/**
 * Configure global store
 */
function configureStore(initialState) {
  let fCreateStore = compose(
    applyMiddleware(invariant(), thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = fCreateStore(reducers, initialState);

  return store;
}

/** Changes layout based on device screen real estate */
function mediaqueries( forceMedia=false ) {
  console.log("mediaQueries: ", forceMedia);
  const addBodyMedia = (name) => () => (document.body.classList.add(`media-${name}`));
  const rmBodyMedia = (name) => () => (document.body.classList.remove(`media-${name}`));
  const handlers = (name) => ({ 'match': addBodyMedia(name), 'unmatch': rmBodyMedia(name) })

  if(forceMedia !== false){
    addBodyMedia(forceMedia)();
  } else {
    enquire.register('screen and (min-width: 320px) and (max-width: 767px)', handlers('small'));
    enquire.register('screen and (min-width: 768px) and (max-width: 1223px)', handlers('medium'));
    enquire.register('screen and (min-width: 1224px)', handlers('large'));
  }
}

/*
 * Render routes and display html
 */
function start() {
  let app = preact.render(
    <Provider store={window.store}>
      <Router>
        <AppContainer />
      </Router>
    </Provider>,
    document.getElementById("app-mount")
  );

  /* Loading complete */
  let load_el = document.getElementById("loading");
  requestAnimationFrame(() => {
    document.body.classList.toggle( "loaded" );
  });

  return app;
}

/*
 * Prefetch critical assets
 */
function bootstrap() {
  // Parse argv options
  const argv = parseQS( location.toString() );

  // Create store
  window.store = configureStore();

  // Register layout changes
  mediaqueries(argv.media || false);

  // load Iching JSON File
  let iching_json = window.store.dispatch(
    fetchIchingJSON(getAsset("json/iching_deoxy.json"))
  );
  iching_json
    .catch(e => {
      console.error("Couldnt load ICHING json.");
      throw e;
    })
    .then(e => {
      console.log("Loaded ICHING json correctly");
      window.app = start();
    });

  window.react = preact;
}

// Report Errors
// err: error message
// fileName: which file error occurs in
// lineNumber: what line error occurs on
import "preact/devtools";
if (__DEVELOPMENT__) {
  window.onerror = function (err, fileName, lineNumber) {
    // alert or console.log a message
    console.error(fileName, "Line:", lineNumber, "Error:", err.message);
  };
}

bootstrap();