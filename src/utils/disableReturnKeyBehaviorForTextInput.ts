function stopReturnKeyForTextInput(evt)
{
    evt = (evt) ? evt : ((event) ? event : null);
    const node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
    if (evt.keyCode === 13 && node.type === "text")
        return false;
}

export function disableReturnKeyBehaviorForTextInput()
{
    document.onkeypress = stopReturnKeyForTextInput;
}