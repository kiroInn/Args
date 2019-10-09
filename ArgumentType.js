export class ArgumentType{
    static default(){
        return undefined;
    }
}

export class BooleanArgumentType extends ArgumentType{
    static default(){
        return false;
    }
    static convert(){
        return true;
    }
}

export class StringArgumentType extends ArgumentType{
    static default(){
        return "";
    }
    static convert(value){
        return value;
    }
}

export class IntegerArgumentType extends ArgumentType{
    static default(){
        return 0;
    }
    static convert(value){
        return parseInt(value, 10);
    }
}