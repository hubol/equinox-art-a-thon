import {Container} from "pixi.js";
import {asshat} from "./asshat";

export function maskedScreenContainer(mask: Container)
{
    const donorMessagesContainer = new Container();
    donorMessagesContainer.width = asshat.width;
    donorMessagesContainer.height = asshat.height;
    mask.width = asshat.width;
    mask.height = asshat.height;
    asshat.stage.addChild(mask);

    donorMessagesContainer.mask = mask;
    return donorMessagesContainer;
}