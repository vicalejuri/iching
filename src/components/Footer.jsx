import React, { Component, PropTypes } from 'react';
import Router, {Link} from 'react-router';

export default class Footer extends Component {
  render() {
    return (
      <div className="icon-bar">

       <Link to="hexagram-play" className="active">
         <div><i className="material-icons">brightness_high</i></div>
       </Link>
       <Link to="hexagram-list">
        <div><i className="material-icons">power_input</i></div>
       </Link>
       <Link to="settings-about">
        <div><i className="material-icons">menu</i></div>
       </Link>

     </div>
    );
  }
}
