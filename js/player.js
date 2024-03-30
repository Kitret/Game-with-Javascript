/** @type {HTMLCanvasElement}*/

import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from "./playerStates.js";
import { Collision } from "./Collision.js";

export class Player {
    constructor(game) {
        this.game=game;
        this.width=100;
        this.height=91.3;
        this.x=0;
        this.y=this.game.height-this.height-this.game.groundMargin;
        this.image=document.getElementById("player");
        this.frameX=0;
        this.maxFrame=7;
        this.frameY=0;
        this.speed=0;
        this.maxSpeed=10;
        this.vy=0;
        this.weight=1;
        this.fps=20;
        this.frameTimer=0;
        this.frameInterval=1000/this.fps;
        this.states=[new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
    }

    update(input,deltaTime) {
        this.checkCollision();

        // handle input
        this.currentState.handleInput(input);

        // horizontal movement
        this.x+=this.speed;
        if(input.includes("ArrowRight")) this.speed=this.maxSpeed;
        else if(input.includes("ArrowLeft")) this.speed=-this.maxSpeed;
        else this.speed=0;

        // horizontal boundary
        if(this.x<=0) this.x=0;
        else if(this.x>=this.game.width-this.width) this.x=this.game.width-this.width;

        // vertical movement
        if(input.includes("ArrowUp") && this.onGround()) this.vy=-20;
        this.y+=this.vy;
        if(!this.onGround()) {
            this.vy+=this.weight;
        }
        else {
            this.vy=0;
        }

        // vertical boundary
        if(this.y>=this.game.height-this.height-this.game.groundMargin) this.y=this.game.height-this.height-this.game.groundMargin;

        // animation 
        this.frameTimer+=deltaTime;
        if(this.frameTimer>=this.frameInterval) {
            this.frameX++;
            this.frameX%=this.maxFrame;
            this.frameTimer=0;
        }
    }

    draw(ctx) {
        if(this.game.debug) ctx.strokeRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height);
    }

    onGround() {
        return this.y>=this.game.width-this.width-this.game.groundMargin;
    }

    setState(state,speed) {
        this.currentState=this.states[state];
        this.game.speed=this.maxSpeed*speed;
        this.currentState.enter();
    }

    checkCollision() {
        this.game.enemies.forEach(enemy => {
            if(enemy.x<=this.x+this.width && this.x<=enemy.x+enemy.width && enemy.y<=this.y+this.height && this.y<=enemy.y+enemy.height) {
                // collision Detected
                enemy.markedForDelete=true;
                this.game.collisions.push(new Collision(this.game,enemy.x+enemy.width*0.5,enemy.y+enemy.height*0.5));
                if(this.currentState===this.states[4] || this.currentState===this.states[5]) {
                    this.game.score++;
                }
                else {
                    this.setState(6,0);
                    this.game.lives--;
                    if(this.game.lives<=0) {
                        this.game.gameOver=true;
                    }
                }
            }
        });
    }
}