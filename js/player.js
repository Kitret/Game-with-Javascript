/** @type {HTMLCanvasElement}*/

import { Sitting, Running, Jumping, Falling } from "./playerStates.js";

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
        this.states=[new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
        this.currentState=this.states[0];
        this.currentState.enter();
    }

    update(input,deltaTime) {
        // handle input
        this.currentState.handleInput(input);

        // horizontal movement
        this.x+=this.speed;
        if(input.includes("ArrowRight")) this.speed=this.maxSpeed;
        else if(input.includes("ArrowLeft")) this.speed=-this.maxSpeed;
        else this.speed=0;

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
        if(this.y>=this.game.height-this.height) this.y=this.game.height-this.height-this.game.groundMargin;

        // animation 
        this.frameTimer+=deltaTime;
        if(this.frameTimer>=this.frameInterval) {
            this.frameX++;
            this.frameX%=this.maxFrame;
            this.frameTimer=0;
        }
    }

    draw(ctx) {
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
}