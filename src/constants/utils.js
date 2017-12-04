/* Utils functions */
export function getAsset( resource_path ) {
  return (__DEVELOPMENT__ ? `/public/${resource_path}` : `assets/${resource_path}`)
}

export function CSSVar( varName , rootCtx = document.body) {
  return rootCtx.style.getProperty(varName);
}
