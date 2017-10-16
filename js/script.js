function makeOutline() {
    var size = 25;
    var pixels = "";
    for (var i=0; i < size; i++) {
        pixels += "<div class='row'>"
        for (var j=0; j < size; j++) {
            pixels += "<div class='pixel' onclick='setPixelColor(this)'></div>"
        }
        pixels += "</div>"
    }

    document.getElementById('art').innerHTML = pixels;
}

function setPixelColor(pixel) {
    pixel.style.backgroundColor = "black";
}

var penColor = 'black';
function setPenColor(pen) {
    penColor = pen;
}

function setPixelColor(pixel) {
    pixel.style.backgroundColor = penColor;
}