import {cyclic} from "./cyclic";

export class PseudoRandom
{
    public readonly seed: number;
    private step: number = 0;

    constructor(seed: number)
    {
        this.seed = seed;
    }

    public next(): number
    {
        this.step++;
        const raw = Math.sin(this.seed - this.step * 3) * 2
            + Math.cos(3.8 - this.seed * 1.1 + this.step * 2) * 3
            - Math.tan(2 + this.seed * 0.3) * (1 + cyclic(this.step * .36, 0.5, 1.5));
        return cyclic(raw, 0, 1);
    }

    public nextMinMax(min: number, max: number): number
    {
        const raw = this.next();
        return min + (max - min) * raw;
    }

    public nextBoolean()
    {
        return this.next() > 0.5;
    }
}