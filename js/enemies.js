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
        this.x-=(this.game.speed-this.speedX);
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
        this.x=this.game.width+Math.random()*this.game.width*0.5;
        this.y=Math.random()*this.game.height*0.5;
        this.speedX=Math.random()+1;
        this.speedY=0;
        this.maxFrame=6;
        this.markedForDelete=false;
        this.image=document.getElementById("enemy_fly");
        this.angle=0;
        this.va=Math.random()*0.1+0.1;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.angle+=this.va;
        this.angle%=360;
        this.y+=Math.sin(this.angle);
    }

    draw(ctx) {
        super.draw(ctx);
    }
}

export class GroundEnemy extends Enemy {
    constructor(game) {
        super();
        this.game=game;
        this.width=60;
        this.height=87;
        this.x=this.game.width;
        this.y=this.game.height-this.game.groundMargin-this.height;
        this.image=document.getElementById("enemy_plant");
        this.maxFrame=2;
        this.speedX=0;
        this.speedY=0;
    }

    update(deltaTime) {
        super.update(deltaTime);
    }

    draw(ctx) {
        super.draw(ctx);
    }
}

export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game=game;
        this.width=120;
        this.height=144;
        this.x=this.game.width;
        this.y=Math.random()*this.game.height*0.5;
        this.image=document.getElementById("enemy_spider");
        this.maxFrame=6;
        this.speedX=0;
        this.speedY=Math.random()>0.5 ? 1 : -1;
    }

    update(deltaTime) {
        super.update(deltaTime);
        if(this.y>this.game.height-this.height-this.game.groundMargin) {
            this.speedY*=-1;
        }
        if(this.y<-this.height) {
            this.markedForDelete=true;
        }
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        ctx.moveTo(this.x+this.width/2,0);
        ctx.lineTo(this.x+this.width/2,this.y+this.height/3);
        ctx.stroke();
    }
}