import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import * as HexagramActions from 'actions/HexagramActions.js';
import ICHING from '!json!constants/iching.json';

import HexagramInfoCard from 'components/HexagramInfoCard';
import { List, ListItem, Avatar, Icons, IconButton, FontIcon, Styles } from 'material-ui';

let Router = require('react-router');

let DetailPage = React.createClass({
  mixins: [ Router.State ],

  render: function() {
    let name = this.getParams().name;
    return (
      <div>
        <h1>Hello World</h1>
          <HexagramInfoCard name={name}/>
      </div>
    );
  },
});

export default DetailPage;
