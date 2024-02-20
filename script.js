/** @Type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 10;

const enemyImg = new Image();
enemyImg.src = "img/enemy1.png";

let gameFrame=0;
class Enemy {
    constructor(image) {
        this.image = image;
        this.speed = Math.random() * 4;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.2;
        this.curve = Math.random() * 7;
    }
    
    update() {
        this.x-=this.speed;
        if(this.x + this.width < 0) this.x = CANVAS_WIDTH;
        this.y+=this.curve * Math.sin(this.angle);
        this.angle+=this.angleSpeed;
        if(gameFrame % this.flapSpeed === 0) {
            this.frame+=1;
            this.frame%=4;
        }
    }

    draw() {
        ctx.drawImage(this.image,this.frame * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}

const enemies = [];
for(let i=0;i<numberOfEnemies;i++) {
    enemies.push(new Enemy(enemyImg));
}

function animation() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    gameFrame++;
    enemies.forEach((enemy) => {
        enemy.update();
        enemy.draw();
    });
    requestAnimationFrame(animation);
};

animation();