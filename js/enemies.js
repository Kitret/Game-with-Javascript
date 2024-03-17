class Enemy {
    constructor() {
        this.frameX=0;
        this.frameY=0;
        this.fps=20;
        this.frameInterval=1000/this.fps;
        this.frameTimer=0;
    }

    update(deltaTime) {
        // movement
        this.x-=this.speedX;
        this.y+=this.speedY;
        this.frameTimer+=deltaTime;
        if(this.frameTimer>=this.frameInterval) {
            this.frameX++;
            this.frameX%=this.maxFrame;
            this.frameTimer=0;
        }
        if(this.x<-this.width) {
            this.markedForDelete=true;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height);
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game=game;
        this.width=60;
        this.height=40;
        this.x=200;
        this.y=200;
        this.speedX=3;
        this.speedY=0;
        this.maxFrame=6;
        this.markedForDelete=false;
        this.image=document.getElementById("enemy_fly");
    }

    update(deltaTime) {
        super.update(deltaTime);
    }

    draw(ctx) {
        super.draw(ctx);
    }
}

export class GroundEnemy extends Enemy {

}

export class ClimbingEnemy extends Enemy {

}