export function pathChanged( old_path, new_path ) {
  return {
    type: 'PATH_CHANGED',
    payload: {old: old_path, current: new_path }
  };
}
