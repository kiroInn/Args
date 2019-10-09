import { BooleanArgumentType, StringArgumentType, IntegerArgumentType } from "./ArgumentType";

export class Schema {
    constructor(flag, type) {
        this.flag = flag;
        this.type = type;
    }
}

export const BooleanSchema = (flag) => {
    return new Schema(flag, BooleanArgumentType);
}

export const StringSchema = (flag) => {
    return new Schema(flag, StringArgumentType);
}

export const IntegerSchema = (flag) => {
    return new Schema(flag, IntegerArgumentType);
}