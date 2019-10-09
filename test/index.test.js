import { sum, ArgumentParser } from "../index.js";
import { BooleanSchema, StringSchema, IntegerSchema } from "../Schema";
import { BooleanArgumentType } from "../ArgumentType.js";


describe('Args parser', function () {
    describe('deal default value', () => {
        it("should deal with default boolean arg", () => {
            testParse('', [{
                type: BooleanSchema, flag: 'd', value: false
            }]);
        })

        it("should deal with normal string arg", () => {
            testParse('', [{
                type: StringSchema, flag: 'l', value: ""
            }]);
        })

        it("should deal with normal integer arg", () => {
            testParse('', [{
                type: IntegerSchema, flag: 'p', value: 0
            }]);
        })
    })

    describe('deal single param', () => {
        it("should deal with boolean param", () => {
            testParse('-d', [{
                type: BooleanSchema, flag: 'd', value: true
            }]);
        })
        it("should deal with string param", () => {
            testParse('-l /usr/logs', [{
                type: StringSchema, flag: 'l', value: '/usr/logs'
            }]);
        })
        it("should deal with integer param", () => {
            testParse('-p 8080', [{
                type: IntegerSchema, flag: 'p', value: 8080
            }]);
        })
    })



    describe('deal double param', () => {
        it("should deal with integer param", () => {
            testParse('-q 8000 -p 8888', [{
                type: IntegerSchema, flag: 'q', value: 8000
            }, {
                type: IntegerSchema, flag: 'p', value: 8888
            }]);
        })
        it("should deal with boolean param", () => {
            testParse('-d -e', [{
                type: BooleanSchema, flag: 'd', value: true
            }, {
                type: BooleanSchema, flag: 'e', value: true
            }]);
        })
        it("should deal with integer and boolean param", () => {
            testParse('-p 8000 -e', [{
                type: IntegerSchema, flag: 'p', value: 8000
            }, {
                type: BooleanSchema, flag: 'e', value: true
            }]);
        })
    })

});

function testParse(commandLine, params) {
    let schemas = params.map((param, i) => param.type(param.flag));
    let parser = new ArgumentParser(schemas);
    let result = parser.parse(commandLine);
    params.forEach((param, i) => {
        const { flag, value } = param;
        expect(result.get(flag)).toEqual(value);
    });
}