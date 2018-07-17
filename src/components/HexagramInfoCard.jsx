import { Component } from 'react';

import * as HexagramActions from '../actions/HexagramActions';
import { getTrigramByName } from '../constants/IchingLookup';

import { HexagramImage , TrigramImage } from './HexagramImage';

const styles = {
  popover: {
    padding: 10,
    font_size: '2.0em',
  }
}


export default class HexagramInfoCard extends Component {
  state = {
    popover_open: false,
    trigram: {name: "", wilhelm: "", body: "",
              animal: "", animal_name: "",
              image: "", image_name: ""}
  }

  render() {
    let {name, number, description, trigrams} = this.props.hexagram;
    let innerTrigrams = this.innerTrigrams( this.props.display_trigrams || false )

    let detail_url = `/details/${number}/`
    return (
      <div className="hexagram-card" onClick={this.props.onClick}>
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

        <div className="above" >
          <TrigramImage tri={above} />
          <div className="label">{above.image}</div>
        </div>
        <hr />
        <div className="below" >
          <TrigramImage tri={below} />
          <div className="label">{below.image}</div>
        </div>

        {/*
          <div style={styles.popover}>
            <div className="popover-trigram">
              <h4 className="title">{this.state.trigram.name} - {this.state.trigram.wilhelm}</h4>
              <hr />
              <div className="image"><b>Image: </b>{this.state.trigram.image} , {this.state.trigram.image_name}</div>
              <div className="animal"><b>Animal: </b>{this.state.trigram.animal} , {this.state.trigram.animal_name}</div>
              <div className="body"><b>Body: </b>{this.state.trigram.body}</div>
            </div>
          </div>
        */ }

        </div>
      );
    } else {
      return <div />;
    }
  }

  handleTouchTap(event) {
    let trigram = getTrigramByName( this.props.hexagram.trigrams[event.currentTarget.className].title );
    this.setState({
      popover_open: true,
      anchorEl: event.currentTarget,
      trigram
    })
  }

  handleRequestClose() {
    this.setState({
      popover_open: false,
    });
  }
}
HexagramInfoCard.defaultProps = {
  onClick: () => {},
  hexagram: {
    name: 'None',
    number: 0,
    description: 'Empty',
    trigrams: {above: {title: ''}, below: {title: ''}}
  }
}