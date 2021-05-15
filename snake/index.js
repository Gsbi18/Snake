
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 1;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;

const snakeParts = [];

let tailLenght = 0;

let applex = 5;
let appley = 5;
let xvelocity = 0;
let yvelocity = 0;


let score = 0;

function csiga() {
    speed = 5;
}
function kigyo() {
    speed = 10;
}
function nyul() {
    speed = 15;
}
function drawGame() {
    changeSnakepos();

    let result = isGameOver();
    if (result) {
        return;
    }

    clearScreen();
    checkapplecoll();
    drawApple();
    drawsnake();
    drawscore();
    setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
    let gameOver = false;

    //wals
    if (headX < 0) {
        gameOver = true;
    }
    if (headX > 20) {
        gameOver = true;
    }
    if (headY > 20) {
        gameOver = true;
    }
    if (headY < 0) {
        gameOver = true;
    }
    for (let i = 1; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = "50px Verdana";

        ctx.fillText("Vége van!", canvas.width / 4, canvas.height / 2);
    }


    return gameOver;
}

function drawscore() {
    ctx.fillStyle = 'white';

    ctx.font = "10px Verdana";
    ctx.fillText("Pontok: " + score, canvas.width - 65, 10,)
}
function clearScreen() {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}
function drawsnake() {
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }
    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLenght) {
        snakeParts.shift();
    }
}
function changeSnakepos() {
    headX = headX + xvelocity;
    headY = headY + yvelocity;
}
var img = document.getElementById("scream");

function drawApple() {
    ctx.fillStyle = ('red');
    ctx.fillRect(applex * tileCount, appley * tileCount, tileSize, tileSize)
}
function checkapplecoll() {
    if (applex == headX && appley == headY) {
        applex = Math.floor(Math.random() * tileCount)
        appley = Math.floor(Math.random() * tileCount)
        tailLenght++;
        score++;
    }
}
document.body.addEventListener('keydown', keyDown)

function keyDown(event) {
    if (event.keyCode == 38) {
        if (yvelocity == 1)
            return;
        yvelocity = -1;
        xvelocity = 0;
    }
    if (event.keyCode == 40) {
        if (yvelocity == -1)
            return;
        yvelocity = 1;
        xvelocity = 0;
    }
    if (event.keyCode == 37) {
        if (xvelocity == 1)
            return;
        yvelocity = 0;
        xvelocity = -1;
    }
    if (event.keyCode == 39) {
        if (xvelocity == -1)
            return;
        yvelocity = 0;
        xvelocity = 1;
    }
}
drawGame();
