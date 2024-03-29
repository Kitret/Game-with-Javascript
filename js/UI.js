/** @type {HTMLCanvasElement}*/

export class UI {
    constructor(game) {
        this.game=game;
        this.fontSize=30;
        this.fontFamily="Creepster";
        this.livesImage=document.getElementById("lives");
    }

    draw(ctx) {
        ctx.save();
        ctx.font = this.fontSize+"px "+this.fontFamily;
        ctx.shadowOffsetX=3;
        ctx.shadowOffsetY=3;
        ctx.shadowColor="white";
        ctx.shadowBlur=1;
        ctx.textAlign="left";
        ctx.fillStyle=this.game.fontColor;

        // score
        ctx.fillText("Score : " + this.game.score, 20, 50);
        // timer
        ctx.font = this.fontSize*0.8+"px "+this.fontFamily;
        ctx.fillText("Timer : "+(this.game.time/1000).toFixed(1),20,80);
        // lives
        for(let i=0;i<this.game.lives;i++) {
            ctx.drawImage(this.livesImage,20+i*25,95,25,25);
        }

        // game Over Message
        if(this.game.gameOver) {
            if(this.game.score>10) {
                ctx.textAlign="center";
                ctx.font = this.fontSize*2+"px "+this.fontFamily;
                ctx.fillText("Boo-Yaah!!" , this.game.width*0.5,this.game.height*0.5-20);
                ctx.font = this.fontSize*0.7+"px "+this.fontFamily;
                ctx.fillText("What are Creatures of the night afraid Of ?? YOU!!" , this.game.width*0.5,this.game.height*0.5+20);
            }
            else {
                ctx.textAlign="center";
                ctx.font = this.fontSize*1.5+"px "+this.fontFamily;
                ctx.fillText("Love At First BITE !" , this.game.width*0.5,this.game.height*0.5-20);
                ctx.font = this.fontSize*0.7+"px "+this.fontFamily;
                ctx.fillText("Nope. Better Luck Next Time......" , this.game.width*0.5,this.game.height*0.5+20);
            }
        }
        ctx.restore();
    }
}