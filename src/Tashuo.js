/* eslint react/self-closing-comp:0 */

import React, { Component } from 'react';

import Router from 'react-router';
let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;

import { HomePage, IndexPage, HexagramPage } from './pages';

export const Tashuo = (
  <Route path="/" handler={HomePage}>
    <Route name="hexagram" handler={HexagramPage} />
    <Route name="index" path="/index" handler={IndexPage} />
    <DefaultRoute handler={IndexPage} />
  </Route>
);
