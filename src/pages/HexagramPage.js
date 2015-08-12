import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as HexagramActions from '../actions/HexagramActions.js';
import Kua from '../components/Kua.jsx';

@connect(state => {
  return {
    kuas: state.hexagram,
  };
})


export default class HexagramPage extends Component {
  static propTypes = {
    kuas:     PropTypes.arrayOf(Kua.propTypes.kua),
    dispatch: PropTypes.func,
  }

  render() {
    const { kuas, dispatch } = this.props;
    return (
      <div>
        <p>Now the hexagram is</p>
        <ul>
          {kuas.map( (kua, idx) =>
            <Kua kua={kua} key={idx} />
          )}
        </ul>
        <button onClick={() => dispatch(HexagramActions.generateKua())}>Throw Dices</button>
      </div>
    );
  }
}
