/* eslint react/self-closing-comp:0 */

import React, { Component } from 'react';

import { Router, Route, Link , IndexRoute} from 'react-router';

import { AppContainer, PlayPage , ListPage, DetailPage } from './pages';

export const Routes = (
  <Route path="/" component={AppContainer}>
    <Route name="hexagram-play" path="/play" component={PlayPage} />
    <Route name="hexagram-list" path="/list" component={ListPage} />
    <Route name="hexagram-details" path="/details/:name" component={DetailPage} />

    <IndexRoute component={PlayPage} />
  </Route>
);

/*
  <Route name="settings-about" path="/settings" component={IndexPage} />
 */
