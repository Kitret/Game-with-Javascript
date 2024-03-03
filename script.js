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
            this.enemyInterval=500;
            this.enemyTimer=0;
            this.enemyType=["worms","ghosts","spiders"];
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
                enemy.update(deltaTime);
            });
        }
    
        draw() {
            this.enemies.forEach((enemy) => {
                enemy.draw(this.ctx);
            });
        }
    
        #addNewEnemy() {
            const randomEnemy=this.enemyType[Math.floor(Math.random()*this.enemyType.length)];
            if(randomEnemy==="worms") {
                this.enemies.push(new Worm(this));
            }
            else if(randomEnemy==="ghosts") {
                this.enemies.push(new Ghost(this));
            }
            else if(randomEnemy==="spiders") {
                this.enemies.push(new Spider(this));
            }
            this.enemies.sort((a, b) => {
                return a.y-b.y;
            })
        }
    }
    
    class Enemy {
        constructor(game) {
            if(this.constructor===Enemy) {
                throw new Error("Abstract Class");
            }
            this.game=game;
            this.width=100;
            this.height=100;
            this.x=this.game.width;
            this.y=Math.random() * this.game.height;
            this.markedForDelete=false;
            this.frame=0;
            this.frameInterval=100;
            this.frameTimer=0;
        }
    
        update(deltaTime) {
            if(this.frameTimer>this.frameInterval) {
                this.frame++;
                this.frame%=this.maxFrame;
                this.frameTimer=0;
            }
            else {
                this.frameTimer+=deltaTime;
            }
            this.x-=this.vx*deltaTime;
            if(this.x<-this.width) {
                this.markedForDelete=true;
            }
        }
    
        draw(ctx) {
            // ctx.fillRect(this.x,this.y,this.width,this.height);
            ctx.drawImage(this.image,this.frame*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
        }
    }

    class Worm extends Enemy {
        constructor(game) {
            super(game);
            this.spriteWidth=229;
            this.spriteHeight=171;
            this.width=this.spriteWidth/2;
            this.height=this.spriteHeight/2;
            this.x=this.game.width;
            this.y=this.game.height-this.height;
            this.maxFrame=6;
            this.vx=Math.random() * 0.1 + 0.1;
            this.image=worm;
        }
    }

    class Ghost extends Enemy {
        constructor(game) {
            super(game);
            this.spriteWidth=261;
            this.spriteHeight=209;
            this.width=this.spriteWidth/2;
            this.height=this.spriteHeight/2;
            this.x=this.game.width;
            this.y=Math.random() * this.game.height * 0.6;
            this.maxFrame=6;
            this.vx=Math.random() * 0.2 + 0.1;
            this.image=ghost;
            this.angle=0;
            this.curve=Math.random()*3;
        }

        update(deltaTime) {
            super.update(deltaTime);
            this.y+=Math.sin(this.angle)*this.curve;
            this.angle+=0.04;
            this.angle%=360;
        }

        draw(ctx) {
            ctx.save();
            ctx.globalAlpha=0.7;
            super.draw(ctx);
            ctx.restore();
        }
    }

    class Spider extends Enemy {
        constructor(game) {
            super(game);
            this.spriteWidth=310;
            this.spriteHeight=175;
            this.width=this.spriteWidth/2;
            this.height=this.spriteHeight/2;
            this.x=Math.random() * this.game.width * 0.8;
            this.y=0-this.height;
            this.maxFrame=6;
            this.vx=0;
            this.vy=Math.random() * 0.2 + 1;
            this.image=spider;
            this.maxLength=Math.random()*this.game.height;
        }

        update(deltaTime) {
            super.update(deltaTime);
            this.y+=this.vy*deltaTime/3;
            if(this.y>this.maxLength) {
                this.vy*=-1;
            }
            if(this.y<0-this.height*2) {
                this.markedForDelete=true;
            }
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.moveTo(this.x+this.width/2,0);
            ctx.lineTo(this.x+this.width/2,this.y+10);
            ctx.stroke();
            super.draw(ctx);
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