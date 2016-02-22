import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';

import * as HexagramActions from 'actions/HexagramActions.js';
import * as IchingTable from 'constants/lookup.js';

import HexagramInfoCard from 'components/HexagramInfoCard';
import { List, ListItem, Avatar, Icons, IconButton, FontIcon, Styles } from 'material-ui';

import { connect } from 'react-redux'
import { pushState } from 'redux-router'

let DetailPage = React.createClass({

  render() {
    let p        = this.props.q
    let hex      = IchingTable.getHexagram( p.name );

    let lines    = _.chain( hex.interpretation.lines ).map( (line) => {
          return (
            <div className="line">
              <blockquote>{line.poem}</blockquote>
              <p>{line.expl}</p>
            </div>
          );
    }).value()

    return (
      <div className="details">
          <HexagramInfoCard hexagram={hex} trigrams />

          <div className="interpretation">
            <p>{hex.interpretation.resume}</p>

            <h3>The Judgement</h3>
            <p>{hex.interpretation.judgment}</p>

            <h3>The Image</h3>
            <p>{hex.interpretation.image}</p>

            <h3>The Lines</h3>
            {lines}
          </div>
      </div>
    );
  },
});


export default connect(
  state => {
    return {
      q: state.router.params,
    }
  },
  { pushState }
)(DetailPage);
