/* eslint react/self-closing-comp:0 */

import React, { Component } from 'react';

import Router from 'react-router';
let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;

import { AppContainer, IndexPage, PlayPage , ListPage } from './pages';

export const Tashuo = (
  <Route path="/" handler={AppContainer}>
    <Route name="hexagram-play" handler={PlayPage} />
    <Route name="hexagram-list" handler={ListPage} />
    <Route name="index" path="/index" handler={IndexPage} />
    <DefaultRoute handler={IndexPage} />
  </Route>
);
