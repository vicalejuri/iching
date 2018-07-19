import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { Thunk as ThunkTest } from 'redux-testkit';

import * as hexActions from "src/actions/HexagramActions";
import { generateKua } from "src/reducers/hexagram";
import "src/assets/json/book";

import reducers from "src/reducers";

describe("Hexagram reduxer", () => {
  let store;

  beforeAll(() => {
    store = createStore(reducers, applyMiddleware(thunk));
  });

  it("should have window.Book loaded", () => {
    expect(window.Book).toBeDefined();
    expect(window.Book.length).toBe(64);
  });
  it("reducers/hexagram/generateKua() should return a valid Kua", () => {
    let kua = generateKua();

    expect(kua.value).toBeGreaterThan(5);
    expect(kua.value).toBeLessThan(10);
    expect(kua.name).not.toBeUndefined();
    expect(kua.yin).not.toBeUndefined();
  });
  it("actions/hexagram/generateKua() should dispatch a single kua", () => {
    expect(hexActions.generateHexagram).not.toBeUndefined();

    store.dispatch(hexActions.generateKua());

    let kuas = store.getState().kuas;
    expect(kuas).not.toBeUndefined();
    expect(kuas.length).toBe(1);

    let kua = kuas[0];
    expect(kua.name).not.toBeUndefined();
  });
  it("actions/hexagram/clearHexagram() should clear all previous kuas", () => {
    expect(hexActions.clearHexagram).not.toBeUndefined();

    store.dispatch(hexActions.clearHexagram());

    let kuas = store.getState().kuas;
    expect(kuas.length).toBe(0);
  });
  it("actions/hexagram/generateTrigram() should dispatch 3 kuas", () => {
    expect(hexActions.generateTrigram).not.toBeUndefined();

    store.dispatch(hexActions.generateTrigram());

    let kuas = store.getState().kuas;
    expect(kuas.length).toBe(3);
  });
  it("actions/hexagram/clearHexagram() should clear all previous kuas", () => {
    expect(hexActions.clearHexagram).not.toBeUndefined();

    store.dispatch(hexActions.clearHexagram());

    let hexagram = store.getState().hexagram;
    expect(hexagram).toEqual({});
  });
  it("actions/hexagram/generateHexagram() should dispatch 6 kuas", async () => {
    expect(hexActions.generateHexagram).not.toBeUndefined();

    const dispatches = await ThunkTest(hexActions.generateHexagram)
                              .withState({kuas: [], hexagram: {}})
                              .execute();
    
    expect(dispatches.length).toBe(7);
    expect(dispatches[0].getAction()).toEqual({ type: 'HEXAGRAM_GENERATE_KUA' });
    expect(dispatches[6].getAction()).toEqual({ type: 'HEXAGRAM_GENERATED', payload: []});   
  });
  it("actions/hexagram/generateHexagram() should return a valid hexagram from the book", async () => {

    await store.dispatch( hexActions.generateHexagram() )

    const { hexagram } = store.getState();
    expect(hexagram).toBeDefined();
    expect(hexagram.number).toBeGreaterThan(0);
  });
});
