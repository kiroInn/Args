export class Arguments {
    constructor(items) {
        this.items = items;
    }
    get(flag) {
        return this.items.find(item => item.flag === flag).value;
    }
}