import React, { Component, PropTypes  } from 'react';
import { connect } from 'react-redux';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MuiTheme from 'constants/MuiTheme';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';

const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

let AppContainer = React.createClass({
  contextTypes: {
    location: React.PropTypes.object,
    params: React.PropTypes.object
  },

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
          <ReactCSSTransitionGroup component="div" transitionName="page-transition" transitionAppear
                transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {React.cloneElement(this.props.children, {key: this.context.location.pathname})}
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
