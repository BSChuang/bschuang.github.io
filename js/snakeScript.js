var canvas;
var score = 0;
var snake;
var snakeSize = 5;
var food;
function CanvasSetup (){
    canvas = document.getElementById("canvas");
    canvas.width=screen.width *9/10;
    canvas.height=screen.height * 3/4;
}