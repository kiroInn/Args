import { sum, ArgumentParser } from "../index.js";
import { BooleanSchema, StringSchema, IntegerSchema } from "../Schema";
import { BooleanArgumentType } from "../ArgumentType.js";


describe('Args parser', function () {
    describe('deal default value', () => {
        it("should deal with default boolean arg", () => {
            testDefaultValue(BooleanSchema, 'd', false)
        })

        it("should deal with normal string arg", () => {
            testDefaultValue(StringSchema, 'l', "")
        })

        it("should deal with normal integer arg", () => {
            testDefaultValue(IntegerSchema, 'p', 0)
        })
    })

    describe('deal single param', () => {
        it("should deal with boolean param", () => {
            testSingleValue(BooleanSchema, 'd', '-d', true);
        })
        it("should deal with string param", () => {
            testSingleValue(StringSchema, 'l', '-l /usr/logs', '/usr/logs');
        })
        it("should deal with integer param", () => {
            testSingleValue(IntegerSchema, 'p', '-p 8080', 8080);
        })
    })



    describe('deal double param', () => {
        it("should deal with integer param", () => {
            testMultipleArgument([IntegerSchema, IntegerSchema], ['q', 'p'], '-q 8000 -p 8888', [8000, 8888]);
        })
        it("should deal with boolean param", () => {
            testMultipleArgument([BooleanSchema, BooleanSchema], ['d', 'e'], '-d -e', [true, true]);
        })
        it("should deal with integer and boolean param", () => {
            testMultipleArgument([IntegerSchema, BooleanSchema], ['p', 'e'], '-p 8000 -e', [8000, true]);
        })
    })

});

function testDefaultValue(schemaType, type, defaultValue) {
    testSingleValue(schemaType, type, '', defaultValue);
}

function testSingleValue(schemaType, type, commandLine, expectedValue) {
    let schemas = [schemaType(type)];
    let parser = new ArgumentParser(schemas);
    let result = parser.parse(commandLine);
    expect(result.get(type)).toEqual(expectedValue);
}

function testMultipleArgument(schemaTypes, flags, commandLine, expectedValues) {
    let schemas = schemaTypes.map((st, i) => st(flags[i]));
    let parser = new ArgumentParser(schemas);
    let result = parser.parse(commandLine);
    expectedValues.forEach((ev, i) => {
        expect(result.get(flags[i])).toEqual(ev);
    });
}