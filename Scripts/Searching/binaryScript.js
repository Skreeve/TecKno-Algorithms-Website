function init() {
    reset();
}

function reset() {
    low = 0;
    high = SIZE - 1;
    i = 0;
    document.getElementById('highlight').style.visibility = 'hidden';
    document.getElementById('lowPosition').style.visibility = 'hidden';
    document.getElementById('lowValue').style.visibility = 'hidden';
    document.getElementById('midPosition').style.visibility = 'hidden';
    document.getElementById('midValue').style.visibility = 'hidden';
    document.getElementById('highPosition').style.visibility = 'hidden';
    document.getElementById('highValue').style.visibility = 'hidden';
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
        document.getElementById(id).style.color = "#37826c";
    }
}

function sortNumber(a, b) {
    return a - b;
}

function setRandomValue() {
    listValues = [];
    for (var i = 0; i < SIZE; i++) {
        listValues.push(Math.floor(Math.random() * 100));
    }
    listValues.sort(sortNumber);
    for (var i = 0; i < SIZE; i++) {
        id = 'list' + i;
        document.getElementById(id).innerHTML =
                listValues[i];
    }
}

function draw() {
    var count = 0;
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < 20; j++) {
            id = 'cell' + j;
            // document.write(id.toString());
            document.getElementById(id).style.top = (i + 1) * 40 + 30 + "px";
            document.getElementById(id).style.left = (j + 1) * 40 + "px";
//                  if (count++ % 2 == 0)
//                      document.getElementById(id).style.backgroundColor = "#37826c";
//                  else
//                      document.getElementById(id).style.backgroundColor = "lightGray";

            document.getElementById(id).innerHTML = "2";
        }
        count++;
    }
}

function step() {
            document.getElementById('lowPosition').style.visibility = 'visible';
    document.getElementById('lowValue').style.visibility = 'visible';
    document.getElementById('highPosition').style.visibility = 'visible';
    document.getElementById('highValue').style.visibility = 'visible';

    var idLow = 'list' + low;
    posLow = getElementPos(document.getElementById(idLow));
    document.getElementById('lowPosition').style.top
            = posLow.y - 30 + "px";
    document.getElementById('lowPosition').style.left
            = posLow.x + posLow.w / 2 - 5 + "px";
    document.getElementById('lowValue').style.top
            = posLow.y - 43 + "px";
    document.getElementById('lowValue').style.left
            = posLow.x + posLow.w / 2 - 18 + "px";
    document.getElementById('lowValue').innerHTML = "low: " + low;


    var idHigh = 'list' + high;
    posHigh = getElementPos(document.getElementById(idHigh));

    if (high != low) {
        document.getElementById('highPosition').style.top
                = posHigh.y - 48 + "px";
        document.getElementById('highPosition').style.left
                = posHigh.x + posHigh.w / 2 - 5 + "px";
    } else {
        document.getElementById('highPosition').style.visibility = 'hidden';
    }

    document.getElementById('highValue').style.top
            = posHigh.y - 63 + "px";
    document.getElementById('highValue').style.left
            = posHigh.x + posHigh.w / 2 - 18 + "px";
    document.getElementById('highValue').innerHTML = "high: " + high;


    if (high < low) {
        var id1 = 'check' + i;
        document.getElementById(id1).innerHTML = "&#x2717;";
        document.getElementById('remark').innerHTML =
                'No match and the search is exhausted.';
        jAlert("No match. Search is finished. The method will return " + (-1 - low) + ".");

        return;
    }

    document.getElementById('midPosition').style.visibility = 'visible';
    document.getElementById('midValue').style.visibility = 'visible';

    mid = Math.floor((low + high) / 2);

    document.getElementById('value').disabled = true;
    var key = document.getElementById('value').value;
    i = mid;
    var id = 'list' + i;
    posLoc = getElementPos(document.getElementById(id));

    if (mid == low || mid == high) {
        document.getElementById('midPosition').style.visibility = 'hidden';
    }
    else {
        document.getElementById('midPosition').style.top
                = posLoc.y - 40 + "px";
        document.getElementById('midPosition').style.left
                = posLoc.x + posLoc.w / 2 - 5 + "px";
    }

    document.getElementById('midValue').style.top
            = posLoc.y - 53 + "px";
    document.getElementById('midValue').style.left
            = posLoc.x + posLoc.w / 2 - 18 + "px";
    document.getElementById('midValue').innerHTML = "mid: " + i;

    document.getElementById('highlight').style.top =
            posLoc.y + posLoc.h + 30 + "px";
    document.getElementById('highlight').style.left =
            posLoc.x + "px";
    document.getElementById('highlight').style.width =
            posLoc.w + "px";
    document.getElementById('highlight').style.height =
            posLoc.h + 10 + "px";
    document.getElementById('highlight').innerHTML = key;
    document.getElementById('highlight').style.visibility = 'visible';
    resetColor();
    document.getElementById(id).style.backgroundColor =
            "lightCoral";
    document.getElementById(id).style.color = "black";
    if (key == document.getElementById(id).innerHTML) {
        var id1 = 'check' + i;
        document.getElementById(id1).innerHTML = "&#x2713;";
        document.getElementById('remark').innerHTML =
                'A key is found';
        jAlert("A key is found with the index " + i);
        return;
    }
    else if (key < listValues[mid]) {
        high = mid - 1;
        var id1 = 'check' + i;
        document.getElementById(id1).innerHTML = "&#x2717;";
        document.getElementById('remark').innerHTML = 'Since ' +
                key + ' is less than ' + document.getElementById(id).innerHTML + ', ' +
                'continue to search left.';
    }
    else {
        low = mid + 1;
        var id1 = 'check' + i;
        document.getElementById(id1).innerHTML = "&#x2717;";
        document.getElementById('remark').innerHTML = 'Since ' +
                key + ' is greater than ' + document.getElementById(id).innerHTML + ', ' +
                'continue to search right.';
    }



}

function init1() {
    posLoc = getElementPos(document.getElementById('program'));
    x = posLoc.x;
    y = posLoc.y;
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < 20; j++) {
            var id = 'cell' + j;
//                document.getElementById(id).style.visibility = "hidden";
            document.getElementById(id).style.top = y + i * 40 + "px";
            document.getElementById(id).style.left = x + j * 40 + "px";
//                  $(id).css("top", y + 90 + j * 40)
//                          .css("left", x + 115 - 3 / 2 + i * 40);
        }
    }
}
