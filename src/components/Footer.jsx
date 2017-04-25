import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux'

import { Link } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

function Footer() {
  return (
    <CSSTransitionGroup component="div" className="footer icon-bar"
                          transitionName="footer-appear" transitionAppear
                          transitionAppearTimeout={1000}
                          transitionEnterTimeout={1000}
                          transitionLeaveTimeout={1000}>
        <Link to="/" >
          <i className="material-icons">brightness_high</i>
        </Link>
        <Link to="/about" >
          <i className="material-icons">link</i>
        </Link>
    </CSSTransitionGroup>
  );
}

export default connect( state => ({}) )(Footer);
