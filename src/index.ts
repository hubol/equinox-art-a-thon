import {loadTexturesAsync} from "./textures";

async function bootstrap()
{
    require("./utils/arrayExtensions");
    require("./utils/pixiExtensions");
    await loadTexturesAsync();
    require("./chyron");
}

window.onload = bootstrap;