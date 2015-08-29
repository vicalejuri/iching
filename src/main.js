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
const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  createStore
);

let reducer = combineReducers(reducers);
let store = finalCreateStore(reducer);
window.store = store;
import { Tashuo } from './Tashuo';

// Start routes
import Router from 'react-router';
Router.run( Tashuo, Router.HashLocation, (Root, routerState) => {
  React.render(
    <div>
      <Provider store={store}>
        {() => <Root routerState={routerState} />}
      </Provider>
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    </div>,
    document.body);
} );


// Import/Compile css
import 'styles/main.scss';
