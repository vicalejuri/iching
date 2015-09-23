// DEPRECATED
import React, { Component, PropTypes } from 'react';

import { AppBar, Card, CardHeader, CardTitle, CardText, Avatar, Icons, FlatButton, IconButton, FontIcon, Styles } from 'material-ui';


export default class Header extends Component {
  render() {
    return (
      <div>
        <AppBar title="Title" iconElementLeft={<IconButton iconClassName="material-icons">navigation_arrow_back</IconButton>} />
      </div>
    );
  }
}
