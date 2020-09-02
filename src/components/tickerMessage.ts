export class Accent
{
    public readonly text: string;

    constructor(text: string)
    {
        this.text = text;
    }
}

export function accent(text: string)
{
    return new Accent(text);
}

export type TickerMessage = (string | Accent)[];