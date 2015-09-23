import React from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';
import { Provider  } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//import * as store from './store.js';
import * as reducers from './reducers';
let composed_functions = ( __DEVTOOLS__ ?
                          [applyMiddleware(thunk), devTools(), createStore] :
                          [applyMiddleware(thunk), createStore] );

const finalCreateStore = compose( ...composed_functions );

let reducer = combineReducers(reducers);
let store = finalCreateStore(reducer);
parent.store = store;
import { Tashuo } from './Tashuo';

// Start routes
import Router from 'react-router';
Router.run( Tashuo, Router.HashLocation, (Root, routerState) => {
  let debugTools = (
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  );
  let currentPath = {routerState};
  console.log('path', currentPath);
  // store.dispatch 'PATH_CHANGED', currentPath

  React.render(
    <div>
      <Provider store={store}>
        {() => <Root routerState={routerState} />}
      </Provider>
      { __DEVTOOLS__ ? debugTools : '' }
    </div>,
    document.body);
} );

// Import/Compile css
import 'styles/main.scss';
