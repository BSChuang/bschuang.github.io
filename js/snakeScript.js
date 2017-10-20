var widthPixels = 0;
var lengthPixels = 0;
var stopInterval = 0;
var snakeColor = "#770b0b";
var score = 0;
var original = false;

var snakeSize = 4;
var dead = false;
var dir = "d";
var food = [];

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

function addZero (num){
    if (num < 10)
        return "0" + num.toString();
    else
        return num.toString();
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
            snakeColor = color;
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
    document.getElementById('0702').style.backgroundColor=snakeColor;
    document.getElementById('0602').style.backgroundColor=snakeColor;
    document.getElementById('0502').style.backgroundColor=snakeColor;
    document.getElementById('0402').style.backgroundColor=snakeColor;
    document.getElementById('0302').style.backgroundColor=snakeColor;

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
    document.getElementById(foodS).style.backgroundColor="yellow";
}


function update(){
    score = snakeB.length - 4
    document.getElementById("score").innerHTML = "Score: " + score
    snakeB.unshift([snakeH[0], snakeH[1]]); // Add to array
    if (dir == "r")
        snakeH[0] += 1;
    else if (dir == "l")
        snakeH[0] += -1;
    else if (dir == "u")
        snakeH[1] += -1;
    else if (dir == "d")
        snakeH[1] += 1;

    var headPos = addZero(snakeH[0]) + addZero(snakeH[1]) // Sets the next head coord as red
    document.getElementById(headPos).style.backgroundColor=snakeColor

     
    if (!(snakeH[0] == food[0] && snakeH[1] == food[1])){ // Not Hit food
        var tailPosA = snakeB.pop() // Remove from array
        var tailPos = addZero(tailPosA[0]) + addZero(tailPosA[1])
        document.getElementById(tailPos).style.backgroundColor="gray"
    }
    else { // Hit food
        makeFood();
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

    if (dead)
        clearInterval(stopInterval)
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
