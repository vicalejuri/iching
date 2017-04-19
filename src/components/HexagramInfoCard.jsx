import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { Card, Paper, Divider, Popover, Avatar,
         Icons, FlatButton, IconButton, FontIcon, Styles } from 'material-ui';

import * as HexagramActions from '../actions/HexagramActions';
import { getTrigramByName } from '../constants/IchingLookup';

import { HexagramImage , TrigramImage } from './HexagramImage';

const styles = {
  popover: {
    padding: 10,
    font_size: '2.0em',
  }
}

const HexagramInfoCard = React.createClass({
  getInitialState() {
    return {
      popover_open: false,
      trigram: this.props.hexagram.trigrams.above
    }
  },

  render() {
    let {trigrams, name, number, description} = this.props.hexagram;
    let innerTrigrams = this.innerTrigrams( this.props.trigrams || false )

    return (
      <div className="hexagram-card">
        <HexagramImage below={trigrams.below} above={trigrams.above} />

        <div className="title">
        <h3>{number}: {name}</h3>
        <h2>{description}</h2>
        </div>

        {innerTrigrams}
      </div>
    );
  },

  innerTrigrams( enabled ) {
    let above = getTrigramByName( this.props.hexagram.trigrams.above.title );
    let below = getTrigramByName( this.props.hexagram.trigrams.below.title );

    if ( enabled ) {
      return (
        <div className="trigrams">

        <div className="above" onTouchTap={this.handleTouchTap} onClick={this.handleTouchTap}>
          <TrigramImage tri={above} />
          <div className="label">{above.image}</div>
        </div>
        <Divider />
        <div className="below" onTouchTap={this.handleTouchTap} onClick={this.handleTouchTap}>
          <TrigramImage tri={below} />
          <div className="label">{below.image}</div>
        </div>

        <Popover
          open={this.state.popover_open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleRequestClose} >
          <div style={styles.popover}>
            <div className="popover-trigram">
              <h4 className="title">{this.state.trigram.name} - {this.state.trigram.wilhelm}</h4>
              <Divider />
              <div className="image"><b>Image: </b>{this.state.trigram.image} , {this.state.trigram.image_name}</div>
              <div className="animal"><b>Animal: </b>{this.state.trigram.animal} , {this.state.trigram.animal_name}</div>
              <div className="body"><b>Body: </b>{this.state.trigram.body}</div>
            </div>
          </div>
        </Popover>

        </div>
      );
    } else {
      return <div />;
    }
  },

  handleTouchTap: (event) => {
    let trigram = getTrigramByName( this.props.hexagram.trigrams[event.currentTarget.className].title );
    this.setState({
      popover_open: true,
      anchorEl: event.currentTarget,
      trigram
    })
  },

  handleRequestClose: () => {
    this.setState({
      popover_open: false,
    });
  }

})

export default HexagramInfoCard
