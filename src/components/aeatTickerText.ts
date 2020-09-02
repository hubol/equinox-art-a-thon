import {merge} from "../utils/merge";
import {cooperBlackTextStyleSet} from "../utils/cooperBlackTextStyleSet";
import MultiStyleText from "pixi-multistyle-text";
import {Container} from "pixi.js";
import {asshat} from "../utils/asshat";
import {TickerMessage} from "./tickerMessage";
import {default as equals} from "fast-deep-equal";

function makeMultiStyleText(text: string)
{
    return new MultiStyleText(text, textStyleSet);
}

export function aeatTickerText()
{
    let speed = 1;
    let lastValue: TickerMessage[] | undefined = undefined;

    let multiStyleTexts: MultiStyleText[] = [];
    const container = new Container().withStep(() => {
        if (multiStyleTexts.length === 0)
            return;

        container.x -= Math.abs(speed);
        const lastMultiStyleText = multiStyleTexts.last();
        if (container.x <= -(lastMultiStyleText.x + lastMultiStyleText.width))
            container.x = asshat.width;
    });

    return merge(container, {
        set messages(value: TickerMessage[])
        {
            if (equals(value, lastValue))
                return;

            multiStyleTexts = [];
            container.removeAllChildren();

            accentIndex = 0;
            let x = 0;
            for (const tickerMessage of value)
            {
                const text = toPrintable(tickerMessage);
                if (text === undefined)
                    continue;
                const multiStyleText = makeMultiStyleText(`${text} ~ `);
                multiStyleText.x = x;
                container.addChild(multiStyleText);
                multiStyleTexts.push(multiStyleText);
                x += multiStyleText.width;
                accentIndex++;
            }

            lastValue = value;
        }
    });
}

let accentIndex = 0;

function toPrintable(tickerMessage: TickerMessage)
{
    let result = "";
    for (const x of tickerMessage)
    {
        if (typeof x === "string")
        {
            result += x;
            continue;
        }
        const accent = `accent${(accentIndex++ % 7)}`;
        result += `<${accent}>${x.text}</${accent}>`;
    }

    return result.length === 0 ? undefined : result;
}

const textStyleSet = cooperBlackTextStyleSet({
    "accent0": {
        fill: 0xDB372F
    },
    "accent1": {
        fill: 0xE06E2A
    },
    "accent2": {
        fill: 0xEEAE22
    },
    "accent3": {
        fill: 0xF9CCA8
    },
    "accent4": {
        fill: 0x49B0A9
    },
    "accent5": {
        fill: 0x299A9E
    },
    "accent6": {
        fill: 0x19647C
    }
});