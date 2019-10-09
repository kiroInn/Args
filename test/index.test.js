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

    describe('deal boolean param', () => {
        it("should deal with boolean param", () => {
            let schemas = [BooleanSchema('d')];
            let parser = new ArgumentParser(schemas);
            let commandLine = '-d';
            let result = parser.parse(commandLine);
            expect(result.get('d')).toEqual(true);
        })

        it("should deal with string param", () => {
            let schemas = [StringSchema('l')];
            let parser = new ArgumentParser(schemas);
            let commandLine = '-l /usr/logs';
            let result = parser.parse(commandLine);
            expect(result.get('l')).toEqual('/usr/logs');
        })
        it("should deal with integer param", () => {
            let schemas = [StringSchema('p')];
            let parser = new ArgumentParser(schemas);
            let commandLine = '-p 8080';
            let result = parser.parse(commandLine);
            expect(result.get('p')).toEqual(8080);
        })
    })
});

function testDefaultValue(schemaType, type, defaultValue) {
    let schemas = [schemaType(type)];
    let parser = new ArgumentParser(schemas);
    const commandLine = '';
    let result = parser.parse(commandLine);
    expect(result.get(type)).toEqual(defaultValue);
}

