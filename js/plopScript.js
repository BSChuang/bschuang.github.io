function makeOutline() {
    var size = 25;
    var pixels = "";
    for (var i=0; i < size; i++) {
        pixels += "<div class='row'>"
        for (var j=0; j < size; j++) {
            pixels += "<div class='pixel' onmouseenter='enterHoverPixelColor(this)' onmouseleave='exitHoverPixelColor(this)' onclick='setPixelColor(this)'></div>"
        }
        pixels += "</div>"
    }

    document.getElementById('art').innerHTML += pixels;
    document.getElementById('art').style.backgroundColor = "black";
    document.getElementById('art').style.tableLayout = "fixed";
}

function borderToggle() {
    if (document.getElementById('art').style.backgroundColor == "black")
        document.getElementById('art').style.backgroundColor = "rgb(122, 122, 122)";
    else
    document.getElementById('art').style.backgroundColor = "black";
}

var penColor = 'black';
function setPenColor(pen) {
    penColor = pen;
}

var prevPixelColor = '';
function enterHoverPixelColor(pixel) {
    prevPixelColor = pixel.style.backgroundColor;
    pixel.style.backgroundColor = penColor;
}

function exitHoverPixelColor(pixel) {
    pixel.style.backgroundColor = prevPixelColor;
}

function setPixelColor(pixel) {
    pixel.style.backgroundColor = penColor;
    prevPixelColor = pixel.style.backgroundColor
}