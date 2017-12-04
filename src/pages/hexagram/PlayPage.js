import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as _ from 'lodash';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import * as HexagramActions from '../../actions/HexagramActions';
import Kua from '../../components/Kua';
import HexagramInfoCard from '../../components/HexagramInfoCard';

import { getAsset } from '../../constants/utils'


class PlayPage extends React.Component {
  defaultProps = {
    kuas: [],
    hexagram: {},
    animation_timeout: 3000
  }

  constructor( props ) {
    super(props)
    this.state = {
      already_played: false
    }
  }


  render() {
    console.log("play page render")
    return (
      <div className="playpage-container">

          <CSSTransitionGroup className="iching-card"
                              onClick={this.goToHexagram}
                              transitionName="hexagram-preview" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                              {this.renderPreviewCard()}
          </CSSTransitionGroup>

          <div className="canvas">
              <div className="infoArea">
                  <CSSTransitionGroup transitionName="question" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                      {this.isFirstPlay() ? (
                          <div className="question" ref={el => this.question = el}>
                              {this.renderQuestion()}
                          </div>
                      ) : (false) }
                  </CSSTransitionGroup>
              </div>

              <div className="ichingDragArea">
                  <button className="gongo" ref={el => this.gongo = el}
                  onMouseDown={this.onGongoHold} onMouseUp={this.onGongoRelease}
                  onTouchStart={this.onGongoHold} onTouchEnd={this.onGongoRelease} />
                  <audio ref={el => this.gongosound = el} src={getAsset('audio/bell-square.mp3')} preload="auto" />
              </div>
          </div>

      </div>
    );
  }

  isFirstPlay() {
    return (!this.state.already_played)
  }

  hasHexagram() {
    let {hexagram} = this.props;
    return !_.isEmpty(hexagram)
  }

  renderPreviewCard() {
    let {hexagram} = this.props;
    if (!_.isEmpty(hexagram)) {
      return (<HexagramInfoCard key={hexagram.number} hexagram={hexagram} trigrams />);
    } else {
      return <span />
    }
  }

  renderQuestion() {
    if (!this.state.already_played) {
      return (
        <h2 className="title" key="question">Concentrate and throw the dices</h2>
      )
    }
  }

  onGongoHold = (ev) => {
    this.gongo.className = 'gongo down';
  }

  onGongoRelease = (ev) => {
    // add animation
    this.gongo.className = 'gongo hit';

    // play sound
    let au = this.gongosound;
    if (au.play) {
      au.currentTime = 0.0;
      au.play();
    }

    window.store.dispatch(HexagramActions.clearHexagram());
    this.setState({already_played: true})
    setTimeout(() => {
      this.play()
    }, this.props.animation_timeout);

  }

  goToHexagram = () => {
    this.history.pushState(null, `/details/${this.props.hexagram.number}/${this.props.hexagram.name}`);
  }

  play = (ev) => {
    console.log("play called")
    window.store.dispatch(HexagramActions.generateHexagram());
  }
}

export default connect(state => ({kuas: state.kuas, hexagram: state.hexagram}))(PlayPage);
