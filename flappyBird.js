const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Load Images

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// Load sound

const fly = new Audio();
const scoreSound = new Audio();

fly.src = "sounds/fly.mp3"
scoreSound.src = "sounds/score.mp3"


// Some variables
let gap = 85;
let constant = pipeNorth.height + gap;

let speed = 2;
let up = 30;
let distance = 100;

let birdX = 50;
let birdY = 150;

let gravity = 2;

let score = 0;

// Pipe Coordonates

let pipe = [];

pipe[0] = {
    x : canvas.width,
    y: 0
}

// On key down 

window.addEventListener("keydown", moveup);

function moveup(){
    fly.play();
    birdY -= up;
}

// Draw 

function draw (){
    context.drawImage(bg,0, 0);

    for (let i = 0; i < pipe.length; i++) {
        context.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        context.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
        pipe[i].x -= speed;

        // New Pipe Push
        if( pipe[i].x == distance){
            score++;
            scoreSound.play();
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            }) 
        }            
        // Detect collision
        if(
            (birdX + bird.width >= pipe[i].x &&
            birdX  <= pipe[i].x + pipeNorth.width &&
            (birdY  <= pipe[i].y + pipeNorth.height || 
            birdY + bird.height >= pipe[i].y + constant)) ||
            birdY + bird.height >= canvas.height - fg.height
            )
            {
           location.reload();
             }
    }

    context.drawImage(bird, birdX, birdY);
    context.drawImage(fg,0, canvas.height - fg.height);
    birdY += gravity;

    context.fillStyle = "#000";
    context.font = "20px Verdana";
    context.fillText("Score :" + score, 10, canvas.height - 10);
    requestAnimationFrame(draw);
}
draw();
