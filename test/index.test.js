import { sum, ArgumentParser } from "../index.js";
import { BooleanSchema, StringSchema, IntegerSchema } from "../Schema";
import { BooleanArgumentType } from "../ArgumentType.js";

describe('Args parser', function () {
    describe('dealing default value', () => {
        it("should dealing with default boolean arg", () => {
            testParse('', [{
                type: BooleanSchema, flag: 'd', value: false
            }]);
        })

        it("should dealing with normal string arg", () => {
            testParse('', [{
                type: StringSchema, flag: 'l', value: ""
            }]);
        })

        it("should dealing with normal integer arg", () => {
            testParse('', [{
                type: IntegerSchema, flag: 'p', value: 0
            }]);
        })
    })

    describe('dealing single param', () => {
        it("should dealing with boolean param", () => {
            testParse('-d', [{
                type: BooleanSchema, flag: 'd', value: true
            }]);
        })
        it("should dealing with string param", () => {
            testParse('-l /usr/logs', [{
                type: StringSchema, flag: 'l', value: '/usr/logs'
            }]);
        })
        it("should dealing with integer param", () => {
            testParse('-p 8080', [{
                type: IntegerSchema, flag: 'p', value: 8080
            }]);
        })
    })

    describe('dealing double param', () => {
        it("should dealing with integer param", () => {
            testParse('-q 8000 -p 8888', [{
                type: IntegerSchema, flag: 'q', value: 8000
            }, {
                type: IntegerSchema, flag: 'p', value: 8888
            }]);
        })
        it("should dealing with boolean param", () => {
            testParse('-d -e', [{
                type: BooleanSchema, flag: 'd', value: true
            }, {
                type: BooleanSchema, flag: 'e', value: true
            }]);
        })
        it("should dealing with integer and boolean param", () => {
            testParse('-p 8000 -e', [{
                type: IntegerSchema, flag: 'p', value: 8000
            }, {
                type: BooleanSchema, flag: 'e', value: true
            }]);
        })
    })

    describe('dealing three param', () => {
        it("should dealing with integer, boolean, string param", () => {
            testParse('-p 8000 -e -l /usr/logs', [{
                type: IntegerSchema, flag: 'p', value: 8000
            }, {
                type: BooleanSchema, flag: 'e', value: true
            }, {
                type: StringSchema, flag: 'l', value: '/usr/logs'
            }]);
        })
        it("should dealing with -integer, boolean, string param", () => {
            testParse('-p -8000 -e -l /usr/logs', [{
                type: IntegerSchema, flag: 'p', value: -8000
            }, {
                type: BooleanSchema, flag: 'e', value: true
            }, {
                type: StringSchema, flag: 'l', value: '/usr/logs'
            }]);
        })
        it("should dealing with integer, boolean, unset flag param", () => {
            testParse('-p 8000 -e', [{
                type: IntegerSchema, flag: 'p', value: 8000
            }, {
                type: BooleanSchema, flag: 'e', value: true
            }, {
                type: StringSchema, flag: 'm', value: ''
            }]);
        })
    })

    describe('dealing exceptions', () => {
        it("should dealing undefined case", () => {
            testExcepiton('-b', [], 'Unknown flag: -b');
        })
        it("should dealing not integer case", () => {
            testExcepiton('-b 998a', [IntegerSchema('b')],'Invalid integer of flag: -b 998a')
        })
        it("should dealing pass surplus arg case", () => {
            testExcepiton('-b hello',[BooleanSchema('b')], 'Unexcepeted value: hello')
        })
    })
});

function testExcepiton(commandLine, schemas, error) {
    let parser = new ArgumentParser(schemas);
    expect(() => parser.parse(commandLine)).toThrow(error);
}

function testParse(commandLine, params) {
    let schemas = params.map((param, i) => param.type(param.flag));
    let parser = new ArgumentParser(schemas);
    let result = parser.parse(commandLine);
    params.forEach((param, i) => {
        const { flag, value } = param;
        expect(result.get(flag)).toEqual(value);
    });
}