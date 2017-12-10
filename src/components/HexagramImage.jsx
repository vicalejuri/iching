import { Component } from 'preact';
import { connect } from 'preact-redux';
import * as _ from 'lodash';

import { getTrigramByName } from '../constants/IchingLookup';

// Single Line
function YinLine() {
  return <div className="yin"><span /></div>;
}
function YangLine() {
  return <div className="yang"><span /><span /></div>;
}

/*
 * Draw a hexagram image.
 * Given `below` and `above`, as an array of kuas.
 * Or `below` and `above`, as it trigram name
 */
export class HexagramImage extends Component {
    render() {

      let { below, above } = this.props;

      if ( _.isString(below.title) ||
           _.isString(above.title) ) {
        below = getTrigramByName( below.title );
        above = getTrigramByName( above.title );
      }

      let below_image = _.chain( this.trigramImage( below ) ).reverse().value();
      let above_image = _.chain( this.trigramImage( above ) ).reverse().value();

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
      let lines = ( kua.yin  ? <YangLine key={i} /> : <YinLine key={i} /> );

      return lines;
    }
}

/*
 * Single trigram image
 */
export class TrigramImage extends HexagramImage {
  render() {
    let { tri } = this.props;
    if ( _.isString(tri.name) ) {
      tri = getTrigramByName( tri.name );
    }

    let tri_image = _.chain( this.trigramImage( tri ) ).reverse().value()

    return (
      <div className="tri-img">{ tri_image }</div>
    )
  }
}
