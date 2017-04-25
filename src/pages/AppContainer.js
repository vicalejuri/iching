import React, { Component, PropTypes  } from 'react'
import ReactDOM , { render } from 'react-dom'
import { connect } from 'react-redux'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'


import Footer from '../components/Footer'
import { PlayPage , DetailPage, AboutPage } from './index'


class AppContainer extends React.Component {

  componentWillUpdate() {
    this.scrollTopTop()
  }

  render() {
    /* <Header location={this.props.location} params={this.props.params} /> */
    return (

      <div className="app-wrap">
        <div className="content" ref={(el) => { this.content = el }}>

            <Route exact path="/" component={PlayPage} />
            <Route exact path="/about" component={AboutPage} />
            { /* <Route path="/details/:number/:name" component={DetailPage} /> */ }

        </div>
        <Footer />
      </div>
    );
  }

  scrollTopTop() {
    let el = this.content
    el.scrollTop = 0
  }

}

export default withRouter(connect(
  null
)(AppContainer));
