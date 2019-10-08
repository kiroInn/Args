import { sum, ArgumentParser } from "../index.js";
import {BooleanSchema} from "../Schema";

describe('Args parser', function () {
    it("should deal with default boolean arg", () => {
        let schemas = [ BooleanSchema('d') ];
        let parser = new ArgumentParser(schemas);
        const commandLine = '';
        let result = parser.parse(commandLine);
        expect(result.get('d')).toEqual(false);
    })
});
