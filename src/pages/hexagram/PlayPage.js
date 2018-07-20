import isEmpty from 'lodash/isEmpty';

import { Component } from 'preact';
import { connect } from 'preact-redux';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import { withRouter } from 'react-router'

import { getHexagram } from '../../constants/IchingLookup';
import { getAsset } from '../../constants/utils';

import * as actions from '../../actions/play';

import HexagramInfoCard from '../../components/HexagramInfoCard';

class PlayPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      already_played: false
    }
  }

  render() {
    return (
      <div className="playpage-container">

        <CSSTransitionGroup className="iching-card" transitionName="hexagram-preview"
          transitionEnterTimeout={0} transitionLeaveTimeout={0} >
          {this.renderPreviewCard({onClick: this.goToHexagram.bind(this)})}
        </CSSTransitionGroup>

        <div className="canvas">
          <div className="infoArea">
            <CSSTransitionGroup transitionName="question" 
              transitionEnterTimeout={400} transitionLeaveTimeout={0} >
              {this.isFirstPlay() ? (
                <div className="question" ref={el => this.question = el}>
                  {this.renderQuestion()}
                </div>
              ) : (false)}
            </CSSTransitionGroup>
          </div>

          <div className="ichingDragArea">
            <button className="gongo" ref={el => this.gongo = el}
              onPointerDown={this.onGongoHold} />
            <audio ref={el => this.gongosound = el} src={getAsset('audio/bell-square.mp3')} preload="auto" />
          </div>
        </div>

      </div>
    );
  }

  isFirstPlay() {
    return (!this.state.already_played)
  }


  renderPreviewCard( opts={} ) {
    let { hexagram } = this.props;
    
    if (!isEmpty(hexagram)) {
      return (<HexagramInfoCard key={hexagram.number} 
                                hexagram={hexagram} 
                                display_trigrams 
                                {...opts} />);
    } else {
      return (false);
    }
  }

  renderQuestion() {
    if (!this.state.already_played) {
      return (
        <h2 className="title" key="question">Concentrate and ask a question</h2>
      )
    }
  }

  onGongoHold = (ev) => {
    this.gongo.className = 'gongo down';
    window.addEventListener('pointerup', this.onGongoRelease);
  }

  onGongoRelease = (ev) => {
    window.removeEventListener('pointerup', this.onGongoRelease);

    // add animation
    this.gongo.className = 'gongo hit';

    // play sound
    let au = this.gongosound;
    if (au.play) {
      au.currentTime = 0.0;
      au.play();
    }

    this.props.clearHexagram();

    setTimeout( () => {
      this.setState({ already_played: true })
       //window.store.dispatch(HexagramActions.clearHexagram());
      this.props.generateHexagram()
    }, this.props.animation_timeout);
  }

  goToHexagram = () => {
    this.props.history.push(`/details/${this.props.hexagram.number}`);
  }

}

PlayPage.defaultProps = {
  hexagram: {},
  animation_timeout: 300
};


export default withRouter(
  connect(
    state => ({ hexagram: getHexagram( state.play_hexagram ) }),
    dispatch => ({
        generateHexagram: () => {dispatch(actions.generateHexagram())},
        clearHexagram: () => {
          dispatch(actions.clearHexagram()); 
        }
    })
  )(PlayPage)
);