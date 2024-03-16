/** @type {HTMLCanvasElement}*/

export function drawStatusText(context,input,player) {
    context.font = "28px Helvetica";
    context.fillText("Last Input : "+input.lastKey,30,60);
    context.fillText("Player State : "+player.currentState.state,30,100);
}