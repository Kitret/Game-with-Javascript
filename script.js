/** @Type {HTMLCanvasElement} */

document.addEventListener("DOMContentLoaded",(e) => {

    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight*2/3;
    let enemies=[];
    let score=0;
    let gameOver=false;

    class InputHandler {
        constructor() {
            this.keys = [];
            window.addEventListener("keydown",(e) => {
                if((e.key === "ArrowDown" || e.key==="ArrowUp" || e.key==="ArrowLeft" || e.key==="ArrowRight") && this.keys.indexOf(e.key)===-1) {
                    this.keys.push(e.key);
                }
            });

            window.addEventListener("keyup",(e) => {
                if((e.key === "ArrowDown" || e.key==="ArrowUp" || e.key==="ArrowLeft" || e.key==="ArrowRight")) {
                    this.keys.splice(this.keys.indexOf(e.key),1);
                }
            });
        }
    }

    class Player {
        constructor(gameWidth,gameHeight) {
            this.gameWidth=gameWidth;
            this.gameHeight=gameHeight;
            this.width=200;
            this.height=200;
            this.x=0;
            this.y=this.gameHeight-this.height;
            this.image=document.getElementById("playerImage");
            this.frameX=0;
            this.frameY=0;
            this.speed=0;
            this.vy=0;
            this.weight=1;
            this.maxFrameX0=9;
            this.fps=40;
            this.frameTimer=0;
            this.frameInterval=1000/this.fps;
        }

        update(input,deltaTime,enemies) {
            // collision detection
            enemies.forEach((enemy) => {
                const dx=(enemy.x+enemy.width/2)-(this.x+this.width/2);
                const dy=(enemy.y+enemy.height/2)-(this.y+this.height/2);
                const dist=Math.sqrt(dx*dx+dy*dy);
                if(dist<enemy.width/3+this.width/2) {
                    gameOver=true;
                }
            });

            if(this.frameTimer>=this.frameInterval) {
                this.frameX++;
                this.frameX%=this.maxFrameX;
                this.frameTimer=0;
            }
            else {
                this.frameTimer+=deltaTime;
            }
            if(input.keys.indexOf("ArrowRight") > -1) {
                this.speed+=5;
            }
            else if(input.keys.indexOf("ArrowLeft") > -1) {
                this.speed-=5;
            }
            else if(input.keys.indexOf("ArrowUp") > -1 && this.#onGround()) {
                this.vy-=28;
            }
            else {
                this.speed=0;
            }

            // Horizontal Movement
            this.x+=this.speed;
            if(this.x<0) this.x=0;
            if(this.x>this.gameWidth-this.width) this.x=this.gameWidth-this.width;

            // Vertical Movement
            this.y+=this.vy;
            if(!this.#onGround()) {
                this.vy+=this.weight;
                this.maxFrameX=6;
                this.frameY=1;
            }
            else {
                this.vy=0;
                this.maxFrameX=9;
                this.frameY=0;
            }
            if(this.y>this.gameHeight-this.height) this.y=this.gameHeight-this.height;
        }

        #onGround() {
            return this.y>=this.gameHeight-this.height;
        }

        draw(context) {
            context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height);
        }
    }

    class Background {
        constructor(gameWidth,gameHeight) {
            this.gameWidth=gameWidth;
            this.gameHeight=gameHeight;
            this.image=document.getElementById("backgroundImage");
            this.x=0;
            this.y=0;
            this.width=2400;
            this.height=720;
            this.speed=7;
        }

        update() {
            this.x-=this.speed;
            if(this.x<-this.width) this.x=0;
        }

        draw(context) {
            context.drawImage(this.image,this.x,this.y,this.width,this.height);
            context.drawImage(this.image,this.x+this.width-this.speed,this.y,this.width,this.height);
        }
    }

    class Enemy {
        constructor(gameWidth,gameHeight) {
            this.gameWidth=gameWidth;
            this.gameHeight=gameHeight;
            this.width=160;
            this.height=119;
            this.x=this.gameWidth;
            this.y=this.gameHeight-this.height;
            this.frame=0;
            this.maxFrame=6;
            this.fps=40;
            this.frameInterval=1000/this.fps;
            this.interval=0;
            this.image=document.getElementById("enemyImage");
            this.speed=8;
            this.markForDelete=false;
        }

        update(deltaTime) {
            this.x-=this.speed;
            if(this.x<-this.width) {
                this.markForDelete=true;
                score++;
            }
            this.interval+=deltaTime;
            if(this.interval >= this.frameInterval) {
                this.frame++;
                this.frame%=this.maxFrame;
                this.interval=0;
            }
        }

        draw(context) {
            context.drawImage(this.image,this.frame*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
        }
    }

    function handleEnemies(deltaTime) {
        if(enemyTime>=enemyInterval+randomEnemyInterval) {
            enemies.push(new Enemy(canvas.width,canvas.height));
            randomEnemyInterval=Math.random()*1000+500;
            enemyTime=0;
        }
        else {
            enemyTime+=deltaTime;
        }
        enemies.forEach((enemy) => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });
        enemies=enemies.filter(object => !object.markForDelete);
    }

    function displayStatusText(context) {
        context.font="40px Helvetica";
        context.fillStyle="black";
        context.fillText("Score : "+score,20,50);
        context.fillStyle="white";
        context.fillText("Score : "+score,22,52);
        if(gameOver) {
            context.textAlign="center";
            context.fillStyle="black";
            context.fillText("Game Over! Try Again",canvas.width/2,200);
            context.fillStyle="white";
            context.fillText("Game Over! Try Again",canvas.width/2+2,200);
        }
    }

    const input = new InputHandler();
    const player = new Player(canvas.width,canvas.height);
    const background = new Background(canvas.weight,canvas.height);

    let lastTime=0;
    let enemyTime=0;
    let enemyInterval=2000;
    let randomEnemyInterval=Math.random()*1000+500;

    function animate(timestamp) {
        const deltaTime=timestamp-lastTime;
        lastTime=timestamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        background.update(deltaTime);
        background.draw(ctx);
        player.draw(ctx);
        player.update(input,deltaTime,enemies);
        handleEnemies(deltaTime);
        displayStatusText(ctx);
        if(!gameOver) requestAnimationFrame(animate);
    }

    animate(0);
});


