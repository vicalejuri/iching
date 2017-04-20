import * as _ from 'lodash';
import classNames from 'classnames';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import { Divider } from 'material-ui';

import * as HexagramActions from '../../actions/HexagramActions';
import * as IchingTable from '../../constants/IchingLookup';
import { getAsset } from '../../constants/utils'

import HexagramInfoCard from '../../components/HexagramInfoCard';

const Hypher = require('hypher')
const english = require('hyphenation.en-us')

let BeautifulText = new Hypher(english)

/* Clean widow phrase */
function noWidows(phrase) {
  let words = phrase.trim().split(" ")
  if (words.length > 1) {
    // add &nbsp;
    words[words.length - 2] = `${words[words.length - 2]}\u00a0${words[words.length - 1]}`
    // remove soft-hyphen from last word
    words[words.length - 2] = words[words.length - 2].replace(/\u00ad/g, '')
    words.pop()
  }
  return words.join(" ")
}

class DetailPage extends React.Component {
  render() {
    let hexNumber = _.toNumber( this.props.params.number );

    // get hexagram, or display nothing if not already loaded
    let hex       = this.props.hexagrams[hexNumber - 1];
    if (!hex) {
      return <div />
    }

    let lines    = _.chain( hex.interpretation.lines ).map( (line,i) => (
      <div className="line" key={this.lineId(line.poem)}>
        <q className="subQuote">{this.formatQuote(line.poem)}</q>
        {this.formatText(line.expl)}
      </div>
    )).value()

    //let tarot_class = classNames({[`icon-Tao_${hex.number}`]: true});
    let tarot_image = getAsset(`img/tarot/Tao_${hex.number}.jpg`)
    return (
      <div className="detailspage-container">
        <HexagramInfoCard hexagram={hex} trigrams />

        <div className="interpretation">
          <div className="highlight">
            <div className="tarot">
              <img src={tarot_image} alt={hex.description} />
            </div>
            <div className="oracle">
              <q>{this.formatQuote(hex.interpretation.oracle)}</q>
            </div>
          </div>
          {this.formatText(hex.interpretation.resume)}

          <h3>The Image</h3>
          <Divider />
          <q className="subQuote">{this.formatQuote(hex.interpretation.image.oracle)}</q>
          {this.formatText(hex.interpretation.image.image)}

          <h3>The Judgement</h3>
          <Divider />
          <q className="subQuote">{this.formatQuote(hex.interpretation.oracle)}</q>
          {this.formatText(hex.interpretation.judgment)}

          <h3>The Lines</h3>
          <Divider />
          {lines}
        </div>
      </div>
    );
  }

  lineId(text) {
    return text.split('\n')[0].toLowerCase()
  }

  /* Format text paragraphs between <p> */
  formatText(text) {
    let paragraphs    = text.split('\n\n')
    let txtHyphenated = paragraphs.map( p => BeautifulText.hyphenateText(p) )
    let fmted         = txtHyphenated.map(p => (<p>{p}</p>))
    return fmted
  }

  /* Format quote */
  formatQuote(text) {
    let quote = text.replace(/\t/g,'')
    return BeautifulText.hyphenateText(quote)
                        .split('\n')
                        .map( phrase => noWidows(phrase) )
                        .join('\n')
  }

}

export default connect(state => ({hexagrams: state.iching}))(DetailPage);
