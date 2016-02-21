import React, { Component, PropTypes } from 'react';

import Router, {Link, History, State} from 'react-router';

let Footer = React.createClass({
  render() {
    return (
      <div className="icon-bar">

       <Link to="/play" className="active">
         <div><i className="material-icons">brightness_high</i></div>
       </Link>
       <Link to="/day">
        <div><i className="material-icons">explore</i></div>
       </Link>
       <Link to="/list">
        <div><i className="material-icons">menu</i></div>
       </Link>

     </div>
    );
  },
});

export default Footer;
