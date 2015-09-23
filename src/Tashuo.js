/* eslint react/self-closing-comp:0 */

import React, { Component } from 'react';

import Router from 'react-router';
let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;

import { AppContainer, IndexPage, PlayPage , ListPage, DetailPage } from './pages';

export const Tashuo = (
  <Route path="/" handler={AppContainer}>
    <Route name="hexagram-play" path="/play" handler={PlayPage} />
    <Route name="hexagram-list" path="/list" handler={ListPage} />
    <Route name="hexagram-details" path="/details/:name" handler={DetailPage} />
    <Route name="settings-about" path="/settings" handler={IndexPage} />

    <DefaultRoute handler={PlayPage} />
  </Route>
);
