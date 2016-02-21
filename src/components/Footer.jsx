import React, { Component, PropTypes } from 'react';

import Router, {Link, History, State} from 'react-router';

let Footer = React.createClass({
  mixins: [State],
  render: () => {
    return (
      <div className="icon-bar">

       <Link to="hexagram-play" className="active">
         <div><i className="material-icons">brightness_high</i></div>
       </Link>
       <Link to="hexagram-list">
        <div><i className="material-icons">power_input</i></div>
       </Link>
       <Link to="settings-about">
        <div><i className="material-icons">menu</i></div>
       </Link>

     </div>
    );
  },
});
