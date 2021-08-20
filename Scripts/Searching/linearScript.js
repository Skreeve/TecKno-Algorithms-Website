function pad(number, size) {
    if (number < 10) {
        return number + space(size - 1);
    }
    else if (number < 100) {
        return number + space(size - 2);
    }
    else if (number < 1000) {
        return number + space(size - 3);
    }
    else if (number < 10000) {
        return number + space(size - 4);
    }
    else {
        return number;
    }
}

function space(n) {
    result = "";
    for (var i = 0; i < n; i++) {
        result += " ";
    }
    return result;
}

function getElementPos(element) {
    var res = new Object();
    res.x = 0;
    res.y = 0;
    res.w = 0;
    res.h = 0;

    var box = element.getBoundingClientRect();

    res.x = box.left;
    res.y = box.top;
    res.w = box.right - box.left - 5;
    res.h = box.bottom - box.top - 5;

    return res;
}

function HighLight() {
    this.width = 318;
    this.height = 10;
    this.top = 77;
    this.left = 62;
}

function Explanation() {
    this.innerHTML = "";
    this.left = 448;
    this.width = 158;
    this.height = 40;
    this.top = 75;
}

function CommandPrompt() {
    this.innerHTML = "";
    this.left = 448;
    this.width = 158;
    this.height = 40;
    this.top = 65;
    this.isVisible = true;
}

function display(currentLine) {

    if (commandPrompt[currentLine].isVisible) {
        document.getElementById('commandPrompt').style.visibility = 'visible';
        document.getElementById('commandPromptContent').innerHTML = commandPrompt[currentLine].innerHTML;
    }
    else {
        document.getElementById('commandPrompt').style.visibility = 'hidden';
    }
}



function init() {
    reset();
}

function reset() {
    i = 0;
    document.getElementById('highlight').style.visibility = 'hidden';
    document.getElementById('iPosition').style.visibility = 'hidden';
    document.getElementById('iValue').style.visibility = 'hidden';
    setRandomValue();
    resetColor();
    document.getElementById('remark').innerHTML = 'A new random list is created';
    document.getElementById('value').disabled = false;

    for (var j = 0; j < SIZE; j++) {
        id = 'check' + j;
        document.getElementById(id).innerHTML = "";
    }
}

function resetColor() {
    for (var i = 0; i < SIZE; i++) {
        id = 'list' + i;
        document.getElementById(id).style.backgroundColor = "white";
        document.getElementById(id).style.color = "#37826C";
        document.getElementById('remark').style.backgroundColor =
                        "CadetBlue";
        document.getElementById('remark').style.color = "black";
    }
}

function setRandomValue() {
    for (var i = 0; i < SIZE; i++) {
        id = 'list' + i;
        document.getElementById(id).innerHTML =
                Math.floor(Math.random() * 100);
    }
}

function draw() {
    var count = 0;
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < 20; j++) {
            id = 'cell' + j;
            document.getElementById(id).style.top = (i + 1) * 40 + 30 + "px";
            document.getElementById(id).style.left = (j + 1) * 40 + "px";

            document.getElementById(id).innerHTML = "2";
        }
        count++;
    }
}

var k = 0;
var queens = [-1, -1, -1, -1, -1, -1, -1, -1];
/ Search for a solution */
function search() {
    // k - 1 indicates the number of queens placed so far
    // We are looking for a position in the kth row to place a queen

    // Find a position to place a queen in the kth row
    var j = findPosition(k);
    if (j < 0) {
        displayQueens();
        document.getElementById('highlight').style.visibility = 'visible';
        document.getElementById('highlight').style.top = y + (k) * 40 + "px";
        document.getElementById('highlight').style.left = x + "px";
        queens[k] = -1;
        k--; // back track to the previous row


        document.getElementById('status').innerHTML
                = "No queen can be placed in row " + (k + 2)
                + ". Backtrack to the row " + (k + 1);
    } else {
        queens[k] = j;
        k++;
        displayQueens();
        if (k == 8) {
            document.getElementById('status').innerHTML
                    = "A solution is found.";
        }
        else {
            document.getElementById('status').innerHTML
                    = "A queen is placed in row " + k;
        }
    }
}

