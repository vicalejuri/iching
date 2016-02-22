import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import * as HexagramActions from 'actions/HexagramActions.js';
import ICHING from '!json!constants/iching.json';
import { getTrigramByName } from 'constants/lookup.js';
import { HexagramImage , TrigramImage } from './HexagramImage.jsx';

import { Card, CardHeader, CardTitle, CardText, Avatar, Icons, FlatButton, IconButton, FontIcon, Styles } from 'material-ui';

export default class HexagramInfoCard extends Component {
  render() {
    let {trigrams, name, number, description} = this.props.hexagram;
    let innerTrigrams = this.innerTrigrams( this.props.trigrams || false )

    return (
      <div className="hexagram-card">
        <HexagramImage below={trigrams.below} above={trigrams.above} />

        <div className="title">
          <h3>{number}: {name}</h3>
          <h2>{description}</h2>
        </div>

        {innerTrigrams}
      </div>
    );
  }

  innerTrigrams( enabled ) {
    let above = getTrigramByName( this.props.hexagram.trigrams.above.title );
    let below = getTrigramByName( this.props.hexagram.trigrams.below.title );

    if ( enabled ) {
      return (
        <div className="trigrams">
          <div id="above">
            <TrigramImage tri={above} />
            <div className="title">{above.name} - {above.image}</div>
          </div>
          <div id="below">
            <TrigramImage tri={below} />
            <div className="title">{below.name} - {below.image}</div>
          </div>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }

}
