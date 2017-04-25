import classNames from 'classnames';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

class AboutPage extends React.Component {
  render() {
    return (<div className="aboutpage-container">
              <h1>About Page</h1>
            </div>)
  }
}

export default connect( false )(AboutPage)
