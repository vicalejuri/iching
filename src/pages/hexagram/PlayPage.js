import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as HexagramActions from 'actions/HexagramActions.js';
import Kua from 'components/Kua.jsx';
import HexagramInfoCard from 'components/HexagramInfoCard.jsx';

import { FloatingActionButton, RaisedButton, ToggleStar, TextField, Colors } from 'material-ui';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui';

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

  renderPreviewCard() {
    let { kuas } = this.props;
    if ( kuas.length === 6 ) {
      return (
          <HexagramInfoCard hex={kuas}/>
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
              <RaisedButton label="Play" primary={true} onTouchTap={this.play} />
          </div>

          {this.renderPreviewCard()}
        </div>
      </div>
    );
  }

  play() {
    window.store.dispatch(HexagramActions.generateHexgram());
  }
}
