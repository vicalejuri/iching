/*
 * List all trigrams
 */
import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as _ from 'lodash';

import { List, ListItem, Avatar, Icons, IconButton, Snackbar , Subheader} from 'material-ui';

import Router, {Link, History}  from 'react-router';
import { connect , dispatch } from 'react-redux'

import * as HexagramActions from '../../actions/HexagramActions';
import * as IchingTable from '../../constants/IchingLookup';

import { TrigramImage } from '../../components/HexagramImage';

let TrigramItem = function ( props ) {
    let tri = this.props.tri
    return (<ListItem
        onTouchTap={this.props.onTouchTap} onClick={this.props.onTouchTap}
        leftAvatar={<Avatar className="avatar"><TrigramImage tri={tri} /></Avatar>}
        primaryText={<b>{tri.name}</b>}
        secondaryText={<div>{tri.wilhelm}</div>}
        rightIcon={<div>{tri.image}</div>}
    />)
}

const TrigramsListPage = React.createClass({
   mixins: [ PureRenderMixin],
   getInitialState() {
     return {previewopen: false,
             lower: null,
             upper: null}
   },

   render() {
     let triNodes = IchingTable.Trigrams;
     let revTriNodes = Array.from(triNodes).reverse()
     let lowerTrigramHandle = this.handleTrigramTouch.bind(this, 'lower')
     let upperTrigramHandle = this.handleTrigramTouch.bind(this, 'upper')

     let rendered_page =  (
       <div className="trigramlistpage-container">
         <div className="lower-trigrams lineseparated">
           <List subheader="Lower trigrams">
             {
               revTriNodes.map( tri => ( <TrigramItem
                           tri={tri} key={tri.name}
                           onTouchTap={lowerTrigramHandle}  />) )
            }
           </List>
         </div>
         <div className="upper-trigrams">
           <List subheader="Upper trigrams">
             {
               triNodes.map( tri => ( <TrigramItem
                           tri={tri} key={tri.name}
                           onTouchTap={upperTrigramHandle} />))
            }
           </List>
         </div>
       </div>
    );

    return rendered_page;
   },

   handleTrigramTouch( tri_part = 'lower' , ev) {
     let state = this.state
     console.log(tri_part, ev)
     //state[tri_part] =
     this.setState({previewopen: true})
   },

});

export default TrigramsListPage;
