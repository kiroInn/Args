import { Arguments } from "./Arguments";
import { Schema } from "./Schema";
import { Argument } from "./Argument";
import { BooleanArgumentType, StringArgumentType, IntegerArgumentType } from "./ArgumentType";
import { Tokenizer } from "./Tokenizer";
import { Schemas } from "./Schemas";

export class ArgumentParser {
    constructor(schemas) {
        this.schemas = new Schemas(schemas);
    }

    createArgument(schema) {
        return new Argument(schema.flag, schema.type.default());
    }

    createDefaultArgs() {
        this.args = new Arguments(this.schemas.map(this.createArgument));
    }

    nextValue(schema) {
        let value = schema.type.needValue() ? this.tokens.nextValue() : undefined;
        return schema.type.convert(value);
    }

    parseToken() {
        const flag = this.tokens.nextFlag();
        const schema = this.schemas.find(flag);
        const value = this.nextValue(schema);
        this.args.set(flag, value);
    }

    parseTokens() {
        while (this.tokens.hasMore()) { this.parseToken() }

    }

    parse(commandLine) {
        this.createDefaultArgs();
        this.tokenizeCommandLine(commandLine);
        this.parseTokens();
        return this.args;
    }

    tokenizeCommandLine(commandLine) {
        this.tokens = new Tokenizer(commandLine);
    }
}