function findPosition(k) {
    var start = queens[k] + 1; // Search for a new placement

    for (var j = start; j < 8; j++) {
        if (isValid(k, j))
            return j; // (k, j) is the place to put the queen now
    }

    return -1;
}

/ Return true if a queen can be placed at (row, column) */
function isValid(row, column) {
    for (var i = 1; i <= row; i++)
        if (queens[row - i] == column // Check column
                || queens[row - i] == column - i // Check upleft diagonal
                || queens[row - i] == column + i) // Check upright diagonal
            return false; // There is a conflict
    return true; // No conflict
}

function next() {
    if (k == 8) {
        document.getElementById('status').innerHTML
                = "A solution is already found. Click Restart to start over.";
    }
    search();
}

function restart() {
    document.getElementById('status').innerHTML
            = "";
    k = 0;
    queens = [-1, -1, -1, -1, -1, -1, -1, -1];
    displayQueens();
    document.getElementById('highlight').style.visibility = 'hidden';
}

function step() {
    document.getElementById('iPosition').style.visibility = 'visible';
    document.getElementById('iValue').style.visibility = 'visible';
    document.getElementById('value').disabled = true;
    var key = document.getElementById('value').value;
    var id = 'list' + i;
    posLoc = getElementPos(document.getElementById(id));

    document.getElementById('iPosition').style.top
            = posLoc.y - 40 + "px";
    document.getElementById('iPosition').style.left
            = posLoc.x + posLoc.w / 2 - 5 + "px";

    document.getElementById('iValue').style.top
            = posLoc.y - 53 + "px";
    document.getElementById('iValue').style.left
            = posLoc.x + posLoc.w / 2 - 7 + "px";
    document.getElementById('iValue').innerHTML = "i: " + i;

document.getElementById('highlight').style.top =
            posLoc.y + posLoc.h + 30 + "px";
    document.getElementById('highlight').style.left =
            posLoc.x + "px";
    document.getElementById('highlight').style.width =
            posLoc.w + "px";
    document.getElementById('highlight').style.height =
            posLoc.h + 10 + "px";
    document.getElementById('highlight').innerHTML = key;
    document.getElementById('highlight').style.visibility = 'hidden';
    resetColor();
    document.getElementById(id).style.backgroundColor =
            "lightCoral";
    document.getElementById(id).style.color = "black";
    if (key == document.getElementById(id).innerHTML) {
        var id1 = 'check' + i;
        document.getElementById(id1).innerHTML = "&#x2713;";
        document.getElementById(id).style.backgroundColor =
                "Aquamarine";
        document.getElementById('remark').innerHTML = 'Test if ' +
                key + ' == ' + document.getElementById(id).innerHTML + '. ' +
                'A key is found at index: ' + i;
        document.getElementById('remark').style.backgroundColor =
                        "Aquamarine";
        document.getElementById('remark').style.color = "black";

        jAlert("A key is found with the index " + i);
    }
    else if (i == SIZE - 1) {
        var id1 = 'check' + i;
        document.getElementById(id1).innerHTML = "&#x2717;";

        document.getElementById('remark').innerHTML = 'Test if ' +
                key + ' == ' + document.getElementById(id).innerHTML + '. ' +
                'No match and the search is exhausted.';
                document.getElementById('remark').style.backgroundColor =
                                "lightCoral";
                document.getElementById('remark').style.color = "black";
        jAlert("A key is not found. The method will return -1 ");
    }
    else {
        var id1 = 'check' + i;
        document.getElementById(id1).innerHTML = "&#x2717;";

        document.getElementById('remark').innerHTML = 'Test if ' +
                key + ' == ' + document.getElementById(id).innerHTML + '. ' +
                'No match and continue to search for the next match.';
                document.getElementById('remark').style.backgroundColor =
                                "CadetBlue";
                document.getElementById('remark').style.color = "black";
        i++;
    }
}

function init1() {
    posLoc = getElementPos(document.getElementById('program'));
    x = posLoc.x;
    y = posLoc.y;
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < 20; j++) {
            var id = 'cell' + j;
            document.getElementById(id).style.top = y + i * 40 + "px";
            document.getElementById(id).style.left = x + j * 40 + "px";
        }
    }
}
