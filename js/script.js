var size = 50;
var chosenColor = "blue"
var blue = [1, 5, 7]
var red = []
var green = []

function setColor(num) {
    document.getElementById("getStarted").innerHTML= screen.width + " x " + screen.height;
    
    if (chosenColor == "blue")
        blue.push(num)
    makeTable()
}

function makeTable() {
    var myTable = "<table style='width: " + screen.width + "px; height:" + screen.height + "px'>" 
    for (var i = 0; i < size; i++) { // Make table for size of pixel art
        myTable += "<tr >"
        for (var j = 0; j < size; j++) {
            var num = i*size + j;
            myTable += "<td onclick= 'setColor(" + num + ")' width: " + 100/size + "%; height: " + 100/size + "%; bgcolor='" + whatColor(num) + "'></td>"
        }
        myTable += "</tr>"
    }
    myTable += "</table>"

   document.getElementById('tablePrint').innerHTML = myTable;
}

function whatColor(num) {
    if (blue.indexOf(num) > -1)
        return "#0000ff";
    else if (red.indexOf(num) > -1)
        return "#0000ff";
    else if (green.indexOf(num) > -1)
        return "#0000ff";
    else
        return "#000000"
}