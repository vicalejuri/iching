import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import * as HexagramActions from 'actions/HexagramActions.js';
import ICHING from '!json!constants/iching.json';

import HexagramImage from 'components/HexagramImage';
import { List, ListItem, Avatar, Icons, IconButton, FontIcon, Styles } from 'material-ui';

export default class ListPage extends Component {
  render() {
    let hexNodes = _.chain(ICHING).map( (hex) => {
      return (
            <ListItem
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
        <List subheader={<i>All Hexagrams</i>}>
          {hexNodes}
        </List>
      </div>
    );
  }
}
