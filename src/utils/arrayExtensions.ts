declare global {
    interface Array<T> {
        remove(...T);
        firstOrDefault(): T | undefined;
        last(): T;
    }
}

Array.prototype.remove = function(...args)
{
    args.forEach(value => {
        const index = this.indexOf(value);
        if (index > -1)
            this.splice(index, 1);
    });
};

Array.prototype.firstOrDefault = function () {
    if (this.length === 0)
        return undefined;
    return this[0];
}

Array.prototype.last = function () {
    if (this.length === 0)
        throw { array: this, message: "must have at least one element to call last()" };
    return this[this.length - 1];
}

export const noOneCares = 0;