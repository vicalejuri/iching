import preact, { Component } from "preact";
import { connect } from "preact-redux";

import { withRouter } from "react-router";

class AboutPage extends Component {
  render() {
    console.log("About Page render");
    return (
      <div className="aboutpage-container">
        <h1>About Page</h1>
      </div>
    );
  }
}

export default withRouter(connect(state => ({}))(AboutPage));
