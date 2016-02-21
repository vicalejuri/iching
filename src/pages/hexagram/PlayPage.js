import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import Router, {Link} from 'react-router';

import * as HexagramActions from 'actions/HexagramActions.js';
import Kua from 'components/Kua.jsx';
import HexagramInfoCard from 'components/HexagramInfoCard.jsx';

import { FloatingActionButton, RaisedButton, ToggleStar, TextField, Colors } from 'material-ui';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');


let PlayPage = React.createClass({
  propTypes: {
    kuas:     PropTypes.arrayOf(Kua.propTypes.kua),
    hexagram: PropTypes.object,
    dispatch: PropTypes.func,
  },
  mixins: [ Router.Navigation ],


  render() {
    const { kuas } = this.props;
    return (
      <div className="playpage-container">

        <div className="canvas">
          <div className="question">
              <TextField
                fullWidth={"true"}
                hintText="Make a question "
                defaultValue="Make a question" />
          </div>

          <div className="ichingDragArea">
            <button ref="gongo" className="gongo"
              onMouseDown={this.onGongoHold}
              onMouseUp={this.onGongoRelease}
              onTouchStart={this.onGongoHold}
              onTouchEnd={this.onGongoRelease}
              onTouchTap={this.play} />
            <audio ref="gongosound" src="styles/audio/bell-gongo-resonance2.mp3" preload="auto"></audio>
          </div>
        </div>

        {this.renderPreviewCard()}

      </div>
    );
  },


  renderPreviewCard() {
    let { hexagram } = this.props;
    if ( !_.isEmpty( hexagram )) {
      return (
        <ReactCSSTransitionGroup component="div" transitionName="hexagram-preview">
          <HexagramInfoCard hexagram={hexagram} full={false}
                            onTouchTap={this.goToHexagram} />
        </ReactCSSTransitionGroup>
      );
    }
  },



  onGongoHold() {
    React.findDOMNode( this.refs.gongo ).className = 'gongo down';
  },
  onGongoRelease() {
    React.findDOMNode( this.refs.gongo ).className = 'gongo hit';
  },



  goToHexagram() {
    console.log('Show hexagram page', this);
  },

  play(ev) {
    let au = React.findDOMNode( this.refs.gongosound );
    au.currentTime = 0.0;
    au.play();

    window.store.dispatch(HexagramActions.clearHexagram());
    window.store.dispatch(HexagramActions.generateHexagram());
  },


});


export default connect(state => {
  return {
    kuas: state.kuas,
    hexagram: state.hexagram,
  };
})(PlayPage);
