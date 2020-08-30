import {merge} from "../utils/merge";
import {cooperBlackTextStyleSet} from "../utils/cooperBlackTextStyleSet";
import MultiStyleText from "pixi-multistyle-text";
import {Container} from "pixi.js";
import {asshat} from "../utils/asshat";

function makeMultiStyleText(text: string)
{
    return new MultiStyleText(text, textStyleSet);
}

export function aeatTickerText()
{
    let speed = 1;
    let lastValue: string | undefined = undefined;

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
        setText(value: string)
        {
            if (value === lastValue)
                return;

            multiStyleTexts = [];
            container.removeAllChildren();

            const donorMessages = getDonorMessagesFromInputValue(value);
            let accentIndex = 0;
            let x = 0;
            for (const donorMessage of donorMessages) {
                const accentElementName = `accent${accentIndex % 7}`;
                const multiStyleText = makeMultiStyleText(toPrintableDonorMessage(donorMessage, accentElementName));
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

function toPrintableDonorMessage({ donor, message }, accent: string)
{
    if (!!message && message.length > 0)
        return `<${accent}>${donor}</${accent}> says ${message} ~ `;
    return `<${accent}>${donor}</${accent}> ~ `;
}

function getDonorMessageFromLine(line)
{
    const indexOfColon = line.indexOf(":");
    if (indexOfColon === -1)
    {
        if (line.length === 0)
            return undefined;
        return {
            donor: line.trim(),
            message: ""
        };
    }
    return {
        donor: line.substr(0, indexOfColon).trim(),
        message: line.substr(indexOfColon + 1).trim()
    }
}

function getDonorMessagesFromInputValue(value)
{
    return value.split(/\r?\n/).map(getDonorMessageFromLine).filter(x => !!x);
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