const DEFAULT_PATH_STATE = {old: undefined, new: undefined};

export default function routes(state = DEFAULT_PATH_STATE, action ) {
  let route_state = window.store.getState().route;
  console.log('path', route_state);
  switch (action.type) {
    case 'PATH_CHANGED':
      let new_state = {old: 'shit', new: 'woahshit', title: 'fuck you'};
      return new_state;
    default:
      return state;
  }
}
