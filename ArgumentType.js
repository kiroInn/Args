export class ArgumentType{
    static default(){
        return undefined;
    }
}

export class BooleanArgumentType extends ArgumentType{
    static default(){
        return false;
    }
}

export class StringArgumentType extends ArgumentType{
    static default(){
        return "";
    }
}

export class IntegerArgumentType extends ArgumentType{
    static default(){
        return 0;
    }
}