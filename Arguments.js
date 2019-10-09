export class Arguments {
    constructor(items) {
        this.items = items;
    }
    get(flag) {
        return this.find(flag).value;
    }
    find(flag){
        return this.items.find(i => i.flag === flag);
    }
    set(flag, value){
        this.find(flag).value = value;
    }
}