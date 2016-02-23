import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import Router, {Link} from 'react-router';
import { pushState } from 'redux-router'

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

  render() {
    const { kuas } = this.props;
    return (
      <div className="playpage-container">

        <div className="canvas">
          <div className="question" ref="question">
            <h1>Concentrate and make your question</h1>
          </div>

          <div className="iching-card" ref="card" onTouchTap={this.goToHexagram} onClick={this.goToHexagram}>
            {this.renderPreviewCard()}
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

      </div>
    );
  },


  renderPreviewCard() {
    let { hexagram } = this.props;
    if ( ! _.isEmpty( hexagram )) {
      return (
        <ReactCSSTransitionGroup transitionName="hexagram-preview"
                                  transitionEnterTimeout={2500} transitionLeaveTimeout={700}
                                  transitionAppear transitionAppearTimeout={400}>
          <HexagramInfoCard hexagram={hexagram} trigrams />
        </ReactCSSTransitionGroup>
      );
    }
  },



  onGongoHold() {
    ReactDOM.findDOMNode( this.refs.gongo ).className = 'gongo down';
  },
  onGongoRelease() {
    this.play()

    ReactDOM.findDOMNode( this.refs.gongo ).className = 'gongo hit';
    ReactDOM.findDOMNode( this.refs.question ).className = 'question hidden';
  },



  goToHexagram() {
    console.log(`Hello world go to Hexagram`)
    window.store.dispatch( pushState(null,`/details/${this.props.hexagram.name}` , '') )
  },

  play(ev) {
    let au = ReactDOM.findDOMNode( this.refs.gongosound );
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
}, { pushState })(PlayPage);
