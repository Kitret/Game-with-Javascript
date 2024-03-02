/** @Type {HTMLCanvasElement} */
document.addEventListener("DOMContentLoaded", (e) => {

    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    const CANVAS_WIDTH = canvas.width = 500;
    const CANVAS_HEIGHT = canvas.height = 800;
    
    let lastTime=0;

    class Game {
        constructor(ctx,width,height) {
            this.width=width;
            this.height=height;
            this.ctx=ctx;
            this.enemies=[];
            this.enemyInterval=1000;
            this.enemyTimer=0;
        }
        
        update(deltaTime) {
            if(this.enemyTimer>this.enemyInterval) {
                this.enemies=this.enemies.filter(object => !object.markedForDelete);
                this.#addNewEnemy();
                this.enemyTimer=0;
            }
            else {
                this.enemyTimer+=deltaTime;
            }
            this.enemies.forEach((enemy) => {
                enemy.update();
            });
        }
    
        draw() {
            this.enemies.forEach((enemy) => {
                enemy.draw(this.ctx);
            });
        }
    
        #addNewEnemy() {
            this.enemies.push(new Worm(this));
        }
    }
    
    class Enemy {
        constructor(game) {
            this.game=game;
            this.width=100;
            this.height=100;
            this.x=this.game.width;
            this.y=Math.random() * this.game.height;
            this.markedForDelete=false;
        }
    
        update() {
            this.x--;
            if(this.x<-this.width) {
                this.markedForDelete=true;
            }
        }
    
        draw(ctx) {
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }
    }

    class Worm extends Enemy {
        constructor(game) {
            super(game);
            this.width=100;
            this.height=100;
            this.x=this.game.width;
            this.y=Math.random() * this.game.height;
            this.image=worm;
        }
    }
    
    const game=new Game(ctx,canvas.width,canvas.height);

    function animate(timestamp) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        let deltaTime=timestamp-lastTime;
        lastTime=timestamp;
        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    }
    
    animate(0);

});