import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "src/reducers";

import * as actions from "../../src/actions/details";
import "src/assets/json/book";

describe("Details reduxer", () => {
    let store 

    beforeAll( () => {
        store = createStore(reducers, applyMiddleware(thunk));
    })
    it("details/setDetailsHexagram() should work with Number", () => {
        store.dispatch(actions.setDetailsHexagram(1));

        let {details_hexagram} = store.getState()
        expect(details_hexagram).toBe(1);
    })
    it("details/setDetailsHexagram() should work with String", () => {
        store.dispatch(actions.setDetailsHexagram('Chien'));

        let {details_hexagram} = store.getState()
        expect(details_hexagram).toBe(1);
    })
    it("details/setDetailsHexagram() should be resilient to bad name", () => {
        store.dispatch(actions.setDetailsHexagram('XXX'));

        let {details_hexagram} = store.getState()
        expect(details_hexagram).toBe(-1);
    })
    it("details/setDetailsHexagram() should be resilient to bad number(negative)", () => {
        store.dispatch(actions.setDetailsHexagram(-1));

        let {details_hexagram} = store.getState()
        expect(details_hexagram).toBe(-1);
    })
    it("details/setDetailsHexagram() should be resilient to float numbers", () => {
        store.dispatch(actions.setDetailsHexagram(1.25));

        let {details_hexagram} = store.getState()
        expect(details_hexagram).toBe(1);
    })
})