import {throwIntegerFlagError} from "./error";

export class ArgumentType {
    static default() {
        return undefined;
    }
    static needValue() {
        return true;
    }
}

export class BooleanArgumentType extends ArgumentType {
    static default() {
        return false;
    }
    static convert() {
        return true;
    }
    static needValue() {
        return false;
    }
}

export class StringArgumentType extends ArgumentType {
    static default() {
        return "";
    }
    static convert(value) {
        return value;
    }
}

export class IntegerArgumentType extends ArgumentType {
    static default() {
        return 0;
    }

    static convert(value, flag) {
        if (isNaN(value)) throwIntegerFlagError(value, flag);
        return parseInt(value, 10);
    }
}

