import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import * as reducers from './reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  createStore
);

export const reducer = combineReducers(reducers);
export const store = finalCreateStore(reducer);
