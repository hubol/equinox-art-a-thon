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
        stage: application.stage,
        get width() {
            return application.renderer.screen.width;
        },
        get height() {
            return application.renderer.screen.height;
        }
    }
}