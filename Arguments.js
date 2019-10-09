export class Arguments {
    constructor(items) {
        this.items = items;
    }
    get(flag) {
        console.log('~~~~~~~~~', this.items.find(item => item.flag === flag));
        return this.items.find(item => item.flag === flag).value;
    }
}