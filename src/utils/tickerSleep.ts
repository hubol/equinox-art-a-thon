import {CancellationToken} from "pissant";
import {tickerWait} from "./tickerWait";
import {asshat} from "./asshat";

export function tickerSleep(ms: number, ct?: CancellationToken)
{
    let ticksUntilResolve = (ms / 1000) * asshat.applicationTicker.maxFPS;

    return tickerWait(() => --ticksUntilResolve <= 0, ct);
}