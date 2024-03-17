/** @type {HTMLCanvasElement}*/

import {Player} from './js/player.js';
import {InputHandler} from './js/input.js';
import { Background } from './js/background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './js/enemies.js';

window.addEventListener("DOMContentLoaded", () => {
    let lastTime=0;

    const canvas=document.getElementById("canvas1");
    const ctx=canvas.getContext("2d");
    canvas.width=500;
    canvas.height=500;

    class Game {
        constructor(width,height) {
            this.width=width;
            this.height=height;
            this.groundMargin=80;
            this.speed=0;
            this.background=new Background(this);
            this.player=new Player(this);
            this.input=new InputHandler();
            this.enemies=[];
            this.enemyTimer=0;
            this.enemyInterval=1000;
        }

        update(deltaTime) {
            this.background.update();
            this.player.update(this.input.keys,deltaTime);
            this.enemyTimer+=deltaTime;
            if(this.enemyTimer>=this.enemyInterval) {
                this.enemies=this.enemies.filter(object => !object.markedForDelete);
                this.#addEnemy();
                this.enemyTimer=0;
                console.log(this.enemies);
            }
            this.enemies.forEach((enemy) => {
                enemy.update();
            });
        }

        draw(ctx) {
            this.background.draw(ctx);
            this.player.draw(ctx);
            this.enemies.forEach((enemy) => {
                enemy.draw(ctx);
            });
        }

        #addEnemy() {
            this.enemies.push(new FlyingEnemy(this));
        }
    }
    
    const game = new Game(canvas.width,canvas.height);
    
    function animate(timestamp) {
        let deltaTime=timestamp-lastTime;
        lastTime=timestamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate(0);
});