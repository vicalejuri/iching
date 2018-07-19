/* Utils functions */
export function getAsset(resource_path) {
  return (__DEVELOPMENT__ ? `/assets/${resource_path}` : `assets/${resource_path}`)
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
  let paramsIdx = querystring.indexOf('?');
  if(paramsIdx === -1) return []

  // remove any preceding url and split
  querystring = querystring.substring(paramsIdx + 1).split('&');

  const d = decodeURIComponent;
  let params = {};

  // march and parse
  for (var i = querystring.length - 1; i >= 0; i--) {
    let pair = querystring[i].split('=');
    params[ d(pair[0]) ] = d(pair[1] || '');
  }

  return params
}

/**
 * Generate a crypto UUID RFC4122 compliant
 * https://30secondsofcode.org/#uuidgeneratorbrowser
 */
const UUIDGenerator = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );