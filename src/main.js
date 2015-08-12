import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import Tashuo from './Tashuo';

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

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <Tashuo />}
        </Provider>

        <DebugPanel top right bottom>
          <DevTools store={store}
                    monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}

React.render(<App />, document.body);
