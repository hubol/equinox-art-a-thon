import {CancellationToken} from "pissant";
import {asshat} from "./asshat";

type Predicate = () => boolean;

export function tickerWait(predicate: Predicate, ct?: CancellationToken)
{
    let fn: () => void;

    return new Promise((resolve, reject) => {
        fn = () => {
            if (ct?.isCancelled)
            {
                ct?.rejectIfCancelled(reject);
                return;
            }

            if (predicate())
                resolve();
        };

        asshat.ticker.add(fn);
    })
    .finally(() => asshat.ticker.remove(fn));
}