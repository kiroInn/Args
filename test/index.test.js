import { sum, ArgumentParser } from "../index.js";
import { BooleanSchema, StringSchema } from "../Schema";

describe('Args parser', function () {
    it("should deal with default boolean arg", () => {
        let schemas = [BooleanSchema('d')];
        let parser = new ArgumentParser(schemas);
        const commandLine = '';
        let result = parser.parse(commandLine);
        expect(result.get('d')).toEqual(false);
    })

    it("should deal with normal string arg", () => {
        let schemas = [StringSchema('l')];
        let parser = new ArgumentParser(schemas);
        const commandLine = '-l';
        let result = parser.parse(commandLine);
        expect(result.get('l')).toEqual("");
    })
});
