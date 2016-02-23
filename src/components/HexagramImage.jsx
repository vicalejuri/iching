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

export class HexagramImage extends Component {

  /*
   * Draw a hexagram image.
   * Given `below` and `above`, as an array of kuas.
   * Or `below` and `above`, as it trigram name
   */
    render() {

      let { below, above } = this.props;
      if ( _.isString(below.title) ||
           _.isString(above.title) ) {
        below = getTrigramByName( below.title );
        above = getTrigramByName( above.title );
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

/*
 * Single trigram image
 */
export class TrigramImage extends HexagramImage {
  render() {
    let { tri } = this.props;
    if ( _.isString(tri.title) ) {
      tri = getTrigramByName( tri.title );
    }

    let tri_image = this.trigramImage( tri )

    return (
      <div className="tri-img">
        { tri_image }
      </div>
    )
  }
}
