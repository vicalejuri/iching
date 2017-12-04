import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux'

import { NavLink } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import { withRouter } from 'react-router'

import YinYangSvg from "../public/icons/yin_yang.svg"

function Footer() {
  return (
    <CSSTransitionGroup component="div" className="footer icon-bar"
                          transitionName="footer-appear" transitionAppear
                          transitionAppearTimeout={1000}
                          transitionEnterTimeout={1000}
                          transitionLeaveTimeout={1000}>
        <NavLink to="/" activeClassName="active">
          <i className="box-block center-block icon my-icon yinyang" />
          <span className="label">Play</span>
        </NavLink>
        <NavLink to="/about" activeClassName="active">
          <i className="box-block center-block icon my-icon link" />
          <span className="label">Settings</span>
        </NavLink>
    </CSSTransitionGroup>
  );
}

export default withRouter( connect( state => ({}) )(Footer) );
