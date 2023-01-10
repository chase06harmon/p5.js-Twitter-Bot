// Title: p5.js Display
// Contributed by: Chase Harmon


var data;
var happened;
var colors = ['x', 'x', 'x', 'x', 'x'];
var newColors = ["x", "x", "x", "x", "x"];
const correlation = ['zero', 'one', 'two', 'three', 'four'];

function countNum() {
    var comparison = 0;
    for (var i = 0; i < 5; i++) {
        if (newColors[i] != colors[i]) {
            num++;
        }
    }
    if (num > 0) {
        num = 0;
        for (var i = 0; i < 5; i++) {
            if (newColors[i] != 'x') {
                num++;
            }
        }
    }
    for (var i = 0; i < num; i++) {
        if (newColors[i] == colors[i]) {
            comparison++;
        }
    }
    if (comparison == num) {
        num = 0;
    }
}

function bumpColors() {
    for (var j = 4; j - num >= 0; j--) {
        colors[j] = colors[j - num];
    }
}

function replaceColors() {
    for (var k = 0; k < num; k++) {
        colors[k] = newColors[k];
    }
    num = 0;
}

var num = 0;

function colorChanger() {
    httpGet('http://127.0.0.1:3000/', 'json', false, async (response) => {

        newColors[0] = response.zero;
        newColors[1] = response.one;
        newColors[2] = response.two;
        newColors[3] = response.three;
        newColors[4] = response.four;

        await countNum();

        await bumpColors();

        await replaceColors();



    });
}
// Global vars
const w = helpers.canvas.width;
const h = helpers.canvas.height

setInterval(colorChanger, 10000)

// Setup
function setup() {
    createCanvas(w, h);

}
var x = 0;
function draw() {
    for (var i = 0; i < 5; i++) {
        fill(colors[i]);
        rect(w / 5 * i, 0, w / 5, h);
    }

}