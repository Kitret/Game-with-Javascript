/** @type {HTMLCanvasElement}*/

export const states={
    STANDING_LEFT:0,
    STANDING_RIGHT:1,
    SITTING_LEFT:2,
    SITTING_RIGHT:3,
    RUNNING_LEFT:4,
    RUNNING_RIGHT:5,
    JUMPING_LEFT:6,
    JUMPING_RIGHT:7,
    FALLING_LEFT:8,
    FALLING_RIGHT:9
}

class State {
    constructor(state) {
        this.state=state;
    }
}

export class StandingLeft extends State {
    constructor(player) {
        super("STANDING LEFT");
        this.player=player;
    }

    enter() {
        this.player.frameY=1;
        this.player.speed=0;
        this.player.maxFrame=7;
    }

    handleInput(input) {
        if(input==="PRESS right") { // if right is pressed then change state to running right
            this.player.setState(states.RUNNING_RIGHT);
        }
        else if(input==="PRESS left") { // if left is pressed then change state to running left
            this.player.setState(states.RUNNING_LEFT);
        }
        else if(input==="PRESS down") { // if down is pressed then change the state to sitting right
            this.player.setState(states.SITTING_LEFT);
        }
        else if(input==="PRESS up") { // if up is pressed jump to the left
            this.player.setState(states.JUMPING_LEFT);
        }
    }
}

export class StandingRight extends State {
    constructor(player) {
        super("STANDING RIGHT");
        this.player=player;
    }

    enter() {
        this.player.frameY=0;
        this.player.speed=0;
        this.player.maxFrame=7;
    }

    handleInput(input) {
        if(input==="PRESS left") { // if right is pressed then change state to running left
            this.player.setState(states.RUNNING_LEFT);
        }
        else if(input==="PRESS right") { // if right is pressed then change state to running right
            this.player.setState(states.RUNNING_RIGHT);
        }
        else if(input==="PRESS down") { // if down is pressed then change the state to sitting left
            this.player.setState(states.SITTING_RIGHT);
        }
        else if(input==="PRESS up") { // if up is pressed jump to the right
            this.player.setState(states.JUMPING_RIGHT);
        }
    }
}

export class SittingLeft extends State {
    constructor(player) {
        super("SITTING LEFT");
        this.player=player;
    }

    enter() {
        this.player.frameY=9;
        this.player.speed=0;
        this.player.maxFrame=5;
    }

    handleInput(input) {
        if(input==="PRESS right") { // if right is pressed then change state to sitting right
            this.player.setState(states.SITTING_RIGHT);
        }
        else if(input==="RELEASE down") { // if up is released then change state to standing up
            this.player.setState(states.STANDING_LEFT);
        }
    }
}

export class SittingRight extends State {
    constructor(player) {
        super("SITTING RIGHT");
        this.player=player;
    }

    enter() {
        this.player.frameY=8;
        this.player.speed=0;
        this.player.maxFrame=5;
    }

    handleInput(input) {
        if(input==="PRESS left") { // if left is pressed then change state to sitting left
            this.player.setState(states.SITTING_LEFT);
        }
        else if(input==="RELEASE down") { // if up is released then change state to standing up
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}

export class RunningRight extends State {
    constructor(player) {
        super("RUNNING RIGHT");
        this.player=player;
    }

    enter() {
        this.player.frameY=6;
        this.player.speed=this.player.maxSpeed;
        this.player.maxFrame=9;
    }

    handleInput(input) {
        if(input==="PRESS left") { // if left is pressed then run left direction
            this.player.setState(states.RUNNING_LEFT);
        }
        if(input==="RELEASE right") { // if right is released then change state to standing left
            this.player.setState(states.STANDING_RIGHT);
        }
        else if(input==="PRESS down") { // if down is pressed then change state to sitting right
            this.player.setState(states.SITTING_RIGHT);
        }
    }
}

export class RunningLeft extends State {
    constructor(player) {
        super("RUNNING LEFT");
        this.player=player;
    }

    enter() {
        this.player.frameY=7;
        this.player.speed=-this.player.maxSpeed;
        this.player.maxFrame=9;
    }

    handleInput(input) {
        if(input==="PRESS right") { // if right is pressed then run right direction
            this.player.setState(states.RUNNING_RIGHT);
        }
        if(input==="RELEASE left") { // if left is released then change state to standing left
            this.player.setState(states.STANDING_LEFT);
        }
        else if(input==="PRESS down") { // if down is released then change state to sitting left
            this.player.setState(states.SITTING_LEFT);
        }
    }
}

export class JumpingLeft extends State {
    constructor(player) {
        super("JUMPING LEFT");
        this.player=player;
    }

    enter() {
        this.player.maxFrame=7;
        this.player.frameY=3;
        if(this.player.onGround()) this.player.vy-=20;
        this.player.speed=-this.player.maxSpeed*0.5;
    }

    handleInput(input) {
        if(input==="PRESS right") { // if right is pressed change the direction to right
            this.player.setState(states.JUMPING_RIGHT);
        }
        else if(this.player.onGround()) { // if player is on ground change state to standing left
            this.player.setState(states.STANDING_LEFT);
        }
        else if(this.player.vy>0) { // if player velocity in y direction becomes greater than 0 then change state to falling
            this.player.setState(states.FALLING_LEFT);
        }
    }
}

export class JumpingRight extends State {
    constructor(player) {
        super("JUMPING RIGHT");
        this.player=player;
    }

    enter() {
        this.player.maxFrame=7;
        this.player.frameY=2;
        if(this.player.onGround()) this.player.vy-=20;
        this.player.speed=this.player.maxSpeed*0.5;
    }

    handleInput(input) {
        if(input==="PRESS left") { // if left is pressed change the direction to left
            this.player.setState(states.JUMPING_LEFT);
        }
        else if(this.player.onGround()) { // if player is on ground change state to standing right
            this.player.setState(states.STANDING_RIGHT);
        }
        else if(this.player.vy>0) { // if player velocity in y direction becomes greater than 0 then change state to falling
            this.player.setState(states.FALLING_RIGHT);
        }
    }
}

export class FallingLeft extends State {
    constructor(player) {
        super("FALLING LEFT");
        this.player=player;
    }

    enter() {
        this.player.maxFrame=7;
        this.player.frameY=5;
    }

    handleInput(input) {
        if(input==="PRESS right") { // if right is pressed change the direction to right
            this.player.setState(states.FALLING_RIGHT);
        }
        else if(this.player.onGround()) { // if player is on ground change state to standing left
            this.player.setState(states.STANDING_LEFT);
        }
    }
}

export class FallingRight extends State {
    constructor(player) {
        super("FALLING Right");
        this.player=player;
    }

    enter() {
        this.player.maxFrame=7;
        this.player.frameY=4;
    }

    handleInput(input) {
        if(input==="PRESS left") { // if left is pressed change the direction to left
            this.player.setState(states.FALLING_LEFT);
        }
        else if(this.player.onGround()) { // if player is on ground change state to standing right
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}
