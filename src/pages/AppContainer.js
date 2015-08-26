import React, { Component, PropTypes  } from 'react';
import { connect } from 'react-redux';
let CSSTransitionGroup = React.addons.CSSTransitionGroup;

import mui from 'material-ui';
let Icons = mui.Icons;
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

import Router from 'react-router';
let RouteHandler = Router.RouteHandler;

export default class AppContainer extends Component {
  static contextTypes = {
    router: React.PropTypes.func.isRequired,
  }
  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    };
  }

  componentWillMount() {

    ThemeManager.setPalette({
      primary1Color: Colors.cyan500,
      primary2Color: Colors.cyan700,
      primary3Color: Colors.cyan100,
      accent1Color: Colors.pinkA200,
      accent2Color: Colors.pinkA400,
      accent3Color: Colors.pinkA100,
      textColor: Colors.darkBlack,
      canvasColor: Colors.white,
      borderColor: Colors.grey300,
    });
  }


  render() {
    let name = this.context.router.getCurrentPath();
    return (
      <div className="app-wrap">
        <div className="content">
          <CSSTransitionGroup component="div" transitionName="page-transition">
            <RouteHandler key={name} />
          </CSSTransitionGroup>
        </div>
        <Footer/>
      </div>
    );
  }
}
