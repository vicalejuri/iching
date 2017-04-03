/* Utils functions */
export function getAsset( resource_path ) {
  return (__DEVELOPMENT__ ? `/public/${resource_path}` : `assets/${resource_path}`);
}
