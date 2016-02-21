import React, { Component, PropTypes  } from 'react';
import { connect } from 'react-redux';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
const { pushPath } = require('redux-simple-router');


let AppContainer = React.createClass({
  propTypes: {
    children: PropTypes.array
  },

  render() {
    return (
      <div className="app-wrap">
       <Header/>
        <div className="content">
        {this.props.children}


        </div>
        <Footer/>
      </div>
    );
  },

});

//    <ReactCSSTransitionGroup component="div" transitionName="page-transition" />

export default connect(
  null,
  { pushPath }
)(AppContainer);
