import toNumber from "lodash/toNumber";
import isEmpty from "lodash/isEmpty";

import { Component } from "preact";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import classNames from "classnames";

import { getHexagram } from "../../constants/IchingLookup";
import { getAsset, hyphenate, noWidows } from "../../constants/utils";

import { setDetailsHexagram } from "../../actions/details";
import HexagramInfoCard from "../../components/HexagramInfoCard";

class DetailPage extends Component {
  render() {
    let hex = this.props.hexagram;
    const emptyShell = hex.number === 0;

    /* Lines
    let lines = hex.interpretation.lines.map((line, i) => (
      <div className="line" key={this.lineId(line.poem)}>
        <q className="subQuote">{this.formatQuote(line.poem)}</q>
        {this.formatText(line.expl)}
      </div>
    ))
    */

    let tarot_image = getAsset(`img/tarot/Tao_${hex.number}.jpg`);
    return (
      <div
        className={classNames("detailspage-container", {
          "empty-shell": emptyShell
        })}
      >
        <HexagramInfoCard hexagram={hex} display_trigrams />

        <div className="interpretation">
          <div className="highlight">
            <div className="tarot">
              <img src={tarot_image} alt={hex.description} />
            </div>
            <div className="oracle">
              <q>{this.formatQuote(hex.interpretation.oracle)}</q>
            </div>
          </div>
          {this.formatText(hex.interpretation.resume)}

          <h3>The Image</h3>
          <hr />
          <q className="subQuote">
            {this.formatQuote(hex.interpretation.image.oracle)}
          </q>
          {this.formatText(hex.interpretation.image.image)}

          <h3>The Judgement</h3>
          <hr />
          <q className="subQuote">
            {this.formatQuote(hex.interpretation.oracle)}
          </q>
          {this.formatText(hex.interpretation.judgment)}
          <hr />
          {/**
          <h3>The Lines</h3>
          <hr />
          {lines}
          */}
        </div>
      </div>
    );
  }

  lineId(text) {
    return text.split("\n")[0].toLowerCase();
  }

  /* Format text paragraphs between <p> */
  formatText(text) {
    let paragraphs = text.split("\n\n");
    let txtHyphenated = paragraphs.map(hyphenate);
    let fmted = txtHyphenated.map(p => <p>{p}</p>);
    return fmted;
  }

  /* Format quote */
  formatQuote(text) {
    let quote = text.replace(/\t/g, "");
    return hyphenate(quote)
      .split("\n")
      .map(noWidows)
      .join("\n");
  }
}

DetailPage.defaultProps = {
  hexagram: {
    number: 0,
    name: "",
    description: "",
    trigrams: {
      above: {
        title: "",
        description: ""
      },
      below: {
        title: "",
        description: ""
      }
    },
    interpretation: {
      oracle: "",
      resume: "",
      judgment: "",
      image: {
        oracle: "",
        image: ""
      },
      lines: [
        {
          poem: "",
          expl: ""
        }
      ]
    }
  }
};

export default withRouter(props => {
  // select appropriate hexagram
  let { match } = props;
  let hexNumber = toNumber(match.params.number);

  // Render early, if data is not loaded

  // But when data arrives late, rerender
  let store = window.store;
  const unsubscribe = store.subscribe(() => {
    let { book_loaded } = store.getState();
    if (book_loaded) {
      // order is important, to avoid infinite loop
      unsubscribe();
      store.dispatch(setDetailsHexagram(hexNumber));
    }
  });

  // Connect to redux, now its a fulfiled with data (integrated)
  let DetailContainer = connect(state => ({
    hexagram: getHexagram(hexNumber) || DetailPage.defaultProps.hexagram
  }))(DetailPage);

  return <DetailContainer {...props} />;
});
