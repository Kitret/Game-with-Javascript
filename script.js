/** @Type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 20;

const enemyImg = new Image();
enemyImg.src = "img/enemy4.png";

let gameFrame=0;
class Enemy {
    constructor(image) {
        this.image = image;
        this.speed = Math.random() * 4;
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.newx = Math.random() * (CANVAS_WIDTH - this.width);
        this.newy = Math.random() * (CANVAS_HEIGHT - this.height);
        this.interval = Math.floor(Math.random() * 200 + 50);
    }
    
    update() {
        if(gameFrame % this.interval === 0) {
            this.newx = Math.random() * (CANVAS_WIDTH - this.width);
            this.newy = Math.random() * (CANVAS_HEIGHT - this.height);
        }
        let dx = this.x - this.newx;
        let dy = this.y - this.newy;
        this.x-=dx/20;
        this.y-=dy/20;
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