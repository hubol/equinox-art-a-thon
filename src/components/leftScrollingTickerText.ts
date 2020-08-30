import {asshat} from "../utils/asshat";
import MultiStyleText, {TextStyleSet} from "pixi-multistyle-text";
import {cooperBlackTextStyleSet} from "../utils/cooperBlackTextStyleSet";

const defaultTextStyleSet = cooperBlackTextStyleSet({});

export function leftScrollingTickerText(speed: number, textStyleSet: TextStyleSet = defaultTextStyleSet)
{
    const text = new MultiStyleText("", textStyleSet).withStep(() => {
        text.x -= Math.abs(speed);
        if (text.x <= -text.width)
            text.x = asshat.width;
    });
    text.x = 5;
    return text;
}