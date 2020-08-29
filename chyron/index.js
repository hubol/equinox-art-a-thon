const { Sprite, Texture, Graphics, Text, Container } = PIXI;

const app = startApplication({ width: 1920, height: 256, resolution: 2, transparent: true });

const time = {
    get ms() {
        return getCurrentTimeMilliseconds();
    }
}

const totalDonationText = new Text('Click the Clown', {
    fontFamily: "cooper-black-std",
    fontSize: 48,
    fill: 0xffffff
}).withStep(() => {
    totalDonationText.x = 8 + Math.sin(time.ms / 1000) * 2;
    totalDonationText.y = 8 + Math.cos(time.ms / 1000) * 2;
});

const donateAtText = new Text('Text 1-800-676-8989 to donate!', {
    fontFamily: "cooper-black-std",
    fontSize: 48,
    fill: 0xffffff
}).withStep(() => {
    donateAtText.x = 8 + Math.sin(time.ms / 1000 * 2 + 3) * 2;
    donateAtText.y = 160 + Math.cos(time.ms / 1000 - 4) * 2;
});

const state = {
    set totalDonationText(value)
    {
        totalDonationText.text = `Total donations:
${value}`;
    }
};

const dropShadowContainer = new Container();

const dropShadowFilter = new PIXI.filters.DropShadowFilter({distance: 3, alpha: 0.5, quality: 3, blur: 1});
dropShadowContainer.filters = [dropShadowFilter];

dropShadowContainer.addChild(totalDonationText, donateAtText);
app.stage.addChild(dropShadowContainer);

function updateChyron()
{
    state.totalDonationText
        = document.getElementById("total-donations").value;
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