import { throwUnknownFlagError } from "./error";

export class Schemas {
    constructor(items) {
        this.items = items;
    }

    find(flag) {
        let found = this.items.find(item => item.flag === flag);
        if (!found) throwUnknownFlagError(flag)
        return found;
    }

    map(cb) {
        return this.items.map(item => cb(item));
    }
}