import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import * as HexagramActions from 'actions/HexagramActions.js';
import Kua from 'components/Kua.jsx';
import HexagramInfoCard from 'components/HexagramInfoCard.jsx';

import { FloatingActionButton, RaisedButton, ToggleStar, TextField, Colors } from 'material-ui';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui';
let CSSTransitionGroup = React.addons.CSSTransitionGroup;

@connect(state => {
  return {
    kuas: state.kuas,
    hexagram: state.hexagram,
  };
})


export default class PlayPage extends Component {
  static propTypes = {
    kuas:     PropTypes.arrayOf(Kua.propTypes.kua),
    dispatch: PropTypes.func,
  }

  onGongoHold() {
    console.log('hold',this);
    React.findDOMNode( this.refs.gongo ).className = 'gongo down';
  }
  onGongoRelease() {
    console.log('release',this);
    React.findDOMNode( this.refs.gongo ).className = 'gongo hit';
  }


  renderPreviewCard() {
    let { hexagram } = this.props;
    if ( !_.isEmpty( hexagram )) {
      return (
        <HexagramInfoCard hexagram={hexagram} full={false} />
      );
    }
  }


  render() {
    const { kuas } = this.props;
    return (
      <div className="playpage-container">

        <div className="canvas">
          <div className="question">
              <TextField
                fullWidth={true}
                hintText="Should i ... ?"
                defaultValue="Should i " />
          </div>

          <div className="ichingDragArea">
            <button ref="gongo" className="gongo"
              onMouseDown={this.onGongoHold.bind(this)}
              onMouseUp={this.onGongoRelease.bind(this)}
              onTouchStart={this.onGongoHold.bind(this)}
              onTouchEnd={this.onGongoRelease.bind(this)}
              onTouchTap={this.play.bind(this)} />
            <audio ref="gongosound" src="styles/audio/bell-gongo-resonance2.mp3" preload="auto"></audio>
          </div>
        </div>

        {this.renderPreviewCard()}

      </div>
    );
    /*
    return (
      <div className="playpage-container">

        <div className="canvas">
          <div className="question">
              <TextField
                fullWidth={true}
                hintText="Should i ... ?"
                defaultValue="Should i " />
          </div>

          <div className="ichingDragArea">
            <button className="playBtn" onTouchTap={this.play} />
          </div>
        </div>

        <CSSTransitionGroup component="div" transitionName="hexagram-preview">
          {this.renderPreviewCard()}
        </CSSTransitionGroup>

      </div>
    );
    */
  }

  play( ev ) {
    let au = React.findDOMNode( this.refs.gongosound );
    au.currentTime = 0.0;
    au.play();

    window.store.dispatch(HexagramActions.clearHexagram());
    //_.delay( () => {
    window.store.dispatch(HexagramActions.generateHexagram());
    //} , 300 );
  }
}
