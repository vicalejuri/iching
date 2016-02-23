import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import * as HexagramActions from 'actions/HexagramActions.js';
import ICHING from '!json!constants/iching.json';
import { getTrigramByName } from 'constants/lookup.js';

import { HexagramImage , TrigramImage } from './HexagramImage.jsx';

import { Card, Paper, Divider, Popover, Avatar, Icons, FlatButton, IconButton, FontIcon, Styles } from 'material-ui';

const styles = {
  popover: {
    padding: 20,
  }
}

export default class HexagramInfoCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popover_open: false,
      trigram: this.props.hexagram.trigrams.above
    };
  }

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
  }

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
          <Divider/>
          <div className="below" onTouchTap={this.handleTouchTap} onClick={this.handleTouchTap}>
            <TrigramImage tri={below} />
            <div className="label">{below.image}</div>
          </div>


          <Popover
            open={this.state.popover_open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <div style={styles.popover}>
              <div>
                <h3>{this.state.trigram.name} - {this.state.trigram.wilhelm}</h3>
                <div><b>Image: </b>{this.state.trigram.image}</div>
                <div><b>Body: </b>{this.state.trigram.body}</div>
              </div>
            </div>
          </Popover>

        </div>
      );
    } else {
      return (<div></div>);
    }
  }


  handleTouchTap = (event) => {
    console.log( event.currentTarget )
    this.setState({
      popover_open: true,
      anchorEl: event.currentTarget,
      trigram: this.props.trigrams[event.currentTarget.attr('class')]
    })
  }

  handleRequestClose = () => {
    this.setState({
      popover_open: false,
    });
  }


}
