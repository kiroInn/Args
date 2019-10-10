export function throwUnknownFlagError(flag) {
    throw new Error(`Unknown flag: -${flag}`);
}

export function throwIntegerFlagError(value, flag) {
    throw new Error(`Invalid integer of flag: -${flag} ${value}`);
}

export function throwUnexpectedTokenError(token) {
    throw new Error(`Unexcepeted value: ${token}`);
}