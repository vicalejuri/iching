import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

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
    let { hexagram } = this.props;
    if ( !_.isEmpty( hexagram )) {
      return (
          <HexagramInfoCard hexagram={hexagram}/>
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
            <FloatingActionButton className="playBtn" onTouchTap={this.play} />
          </div>
        </div>

        {this.renderPreviewCard()}
      </div>
    );
  }

  play() {
    window.store.dispatch(HexagramActions.clearHexagram());
    window.store.dispatch(HexagramActions.generateHexagram());
  }
}
