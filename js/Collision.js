export class Collision {
    constructor(game,x,y) {
        this.game=game;
        this.image=document.getElementById("collision");
        this.spriteWidth=100;
        this.spriteHeight=90;
        this.sizeModifier=Math.random()*2;
        this.width=this.spriteWidth*this.sizeModifier;
        this.height=this.spriteHeight*this.sizeModifier;
        this.x=x-this.width*0.5;
        this.y=y-this.height*0.5;
        this.frameX=0;
        this.maxFrame=5;
        this.markedForDelete=false;
        this.fps=20;
        this.frameTimer=0;
        this.frameInterval=1000/this.fps;
    }

    update(deltaTime) {
        this.frameTimer+=deltaTime;
        this.x-=this.game.speed;
        if(this.frameTimer>=this.frameInterval) {
            this.frameX++;
            if(this.frameX==this.maxFrame) {
                this.frameX=0;
                this.markedForDelete=true;
            }
            this.frameTimer=0;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image,this.frameX*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}