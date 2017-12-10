import { Component } from "preact";

import { connect } from "preact-redux";

import { NavLink } from "react-router-dom";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import { withRouter } from "react-router";

import YinYangSvg from "../public/icons/yin_yang.svg";

function Footer() {
  return (
    /*
    <CSSTransitionGroup component="div" className="footer icon-bar"
                          transitionName="footer-appear" transitionAppear
                          transitionAppearTimeout={1000}
                          transitionEnterTimeout={1000}
                          transitionLeaveTimeout={1000}> */

    <div className="footer icon-bar">
      <NavLink to="/" activeClassName="active">
        <i className="box-block center-block icon my-icon yinyang" />
        <span className="label">Play</span>
      </NavLink>
      <NavLink to="/about" activeClassName="active">
        <i className="box-block center-block icon my-icon link" />
        <span className="label">Settings</span>
      </NavLink>
    </div>
    /*
    </CSSTransitionGroup>
    */
  );
}

export default connect(state => ({}))(Footer);
