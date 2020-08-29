import {Application} from "pixi.js";
import {IguaTicker} from "./iguaTicker";

export let asshat: ReturnType<typeof createAsshat>;

export function bindAsshat(application: Application)
{
    return asshat = createAsshat(application);
}

function createAsshat(application: Application)
{
    const iguaTicker = new IguaTicker();
    application.ticker.add(() => iguaTicker.update());

    return {
        applicationTicker: application.ticker,
        ticker: iguaTicker,
        stage: application.stage
    }
}