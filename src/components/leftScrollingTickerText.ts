import {Text} from "pixi.js";
import {asshat} from "../utils/asshat";
import MultiStyleText, {TextStyleSet} from "pixi-multistyle-text";

const defaultTextStyleSet = {
    "default": {
        fontFamily: "cooper-black-std",
        fontSize: 32,
        fill: 0xffffff
    }
}

export function leftScrollingTickerText(speed: number, textStyleSet: TextStyleSet = defaultTextStyleSet)
{
    const text = new MultiStyleText("", textStyleSet).withStep(() => {
        text.x -= Math.abs(speed);
        if (text.x <= -text.width)
            text.x = asshat.width;
    });
    text.x = asshat.width;
    return text;
}