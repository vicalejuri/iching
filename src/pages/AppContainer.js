import preact, { Component  } from 'preact'

import { connect } from 'preact-redux'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import Footer from '../components/Footer'
import { PlayPage , DetailPage, AboutPage } from './index'


class AppContainer extends Component {

  componentWillUpdate() {
    this.scrollTopTop()
  }

  render() {
    return (

      <div className="app-wrap">
        <div className="content" ref={(el) => { this.content = el }}>

            <Route exact path="/" component={PlayPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/details/:number" component={DetailPage} />

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
