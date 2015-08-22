import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

export default class HexagramImage extends Component {
    render() {
      return (
        <div className="preview">
          <img src="/images/Iching-hexagram-64.svg" alt={this.props.name}/>
        </div>
    );
    }
}
