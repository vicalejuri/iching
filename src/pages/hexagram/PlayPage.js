import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as HexagramActions from 'actions/HexagramActions.js';
import Kua from 'components/Kua.jsx';
import HexagramInfoCard from 'components/HexagramInfoCard.jsx';

import { FloatingActionButton, RaisedButton, ToggleStar } from 'material-ui';

@connect(state => {
  return {
    kuas: state.hexagram,
  };
})


export default class PlayPage extends Component {
  static propTypes = {
    kuas:     PropTypes.arrayOf(Kua.propTypes.kua),
    dispatch: PropTypes.func,
  }

  render() {
    const { kuas } = this.props;
    return (
      <div className="playpage-container">

        <div className="play-canvas">
          <RaisedButton label="Play!" onTouchTap={this.play} />
        </div>


        <HexagramInfoCard/>
      </div>
    );
  }

  play() {
    window.store.dispatch(HexagramActions.generateKua());
  }
}
