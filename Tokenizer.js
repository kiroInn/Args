import { throwUnexpectedTokenError, throwSpecifiedFlagError } from "./error";

export class Tokenizer {
    constructor(commandLine) {
        this.tokens = commandLine.split(' ').filter(t => t.length);
    }

    hasMore() {
        return this.tokens.length > 0;
    }

    nextFlag() {
        const token = this.tokens.shift();
        if (!token.startsWith('-')) throwUnexpectedTokenError(token)
        return token.substring(1);
    }

    nextValue(flag) {
        if (!this.tokens.length) throwSpecifiedFlagError(flag)
        return this.tokens.shift();
    }
}