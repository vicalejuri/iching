// DEPRECATED
import React, { Component, PropTypes } from 'react';
import Router, {History, State} from 'react-router';
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

import { AppBar, Card, CardHeader, CardTitle, CardText, Avatar, Icons, FlatButton, IconButton, FontIcon, Styles } from 'material-ui';

let Header = React.createClass({
  render() {
    let name = this.props.q
    return (
      <div>
        <AppBar title={name} iconElementLeft={<IconButton iconClassName="material-icons">navigation_arrow_back</IconButton>} />
      </div>
    );
  },
});

export default connect(
  state => ({
    q: state.router.location.query.q,
  }),
  { pushState }
)(Header);

export default Header;
