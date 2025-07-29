export const states = {
    IDLE_RIGHT: 0,
    IDLE_LEFT: 1,
    WALK_RIGHT: 2,
    WALK_LEFT: 3,
    RUN_RIGHT: 4, 
    RUN_LEFT: 5,
    JUMP_RIGHT: 6,
    JUMP_LEFT: 7,
    ATTACK_1_RIGHT: 8,
    ATTACK_1_LEFT: 9,
    ATTACK_2_RIGHT: 10,
    ATTACK_2_LEFT: 11,
    ATTACK_3_RIGHT: 12,
    ATTACK_3_LEFT: 13,
    RUN_ATTACK_RIGHT: 14,
    RUN_ATTACK_LEFT: 15,
    HURT_RIGHT: 16,
    HURT_LEFT: 17,


}

class State {
    constructor(state, game) {
        this.game = game;
        this.state = state;
         
    }
}

export class IdleRight extends State {
    constructor(game) {
        super('IDLE_RIGHT', game)
    }
    enter() {
        this.game.player.reverseFrame = false;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 7;
        this.game.player.speed = 0;
        this.game.player.frameInterval = 1000 / this.game.player.fps;
        this.game.player.image = document.getElementById('playerIdleRight');

    }
    handleInput(input) {
        if (input.includes('f')) this.game.player.setState(states.ATTACK_1_RIGHT)
        if (input.includes('w') || input.includes('W')) this.game.player.setState(states.JUMP_RIGHT)
        if (input.includes('d')) this.game.player.setState(states.WALK_RIGHT)
        if (input.includes('D')) this.game.player.setState(states.RUN_RIGHT)
        if (input.includes('A')) this.game.player.setState(states.RUN_RIGHT)
        if(input.includes('a')) this.game.player.setState(states.WALK_LEFT)

    }
}

export class IdleLeft extends State {
    constructor(game) {
        super('IDLE_LEFT', game)
    }
    enter() {
        this.game.player.reverseFrame = true;
        this.game.player.maxFrame = 7;
        this.game.player.frameX = this.game.player.maxFrame;
        this.game.player.speed = 0;
        this.game.player.frameInterval = 1000 / this.game.player.fps;
        this.game.player.image = document.getElementById('playerIdleLeft');

    }
    handleInput(input) {
        if (input.includes('f')) this.game.player.setState(states.ATTACK_1_LEFT)
        if (input.includes('w') || input.includes('W')) this.game.player.setState(states.JUMP_LEFT)
        if (input.includes('d')) this.game.player.setState(states.WALK_RIGHT)
        if (input.includes('D')) this.game.player.setState(states.RUN_RIGHT)
        if (input.includes('A')) this.game.player.setState(states.RUN_LEFT)
        if(input.includes('a')) this.game.player.setState(states.WALK_LEFT)

    }
}

