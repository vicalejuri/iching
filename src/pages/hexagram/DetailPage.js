import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import classNames from 'classNames';

import * as HexagramActions from 'actions/HexagramActions.js';
import * as IchingTable from 'constants/lookup.js';

import HexagramInfoCard from 'components/HexagramInfoCard';
import { List, ListItem, Avatar, Icons, IconButton, FontIcon, Styles , Divider } from 'material-ui';

import { connect } from 'react-redux'
import { pushState } from 'redux-router'

let DetailPage = React.createClass({

  render() {
    let p        = this.props.q
    let hex      = IchingTable.getHexagram( p.name );
    if ( ! hex ) {
      return (<div/>);
    }

    let lines    = _.chain( hex.interpretation.lines ).map( (line,i) => {
          return (
            <div className="line" key={i}>
              <blockquote>{line.poem}</blockquote>
              <p>{line.expl}</p>
            </div>
          );
    }).value()

    let tarot_class = classNames({[`icon-Tao_${hex.number}`]: true});
    return (
      <div className="details">
          <HexagramInfoCard hexagram={hex} trigrams />

          <div className="interpretation">

            <div className="highlight">
              <div className="tarot">
                <div className={tarot_class}/>
              </div>
              <div className="oracle">
                <blockquote>{hex.interpretation.oracle}</blockquote>
              </div>
            </div>
            <p>{hex.interpretation.resume}</p>

            <h3>The Image</h3>
            <Divider />
            <pre>{hex.interpretation.image.oracle}</pre>
            <p>{hex.interpretation.image.image}</p>

            <h3>The Judgement</h3>
            <Divider />
            <pre>{hex.interpretation.oracle}</pre>
            <p>{hex.interpretation.judgment}</p>

            <h3>The Lines</h3>
            <Divider />
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
