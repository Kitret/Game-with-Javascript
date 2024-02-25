/** @Type {HTMLCanvasElement} */
let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d",{willReadFrequently:true});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let collisionCanvas = document.getElementById("collisionDetectCanvas");
let collisionCtx = collisionCanvas.getContext("2d",{willReadFrequently:true});
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

ctx.font = "50px Impact";

let gameOver=false;
let score=0;
let ravens = [];
let ravenInterval=1000;
let lastTime=0;
let timeToNextRaven=0;
let explosions=[];

function drawScore() {
    ctx.fillStyle="black";
    ctx.fillText("Score : " + score,50,75);
    ctx.fillStyle="white";
    ctx.fillText("Score : " + score,55,80);
}

function drawGameOver() {
    ctx.textAlign="center";
    ctx.fillStyle="black";
    ctx.fillText("Game Over, Your Score is : " + score,canvas.width/2,canvas.height/2);
    ctx.fillStyle="white";
    ctx.fillText("Game Over, Your Score is : " + score,canvas.width/2,canvas.height/2);
}

window.addEventListener("click", (e) => {
    const detectPixelColor=collisionCtx.getImageData(e.x,e.y,1,1);
    const pc=detectPixelColor.data;
    ravens.forEach((raven) => {
        if(raven.randomColor[0]===pc[0] && raven.randomColor[1]===pc[1] && raven.randomColor[2]===pc[2]) {
            raven.markedForDeletion=true;
            score++;
            explosions.push(new Explosions(raven.x,raven.y,raven.width));
        }
    });
});

class Explosions {
    constructor(x,y,size) {
        this.image=new Image();
        this.image.src="img/boom.png";
        this.spriteWidth=200;
        this.spriteHeight=179;
        this.size=size;
        this.x=x;
        this.y=y;
        this.frame=0;
        this.sound=new Audio();
        this.sound.src="img/boom.wav";
        this.timeSinceLastFrame=0;
        this.frameInterval=200;
        this.markedForDeletion=false;
    }

    update(deltaTime) {
        if(this.frame===0) this.sound.play();
        this.timeSinceLastFrame+=deltaTime;
        if(this.timeSinceLastFrame>this.frameInterval) {
            this.timeSinceLastFrame=0;
            this.frame++;
            if(this.frame>5) {
                this.markedForDeletion=true;
            }
        }
    }

    draw() {
        ctx.drawImage(this.image,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y-(this.size/4),this.size,this.size);
    }
}

class Raven {
    constructor() {
        this.spriteWidth=271;
        this.spriteHeight=194;
        this.frame=0;
        this.sizeModifier=Math.random() * 0.6 + 0.4;
        this.width=this.spriteWidth*this.sizeModifier;
        this.height=this.spriteHeight*this.sizeModifier;
        this.x=canvas.width;
        this.y=Math.random() * (canvas.height - this.height);
        this.directionX=Math.random()*5+3;
        this.directionY=Math.random()*5-2.5;
        this.markedForDeletion=false;
        this.image=new Image();
        this.image.src="img/raven.png";
        this.maxFrame=4;
        this.flapSpeed=Math.random()*50+50;
        this.timeSinceFlap=0;
        this.randomColor=[Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)];
        this.color="rgb("+this.randomColor[0]+","+this.randomColor[1]+","+this.randomColor[2]+")";
    }

    update(deltaTime) {
        this.timeSinceFlap+=deltaTime;
        if(this.timeSinceFlap>this.flapSpeed) {
            this.frame++;
            this.frame%=this.maxFrame;
            this.timeSinceFlap=0;
        }
        this.x-=this.directionX;
        this.y+=this.directionY;
        if(this.x+this.width<0) {
            this.markedForDeletion=true;
        }
        if(this.y<0 || this.y+this.height>canvas.height) {
            this.directionY*=-1;
        }
        if(this.x<-this.width) {
            gameOver=true;
        }
    }

    draw() {
        collisionCtx.fillStyle=this.color;
        collisionCtx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}

function animate(timestamp) {
    collisionCtx.clearRect(0,0,canvas.width,canvas.height);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let deltaTime=timestamp-lastTime;
    lastTime=timestamp;
    timeToNextRaven+=deltaTime;
    if(timeToNextRaven>ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven=0;
        ravens.sort((a, b) => {
            return a.width-b.width;
        });
    }

    drawScore();

    [...ravens,...explosions].forEach((object) => {
        object.update(deltaTime);
    });

    [...ravens,...explosions].forEach((object) => {
        object.draw();
    });

    ravens=ravens.filter(raven => !raven.markedForDeletion);
    explosions=explosions.filter(explosion => !explosion.markedForDeletion);
    if(!gameOver) requestAnimationFrame(animate);
    else drawGameOver();
}

animate(0);