/* eslint-disable no-underscore-dangle */
import * as preact from "preact";
import "preact/debug";

import { Provider } from "react-redux";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import enquire from "enquire.js";

import DefaultSettings from "./constants/settings";
import { getAsset, parseQS } from "./constants/utils";

import { AppContainer } from "./pages";
import reducers from "./reducers";

// force to import&compile css
import "./styles/main.scss";

// Report Errors
// err: error message
// fileName: which file error occurs in
// lineNumber: what line error occurs on

import("typeface-eb-garamond");

/**
 * Register (external) service worker
 */
// const SW_URL = getAsset("sw.js");
// function registerSW() {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker
//       .register(SW_URL)
//       .then(v => {
//         console.info("ServiceWorker: ✔️");
//       })
//       .catch(err => {
//         console.error("ServiceWorker: ❌", err);
//       });
//   }
// }

/**
 * Configure global store
 */
function configureStore(initialState) {
  // window.__REDUX_DEVTOOLS_EXTENSION__ = true;
  let fCreateStore = compose(
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = fCreateStore(reducers, initialState);

  return store;
}

/** Changes layout based on device screen real estate */
function mediaqueries(forceMedia = false) {
  const addBodyMedia = name => () =>
    document.body.classList.add(`media-${name}`);
  const rmBodyMedia = name => () =>
    document.body.classList.remove(`media-${name}`);
  const handlers = name => ({
    match: addBodyMedia(name),
    unmatch: rmBodyMedia(name)
  });

  if (forceMedia !== false) {
    addBodyMedia(forceMedia)();
  } else {
    enquire.register(
      "screen and (min-width: 320px) and (max-width: 767px)",
      handlers("small")
    );
    enquire.register(
      "screen and (min-width: 768px) and (max-width: 1223px)",
      handlers("medium")
    );
    enquire.register("screen and (min-width: 1224px)", handlers("large"));
  }
}

/*
 * Render routes and display html
 */
function start() {
  let app = preact.render(
    <Provider store={window.store}>
      <AppContainer />
    </Provider>,
    document.querySelector("#app-mount > .app-wrap")
  );

  /* Loading complete */
  console.log("Load complete: ", performance.now());
  let load_el = document.getElementById("loading");
  requestAnimationFrame(() => {
    document.body.classList.toggle("loaded");
  });

  return app;
}

/*
 * Prefetch critical assets
 */
function bootstrap() {
  // Parse argv options
  const argv = parseQS(location.toString());

  // Create store with local preferences
  let localPreferences = JSON.parse(
    localStorage.getItem("preferences") || "{}"
  );
  let preferences = Object.assign(
    DefaultSettings.preferences,
    localPreferences
  );

  let settings = Object.assign(DefaultSettings, { preferences });
  window.store = configureStore(settings);

  // Register layout changes
  mediaqueries(argv.media || false);

  const finish = () => {
    window.react = preact;
    window.app = start();
  };
  if (window.requestIdleCallback) {
    requestIdleCallback(finish);
  } else {
    finish();
  }
}

// if (!__DEVELOPMENT__) {
// SW only on production
// requestIdleCallback(registerSW);
// }

bootstrap();
