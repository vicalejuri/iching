import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';
import { Provider  } from 'react-redux';

//import * as store from './store.js';
import * as reducers from './reducers';
const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  createStore
);

let reducer = combineReducers(reducers);
let store = finalCreateStore(reducer);
window.store = store;



// Start routes
import Router from 'react-router';
import { Tashuo } from './Tashuo';

Router.run( Tashuo, Router.HashLocation, (Root, routerState) => {
  React.render(
    <Provider store={store}>
      {() => <Root routerState={routerState} />}
    </Provider> ,
    document.body);
} );


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
