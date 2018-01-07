import { BaseModel } from 'src/models/base';

import Models from "src/models/index";

describe("Models", () => {
    describe('models/Base', () => {
        it("should be a abstract Class", () => {
            expect(BaseModel).toBeDefined()
            expect(BaseModel.kind()).toBe('models/Base')
            expect(BaseModel.value).toBe(undefined)
        })
        it("can be instanciated", () => {
            let emptyModel = new BaseModel()
            expect(emptyModel.kind()).toBe('models/Base')
            expect(emptyModel.value).toEqual({})
        })
        it("can be Inherited", () => {
            const modelKind = 'model/Animal'
            const modelSample = { specime: 'eagle' }

            class AnimalModel extends BaseModel {
                static kind() { return modelKind }
                default() { return modelSample }
            }

            let myModel = new AnimalModel()
            expect(myModel.kind()).toBe( modelKind )
            expect(myModel.value).toEqual( modelSample )
        })
    })
});