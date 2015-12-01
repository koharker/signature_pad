var wrapper = document.getElementById("signature-pad"),
    clearButton = wrapper.querySelector("[data-action=clear]"),
    copyButton = wrapper.querySelector("[data-action=copy]"),
    saveButton = wrapper.querySelector("[data-action=save]"),
    canvas = wrapper.querySelector("canvas"),
    signaturePad;

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    var ratio =  window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

signaturePad = new SignaturePad(canvas);

clearButton.addEventListener("click", function (event) {
    signaturePad.clear();
});

copyButton.addEventListener("click", function (event) {
    if (signaturePad.isEmpty()) {
        alert("There is nothing to copy.");
    } else {
        signaturePad.copy();
        window.open(signaturePad.toDataURL());
    } 
});

document.addEventListener('copy', function(e){
    if (signaturePad.isEmpty()) {
        alert("There is nothing to copy.");
    } else {
        signaturePad.copy();
        e.clipboardData.setData();
//     e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
        e.preventDefault(); // We want our data, not data from any selection, to be written to the clipboard
    }
});

saveButton.addEventListener("click", function (event) {
    if (signaturePad.isEmpty()) {
        alert("Please provide signature first.");
    } else {
        window.open(signaturePad.toDataURL());
    }
});
