import React, { Component, PropTypes  } from 'react';
import ReactDOM , { render } from 'react-dom';
import { connect } from 'react-redux';

import { Router, Route, Link } from 'react-router';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import Footer from '../components/Footer';

import { PlayPage , DetailPage, AboutPage } from './index'



class AppContainer extends React.Component {

  componentWillUpdate() {
    this.scrollTopTop()
  }

  render() {
    console.log(this.props)
    /* <Header location={this.props.location} params={this.props.params} /> */
    return (
      <div className="app-wrap">
        <div className="content" ref="content">

            <Route path="/" component={PlayPage} />
            <Route path="/details/:number/:name" component={DetailPage} />
            <Route path="/about" component={AboutPage} />

            { /* {React.cloneElement(this.props.children, {key: this.props.location.pathname})} */ }
        </div>
        <Footer />
      </div>
    );
  }

  scrollTopTop() {
    let el = this.refs.content
    el.scrollTop = 0
  }

}

export default connect(
  null
)(AppContainer);
