import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import * as HexagramActions from 'actions/HexagramActions.js';
import ICHING from '!json!constants/iching.json';

import HexagramImage from './HexagramImage.jsx';

import { Card, CardHeader, CardTitle, CardText, Avatar, Icons, FlatButton, IconButton, FontIcon, Styles } from 'material-ui';

export default class HexagramInfoCard extends Component {
  render() {
    return (
      <div className="hexagram-card">
        <HexagramImage name="hue"/>

        <div className="title">
          <h3>{this.props.name}</h3>
          <div className="trigrams">
            <div id="above">Above: The Lake</div>
            <div id="below">Below: The Mountain</div>
          </div>
        </div>
      </div>
    );
  }
}
