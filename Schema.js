export class Schema {
    constructor(flag, type) {
        this.flag = flag;
        this.type = type;
    }
}

export const BooleanSchema = (flag) => {
    return new Schema(flag, 'boolean');
}

export const StringSchema = (flag) => {
    return new Schema(flag, 'string');
}