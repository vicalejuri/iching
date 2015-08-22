import React, { Component, PropTypes } from 'react';
import Router, {Link} from 'react-router';

export default class Footer extends Component {
  render() {
    return (
      <div className="icon-bar">

       <Link to="hexagram-play">
         <div><i className="material-icons">brightness_high</i></div>
         Play
       </Link>
       <Link to="hexagram-list">
        <div><i className="material-icons">power_input</i></div>
       Hexagrams
       </Link>
     </div>
    );
  }
}
