import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import IndexPage from './IndexPage.js';
import HexagramPage from './HexagramPage.js';

import Router from 'react-router';
let RouteHandler = Router.RouteHandler;

import { Provider  } from 'react-redux';

export default class HomePage extends Component {
  render() {
    return (
      <div className="app-wrap">
        <Header title="homepage"/>
        <div className="content">
          <RouteHandler/>
        </div>
        <Footer/>
      </div>
    );
  }
}
