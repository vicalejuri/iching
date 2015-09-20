import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import * as HexagramActions from 'actions/HexagramActions.js';
import * as IchingTable from 'constants/lookup.js';

import HexagramImage from 'components/HexagramImage';
import { List, ListItem, Avatar, Icons, IconButton, FontIcon, Styles } from 'material-ui';

let Router = require('react-router');

let ListPage = React.createClass({
  mixins: [ Router.Navigation ],

  render: function() {
    let hexNodes = _.chain(IchingTable.getAllHexagrams()).map( (hex) => {
      return (
            <ListItem
                onClick={this.details.bind(this,hex)}
                key={hex.number}
                leftAvatar={<Avatar><HexagramImage name={hex.name}/></Avatar>}
                primaryText={<p><b>{hex.name}</b> - {hex.description}</p>}
                secondaryText={
                  <p>
                    <span style={{color: Styles.Colors.darkBlack}}>{hex.trigrams.above}</span><br/>
                    {hex.trigrams.bellow}
                  </p>
                }
                secondaryTextLines={2} />
      );
    }).value();

    return (
      <div>
        <List subheader="The King Wen sequence">
          {hexNodes}
        </List>
      </div>
    );
  },

  details: function( hex ) {
    console.log('Selected this fucker', hex);
    this.transitionTo('hexagram-details', {name: hex.name});
  },
});
export default ListPage;
