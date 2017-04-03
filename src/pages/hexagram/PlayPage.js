import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as _ from 'lodash';

import Router, {Link, History} from 'react-router';

import * as HexagramActions from 'actions/HexagramActions.js';
import Kua from 'components/Kua.jsx';
import HexagramInfoCard from 'components/HexagramInfoCard.jsx';

import { getAsset } from 'constants/utils'

import {FloatingActionButton, RaisedButton, ToggleStar, TextField, Colors} from 'material-ui';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui';

const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const opts = {
  hexagram_timeout: 3000
}

let PlayPage = React.createClass({

  propTypes: {
    kuas: PropTypes.arrayOf(PropTypes.number),
    hexagram: PropTypes.object,
    dispatch: PropTypes.func
  },

  mixins: [History],
  getInitialState() {
    return {
      already_played: (!_.isEmpty(this.props.hexagram))
    }
  },

  render() {
    const {kuas} = this.props;
    return (
      <div className="playpage-container">

          <div className="canvas">

              <div className="infoArea">
                  <ReactCSSTransitionGroup transitionName="question" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                      {this.isFirstPlay() ? (
                          <div className="question" ref="question">
                              {this.renderQuestion()}
                          </div>
                      ) : (false) }
                  </ReactCSSTransitionGroup>

                  <ReactCSSTransitionGroup transitionName="hexagram-preview" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                      {this.hasHexagram()
                          ? (
                              <div className="iching-card" ref="card" onTouchTap={this.goToHexagram} onClick={this.goToHexagram}>
                                  {this.renderPreviewCard()}
                              </div>
                          ) : (false)}
                  </ReactCSSTransitionGroup>

              </div>

              <div className="ichingDragArea">
                  <button ref="gongo" className="gongo" onMouseDown={this.onGongoHold} onMouseUp={this.onGongoRelease} onTouchStart={this.onGongoHold} onTouchEnd={this.onGongoRelease} onTouchTap={this.play}/>
                  <audio ref="gongosound" src={getAsset('audio/bell-square.mp3')} preload="auto"></audio>
              </div>
          </div>

      </div>
    );
  },

  isFirstPlay() {
    return (!this.state.already_played)
  },

  hasHexagram() {
    let {hexagram} = this.props;
    return !_.isEmpty(hexagram)
  },

  renderPreviewCard() {
    let {hexagram} = this.props;
    if (!_.isEmpty(hexagram)) {
      return (<HexagramInfoCard key={hexagram.number} hexagram={hexagram} trigrams/>);
    }
  },

  renderQuestion() {
    if (!this.state.already_played) {
      return (
        <h2 className="title" key="question">Concentrate and ask a question</h2>
      )
    }
  },

  onGongoHold(ev) {
    ReactDOM.findDOMNode(this.refs.gongo).className = 'gongo down';
  },

  onGongoRelease(ev) {
    // add animation
    ReactDOM.findDOMNode(this.refs.gongo).className = 'gongo hit';

    // play sound
    let au = ReactDOM.findDOMNode(this.refs.gongosound);
    if (au.play) {
      au.currentTime = 0.0;
      au.play();
    }

    window.store.dispatch(HexagramActions.clearHexagram());
    this.setState({already_played: true})
    setTimeout(() => {
      this.play()
    }, opts.hexagram_timeout);

  },

  goToHexagram() {
    this.history.pushState(null, `/details/${this.props.hexagram.number}/${this.props.hexagram.name}`);
  },

  play(ev) {
    window.store.dispatch(HexagramActions.generateHexagram());
  }
});

export default connect(state => {
  return {kuas: state.kuas, hexagram: state.hexagram};
})(PlayPage);
