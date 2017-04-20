import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as _ from 'lodash';

import { List, ListItem, Avatar, Icons, IconButton, FontIcon, Styles } from 'material-ui';

import { connect , dispatch } from 'react-redux'

import * as HexagramActions from '../../actions/HexagramActions';
import * as IchingTable from '../../constants/IchingLookup';

import { HexagramImage } from '../../components/HexagramImage';

/*
 * A single list item
 */
class HexItem extends React.Component {

  render() {
    let hex = this.props.hex;
    return ( <ListItem
    onClick={this.details}
    onTouchTap={this.details}
    key={hex.number}
    leftAvatar={
      <Avatar className="avatar">
        <HexagramImage below={hex.trigrams.below} above={hex.trigrams.above} />
      </Avatar>}
    primaryText={<div><b>{hex.name}</b> - {hex.description}</div>}
        /> )
  }

  details() {
    let hex = this.props.hex;
    this.history.pushState( null,`/details/${hex.number}/${hex.name}` );
  }
}


class ListPage extends React.Component {

  render() {
    let hexNodes = this.props.hexagrams;

    let rendered_page =  (
      <div className="listpage-container">
        <List subheader="The King Wen sequence">
          {
                  hexNodes.map( hex => ( <HexItem hex={hex} key={hex.number} />) )
              }
        </List>
      </div>
    );

    return rendered_page;
  }

}

export default connect(state => ({hexagrams: state.iching}))(ListPage);
