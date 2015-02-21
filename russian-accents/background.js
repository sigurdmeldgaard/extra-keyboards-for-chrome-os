var contextID = -1;
var lut = "аеоыиэюуяАЕОЫИЭЮУЯ";
var modify = false;
           
chrome.input.ime.onFocus.addListener(function (context) {
    contextID = context.contextID;
});

function isPureModifier(keyData) {
    return (keyData.key === "Shift") || (keyData.key === "Ctrl") || (keyData.key === "Alt");
}

chrome.input.ime.onKeyEvent.addListener(
    function (engineID, keyData) {
        var handled = false;
        if (keyData.code === "AltRight") {
            if (keyData.type === "keydown") {
                 modify = true;
            } else if (keyData.type === "keyup") {
                 modify = false;
            }
         } else if (modify && keyData.type === "keydown" && !isPureModifier(keyData) &&
                lut.indexOf(keyData.key) !== -1) {           
             chrome.input.ime.commitText({"contextID": contextID,
                                          "text": keyData.key + "\u0301"});
             handled = true;
         }
         return handled;
    });
