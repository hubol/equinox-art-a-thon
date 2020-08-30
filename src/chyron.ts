import {startApplication} from "./utils/pixiUtils";
import {Container, Graphics, Sprite, Text} from "pixi.js";
import {time} from "./utils/time";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import {bindAsshat} from "./utils/asshat";
import {ScrollMask} from "./textures";
import {leftScrollingTickerText} from "./components/leftScrollingTickerText";
import {wiggleText} from "./components/wiggleText";
import {cooperBlackTextStyleSet} from "./utils/cooperBlackTextStyleSet";
import {disableReturnKeyBehaviorForTextInput} from "./utils/disableReturnKeyBehaviorForTextInput";

const width = 1920;
const height = 256;
const app = bindAsshat(startApplication({ width, height, resolution: 2, transparent: true }));

const totalDonationText = wiggleText(8, 8, { frequency: 0.3, amplitude: 2, seed: 690 },
    cooperBlackTextStyleSet({
        "money": { fill: 0x49B0A9 }
        },
        48))

const donateAtText = wiggleText(width - 8, 8, { frequency: 0.3, amplitude: 2, seed: 4200 },
    cooperBlackTextStyleSet({
            "number": {
                fill: 0xEEAE22
            }
        },
        48,
        "right"));
donateAtText.text = 'Text <number>1-800-676-8989</number> to donate!';

const donorMessagesContainer = new Container();
donorMessagesContainer.width = width;
donorMessagesContainer.height = height;
const mask = Sprite.from(ScrollMask);
mask.width = width;
mask.height = height;
app.stage.addChild(mask);

donorMessagesContainer.mask = mask;

const donorMessagesText = leftScrollingTickerText(1);
donorMessagesText.y = 160;

donorMessagesContainer.addChild(donorMessagesText);

const state = {
    set totalDonationText(value)
    {
        totalDonationText.text = `Total donations:
<money>${value}</money>`;
    },
    set donorMessages(value)
    {
        const donorMessages = getDonorMessagesFromInputValue(value);
        donorMessagesText.text = "";
        for (const donorMessage of donorMessages) {
            donorMessagesText.text += getReadableDonorMessage(donorMessage);
        }
    }
};

function getReadableDonorMessage({ donor, message })
{
    if (!!message && message.length > 0)
        return `${donor} says ${message} ~ `;
    return `${donor} ~ `;
}

function getDonorMessageFromLine(line)
{
    const indexOfColon = line.indexOf(":");
    if (indexOfColon === -1)
    {
        if (line.length === 0)
            return undefined;
        return {
            donor: line.trim(),
            message: ""
        };
    }
    return {
        donor: line.substr(0, indexOfColon).trim(),
        message: line.substr(indexOfColon + 1).trim()
    }
}

function getDonorMessagesFromInputValue(value)
{
    return value.split(/\r?\n/).map(getDonorMessageFromLine).filter(x => !!x);
}

const dropShadowContainer = new Container();

const dropShadowFilter = new DropShadowFilter({distance: 3, alpha: 0.5, quality: 3, blur: 1});
dropShadowContainer.filters = [dropShadowFilter];

dropShadowContainer.addChild(totalDonationText, donateAtText, donorMessagesContainer);
app.stage.addChild(dropShadowContainer);

function updateChyron()
{
    state.totalDonationText
        = (document.getElementById("total-donations") as any).value;
    state.donorMessages
        = (document.getElementById("donor-messages") as any).value;
}

async function updateOnInterval()
{
    while (true)
    {
        updateChyron();
        await sleep(100);
    }
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

setTimeout(updateOnInterval);
disableReturnKeyBehaviorForTextInput();