// DEPRECATED
import React, { Component, PropTypes } from 'react';
import Router, {History, State} from 'react-router';
import { connect } from 'react-redux'

import * as HexagramActions from 'actions/HexagramActions.js';

import { AppBar, Card, CardHeader, CardTitle, CardText, Avatar, Icons, FlatButton, IconButton, FontIcon, Styles } from 'material-ui';
import  NavigationArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import BrightnessHigh from 'material-ui/lib/svg-icons/image/brightness-7';

let Header = React.createClass({

  render() {
    console.log(`header:render`);
    let info = this.headerPathToTitle(this.props.location, this.props.params)
    return (
      <div>
        <AppBar
        className="header"
        title={info.name}
        iconElementLeft={info.icon}
        onLeftIconButtonTouchTap={this.handleBackButton}
        />
      </div>
    );
  },

  headerPathToTitle( mlocation, params) {
    let path = mlocation.pathname;

    /* Translate a route to it's title name */
    if (path === `/list`) {
        return {icon: <IconButton onTouchTap={ this.handleBackButton } onClick={ this.handleBackButton }><NavigationArrowBack /></IconButton>,
                name: `All Hexagrams`}
    } else if (path === `/` || path === `/play`) {
        return {icon: <IconButton onTouchTap={ this.clearHexagram } onClick={ this.clearHexagram }><BrightnessHigh /></IconButton>,
                name: `I-ching oracle`}
    } else if ( path.startsWith('/details') ) {
        return {icon: <IconButton onTouchTap={ this.handleBackButton } onClick={ this.handleBackButton }><NavigationArrowBack /></IconButton>,
                name: `${params.name}`}
    } else {
      return {icon: <IconButton/>,
              name: 'I-ching'}
    }
  },

  handleBackButton( ev ) {
    history.back()
  },

  clearHexagram( ev ) {
    window.store.dispatch(HexagramActions.clearHexagram());
  }

});

export default connect( state => {
  return {};
})(Header);
