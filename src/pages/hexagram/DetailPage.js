import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import * as HexagramActions from 'actions/HexagramActions.js';
import * as IchingTable from 'constants/lookup.js';

import HexagramInfoCard from 'components/HexagramInfoCard';
import { List, ListItem, Avatar, Icons, IconButton, FontIcon, Styles } from 'material-ui';

let Router = require('react-router');

let DetailPage = React.createClass({
  mixins: [ Router.State ],

  render: function() {
    let p = this.getParams();
    console.log( p );
    let hex      = IchingTable.getHexagram( p.name );
    console.log( hex );
    return (
      <div>
        <h1>Hello World</h1>
          <HexagramInfoCard hexagram={hex} />
      </div>
    );
  },
});

export default DetailPage;
