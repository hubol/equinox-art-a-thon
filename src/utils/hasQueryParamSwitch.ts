export function hasQueryParamSwitch(name: string)
{
    return new URLSearchParams(window.location.search).has(name);
}