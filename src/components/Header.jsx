// DEPRECATED
import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div className="app-header">
        <a href="#" className="button">
          <i className="fa fa-arrow-left"></i>
          back
        </a>

        <h1>{this.props.title}</h1>

        <a href="#" className="button">
          <i className="fa fa-cog"></i>
        </a>
      </div>
    );
  }
}
