/* Utils functions */
export function getAsset( resource_path ) {
  return (__DEVELOPMENT__ ? `/public/${resource_path}` : `assets/${resource_path}`)
}

export function CSSVar( varName , rootCtx = document.body) {
  return rootCtx.style.getProperty(varName);
}

/**
 * Generate a crypto UUID RFC4122 compliant
 * https://30secondsofcode.org/#uuidgeneratorbrowser
 */
const UUIDGenerator = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );