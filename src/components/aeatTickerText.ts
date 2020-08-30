import {leftScrollingTickerText} from "./leftScrollingTickerText";
import {merge} from "../utils/merge";
import {cooperBlackTextStyleSet} from "../utils/cooperBlackTextStyleSet";

export function aeatTickerText()
{
    const donorMessagesText = leftScrollingTickerText(1,
        cooperBlackTextStyleSet({
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
        }));
    return merge(donorMessagesText, {
        setText(value: string)
        {
            const donorMessages = getDonorMessagesFromInputValue(value);
            donorMessagesText.text = "";
            let accentIndex = 0;
            for (const donorMessage of donorMessages) {
                const accentElementName = `accent${accentIndex % 7}`
                donorMessagesText.text += toPrintableDonorMessage(donorMessage, accentElementName);
                accentIndex++;
            }
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