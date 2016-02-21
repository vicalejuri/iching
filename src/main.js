import React from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider  } from 'react-redux';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import invariant from 'redux-immutable-state-invariant';

import { Router, Route, Link , IndexRoute} from 'react-router';
import { AppContainer, PlayPage , ListPage, DetailPage } from './pages';


import { createHistory } from 'history';
const { syncReduxAndRouter, routeReducer } = require('redux-simple-router');

import reducers from './reducers';
import { Routes } from './Routes';

// Compose reducers
let history = createHistory();
//let middleware = syncHistory(history);

function configureStore( initialState ) {
  const store = createStore( reducers, initialState, compose(
    applyMiddleware( invariant(), thunk ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
const store = configureStore();


render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <Route name="hexagram-play" path="/play" component={PlayPage} />
        <Route name="hexagram-list" path="/list" component={ListPage} />
        <Route name="hexagram-details" path="/details/:name" component={DetailPage} />

        <IndexRoute component={PlayPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app-mount')
);

/* Start tap events
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); */
React.initializeTouchEvents(true);


// Import/Compile css
import 'styles/main.scss';
