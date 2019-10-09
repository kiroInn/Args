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
});

function testDefaultValue(schemaType, type, defaultValue) {
    let schemas = [schemaType(type)];
    let parser = new ArgumentParser(schemas);
    const commandLine = '';
    let result = parser.parse(commandLine);
    expect(result.get(type)).toEqual(defaultValue);
}

