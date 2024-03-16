/** @type {HTMLCanvasElement}*/

export default class InputHandler {
    constructor() {
        this.lastKey="";
        window.addEventListener("keydown", (e) => {
            if(e.key==="ArrowLeft") {
                this.lastKey="PRESS left";
            }
            else if(e.key==="ArrowRight") {
                this.lastKey="PRESS right";
            }
            else if(e.key==="ArrowUp") {
                this.lastKey="PRESS up";
            }
            else if(e.key==="ArrowDown") {
                this.lastKey="PRESS down";
            }
        });

        window.addEventListener("keyup", (e) => {
            if(e.key==="ArrowLeft") {
                this.lastKey="RELEASE left";
            }
            else if(e.key==="ArrowRight") {
                this.lastKey="RELEASE right";
            }
            else if(e.key==="ArrowUp") {
                this.lastKey="RELEASE up";
            }
            else if(e.key==="ArrowDown") {
                this.lastKey="RELEASE down";
            }
        });
    }
}