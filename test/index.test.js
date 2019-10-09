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
            let schemas = [IntegerSchema('p'), IntegerSchema('q')];
            let parser = new ArgumentParser(schemas);
            let result = parser.parse('-p 8080 -q 8888');
            expect(result.get('p')).toEqual(8080);
            expect(result.get('q')).toEqual(8888);
        })
        it("should deal with boolean param", () => {
            let schemas = [BooleanSchema('d'), BooleanSchema('e')];
            let parser = new ArgumentParser(schemas);
            let result = parser.parse('-d -e');
            expect(result.get('d')).toEqual(true);
            expect(result.get('e')).toEqual(true);
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