export class WalkRight extends State {
    constructor(game) {
        super('WALK_RIGHT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('playerWalkRight');
        this.game.player.reverseFrame = false;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.frameInterval = 1000 / this.game.player.fps;
        this.game.player.speed = 1;
    }
    handleInput(input) {
        if (input.includes('f')) this.game.player.setState(states.ATTACK_1_RIGHT)
        if (input.includes('w') || input.includes('W')) this.game.player.setState(states.JUMP_RIGHT)
        if (input.includes('s')) this.game.player.setState(states.IDLE_RIGHT)
        if (input.includes('a')) this.game.player.setState(states.WALK_LEFT)
        if (input.includes('D')) this.game.player.setState(states.RUN_RIGHT)
        if (input.includes('A')) this.game.player.setState(states.RUN_LEFT)      
    }
}

export class WalkLeft extends State {
    constructor(game) {
        super('WALK_LEFT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('playerWalkLeft');
        this.game.player.reverseFrame = true;
        this.game.player.maxFrame = 10;
        this.game.player.frameX = this.game.player.maxFrame;
        this.game.player.frameInterval = 1000 / this.game.player.fps;
        this.game.player.speed = -1;
    }
    handleInput(input) {
        if (input.includes('f')) this.game.player.setState(states.ATTACK_1_LEFT)
        if (input.includes('w') || input.includes('W')) this.game.player.setState(states.JUMP_LEFT)
        if (input.includes('s')) this.game.player.setState(states.IDLE_LEFT)
        if (input.includes('d')) this.game.player.setState(states.WALK_RIGHT)
        if (input.includes('D')) this.game.player.setState(states.RUN_RIGHT)
        if (input.includes('A')) this.game.player.setState(states.RUN_LEFT)     

    }
}

export class RunRight extends State {
    constructor(game) {
        super('RUN_RIGHT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('playerRunRight');
        this.game.player.reverseFrame = false;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameInterval = 1000 / this.game.player.fps;
        this.game.player.speed = 2;
    }
    handleInput(input) {
        if (input.includes(' ')) this.game.player.setState(states.RUN_ATTACK_RIGHT);
        if (input.includes('f')) this.game.player.setState(states.ATTACK_1_RIGHT)
        if (input.includes('w') || input.includes('W')) this.game.player.setState(states.JUMP_RIGHT)
        if (input.includes('s')) this.game.player.setState(states.IDLE_RIGHT)
        if (input.includes('d')) this.game.player.setState(states.WALK_RIGHT)
        if (input.includes('A')) this.game.player.setState(states.RUN_LEFT)
        if (input.includes('a')) this.game.player.setState(states.WALK_LEFT)

    }
}

export class RunLeft extends State {
    constructor(game) {
        super('RUN_LEFT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('playerRunLeft');
        this.game.player.reverseFrame = true;
        this.game.player.maxFrame = 8;
        this.game.player.frameX = this.game.player.maxFrame;
        this.game.player.frameInterval = 1000 / this.game.player.fps;
        this.game.player.speed = -2;
    }
    handleInput(input) {
        if (input.includes(' ')) this.game.player.setState(states.RUN_ATTACK_LEFT);

        if (input.includes('f')) this.game.player.setState(states.ATTACK_1_LEFT)
        if (input.includes('w') || input.includes('W')) this.game.player.setState(states.JUMP_LEFT)
        if (input.includes('s')) this.game.player.setState(states.IDLE_LEFT)
        if (input.includes('d')) this.game.player.setState(states.WALK_RIGHT)
        if (input.includes('D')) this.game.player.setState(states.RUN_RIGHT)
        if (input.includes('a')) this.game.player.setState(states.WALK_LEFT)

    }
}

export class JumpRight extends State {
    constructor(game) {
        super('JUMP_RIGHT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('playerJumpRight');
        this.game.player.reverseFrame = false;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.speed = 3;
        this.game.player.frameInterval = 50;
        this.game.player.vy = -20;
    }
    handleInput(input) {
        if (this.game.player.onGround()) {
            this.game.player.setState(states.IDLE_RIGHT)
                if (input.includes('s')) this.game.player.setState(states.IDLE_RIGHT)
                if (input.includes('d')) this.game.player.setState(states.WALK_RIGHT)
                if (input.includes('D')) this.game.player.setState(states.RUN_RIGHT)
                if (input.includes('a')) this.game.player.setState(states.WALK_LEFT)
        }
    }
}

export class JumpLeft extends State {
    constructor(game) {
        super('JUMP_LEFT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('playerJumpLeft');
        this.game.player.reverseFrame = true;
        this.game.player.maxFrame = 10;
        this.game.player.frameX = this.game.player.maxFrame;
        this.game.player.speed = -3;
        this.game.player.frameInterval = 50;
        this.game.player.vy = -20;
    }
    handleInput(input) {
        if (this.game.player.onGround()) {
                this.game.player.setState(states.IDLE_LEFT)
                if (input.includes('s')) this.game.player.setState(states.IDLE_LEFT)
                if (input.includes('d')) this.game.player.setState(states.WALK_RIGHT)
                if (input.includes('D')) this.game.player.setState(states.RUN_RIGHT)
                if (input.includes('a')) this.game.player.setState(states.WALK_LEFT)
        }
    }
}

export class Attack1Right extends State {
    constructor(game) {
        super('ATTACK_1_RIGHT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('playerAttack1Right');
        this.game.player.reverseFrame = false;
        this.game.player.frameX = 0
        this.game.player.maxFrame = 5;
        this.game.player.frameInterval = 50;
        this.game.player.speed = 0;
    }
    handleInput(input) {
        if (this.game.player.onGround()) {
            if (this.game.player.frameX === this.game.player.maxFrame && input.includes('f')) this.game.player.setState(states.ATTACK_2_RIGHT)
            if (this.game.player.frameX === this.game.player.maxFrame) this.game.player.setState(states.WALK_RIGHT)
        }
    }
}

export class Attack1Left extends State {
    constructor(game) {
        super('ATTACK_1_RIGHT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('playerAttack1Left');
        this.game.player.reverseFrame = true;
        this.game.player.maxFrame = 5;
        this.game.player.frameX = this.game.player.maxFrame;
        this.game.player.frameInterval = 50;
        this.game.player.speed = 0;
    }
    handleInput(input) {
        if (this.game.player.onGround()) {
            if (this.game.player.frameX  === 0 && input.includes('f')) this.game.player.setState(states.ATTACK_2_LEFT)
            if(this.game.player.frameX === 0) this.game.player.setState(states.WALK_LEFT)
        }
    }
}

export class Attack2Right extends State {
    constructor(game) {
        super('ATTACK_2_RIGHT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('playerAttack2Right');
        this.game.player.reverseFrame = false;
        this.game.player.frameX = 0
        this.game.player.maxFrame = 3;
        this.game.player.frameInterval = 50;
        this.game.player.speed = 0;
    }
    handleInput(input) {
        
        if (this.game.player.onGround()) {
            if (this.game.player.frameX === this.game.player.maxFrame && input.includes('f')) this.game.player.setState(states.ATTACK_3_RIGHT)
            if(this.game.player.frameX  === this.game.player.maxFrame ) this.game.player.setState(states.WALK_RIGHT)
        }
    }
}

export class Attack2Left extends State {
    constructor(game) {
        super('ATTACK_2_LEFT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('playerAttack2Left');
        this.game.player.reverseFrame = true;
        this.game.player.maxFrame = 3;
        this.game.player.frameX = this.game.player.maxFrame;
        this.game.player.frameInterval = 50;
        this.game.player.speed = 0;
    }
    handleInput(input) {
        
        if (this.game.player.onGround()) {
            if (this.game.player.frameX  === 0 && input.includes('f')) this.game.player.setState(states.ATTACK_3_LEFT)
            if(this.game.player.frameX  === 0) this.game.player.setState(states.WALK_LEFT)
        }
    }
}

export class Attack3Right extends State {
    constructor(game) {
        super('ATTACK_3_RIGHT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('playerAttack3Right');
        this.game.player.reverseFrame = false;
        this.game.player.frameX = 0
        this.game.player.maxFrame = 4;
        this.game.player.frameInterval = 50;
        this.game.player.speed = 0;
    }
    handleInput(input) {
        
        if (this.game.player.onGround()) {
            if(this.game.player.frameX  === this.game.player.maxFrame ) this.game.player.setState(states.WALK_RIGHT)
        }
    }
}

export class Attack3Left extends State {
    constructor(game) {
        super('ATTACK_3_LEFT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('playerAttack3Left');
        this.game.player.reverseFrame = true;
        this.game.player.maxFrame = 4;
        this.game.player.frameX = this.game.player.maxFrame;
        this.game.player.frameInterval = 50;
        this.game.player.speed = 0;
    }
    handleInput(input) {
        
        if (this.game.player.onGround()) {
            if (this.game.player.frameX === 0) this.game.player.setState(states.WALK_LEFT)
        }
    }
}

export class RunAttackRight extends State {
    constructor(game) {
        super('RUN_ATTACK_RIGHT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('playerRunAttackRight');
        this.game.player.reverseFrame = false;
        this.game.player.maxFrame = 6;
        this.game.player.frameX = 0;
        this.game.player.frameInterval = 50;
        this.game.player.speed = 2.5;
    }
    handleInput(input) {
        
        if (this.game.player.onGround()) {
            if (this.game.player.frameX === this.game.player.maxFrame) this.game.player.setState(states.RUN_RIGHT)
        }
    }
}

export class RunAttackLeft extends State {
    constructor(game) {
        super('RUN_ATTACK_LEFT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('playerRunAttackLeft');
        this.game.player.reverseFrame = true;
        this.game.player.maxFrame = 6;
        this.game.player.frameX = this.game.player.maxFrame;
        this.game.player.frameInterval = 50;
        this.game.player.speed = -2.5;
    }
    handleInput(input) {
        
        if (this.game.player.onGround()) {
            if (this.game.player.frameX === 0) this.game.player.setState(states.RUN_LEFT)
        }
    }
}

export class HurtRight extends State {
    constructor(game) {
        super('HURT_RIGHT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('playerHurtRight');
        this.game.player.reverseFrame = false;
        this.game.player.maxFrame = 1;
        this.game.player.frameX = 0;
        this.game.player.frameInterval = 200;
        this.game.player.speed = 0;
    }
    handleInput(input) {
        
        if (this.game.player.onGround()) {
            if (this.game.player.frameX === this.game.player.maxFrame) this.game.player.setState(states.IDLE_RIGHT)
        }
    }
}

export class HurtLeft extends State {
    constructor(game) {
        super('HURT_LEFT', game)
    }
    enter() {
        this.game.player.image = document.getElementById('playerHurtLeft');
        this.game.player.reverseFrame = true;
        this.game.player.maxFrame = 1;
        this.game.player.frameX = this.game.player.maxFrame;
        this.game.player.frameInterval = 200;
        this.game.player.speed = 0;
    }
    handleInput(input) {
        
        if (this.game.player.onGround()) {
            if (this.game.player.frameX === 0) this.game.player.setState(states.IDLE_LEFT)
        }
    }
}