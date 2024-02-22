const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 700;
const CANVAS_HEIGHT = canvas.height = 500;

const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0;

    }

    update() {
        this.frame++;
    }

    draw() {
        ctx.drawImage(this.image,this.frame * this.spriteWidth, this.spriteHeight,this.x,this.y,this.spriteWidth,this.spriteHeight);
    }
}

window.addEventListener('click', (e) => {
    ctx.fillStyle = "white";
    ctx.fillRect(e.x - canvasPosition.left - 25,e.y - canvasPosition.top - 25,50,50);
});
