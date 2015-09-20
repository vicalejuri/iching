import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import * as HexagramActions from 'actions/HexagramActions.js';
import ICHING from '!json!constants/iching.json';

import HexagramImage from './HexagramImage.jsx';

import { Card, CardHeader, CardTitle, CardText, Avatar, Icons, FlatButton, IconButton, FontIcon, Styles } from 'material-ui';

export default class HexagramInfoCard extends Component {
  render() {
    let {trigrams, name, number, description} = this.props.hexagram;
    return (
      <div className="hexagram-card">
        <HexagramImage below={trigrams.below} above={trigrams.above} />

        <div className="title">
          <h3>{number} - {name}</h3>
          <h2>{description}</h2>
          <div className="trigrams">
            <div id="above">Above: {trigrams.above.name} - {trigrams.above.image}</div>
            <div id="below">Below: {trigrams.below.name} - {trigrams.below.image}</div>
          </div>
        </div>
      </div>
    );
  }
}
