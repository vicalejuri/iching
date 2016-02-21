import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { getTrigramByName } from 'constants/lookup.js';

// Single Line
export class YinLine extends Component {
  render() {
    return (
      <div className="yin">
        <span></span>
      </div>
    );
  }
}

// Double line
export class YangLine extends Component {
  render() {
    return (
      <div className="yang">
        <span></span>
        <span></span>
      </div>
    );
  }
}

export default class HexagramImage extends Component {

  /*
   * Draw a hexagram image.
   * Given `below` and `above`, as an array of kuas.
   * Or `below` and `above`, as it trigram name
   */
    render() {

      let { below, above } = this.props;
      if ( _.isString(below) ||
           _.isString(above) ) {
        below = getTrigramByName( below );
        above = getTrigramByName( above );
      }

      let below_image = this.trigramImage( below );
      let above_image = this.trigramImage( above );

      return (
        <div className="hex-img">
          { above_image }
          { below_image }
        </div>
      );
    }

    // Generate a single trigram
    trigramImage( trigram ) {
      let image = _.chain(trigram.trigrams).map( this.kuaTag ).value();
      return image;
    }

    // Generate a single Yin or Yang line
    kuaTag( kua , i) {
      let klass = (kua && 'yiang' || 'yin');
      let lines = ( kua  && <YangLine key={i} /> || <YinLine key={i}/> );

      return lines;

    }
}
