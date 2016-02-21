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
    return (
      <div className="details">
          <HexagramInfoCard hexagram={hex} />

          <div className="interpretation">
            <h3>Introduction</h3>
            <p>{hex.interpretation.introduction}</p>

            <h3>Judgement</h3>
            <p>{hex.interpretation.judgement}</p>

            <h3>Image</h3>
            <p>{hex.interpretation.image}</p>
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
