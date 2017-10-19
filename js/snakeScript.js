var canvas;
var score = 0;

var snakeSize = 4;
var food;

function makeOutline() {
    var size = 25;
    var pixels = "";
    var widthPixels = Math.floor(screen.height * 3/4 / 20);
    var lengthPixels = Math.floor(screen.width * 3.5/4 / 20);
    for (var i=0; i < widthPixels; i++) {
        pixels += "<div class='row'>"
        for (var j=0; j < lengthPixels; j++) {
            pixels += "<div class='pixel' id='" + addZero(j) + addZero(i) + "'></div>"
        }
        pixels += "</div>"
    }

    document.getElementById('art').innerHTML += pixels;
    document.getElementById('art').style.tableLayout = "fixed";
}

var snakeH = [0, 0];
var snakeB = [];

function addZero (num){
    if (num < 10)
        return "0" + num.toString();
    else
        return num.toString();
}

function makeSnake() {
    snakeH[0] = 7;
    snakeH[1] = 2;

    snakeB.push([6, 2])
    snakeB.push([5, 2])
    snakeB.push([4, 2])
    snakeB.push([3, 2])
    document.getElementById('0702').style.backgroundColor="red";
    document.getElementById('0602').style.backgroundColor="red";
    document.getElementById('0502').style.backgroundColor="red";
    document.getElementById('0402').style.backgroundColor="red";
    document.getElementById('0302').style.backgroundColor="red";
}

var dir = "d";
var test = []
function update(){
    var snakeX = snakeH[0];
    var snakeY = snakeH[1];
    snakeB.unshift([snakeX, snakeY]);
    if (dir == "r")
        snakeH[0] += 1;
    else if (dir == "l")
        snakeH[0] += -1;
    else if (dir == "u")
        snakeH[1] += -1;
    else if (dir == "d")
        snakeH[1] += 1;

    var headPos = addZero(snakeH[0]) + addZero(snakeH[1]) // Sets the next head coord as red
    document.getElementById(headPos).style.backgroundColor="red"

    var tailPosA = snakeB.pop()
    var tailPos = addZero(tailPosA[0]) + addZero(tailPosA[1]) // Sets the array coord at end of snake body as blue
    document.getElementById(tailPos).style.backgroundColor="blue"
}