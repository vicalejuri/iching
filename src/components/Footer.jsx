import React, {Component, PropTypes} from 'react';
import Router, {Link, History, State} from 'react-router';

import {connect} from 'react-redux'

let Footer = React.createClass({
  render() {
    return (
      <div className="footer icon-bar">
          <Link to="/" activeClassName="active" ref="play">,
              <i className="material-icons">brightness_high</i>
          </Link>
          <Link to="/list" activeClassName="active" ref="list">
              <i className="material-icons">menu</i>
          </Link>
      </div>
    );
  },
});

export default connect((state) => {})(Footer);
