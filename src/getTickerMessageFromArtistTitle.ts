import {accent, TickerMessage} from "./components/tickerMessage";

export function getTickerMessageFromArtistTitle(artist?: string, title?: string): TickerMessage | undefined
{
    if (artist?.length === 0)
        artist = undefined;
    if (title?.length === 0)
        title = undefined;
    if (artist && title)
        return [`You are watching `, accent(title), " by ", accent(artist)];
    if (!title && artist)
        return [`You are watching a piece by `, accent(artist)];
    if (title && !artist)
        return [`You are watching `, accent(title)];
    return undefined;
}