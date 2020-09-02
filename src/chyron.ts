import {startApplication} from "./utils/pixiUtils";
import {Container, Sprite} from "pixi.js";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import {bindAsshat} from "./utils/asshat";
import {ScrollMask} from "./textures";
import {wiggleText} from "./components/wiggleText";
import {cooperBlackTextStyleSet} from "./utils/cooperBlackTextStyleSet";
import {disableReturnKeyBehaviorForTextInput} from "./utils/disableReturnKeyBehaviorForTextInput";
import {sleep} from "pissant";
import {maskedScreenContainer} from "./utils/maskedScreenContainer";
import {aeatTickerText} from "./components/aeatTickerText";
import {getTickerMessagesFromDonorsInputValue} from "./getTickerMessagesFromDonorsInputValue";
import equal from "fast-deep-equal";

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
            "number": { fill: 0xE06E2A },
            "message": { fill: 0xEEAE22 }
        },
        48,
        "right"));
donateAtText.text = 'Text <message>PS1</message> to <number>44321</number>';

const donorMessagesContainer = maskedScreenContainer(Sprite.from(ScrollMask));

const ticker = aeatTickerText();
ticker.y = 80;

donorMessagesContainer.addChild(ticker);

let previousTickerMessageSource: TickerMessageSource | undefined = undefined;

const state = {
    set totalDonationText(value: string)
    {
        totalDonationText.text = `Total donations: <money>${value}</money>`;
    },
    set tickerMessages(tickerMessageSource: TickerMessageSource)
    {
        if (equal(tickerMessageSource, previousTickerMessageSource))
            return;
        ticker.messages = getTickerMessagesFromDonorsInputValue(tickerMessageSource.donorMessagesTextAreaValue);
        previousTickerMessageSource = tickerMessageSource;
    }
};

type TickerMessageSource = ReturnType<typeof getTickerMessagesSource>;

const dropShadowContainer = new Container();

const dropShadowFilter = new DropShadowFilter({distance: 3, alpha: 0.5, quality: 3, blur: 1});
dropShadowContainer.filters = [dropShadowFilter];

dropShadowContainer.addChild(totalDonationText, donateAtText, donorMessagesContainer);
app.stage.addChild(dropShadowContainer);

const totalDonationsInputElement = document.getElementById("total-donations") as HTMLInputElement;
const donorMessagesTextAreaElement = document.getElementById("donor-messages") as HTMLTextAreaElement;
const currentArtistInputElement = document.getElementById("current-artist") as HTMLInputElement;
const currentTitleInputElement = document.getElementById("current-title") as HTMLInputElement;

function updateChyron()
{
    state.totalDonationText = totalDonationsInputElement.value;
    state.tickerMessages = getTickerMessagesSource();
}

function getTickerMessagesSource()
{
    return {
        donorMessagesTextAreaValue: donorMessagesTextAreaElement.value,
        currentArtistInputValue: currentArtistInputElement.value,
        currentTitleInputValue: currentTitleInputElement.value
    };
}

async function updateOnInterval()
{
    while (true)
    {
        updateChyron();
        await sleep(100);
    }
}

setTimeout(updateOnInterval);
disableReturnKeyBehaviorForTextInput();

totalDonationsInputElement.value = "$1,000.00";
donorMessagesTextAreaElement.value = `Hubol P.: I love Public Space One!
Hubol Jr.: I also love Public Space One!
John E.:Many people say I love Public Space One
Kalmia S.:I love that Public Space One
asdf:Aaaaaaaaaaaaaaaah!!!`;