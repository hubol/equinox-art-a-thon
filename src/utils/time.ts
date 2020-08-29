export function getCurrentTime()
{
    return new Date();
}

export function getCurrentTimeMilliseconds()
{
    return getCurrentTime().getTime();
}

export const time = {
    get date()
    {
        return getCurrentTime();
    },
    get ms()
    {
        return getCurrentTimeMilliseconds();
    }
}