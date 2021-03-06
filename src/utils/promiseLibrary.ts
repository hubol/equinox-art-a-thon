import {CancellationToken, sleep, wait} from "pissant";
import {tickerSleep} from "./tickerSleep";
import {tickerWait} from "./tickerWait";

const promiseLibrary = {
    sleep: tickerSleep,
    wait: tickerWait,
    timeoutSleep: sleep,
    timeoutWait: wait
};

export type PromiseLibrary = typeof promiseLibrary;

export function makePromiseLibrary(cancellationToken: CancellationToken): PromiseLibrary
{
    function wrapPromise(promiseFactory): any
    {
        return function () {
            const augmentedArguments = Array.prototype.slice.call(arguments);
            augmentedArguments.push(cancellationToken);
            return promiseFactory.apply(null, augmentedArguments);
        };
    }

    const library = {  };
    Object.keys(promiseLibrary).map(key => library[key] = wrapPromise(promiseLibrary[key]));

    return library as any;
}

