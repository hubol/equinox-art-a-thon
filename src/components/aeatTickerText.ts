import {leftScrollingTickerText} from "./leftScrollingTickerText";
import {merge} from "../utils/merge";

export function aeatTickerText()
{
    const donorMessagesText = leftScrollingTickerText(1);
    return merge(donorMessagesText, {
        setText(value: string)
        {
            const donorMessages = getDonorMessagesFromInputValue(value);
            donorMessagesText.text = "";
            for (const donorMessage of donorMessages) {
                donorMessagesText.text += getReadableDonorMessage(donorMessage);
            }
        }
    });
}

function getReadableDonorMessage({ donor, message })
{
    if (!!message && message.length > 0)
        return `${donor} says ${message} ~ `;
    return `${donor} ~ `;
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