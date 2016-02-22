import React from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider  } from 'react-redux';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import invariant from 'redux-immutable-state-invariant';

import { AppContainer, PlayPage , ListPage, DetailPage } from './pages';

import { createHistory } from 'history'
//import { createHashHistory } from 'history';
import { Router, Route, Link , IndexRoute} from 'react-router';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';

import reducers from './reducers';

function configureStore( initialState ) {
  let fCreateStore = compose(
    reduxReactRouter({createHistory}),
    //reduxReactRouter({createHashHistory}),
    applyMiddleware( invariant(), thunk ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = fCreateStore( reducers, initialState )

  return store;
}
let store = window.store = configureStore();

// <Route name="hexagram-day" path="/day" component={DayPage} />

render(
  <Provider store={store}>
    <ReduxRouter>
      <Route path="/" name="Iching of the day" component={AppContainer}>
        <Route name="hexagram-play" path="/play" component={PlayPage} />
        <Route name="hexagram-list" path="/list" component={ListPage} />
        <Route name="hexagram-details" path="/details/:name" component={DetailPage} />

        <IndexRoute component={PlayPage} />
      </Route>
    </ReduxRouter>
  </Provider>,
  document.getElementById('app-mount')
);

/* Start tap events */
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


// Import/Compile css
import 'styles/main.scss';
