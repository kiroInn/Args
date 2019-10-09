export class Tokenizer {
    constructor(commandLine) {
        this.tokens = commandLine.split(' ').filter(t => t.length);
    }
 
    hasMore() {
        return this.tokens.length > 0;
    }

    nextFlag() {
        return this.tokens.shift().substring(1);
    }

    nextValue() {
        return this.tokens.shift();
    }
}
