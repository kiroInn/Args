export class Arguments {
    constructor(items) {
        this.items = items;
    }
    get(flag) {
        console.log('~~~~~~~~~', this.items.find(item => item.flag === flag));
        return this.items.find(item => item.flag === flag).value;
    }
    find(flag){
        return this.items.find(i => i.flag === flag);
    }
    set(flag, value){
        this.find(flag).value = value;
    }
}