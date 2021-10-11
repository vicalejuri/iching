import { Component } from "preact";
import classNames from "classnames";

import { connect } from "react-redux";

import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

/*import Footer from "../components/Footer";*/
import { PlayPage, DetailPage, AboutPage } from "./index";

class AppContainer extends Component {
  componentWillUpdate() {
    this.scrollToTop();
  }

  render() {
    console.log("AppContainer:render");
    return (
      <div
        className="content"
        ref={el => {
          this.content = el;
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={PlayPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/details/:id" component={DetailPage} />
          </Switch>
        </Router>
      </div>
    );
  }

  scrollToTop() {
    let el = this.content;
    el.scrollTop = 0;
  }
}

AppContainer.defaultProps = {
  isMobile: true
};

export default AppContainer;
