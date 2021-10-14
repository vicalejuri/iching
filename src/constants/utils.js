import Hypher from "hypher";

/* Utils functions */
export function getAsset(resource_path) {
  return `${resource_path}`;
}

export function CSSVar(varName, rootCtx = document.body) {
  return rootCtx.style.getProperty(varName);
}

/**
 * Parse querystring as object k=v
 * @param {String} querystring
 * @returns Object
 */
export function parseQS(querystring) {
  // Has parameters? if none, return early
  let paramsIdx = querystring.indexOf("?");
  if (paramsIdx === -1) return [];

  // remove any preceding url and split
  let splittedQuerystring = querystring.substring(paramsIdx + 1).split("&");

  const d = decodeURIComponent;
  let params = {};

  // march and parse
  for (let i = splittedQuerystring.length - 1; i >= 0; i--) {
    let pair = splittedQuerystring[i].split("=");
    params[d(pair[0])] = d(pair[1] || "");
  }

  return params;
}

/**
 * Generate a crypto UUID RFC4122 compliant
 * https://30secondsofcode.org/#uuidgeneratorbrowser
 */
export const UUIDGenerator = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

/**
 * Typography and Hyphenation
 */
const english = import("hyphenation.en-us");
// const Hypher = require("hypher");

let BeautifulText = new Hypher(english);
export function hyphenate(text) {
  return BeautifulText.hyphenateText(text);
}

/* Clean phrase of widowed words.
 * (avoid single word at last line.)
 */
export function noWidows(phrase) {
  let words = phrase.trim().split(" ");
  if (words.length > 1) {
    // Join the last two words with &nbsp;
    const [last, penult] = words.slice(words.length - 2, words.length);
    words[words.length - 2] = `${penult}\u00a0${last}`;

    // remove soft-hyphen , if any
    words[words.length - 2] = words[words.length - 2].replace(/\u00ad/g, "");

    // remove last word, since it was joined with a transparent space with the previous one.
    words.pop();
  }

  return words.join(" ");
}
