import React from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider  } from 'react-redux';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import invariant from 'redux-immutable-state-invariant';

import { createHashHistory, createHistory } from 'history';
import { Router, Route, Link , IndexRoute, browserHistory} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';


import { fetchIchingJSON } from './actions/IchingLoader';
import { getAsset } from './constants/utils';
import reducers from './reducers';

import { AppContainer, PlayPage , ListPage, TrigramListPage, DetailPage } from './pages';

let history = createHashHistory()
/*if ( __DEVELOPMENT__ ) {
  history = createHashHistory();
}*/

function configureStore( initialState ) {
  let fCreateStore = compose(
    applyMiddleware( invariant(), thunk ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = fCreateStore( reducers, initialState )

  return store;
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
    throw e;
  }).then( (e) => {
    console.log('Loaded ICHING json correctly')
    start();
  })
}

/*
 * Render routes and display html
 */
function start() {
  render(
    <Provider store={window.store}>
        <Router history={history}>
            <Route path="/" name="Iching of the day" component={AppContainer}>
                <Route name="hexagram-play" path="/" component={PlayPage} />
                <Route name="hexagram-list" path="/list" component={ListPage} />
                <Route name="trigram-list" path="/trigram-list" component={TrigramListPage} />
                <Route name="hexagram-details" path="/details/:number/:name" component={DetailPage} />
                <IndexRoute component={PlayPage} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app-mount')
  );

  // add TapEvent
  injectTapEventPlugin();

  /* Loading complete */
  let load_el = document.getElementById('loading');
  load_el.parentNode.removeChild(load_el);
  document.body.class += 'loaded';
}

/*
if ( __PHONEGAP__ ) {
  document.addEventListener( 'deviceready', start );
} else {
  document.addEventListener('DOMContentLoaded', (e) => {
    console.log('"wtf"',e)
    bootstrap();
  });
}*/

// force to import&compile css
import 'styles/main.scss';

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
