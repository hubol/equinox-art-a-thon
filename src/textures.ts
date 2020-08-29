import * as PIXI from "pixi.js";
    
// This file is generated. Do not touch.

export let ScrollMask: PIXI.Texture = undefined as unknown as PIXI.Texture;


export function loadTexturesAsync()
{
    const loader = new PIXI.Loader();

    const ScrollMaskPath = require("./images/scroll mask.png");
    loader.add(ScrollMaskPath); 

    
    return new Promise(resolve =>
    {
        loader.load((_, resources) => {
            ScrollMask = resources[ScrollMaskPath]?.texture as PIXI.Texture;

            resolve();
        });
    });
}