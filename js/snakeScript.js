var widthPixels = 0;
var lengthPixels = 0;
var stopInterval = 0;
var score = 0;
var original = true;
var snakeColor = "#7f0c0c";

var snakeSize = 4;
var dead = false;
var dir = "d";
var food = [];

function SwitchMode() {
    if (original){
        document.getElementById("mode").innerHTML = "Mode: Ultra Extreme Mega Snaek Too"
        original = false;
    }
    else{
        document.getElementById("mode").innerHTML = "Mode: Original"
        original = true;
    }

}

function makeOutline() {
    var pixels = "";
    widthPixels = Math.floor(window.innerHeight * 0.85 / 20);
    lengthPixels = Math.floor(window.innerWidth * 0.95 / 20);
    for (var i=0; i < widthPixels; i++) {
        pixels += "<div class='row'>"
        for (var j=0; j < lengthPixels; j++) {
            pixels += "<div class='pixel' id='" + addZero(j) + addZero(i) + "'></div>"
        }
        pixels += "</div>"
    }

    document.getElementById('art').innerHTML = pixels;
    document.getElementById('art').style.tableLayout = "fixed";
}

var snakeH = [0, 0];
var snakeB = [];
var snakeS = [];

function ExitHover(x) {
    x.style.backgroundColor = "rgb(81, 206, 85)";
}
function EnterHover(x) {
    x.style.backgroundColor = "rgb(58, 146, 59)";
}

function addZero (num){
    if (num < 10)
        return "0" + num.toString();
    else
        return num.toString();
}

function coordS(x, y){
    return addZero(x) + addZero(y)
}

function CheckSnakeColor(){
    var hexLetters = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F']
    var color = document.getElementById("inputColor").value; 
    if (color.length == 7 && color[0] == "#"){
        var error = false;
        for (var i = 1; i < color.length; i++){
            if (isNaN(color[i]))
                if (!hexLetters.includes(color[i]))
                    error = true;
        }
        if (!error)
            snakeColor = color
    }
}

function makeSnake() {
    makeOutline();
    CheckSnakeColor();
    
    dead = false;
    nextPress = "";
    dir = "d"
    if (stopInterval != 0){
        clearInterval(stopInterval);
        stopInterval = 0;
    }


    snakeH[0] = 7;
    snakeH[1] = 2;

    snakeB = [];
    snakeB.push([6, 2])
    snakeB.push([5, 2])
    snakeB.push([4, 2])
    snakeB.push([3, 2])
    snakeS.push('0602')
    snakeS.push('0502')
    snakeS.push('0402')
    snakeS.push('0302')
    
    document.getElementById('0702').classList.add('snake');
    document.getElementById('0702').classList.remove('pixel');
    document.getElementById('0602').classList.add('snake');
    document.getElementById('0602').classList.remove('pixel');
    document.getElementById('0502').classList.add('snake');
    document.getElementById('0502').classList.remove('pixel');
    document.getElementById('0402').classList.add('snake');
    document.getElementById('0402').classList.remove('pixel');
    document.getElementById('0302').classList.add('snake');
    document.getElementById('0302').classList.remove('pixel');

    document.getElementById('0702').style.backgroundColor = snakeColor;
    document.getElementById('0602').style.backgroundColor = snakeColor;
    document.getElementById('0502').style.backgroundColor = snakeColor;
    document.getElementById('0402').style.backgroundColor = snakeColor;
    document.getElementById('0302').style.backgroundColor = snakeColor;
    

    makeFood();

    stopInterval = setInterval(Death, 75);
}

function makeFood (){
    food = [Math.floor(Math.random() * lengthPixels), Math.floor(Math.random() * widthPixels)]

    if (food[0] == snakeH[0] && food[1] == snakeH[1]){
        makeFood();
        return;
    }

    for (var i = 0; i < snakeB.length; i++){ // if food spawns on body
        if (snakeB[i][0] == food[0]){
            if (snakeB[i][1] == food[1]){
                makeFood();
                return;
            }
        }
    }
    foodS = addZero(food[0]) + addZero(food[1])
    document.getElementById(foodS).classList.add('food');
    document.getElementById(foodS).classList.remove('pixel');
    document.getElementById(foodS).style.backgroundColor = "yellow";
}


