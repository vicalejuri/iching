import React, { Component, PropTypes } from 'react';
import Router, {Link, History, State} from 'react-router';

import { connect } from 'react-redux'
import { pushState } from 'redux-router'

let Footer = React.createClass({
  render() {
    return (
      <div className="icon-bar">

       <Link to="/play" className={ (this.props.path === `/play` || this.props.path === '/') ? 'active' : 'normal' } ref="play">
         <div><i className="material-icons">brightness_high</i></div>
       </Link>
       <Link to="/list" className={ (this.props.path === `/list` || this.props.path.startsWith(`/details`)) ? 'active' : 'normal' } ref="list">
        <div><i className="material-icons">menu</i></div>
       </Link>

     </div>
    );
  },
});

/*
<Link to="/day">
 <div><i className="material-icons">explore</i></div>
</Link>
*/

export default connect(
  state => {
    return {
      path: state.router.location.pathname,
      params: state.router.params
    }
  },
  { pushState }
)(Footer);
