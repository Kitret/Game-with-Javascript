import { Dust, Fire, Splash } from "./Particle.js";

const states = {
    SITTING:0,
    RUNNING:1,
    JUMPING:2,
    FALLING:3,
    ROLLING:4,
    DIVING:5,
    HIT:6
};

class State {
    constructor(state, game) {
        this.state=state;
        this.game=game;
    }
}

export class Sitting extends State {
    constructor(game) {
        super("SITTING", game);
    }

    enter() {
        this.game.player.frameX=0;
        this.game.player.frameY=5;
        this.game.player.maxFrame=5;
    }

    handleInput(input) {
        if(input.includes("ArrowLeft") || input.includes("ArrowRight")) {
            this.game.player.setState(states.RUNNING,1);
        }
        else if(input.includes("Enter")) {
            this.game.player.setState(states.ROLLING,2);
        }
    }
}

export class Running extends State {
    constructor(game) {
        super("RUNNING", game);
    }

    enter() {
        this.game.player.frameX=0;
        this.game.player.frameY=3;
        this.game.player.maxFrame=9;
    }

    handleInput(input) {
        this.game.particles.unshift(new Dust(this.game,this.game.player.x,this.game.player.y));

        if(input.includes("ArrowDown")) {
            this.game.player.setState(states.SITTING,0);
        }
        else if(input.includes("ArrowUp")) {
            this.game.player.setState(states.JUMPING,1);
        }
        else if(input.includes("Enter")) {
            this.game.player.setState(states.ROLLING,2);
        }
    }
}

export class Jumping extends State {
    constructor(game) {
        super("JUMPING",game);
    }

    enter() {
        this.game.player.frameX=0;
        if(this.game.player.onGround()) {
            this.game.player.vy-=20;
        }
        this.game.player.frameY=1;
        this.game.player.maxFrame=7;
    }

    handleInput(input) {
        if(this.game.player.vy>this.game.player.weight) {
            this.game.player.setState(states.FALLING,1);
        }
        else if(input.includes("ArrowDown")) {
            this.game.player.setState(states.DIVING,0);
        }
    }
}

export class Falling extends State {
    constructor(game) {
        super("FALLING",game);
    }

    enter() {
        this.game.player.frameX=0;
        this.game.player.frameY=2;
        this.game.player.maxFrame=7;
    }

    handleInput(input) {
        if(this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING,1);
        }
        else if(input.includes("ArrowDown")) {
            this.game.player.setState(states.DIVING,0);
        }
    }
}

export class Rolling extends State {
    constructor(game) {
        super("ROLLING",game);
    }

    enter() {
        this.game.player.frameX=0;
        this.game.player.frameY=6;
        this.game.player.maxFrame=7;
    }

    handleInput(input) {
        this.game.particles.unshift(new Fire(this.game,this.game.player.x,this.game.player.y));

        if(!input.includes("Enter") && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING,1);
        }
        else if(!input.includes("Enter") && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING,1);
        }
        else if(input.includes("ArrowDown") && !this.game.player.onGround()) {
            this.game.player.setState(states.DIVING,0);
        }
    }
}

export class Diving extends State {
    constructor(game) {
        super("DIVING",game);
    }

    enter() {
        this.game.player.frameX=0;
        this.game.player.frameY=6;
        this.game.player.maxFrame=7;
        this.game.player.vy=17;
    }

    handleInput(input) {
        this.game.particles.unshift(new Fire(this.game,this.game.player.x,this.game.player.y));

        if(this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING,1);
            for(let i=0;i<30;i++) {
                this.game.particles.unshift(new Splash(this.game,this.game.player.x,this.game.player.y));
            }
        }
        else if(input.includes("Enter") && this.game.player.onGround()) {
            this.game.player.setState(states.ROLLING,2);
        }
    }
}

export class Hit extends State {
    constructor(game) {
        super("HIT",game);
    }

    enter() {
        this.game.player.frameX=0;
        this.game.player.frameY=4;
        this.game.player.maxFrame=11;
    }

    handleInput(input) {
        if(this.game.player.frameX>=this.game.player.maxFrame-1 && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING,1);
        }
        else if(this.game.player.frameX>=this.game.player.maxFrame-1 && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING,2);
        }
    }
}