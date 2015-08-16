import React, { Component, PropTypes } from 'react';
import Router, {Link} from 'react-router';

export default class Footer extends Component {
  render() {
    return (
      <div className="icon-bar">
       <Link to="index">
         <i className="fa fa-home"></i>
         Home
       </Link>
       <Link to="hexagram">
         <i className="fa fa-bell"></i>
         Notifications
       </Link>
       <a href="#">
         <i className="fa fa-envelope"></i>
         Messages
       </a>
       <a href="#">
         <i className="fa fa-user"></i>
         Me
       </a>
     </div>
    );
  }
}
