import { Arguments } from "./Arguments";
import { Schema } from "./Schema";
import { Argument } from "./Argument";

export class ArgumentParser {
    constructor(schemas) {
        this.schemas = schemas;
    }

    getDefaultValue(schema) {
        return new Argument(schema.flag, schema.type.default());
    }

    parse(commandLine) {
        let args = this.schemas.map(schema => this.getDefaultValue(schema));
        return new Arguments(args);
    }
}