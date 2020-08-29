import {startApplication} from "./utils/pixiUtils";
import {Container, Graphics, Sprite, Text} from "pixi.js";
import {time} from "./utils/time";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import {bindAsshat} from "./utils/asshat";
import {ScrollMask} from "./textures";
import MultiStyleText from "pixi-multistyle-text";

const width = 1920;
const height = 256;
const app = bindAsshat(startApplication({ width, height, resolution: 2, transparent: true }));

const totalDonationText = new MultiStyleText('Click the Clown', {
    "default": {
        fontFamily: "cooper-black-std",
        fontSize: 48,
        fill: 0xffffff
    },
    "money": {
        fill: 0x49B0A9
    }
}).withStep(() => {
    totalDonationText.x = 8 + Math.sin(time.ms / 1000) * 2;
    totalDonationText.y = 8 + Math.cos(time.ms / 1000) * 2;
});

const donateAtText = new MultiStyleText('Text <number>1-800-676-8989</number> to donate!', {
    "default": {
        fontFamily: "cooper-black-std",
        fontSize: 48,
        fill: 0xffffff
    },
    "number": {
        fill: 0xEEAE22
    }
}).withStep(() => {
    donateAtText.x = width - 8 - donateAtText.width + Math.sin(time.ms / 1000 * 2 + 3) * 2;
    donateAtText.y = 8 + Math.cos(time.ms / 1000 - 4) * 2;
});

const donorMessagesContainer = new Container();
donorMessagesContainer.width = width;
donorMessagesContainer.height = height;
const mask = Sprite.from(ScrollMask);
mask.width = width;
mask.height = height;
app.stage.addChild(mask);

donorMessagesContainer.mask = mask;

const donorMessagesText = new Text("", {
    fontFamily: "cooper-black-std",
    fontSize: 32,
    fill: 0xffffff
}).withStep(() => {
    donorMessagesText.x--;
    if (donorMessagesText.x <= -donorMessagesText.width)
        donorMessagesText.x = width;
});
donorMessagesText.x = width;
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

function stopReturnKeyForTextInput(evt) {
    evt = (evt) ? evt : ((event) ? event : null);
    const node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
    if (evt.keyCode === 13 && node.type === "text")
        return false;
}

document.onkeypress = stopReturnKeyForTextInput;

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