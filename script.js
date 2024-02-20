const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed=5;

const backgroundImg1 = new Image();
backgroundImg1.src = "img/layer-1.png";
const backgroundImg2 = new Image();
backgroundImg2.src = "img/layer-2.png";
const backgroundImg3 = new Image();
backgroundImg3.src = "img/layer-3.png";
const backgroundImg4 = new Image();
backgroundImg4.src = "img/layer-4.png";
const backgroundImg5 = new Image();
backgroundImg5.src = "img/layer-5.png";

window.addEventListener("load", () => {

    const slider = document.getElementById("slider");
    slider.value = gameSpeed;
    const showgameSpeed = document.getElementById("showGameSpeed");
    showgameSpeed.innerHTML = gameSpeed;
    slider.addEventListener("change",(e) => {
        gameSpeed = e.target.value;
        showgameSpeed.innerHTML = e.target.value;
    });
    
    class Layer {
        constructor(image,speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
    
        update() {
            this.speed = gameSpeed * this.speedModifier;
            if(this.x <= -this.width) {
                this.x = 0;
            }
            this.x = Math.floor(this.x - this.speed);
        }
    
        draw() {
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
            ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height);
        }
    }
    
    const layer1 = new Layer(backgroundImg1,0.2);
    const layer2 = new Layer(backgroundImg2,0.4);
    const layer3 = new Layer(backgroundImg3,0.6);
    const layer4 = new Layer(backgroundImg4,0.8);
    const layer5 = new Layer(backgroundImg5,1);
    
    const gameObj = [layer1,layer2,layer3,layer4,layer5];
    
    function animate() {
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        gameObj.forEach((obj) => {
            obj.update();
            obj.draw();
        });
        requestAnimationFrame(animate);
    };
    
    animate();
    
});
