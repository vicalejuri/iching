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

const opts = {
  hexagram_timeout: 3500,
}

let PlayPage = React.createClass({
  propTypes: {
    kuas:     PropTypes.arrayOf(PropTypes.number),
    hexagram: PropTypes.object,
    dispatch: PropTypes.func,
  },

  getInitialState() {
    return {already_played: ( ! _.isEmpty( this.props.hexagram ) ) }
  },

  render() {
    const { kuas } = this.props;
    return (
      <div className="playpage-container">

        <div className="canvas">

          <div className="infoArea">
            <div className="question" ref="question">
              <ReactCSSTransitionGroup transitionName="question"
                                        transitionEnterTimeout={400} transitionLeaveTimeout={400} >
                  {this.renderQuestion()}
              </ReactCSSTransitionGroup>
            </div>

            <div className="iching-card" ref="card" onTouchTap={this.goToHexagram} onClick={this.goToHexagram}>
              <ReactCSSTransitionGroup transitionName="hexagram-preview"
                                      transitionEnterTimeout={400} transitionLeaveTimeout={400} >
                {this.renderPreviewCard()}
              </ReactCSSTransitionGroup>
            </div>
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
        <HexagramInfoCard hexagram={hexagram} trigrams />
      );
    }
  },

  renderQuestion() {
    if ( ! this.state.already_played ) {
      return (
          <h1>Concentrate and make your question</h1>
      )
    }
  },



  onGongoHold() {
    ReactDOM.findDOMNode( this.refs.gongo ).className = 'gongo down';
  },

  onGongoRelease() {
    ReactDOM.findDOMNode( this.refs.gongo ).className = 'gongo hit';
    let au = ReactDOM.findDOMNode( this.refs.gongosound );
    au.currentTime = 0.0;
    au.play();

    window.store.dispatch(HexagramActions.clearHexagram());
    this.setState({already_played: true})
    setTimeout( () => {
      this.play()
    }, opts.hexagram_timeout );

  },


  goToHexagram() {
    window.store.dispatch( pushState(null,`/details/${this.props.hexagram.name}` , '') )
  },

  play(ev) {
    window.store.dispatch(HexagramActions.generateHexagram());
  },


});


export default connect(state => {
  return {
    kuas: state.kuas,
    hexagram: state.hexagram,
  };
}, { pushState })(PlayPage);
