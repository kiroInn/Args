export class Schemas {
    constructor(items) {
        this.items = items;
    }

    find(flag) {
        return this.items.find(item => item.flag === flag);
    }
    
    map(cb) {
        return this.items.map(item => cb(item));
    }
}
