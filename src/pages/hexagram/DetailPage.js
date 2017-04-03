import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import classNames from 'classnames';

import * as HexagramActions from 'actions/HexagramActions.js';
import * as IchingTable from 'constants/IchingLookup.js';

import HexagramInfoCard from 'components/HexagramInfoCard';
import { List, ListItem, Avatar, Icons, IconButton, FontIcon, Styles , Divider } from 'material-ui';

import { connect } from 'react-redux'


let DetailPage = React.createClass({
  formatQuote(text) {
    return text.replace(/\t/g,'')
  },

  render() {
    let hexNumber = _.toNumber( this.props.params.number );

    // get hexagram, or display nothing if not already loaded
    let hex       = this.props.hexagrams[hexNumber - 1];
    if (!hex) {
      return <div />
    }

    let lines    = _.chain( hex.interpretation.lines ).map( (line,i) => (
      <div className="line" key={i}>
          <q className="subQuote">{line.poem}</q>
          <p>{line.expl}</p>
      </div>
    )).value()

    let tarot_class = classNames({[`icon-Tao_${hex.number}`]: true});
    return (
      <div className="detailspage-container">
          <HexagramInfoCard hexagram={hex} trigrams />

          <div className="interpretation">

              <div className="highlight">
                  <div className="tarot">
                      <div className={tarot_class} />
                  </div>
                  <div className="oracle">
                      <q>{this.formatQuote(hex.interpretation.oracle)}</q>
                  </div>
              </div>
              <p>{hex.interpretation.resume}</p>

              <h3>The Image</h3>
              <Divider />
              <q className="subQuote">{this.formatQuote(hex.interpretation.image.oracle)}</q>
              <p>{hex.interpretation.image.image}</p>

              <h3>The Judgement</h3>
              <Divider />
              <q className="subQuote">{this.formatQuote(hex.interpretation.oracle)}</q>
              <p>{hex.interpretation.judgment}</p>

              <h3>The Lines</h3>
              <Divider />
              {lines}
          </div>
      </div>
    );
  },

});


export default connect(state => ({hexagrams: state.iching}))(DetailPage);
