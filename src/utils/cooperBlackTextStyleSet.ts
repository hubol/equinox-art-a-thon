import {TextStyleSet} from "pixi-multistyle-text";

export function cooperBlackTextStyleSet(textStyleSet: TextStyleSet, fontSize = 32, align: "left" | "right" | "center" = "left", fill = 0xffffff): TextStyleSet
{
    return {
        "default": {
            fontFamily: "cooper-black-std",
            fontSize,
            fill,
            align
        },
        ...textStyleSet
    }
}