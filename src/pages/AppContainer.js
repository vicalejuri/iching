import React, { Component, PropTypes  } from 'react';
import { connect } from 'react-redux';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MuiTheme from 'constants/MuiTheme';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';


let AppContainer = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MuiTheme),
    }
  },

  render() {
    return (
      <div className="app-wrap">
       <Header/>
        <div className="content">
          <ReactCSSTransitionGroup transitionName="page-transition"
                                   transitionEnterTimeout={300} transitionLeaveTimeout={300}
                                   transitionAppear transitionAppearTimeout={300} >
                                   {this.props.children}
          </ReactCSSTransitionGroup>
        </div>
        <Footer/>
      </div>
    );
  },

});

//    <ReactCSSTransitionGroup component="div" transitionName="page-transition" />

export default connect(
  null
)(AppContainer);
