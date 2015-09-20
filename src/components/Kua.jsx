import React, { Component, PropTypes } from 'react';

export default class Kua extends Component {
  static propTypes = {
    kua: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.array,
    }),
  }

  render() {
    const kua = this.props.kua;

    return (
      <li className={kua.name}>
        {kua.name}
      </li>
    );
  }
}
