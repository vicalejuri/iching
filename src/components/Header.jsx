import React, { Component, PropTypes } from 'react';
import Router, {History, State} from 'react-router-dom';
import { connect } from 'react-redux'

import * as HexagramActions from '../actions/HexagramActions';

let Header = React.createClass({
    mixins: [History],

    render() {
        let info = [this.props.location, this.props.params]

        return (
            <pre>{info}</pre>
        );
    },

})

export default connect( state => ({}))(Header);