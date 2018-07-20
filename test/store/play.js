import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { Thunk as ThunkTest } from 'redux-testkit';

import * as actions from "src/actions/play";
import reducers from "src/reducers";

import "src/assets/json/book";

describe("Play reduxer", () => {
  let store;

  beforeAll(() => {
    store = createStore(reducers, applyMiddleware(thunk));
  });

  it("should have window.Book loaded", () => {
    expect(window.Book).toBeDefined();
    expect(window.Book.length).toBe(64);
  });
  it("actions/hexagram/generateHexagram() should return a number", async () => {
    expect(actions.generateHexagram).not.toBeUndefined();

    const dispatches = await ThunkTest(actions.generateHexagram)
                              .withState({play_hexagram: -1})
                              .execute();
    
    expect(dispatches.length).toBe(1);

    let action = dispatches[0].getAction()  
    expect(action.type).toEqual('PLAY_SET_HEXAGRAM');
    expect(action.payload.length).toBe(6);
  });
  it("actions/hexagram/generateHexagram() should return a valid hexagram number from the book", async () => {
    await store.dispatch( actions.generateHexagram() )

    const { play_hexagram } = store.getState();
    expect(play_hexagram).toBeDefined();
    expect(play_hexagram).toBeGreaterThan(0);
  });
  it("actions/play/clearHexagram() should clear all previous hexagram", () => {
    expect(actions.clearHexagram).not.toBeUndefined();

    store.dispatch(actions.clearHexagram());

    let {play_hexagram} = store.getState();
    expect(play_hexagram).toEqual(-1);
  });
});
