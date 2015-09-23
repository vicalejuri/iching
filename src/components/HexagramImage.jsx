import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

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
    render() {
      let below_image = this.trigramImage( this.props.below );
      let above_image = this.trigramImage( this.props.above );

      return (
        <div className="hex-img">
          { above_image }
          { below_image }
        </div>
      );
    }

    // Generate a single trigrams
    trigramImage( trigram ) {
      let image = _.chain(trigram.trigrams).map( this.kuaTag ).value();
      return image;
    }

    // Generate a single Yin or Yang line
    kuaTag( kua ) {
      let klass = (kua && 'yiang' || 'yin');
      let lines = ( kua  && <YangLine/> || <YinLine/> );

      return lines;

    }
}
