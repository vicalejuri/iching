// DEPRECATED
import React, { Component, PropTypes } from 'react';
import Router, {History, State} from 'react-router';


import { AppBar, Card, CardHeader, CardTitle, CardText, Avatar, Icons, FlatButton, IconButton, FontIcon, Styles } from 'material-ui';


let Header = React.createClass({
  contextTypes: {
    router: PropTypes.func.isRequired,
  },
  mixins: [State],

  render() {
    let name = this.context.router.getCurrentPath();
    return (
      <div>
        <AppBar title={name} iconElementLeft={<IconButton iconClassName="material-icons">navigation_arrow_back</IconButton>} />
      </div>
    );
  },
});

export default Header;
