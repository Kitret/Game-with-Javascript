/** @Type {HTMLCanvasElement} */
let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ravens = [];
let ravenInterval=500;
let lastTime=0;
let timeToNextRaven=0;

class Raven {
    constructor() {
        this.width=100;
        this.height=50;
        this.x=canvas.width;
        this.y=Math.random() * (canvas.height - this.height);
        this.directionX=Math.random()*5+3;
        this.directionY=Math.random()*5-2.5;
    }

    update() {
        this.x-=this.directionX;
    }

    draw() {
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

function animate(timestamp) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let deltaTime=timestamp-lastTime;
    lastTime=timestamp;
    timeToNextRaven+=deltaTime;
    if(timeToNextRaven>ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven=0;
    }
    ravens.forEach((raven) => {
        raven.update();
        raven.draw();
    });
    requestAnimationFrame(animate);
}

animate(0);