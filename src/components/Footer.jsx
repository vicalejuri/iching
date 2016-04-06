import React, { Component, PropTypes } from 'react';
import Router, {Link, History, State} from 'react-router';

import { connect } from 'react-redux'

let Footer = React.createClass({
  render() {
    return (
      <div className="footer icon-bar">

       <Link to="/play" activeClassName="active" ref="play">
         <div><i className="material-icons">brightness_high</i></div>
       </Link>
       <Link to="/list" activeClassName="active" ref="list">
        <div><i className="material-icons">menu</i></div>
       </Link>

     </div>
    );
  },
});

export default connect(
  state => { return {} },
)(Footer);
