import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';

import * as HexagramActions from 'actions/HexagramActions.js';
import * as IchingTable from 'constants/lookup.js';

import { HexagramImage } from 'components/HexagramImage';
import { List, ListItem, Avatar, Icons, IconButton, FontIcon, Styles } from 'material-ui';

import Router, {Link, History}  from 'react-router';
import { connect , dispatch } from 'react-redux'

let ListPage = React.createClass({
  mixins: [ History ],
  render() {
    let hexNodes = _.chain(IchingTable.getAllHexagrams()).map( (hex) => {
      return (
            <ListItem
                onClick={this.details.bind(this,hex)}
                onTouchTap={this.details.bind(this,hex)}
                key={hex.number}
                leftAvatar={<Avatar className="avatar"><HexagramImage below={hex.trigrams.below} above={hex.trigrams.above} /></Avatar>}
                primaryText={<div><b>{hex.name}</b> - {hex.description}</div>}
                />
      );
    }).value();

    return (
      <div className="listpage-container">
        <List subheader="The King Wen sequence">
          {hexNodes}
        </List>
      </div>
    );
  },

  details(hex) {
    this.history.pushState( null,`/details/${hex.name}` );
  }
});


export default connect(
  (state) => {return {}},
)(ListPage);
