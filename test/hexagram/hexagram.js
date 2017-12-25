import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import * as hexActions from "src/actions/HexagramActions";
import { generateKua } from "src/reducers/hexagram";

import reducers from "src/reducers";

describe("Hexagram reduxer", () => {
  let store;

  beforeAll(() => {
    store = createStore(reducers, applyMiddleware(thunk));
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

    let kuas = store.getState().kuas;
    expect(kuas.length).toBe(0);
  });
  it("actions/hexagram/generateHexagram() should dispatch 6 kuas", () => {
    expect(hexActions.generateHexagram).not.toBeUndefined();

    store.dispatch(hexActions.generateHexagram());

    let kuas = store.getState().kuas;
    expect(kuas.length).toBe(6);
  });
});
