import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { Thunk as ThunkTest } from 'redux-testkit';

import * as actions from "src/actions/play";
import reducers from "src/reducers";

import { generateKua } from "src/reducers/play";
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
  it("generateKua() should return a valid Kua", () => {
    let kua = generateKua();

    expect(kua.value).toBeGreaterThan(5);
    expect(kua.value).toBeLessThan(10);
    expect(kua.name).not.toBeUndefined();
    expect(kua.yin).not.toBeUndefined();
  });
  it("actions/play/generateKua() should dispatch a single kua", () => {
    expect(actions.generateKua).not.toBeUndefined();

    store.dispatch(actions.generateKua());

    let {kuas} = store.getState();
    expect(kuas).not.toBeUndefined();
    expect(kuas.length).toBe(1);
    expect(kuas[0].name).not.toBeUndefined();
  });
  it("actions/play/clearKuas() should clear previous kuas", () => {
    expect(actions.clearKuas).not.toBeUndefined();
    store.dispatch(actions.clearKuas());

    let {kuas} = store.getState();
    expect(kuas).not.toBeUndefined();
    expect(kuas.length).toBe(0);
  });
  it("actions/hexagram/generateHexagram() should dispatch 6 GENERATE_KUA and SET_HEXAGRAM", async () => {
    expect(actions.generateHexagram).not.toBeUndefined();

    const dispatches = await ThunkTest(actions.generateHexagram)
                              .withState({kuas: [], play_hexagram: 0})
                              .execute();
    
    expect(dispatches.length).toBe(7);
    expect(dispatches[0].getAction()).toEqual({ type: 'PLAY_GENERATE_KUA' });
    
    let action = dispatches[6].getAction()  
    expect(action.type).toEqual('PLAY_SET_HEXAGRAM');
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
    expect(play_hexagram).toEqual({});
  });
});
