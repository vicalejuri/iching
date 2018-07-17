import { Component } from 'preact';

import isString from 'lodash/isString';

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

      if ( isString(below.title) ||
           isString(above.title) ) {
        below = getTrigramByName( below.title );
        above = getTrigramByName( above.title );
      }

      let above_image = this.trigramImage( above ).reverse();
      let below_image = this.trigramImage( below ).reverse();

      return (
        <div className="hex-img">
          { above_image }
          { below_image }
        </div>
      );
    }

    // Generate a single trigram
    trigramImage( trigram ) {
      let image = trigram.trigrams.map( this.kuaTag );
      return image;
    }

    // Generate a single Yin or Yang line
    kuaTag( kua , i) {
      debugger;
      let lines = ( kua ? <YangLine key={i} /> : <YinLine key={i} /> );

      return lines;
    }
}

/*
 * Single trigram image
 */
export class TrigramImage extends HexagramImage {
  render() {
    let { tri } = this.props;
    if ( isString(tri.name) ) {
      tri = getTrigramByName( tri.name );
    }

    let tri_image = this.trigramImage( tri ).reverse();

    return (
      <div className="tri-img">{ tri_image }</div>
    )
  }
}
