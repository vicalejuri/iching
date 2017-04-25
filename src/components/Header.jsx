// DEPRECATED
import React, { Component, PropTypes } from 'react';
import Router, {History, State} from 'react-router-dom';
import { connect } from 'react-redux'


import { AppBar, Card, CardHeader, CardTitle, CardText, Avatar, Icons, FlatButton, IconButton, FontIcon, Styles } from 'material-ui';
import Details from 'material-ui/lib/svg-icons/image/details';
import  NavigationArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import BrightnessHigh from 'material-ui/lib/svg-icons/image/brightness-7';

import * as HexagramActions from '../actions/HexagramActions';

let Header = React.createClass({
  mixins: [History],

  render() {
    let info = this.headerPathToTitle(this.props.location, this.props.params)

    return (
      <div>{this.appBar(info)}</div>
    );
  },

  appBar(info) {
    if (info.icon && info.righticon) {
      return (<AppBar
      className="header" title={info.name}
      iconElementLeft={info.icon}  //onLeftIconButtonTouchTap={this.handleBackButton} />)
      iconElementRight={info.righticon} />)
    } else if (info.icon) {
      return (<AppBar
      className="header" title={info.name}
      iconElementLeft={info.icon} />)
    } else {
      return (<AppBar
      className="header" title={info.name} /> )
    }
  },

  headerPathToTitle( mlocation, params) {
    let path = mlocation.pathname;

    /* Translate a route to it's title name */
    if (path === '/list') {
        let trigramBtnHandler = this.goTo.bind(this,'/trigram-list')
        let title = 'All hexagrams'
        return {icon: <IconButton onTouchTap={this.handleBackButton} onClick={this.handleBackButton}><NavigationArrowBack /></IconButton>,
                name: title,
                righticon: <IconButton onTouchTap={trigramBtnHandler} onClick={trigramBtnHandler}><Details /></IconButton>
        }
    } else if (path === '/trigram-list') {
      return {icon: <IconButton onTouchTap={this.handleBackButton} onClick={this.handleBackButton}><NavigationArrowBack /></IconButton>,
              name: 'All Trigrams'}
    } else if (path === '/' || path === '/play') {
        return {icon: <IconButton onTouchTap={this.clearHexagram} onClick={this.clearHexagram}><BrightnessHigh /></IconButton>,
                name: 'I-ching oracle'}
    } else if ( path.startsWith('/details') ) {
        return {icon: <IconButton onTouchTap={this.handleBackButton} onClick={this.handleBackButton}><NavigationArrowBack /></IconButton>,
                name: `${params.name}`}
    } else {
      return {icon: <IconButton />,
              name: 'I-ching'}
    }
  },

  handleBackButton( ev ) {
    this.history.goBack()
  },

  clearHexagram( ev ) {
    window.store.dispatch(HexagramActions.clearHexagram());
  },

  goTo( URL, ev ) {
    console.log('trigram btn clicked', URL)
    this.history.pushState(null, URL);
  }

});

export default connect( state => ({}))(Header);
