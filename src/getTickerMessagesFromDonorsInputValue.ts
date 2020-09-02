import {accent} from "./components/tickerMessage";

function getTickerMessageFromDonorsLine(line)
{
    const indexOfColon = line.indexOf(":");
    if (indexOfColon === -1)
    {
        if (line.length === 0)
            return undefined;
        return [accent(line.trim())]
    }
    return [accent(line.substr(0, indexOfColon).trim()), ` says ${line.substr(indexOfColon + 1).trim()}`];
}

export function getTickerMessagesFromDonorsInputValue(value)
{
    return value.split(/\r?\n/).map(getTickerMessageFromDonorsLine).filter(x => !!x);
}