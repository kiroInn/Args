import { Arguments } from "./Arguments";
import { Schema } from "./Schema";
import { Argument } from "./Argument";
import { BooleanArgumentType, StringArgumentType, IntegerArgumentType } from "./ArgumentType";

export class ArgumentParser {
    constructor(schemas) {
        this.schemas = schemas;
    }

    getDefaultValue(schema) {
        return new Argument(schema.flag, schema.type.default());
    }

    parse(commandLine) {
        let args = this.schemas.map(schema => this.getDefaultValue(schema));
        let tokens = commandLine.split(' ').filter(t => t.length);
        if (tokens.length) {
            let flag = tokens.shift().substring(1);
            let value = tokens.shift();
            let schema = this.schemas.find(s => s.flag === flag);
            let arg = args.find(a => a.flag === flag);
            arg.value = schema.type.convert(value);
        }
        return new Arguments(args);
    }
}


