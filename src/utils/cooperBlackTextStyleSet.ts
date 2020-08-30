import {TextStyleSet} from "pixi-multistyle-text";

export function cooperBlackTextStyleSet(textStyleSet: TextStyleSet, fontSize = 32, fill = 0xffffff): TextStyleSet
{
    return {
        "default": {
            fontFamily: "cooper-black-std",
            fontSize,
            fill
        },
        ...textStyleSet
    }
}