import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import * as HexagramActions from 'actions/HexagramActions.js';
import * as IchingTable from 'constants/lookup.js';

import HexagramImage from 'components/HexagramImage';
import { List, ListItem, Avatar, Icons, IconButton, FontIcon, Styles } from 'material-ui';

import Router, {Link} from 'react-router';

let ListPage = React.createClass({
  mixins: [ Router.Navigation ],

  render() {
    let hexNodes = _.chain(IchingTable.getAllHexagrams()).map( (hex) => {
      return (
            <ListItem
                onClick={this.details.bind(this,hex)}
                key={hex.number}
                leftAvatar={<Avatar className="avatar"><HexagramImage below={hex.trigrams.below} above={hex.trigrams.above} /></Avatar>}
                primaryText={<p><b>{hex.name}</b> - {hex.description}</p>}
                secondaryText={
                  <div>
                    <span>{hex.trigrams.above.wilhelm}</span><br/>
                    <span>{hex.trigrams.below.wilhelm}</span>
                  </div>
                }
                secondaryTextLines={2} />
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
    this.transitionTo('hexagram-details', {name: hex.name} );
  },
});
export default ListPage;
