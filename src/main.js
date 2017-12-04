import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import thunk from 'redux-thunk';
import invariant from 'redux-immutable-state-invariant';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider  } from 'react-redux';
import { render } from 'react-dom';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { fetchIchingJSON } from './actions/IchingLoader';
import { getAsset } from './constants/utils';
import reducers from './reducers';

import { AppContainer } from './pages';

// force to import&compile css
import './styles/main.scss';

function configureStore( initialState ) {
  let fCreateStore = compose(
    applyMiddleware( invariant(), thunk ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = fCreateStore( reducers, initialState )

  return store;
}

/*
 * Render routes and display html
 */
function start() {
  let app = render(
    <Provider store={window.store}>
      <Router>
        <AppContainer />
      </Router>
    </Provider>,
    document.getElementById('app-mount')
  );

  // add TapEvent
  injectTapEventPlugin();

  /* Loading complete */
  let load_el = document.getElementById('loading');
  //load_el.parentNode.removeChild(load_el);
  requestAnimationFrame( () => {
    document.body.className += 'loaded';
  })

  return app;
}

/*
 * Prefetch critical assets
 */
function bootstrap() {
  // Create store
  window.store = configureStore();

  // load Iching JSON File
  let x = window.store.dispatch( fetchIchingJSON( getAsset('json/iching_deoxy.json') ) )
  x.catch( (e) => {
    console.error("Couldnt load ICHING json.")
    throw e;
  }).then( (e) => {
    console.log('Loaded ICHING json correctly')
    window.app = start();
  });

  window.React = React;
}

// Report Errors
// err: error message
// fileName: which file error occurs in
// lineNumber: what line error occurs on
if ( __DEVELOPMENT__ ) {
  window.onerror = function (err, fileName, lineNumber) {
   // alert or console.log a message
   console.error(fileName, 'Line:', lineNumber, 'Error:', err.message);
  };
}

bootstrap();
