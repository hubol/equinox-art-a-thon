import MultiStyleText, {TextStyleSet} from "pixi-multistyle-text";
import {time} from "../utils/time";
import {Vector} from "../utils/vector";
import {PseudoRandom} from "../utils/pseudoRandom";

export function wiggleText(x: number, y: number, wiggle: Wiggle, textStyleSet: TextStyleSet)
{
    const wiggler = makeWiggler(x, y, wiggle, textStyleSet?.default?.align);
    const text = new MultiStyleText("", textStyleSet).withStep(() => wiggler(text));
    return text;
}

interface Wiggle
{
    seed: number;
    amplitude: number;
    frequency: number;
}

function getAlignScale(align: string)
{
    switch (align)
    {
        case "right":
            return -1;
        case "center":
            return -0.5;
        default:
            return 0;
    }
}

function makeWiggler(x: number, y: number, { amplitude, frequency, seed }: Wiggle, align: string = "left")
{
    const r = new PseudoRandom(seed);
    const xAmp = r.nextMinMax(0.8, 1.2) * amplitude;
    const yAmp = r.nextMinMax(0.8, 1.2) * amplitude;
    const yFreq = r.nextMinMax(0.8, 1.2) * frequency * 2 * Math.PI;
    const xFreq = r.nextMinMax(0.8, 1.2) * frequency * 2 * Math.PI;
    const xOff = r.next() * Math.PI * 2;
    const yOff = r.next() * Math.PI * 2;
    const yFunc = r.nextBoolean() ? Math.sin : Math.cos;
    const xFunc = r.nextBoolean() ? Math.cos : Math.sin;

    const alignScale = getAlignScale(align);

    return function(vector: MultiStyleText)
    {
        vector.x = x + vector.width * alignScale + xFunc(time.ms / 1000 * xFreq + xOff) * xAmp;
        vector.y = y + yFunc(time.ms / 1000 * yFreq + yOff) * yAmp;
    }
}