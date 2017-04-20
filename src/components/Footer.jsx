import React, {Component, PropTypes} from 'react';
import Router, {Link, History, State} from 'react-router';

import {connect} from 'react-redux'

class Footer extends React.Component {
  render() {
    return (
      <div className="footer icon-bar">
        <Link to="/" activeClassName="active" ref="play">
          <i className="material-icons">brightness_high</i>
        </Link>
        <Link to="/list" activeClassName="active" ref="list">
          <i className="material-icons">menu</i>
        </Link>
        <Link to="/about" activeClassName="about" ref="about">
          <i className="material-icons">menu</i>
        </Link>
      </div>
    );
  }
}

export default connect(state => ({}))(Footer);
