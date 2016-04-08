import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as _ from 'lodash';

import * as HexagramActions from 'actions/HexagramActions.js';
import * as IchingTable from 'constants/lookup.js';

import { HexagramImage } from 'components/HexagramImage';
import { List, ListItem, Avatar, Icons, IconButton, FontIcon, Styles } from 'material-ui';

import Router, {Link, History}  from 'react-router';
import { connect , dispatch } from 'react-redux'

/*
 * A single list item
 */
let HexItem = React.createClass({
  mixins: [ History ],

  render() {
    let hex = this.props.hex;
    return ( <ListItem
        onClick={this.details}
        onTouchTap={this.details}
        key={hex.number}
        leftAvatar={<Avatar className="avatar"><HexagramImage below={hex.trigrams.below} above={hex.trigrams.above} /></Avatar>}
        primaryText={<div><b>{hex.name}</b> - {hex.description}</div>}
        /> )
  },

  details() {
    let hex = this.props.hex;
    this.history.pushState( null,`/details/${hex.number}/${hex.name}` );
  }
});


let ListPage = React.createClass({
  mixins: [ PureRenderMixin],

  getInitialState() {
    return {hexagrams: IchingTable.getAllHexagrams(), rendered_page: false};
  },

  render() {
    console.log('re-render listPage');
    let hexNodes = this.state.hexagrams;

    let rendered_page =  (
      <div className="listpage-container">
        <List subheader="The King Wen sequence">
          {
            hexNodes.map( (hex) => {
              return ( <HexItem hex={hex} key={hex.number}/>)
            } )
          }
        </List>
      </div>
    );
    return rendered_page;
  },

});


export default ListPage;