function update(){
    score = snakeB.length - 4
    if (original)
        document.getElementById("score").innerHTML = " Score: " + score
    else
        document.getElementById("score").innerHTML = "Effect: " + effect + " | Score: " + score
    snakeB.unshift([snakeH[0], snakeH[1]]); // Add to array
    snakeS.unshift(coordS(snakeH[0], snakeH[1])) // Add string coords
    document.getElementById(coordS(snakeH[0], snakeH[1])).style.backgroundColor = snakeColor;
    if (dir == "r")
        snakeH[0] += 1;
    else if (dir == "l")
        snakeH[0] += -1;
    else if (dir == "u")
        snakeH[1] += -1;
    else if (dir == "d")
        snakeH[1] += 1;

    var headPos = coordS(snakeH[0], snakeH[1]) // Sets the next head coord as red
    document.getElementById(coordS(snakeH[0], snakeH[1])).style.backgroundColor = snakeColor;
    document.getElementById(headPos).classList.add('snake');
    document.getElementById(headPos).classList.remove('pixel');
    document.getElementById(headPos).classList.remove('food');

     
    if (!(snakeH[0] == food[0] && snakeH[1] == food[1])){ // Not Hit food
        var tailPosA = snakeB.pop() // Remove from array
        snakeS.pop()

        var tailPos = coordS(tailPosA[0], tailPosA[1])
        document.getElementById(tailPos).classList.add('pixel');
        document.getElementById(tailPos).classList.remove('snake');
        document.getElementById(tailPos).style.backgroundColor = "gray";
    }
    else { // Hit food
        makeFood();
        if (!original)
            MegaMode();
    }

    pressed = false; // Hold second key press
    if (nextPress != ""){
        dir = nextPress;
        nextPress = "";
    }
}

function Death(){
    var headPosS = addZero(snakeH[0]) + addZero(snakeH[1])
    for (var i = 0; i < snakeB.length; i++){
        var posS = addZero(snakeB[i][0]) + addZero(snakeB[i][1])
        if (posS == headPosS){
            dead = true;
        }
    }

    if ((dir == "l" && snakeH[0] == 0) || (dir == "r" && snakeH[0] == lengthPixels - 1) || (dir == "u" && snakeH[1] == 0) || (dir == "d" && snakeH[1] == widthPixels - 1)){
        dead = true;
    }

    if (dead){
        clearInterval(stopInterval)
        clearInterval(strobeInterval)
    }

    else
        update();
}

var pressed = false;
var nextPress = "";
addEventListener("keydown", function(event){
    if (pressed) {
        if (dir != "d" && (event.keyCode == 87 || event.keyCode == 38))
            nextPress = "u"
        else if (dir != "u" && (event.keyCode == 83 || event.keyCode == 40))
            nextPress = "d"
        else if (dir != "l" && (event.keyCode == 68 || event.keyCode == 39))
            nextPress = "r"
        else if (dir != "r" && (event.keyCode == 65 || event.keyCode == 37))
            nextPress = "l"
    }
    else {
        if (dir != "d" && (event.keyCode == 87 || event.keyCode == 38)){
            dir = "u"
            pressed = true;
        }
        else if (dir != "u" && (event.keyCode == 83 || event.keyCode == 40)){
            dir = "d"
            pressed = true;
        }
        else if (dir != "l" && (event.keyCode == 68 || event.keyCode == 39)){
            dir = "r"
            pressed = true;
        }
        else if (dir != "r" && (event.keyCode == 65 || event.keyCode == 37)){
            dir = "l"
            pressed = true;
        }
    }
}, false);

effect = "None"
function MegaMode() {
    if (score % 5 == 4 || score == 0) {
        var rand = Math.random();
        
        if (strobeInterval != null){
            clearInterval(strobeInterval);
            strobeInterval = null
        }


        if (rand < 1){
            strobeInterval = setInterval(Strobe, 125)
            effect = "Strobe"
        }
    }
}

var strobeInterval;
var r = 0
var g = 0
var b = 0
function Strobe(){
    r += 10
    g += 20
    b += 30
    r = r % 255
    g = g % 255
    b = b % 255
    var list = document.getElementsByClassName('pixel')
    for (var i = 0; i < list.length; i++){
        list[i].style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")"
    }
}