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
        let [flag, value] = commandLine.substring(1).split(' ');
        if(flag === "d") args[0].value = true;
        if(flag === "l") args[0].value = value;
        if(flag === "p") args[0].value = parseInt(value, 10);
        return new Arguments(args);
    }
}