/** @type {HTMLCanvasElement}*/

import {Player} from './js/player.js';
import {InputHandler} from './js/input.js';
import { Background } from './js/background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './js/enemies.js';
import { UI } from './js/UI.js';

window.addEventListener("DOMContentLoaded", () => {
    let lastTime=0;

    const canvas=document.getElementById("canvas1");
    const ctx=canvas.getContext("2d");
    canvas.width=1000;
    canvas.height=500;

    class Game {
        constructor(width,height) {
            this.score=0;
            this.width=width;
            this.height=height;
            this.groundMargin=80;
            this.speed=0;
            this.background=new Background(this);
            this.player=new Player(this);
            this.input=new InputHandler(this);
            this.UI=new UI(this);
            this.enemies=[];
            this.particles=[];
            this.enemyTimer=0;
            this.enemyInterval=1000;
            this.debug=false;
            this.fontColor="black";
            this.collisions=[];
            this.lives=5;
            this.winningScore=20;
            this.time=0;
            this.maxTime=40000;
            this.gameOver=false;
            this.player.currentState=this.player.states[0];
            this.player.currentState.enter();
        }

        update(deltaTime) {
            this.time+=deltaTime;
            if(this.time>=this.maxTime) {
                this.gameOver=true;
            }

            this.background.update();
            this.player.update(this.input.keys,deltaTime);
            this.enemyTimer+=deltaTime;

            // handle enemies
            this.enemies=this.enemies.filter(object => !object.markedForDelete);
            if(this.enemyTimer>=this.enemyInterval) {
                this.#addEnemy();
                this.enemyTimer=0;
            }
            this.enemies.forEach((enemy) => {
                enemy.update(deltaTime);
            });

            // handle particles
            this.particles.forEach((particle,index) => {
                particle.update();
                if(particle.markedForDelete) this.particles.splice(index, 1);
            });

            
            // handle collision sprite
            this.collisions.forEach((collision,index) => {
                collision.update(deltaTime);
            });
            this.collisions=this.collisions.filter(collision => !collision.markedForDelete);
        }

        draw(ctx) {
            this.background.draw(ctx);
            this.player.draw(ctx);
            this.UI.draw(ctx);
            // draw enemies
            this.enemies.forEach((enemy) => {
                enemy.draw(ctx);
            });

            // draw particles
            this.particles.forEach((particle) => {
                particle.draw(ctx);
            });

            // drawCollsions
            this.collisions.forEach(collision => {
                collision.draw(ctx);
            });
        }

        #addEnemy() {
            if(this.speed>0 && Math.random()<0.5) {
                this.enemies.push(new GroundEnemy(this));
            }
            else if(this.speed>0 && Math.random()>0.5) {
                this.enemies.push(new ClimbingEnemy(this));
            }
            if(Math.random()<0.5) {
                this.enemies.push(new FlyingEnemy(this));
            }
        }
    }
    
    const game = new Game(canvas.width,canvas.height);
    
    function animate(timestamp) {
        let deltaTime=timestamp-lastTime;
        lastTime=timestamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver) requestAnimationFrame(animate);
    }

    animate(0);
});