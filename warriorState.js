export const states = {
    IDLE_LEFT: 0,
    IDLE_RIGHT: 1,
    RUN_LEFT: 2,
    RUN_RIGHT: 3,
    WALK_LEFT: 4,
    WALK_RIGHT: 5,
    ATTACK_1_LEFT: 6,
    ATTACK_1_RIGHT: 7,
    ATTACK_2_LEFT: 8,
    ATTACK_2_RIGHT: 9,
    ATTACK_3_LEFT: 10,
    ATTACK_3_RIGHT: 11,
    HURT_LEFT: 12, 
    HURT_RIGHT: 13,

}

class State {
    constructor(state, game) {
        this.game = game;
        this.state = state;
    
    }
}

export class WarriorIdleLeft extends State {
    constructor(game) {
        super('IDLE_LEFT', game);
    }
    enter() {
        this.game.enemies[0].image = document.getElementById('warriorIdleLeft')
        this.game.enemies[0].maxFrame = 6;
        this.game.enemies[0].frameX = this.game.enemies[0].maxFrame;
        this.game.enemies[0].reverseFrame = true;
        this.game.enemies[0].speed = 0;
        this.game.enemies[0].checkIn = false;
    }
    handleInput() {
        if(this.game.enemies[0].stateTimer >= this.game.enemies[0].stateInterval) {
            if(this.game.player.x - this.game.enemies[0].x > -this.game.player.width*1.25 && this.game.player.x - this.game.enemies[0].x < 0  && this.game.player.x < this.game.enemies[0].x) this.game.enemies[0].setState(states.ATTACK_1_LEFT)
        }
        if(this.game.player.x - this.game.enemies[0].x > -500 && this.game.player.x - this.game.enemies[0].x < -this.game.player.width*1.25 && this.game.player.x < this.game.enemies[0].x) this.game.enemies[0].setState(states.WALK_LEFT)
        if(this.game.player.x - this.game.enemies[0].x < 500 && this.game.player.x - this.game.enemies[0].x >  this.game.enemies[0].width && this.game.player.x > this.game.enemies[0].x) this.game.enemies[0].setState(states.WALK_RIGHT)
        if(this.game.player.x - this.game.enemies[0].x < -500 && this.game.player.x < this.game.enemies[0].x) this.game.enemies[0].setState(states.RUN_LEFT)
    
        if (this.game.player.x < this.x) {
            if (this.game.player.currentState.state == 'RUN_RIGHT') this.game.enemies[0].speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'WALK_RIGHT') this.game.enemies[0].speed = ((2 * 0.6) * this.game.player.speed);
            if (this.game.player.currentState.state == 'JUMP_RIGHT') this.game.enemies[0].speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'RUN_ATTACK_RIGHT') this.game.enemies[0].speed = ((2 * 0.6) * this.game.player.speed)
        }

        if (this.game.player.x > this.x) {
            if (this.game.player.currentState.state == 'RUN_RIGHT') this.game.enemies[0].speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'WALK_RIGHT') this.game.enemies[0].speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'JUMP_RIGHT') this.game.enemies[0].speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'RUN_ATTACK_RIGHT') this.game.enemies[0].speed = -((2 * 0.6) * this.game.player.speed)
        }
        }
}

export class WarriorIdleRight extends State {
    constructor(game) {
        super('IDLE_RIGHT', game);
        this.attackTimeoutSet = false;
       
    }
    enter() {
        this.game.enemies[0].image = document.getElementById('warriorIdleRight')
        this.game.enemies[0].frameX = 0;
        this.game.enemies[0].maxFrame = 6;
        this.game.enemies[0].reverseFrame = false;
        this.game.enemies[0].speed = 0;
        this.game.enemies[0].checkIn = false;
        

    }
    handleInput() {
        if(this.game.enemies[0].stateTimer >= this.game.enemies[0].stateInterval) {
            if(this.game.player.x - this.game.enemies[0].x < this.game.enemies[0].width*1.5 && this.game.player.x - this.game.enemies[0].x > 0  && this.game.player.x > this.game.enemies[0].x) this.game.enemies[0].setState(states.ATTACK_1_RIGHT)
        }
        if(this.game.player.x - this.game.enemies[0].x > -500 && this.game.player.x - this.game.enemies[0].x < -this.game.enemies[0].width*1.5 && this.game.player.x < this.game.enemies[0].x) this.game.enemies[0].setState(states.WALK_LEFT)
        if(this.game.player.x - this.game.enemies[0].x < 500 && this.game.player.x - this.game.enemies[0].x >  this.game.enemies[0].width*1.5 && this.game.player.x > this.game.enemies[0].x) this.game.enemies[0].setState(states.WALK_RIGHT)
        if(this.game.player.x - this.game.enemies[0].x > 500 && this.game.player.x > this.game.enemies[0].x) this.game.enemies[0].setState(states.RUN_RIGHT)
    }
}

export class WarriorRunLeft extends State {
    constructor(game) {
        super('RUN_LEFT', game);
    }
    enter() {
        this.game.enemies[0].image = document.getElementById('warriorRunLeft')
        this.game.enemies[0].maxFrame = 7;
        this.game.enemies[0].frameX = this.game.enemies[0].maxFrame;
        this.game.enemies[0].reverseFrame = true;
        this.game.enemies[0].speed = 2;
        this.game.enemies[0].checkIn = false;
    }
    handleInput() {
        if(this.game.player.x - this.game.enemies[0].x > -500 && this.game.player.x < this.game.enemies[0].x) this.game.enemies[0].setState(states.WALK_LEFT)
    }
}

export class WarriorRunRight extends State {
    constructor(game) {
        super('RUN_RIGHT', game);
    }
    enter() {
        this.game.enemies[0].image = document.getElementById('warriorRunRight')
        this.game.enemies[0].maxFrame = 7;
        this.game.enemies[0].frameX = 0;
        this.game.enemies[0].reverseFrame = false;
        this.game.enemies[0].speed = 2;
        this.game.enemies[0].checkIn = false;

    }
    handleInput() {
        if(this.game.player.x - this.game.enemies[0].x < 500 && this.game.player.x > this.game.enemies[0].x) this.game.enemies[0].setState(states.WALK_RIGHT)
    }
}

export class WarriorWalkLeft extends State {
    constructor(game) {
        super('WALK_LEFT', game);
    }
    enter() {
        this.game.enemies[0].reverseFrame = true;
        this.game.enemies[0].image = document.getElementById('warriorWalkLeft')
        this.game.enemies[0].maxFrame = 6;
        this.game.enemies[0].frameX = this.game.enemies[0].maxFrame;
        this.game.enemies[0].speed = 1.5;
        this.game.enemies[0].checkIn = false;
    }
    handleInput() {
        if(this.game.player.x - this.game.enemies[0].x < -500 && this.game.player.x < this.game.enemies[0].x) this.game.enemies[0].setState(states.RUN_LEFT)
        if(this.game.player.x - this.game.enemies[0].x <= -500 && this.game.player.x > this.game.enemies[0].x) this.game.enemies[0].setState(states.RUN_RIGHT)
        if(this.game.player.x - this.game.enemies[0].x > -this.game.player.width*1.25 && this.game.player.x - this.game.enemies[0].x < 0  && this.game.player.x < this.game.enemies[0].x) this.game.enemies[0].setState(states.ATTACK_1_LEFT)
        if(this.game.player.x - this.game.enemies[0].x > 500 && this.game.player.x < this.game.enemies[0].x) this.game.enemies[0].setState(states.WALK_LEFT)
        if (this.game.player.x - this.game.enemies[0].x > -500 && this.game.player.x > this.game.enemies[0].x) this.game.enemies[0].setState(states.WALK_RIGHT)

        }
}

export class WarriorWalkRight extends State {
    constructor(game) {
        super('WALK_RIGHT', game);
    }
    enter() {
        this.game.enemies[0].image = document.getElementById('warriorWalkRight')
        this.game.enemies[0].maxFrame = 6;
        this.game.enemies[0].frameX = 0;
        this.game.enemies[0].reverseFrame = false;
        this.game.enemies[0].speed = 1.5;
        this.game.enemies[0].checkIn = false;

    }
    handleInput() {
        if(this.game.player.x - this.game.enemies[0].x < this.game.enemies[0].width*1.5 && this.game.player.x - this.game.enemies[0].x > 0  && this.game.player.x > this.game.enemies[0].x) this.game.enemies[0].setState(states.ATTACK_1_RIGHT)
        if(this.game.player.x - this.game.enemies[0].x < 500 && this.game.player.x < this.game.enemies[0].x) this.game.enemies[0].setState(states.WALK_LEFT)
        if (this.game.player.x - this.game.enemies[0].x < -500 && this.game.player.x > this.game.enemies[0].x) this.game.enemies[0].setState(states.WALK_RIGHT)
        if(this.game.player.x - this.game.enemies[0].x > 500 && this.game.player.x > this.game.enemies[0].x) this.game.enemies[0].setState(states.RUN_RIGHT)
        
    }
}

export class WarriorAttack1Left extends State {
    constructor(game) {
        super('ATTACK_1_LEFT', game);
    }
    enter() {
        this.game.enemies[0].image = document.getElementById('warriorAttack_1_Left')
        this.game.enemies[0].maxFrame = 4;
        this.game.enemies[0].frameX = this.game.enemies[0].maxFrame;
        this.game.enemies[0].reverseFrame = true;
        this.game.enemies[0].frameX = 0;
        this.game.enemies[0].checkIn = true
        this.game.enemies[0].checkerFrame = 0

         if (this.game.player.x < this.x) {
            if (this.game.player.currentState.state == 'RUN_RIGHT') this.game.enemies[0].speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'WALK_RIGHT') this.game.enemies[0].speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'JUMP_RIGHT') this.game.enemies[0].speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'RUN_ATTACK_RIGHT') this.game.enemies[0].speed = ((2 * 0.6) * this.game.player.speed)
        }

        if (this.game.player.x > this.x) {
            if (this.game.player.currentState.state == 'RUN_RIGHT') this.game.enemies[0].speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'WALK_RIGHT') this.game.enemies[0].speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'JUMP_RIGHT') this.game.enemies[0].speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'RUN_ATTACK_RIGHT') this.game.enemies[0].speed = -((2 * 0.6) * this.game.player.speed)
        }

    }
    handleInput() {
        if (this.game.enemies[0].checkerFrame == 1) this.game.enemies[0].setState(states.ATTACK_2_LEFT)
        }
}

export class WarriorAttack1Right extends State {
    constructor(game) {
        super('ATTACK_1_RIGHT', game);
    }
    enter() {
        this.game.enemies[0].image = document.getElementById('warriorAttack_1_Right')
        this.game.enemies[0].maxFrame = 4;
        this.game.enemies[0].frameX = 0;
        this.game.enemies[0].reverseFrame = false;
        this.game.enemies[0].speed = 0;
        this.game.enemies[0].checkIn = true
        this.game.enemies[0].checkerFrame = 0
    }
    handleInput() {
        if (this.game.enemies[0].checkerFrame == 1) this.game.enemies[0].setState(states.ATTACK_2_RIGHT)
 
    }
}

export class WarriorAttack2Left extends State {
    constructor(game) {
        super('ATTACK_2_LEFT', game);
    }
    enter() {
        this.game.enemies[0].image = document.getElementById('warriorAttack_2_Left')
        this.game.enemies[0].maxFrame = 5;
        this.game.enemies[0].frameX = this.game.enemies[0].maxFrame;
        this.game.enemies[0].reverseFrame = true;
        this.game.enemies[0].frameX = 0;
        this.game.enemies[0].checkIn = true
        this.game.enemies[0].checkerFrame = 0

        if (this.game.player.x < this.x) {
           if (this.game.player.currentState.state == 'RUN_RIGHT') this.game.enemies[0].speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'WALK_RIGHT') this.game.enemies[0].speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'JUMP_RIGHT') this.game.enemies[0].speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'RUN_ATTACK_RIGHT') this.game.enemies[0].speed = ((2 * 0.6) * this.game.player.speed)
        }

        if (this.game.player.x > this.x) {
            if (this.game.player.currentState.state == 'RUN_RIGHT') this.game.enemies[0].speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'WALK_RIGHT') this.game.enemies[0].speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'JUMP_RIGHT') this.game.enemies[0].speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'RUN_ATTACK_RIGHT') this.game.enemies[0].speed = -((2 * 0.6) * this.game.player.speed)
        }

    


    }
    handleInput() {
        if (this.game.enemies[0].checkerFrame == 1) this.game.enemies[0].setState(states.ATTACK_3_LEFT)
        }
}

export class WarriorAttack2Right extends State {
    constructor(game) {
        super('ATTACK_2_RIGHT', game);
    }
    enter() {
        this.game.enemies[0].image = document.getElementById('warriorAttack_2_Right')
        this.game.enemies[0].maxFrame = 5;
        this.game.enemies[0].frameX = 0;
        this.game.enemies[0].reverseFrame = false;
        this.game.enemies[0].speed = 0;
        this.game.enemies[0].checkIn = true
        this.game.enemies[0].checkerFrame = 0

    }
    handleInput() {
        if (this.game.enemies[0].checkerFrame == 1) this.game.enemies[0].setState(states.ATTACK_3_RIGHT)

    }
}

export class WarriorAttack3Left extends State {
    constructor(game) {
        super('ATTACK_3_LEFT', game);
    }
    enter() {
        this.game.enemies[0].image = document.getElementById('warriorAttack_3_Left')
        this.game.enemies[0].maxFrame = 3;
        this.game.enemies[0].frameX = this.game.enemies[0].maxFrame;
        this.game.enemies[0].reverseFrame = true;
        this.game.enemies[0].frameX = 0;
        this.game.enemies[0].checkIn = true;
        this.game.enemies[0].checkerFrame = 0;

        if (this.game.player.x < this.x) {
            if (this.game.player.currentState.state == 'RUN_RIGHT') this.game.enemies[0].speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'WALK_RIGHT') this.game.enemies[0].speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'JUMP_RIGHT') this.game.enemies[0].speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'RUN_ATTACK_RIGHT') this.game.enemies[0].speed = ((2 * 0.6) * this.game.player.speed)
        }

        if (this.game.player.x > this.x) {
            if (this.game.player.currentState.state == 'RUN_RIGHT') this.game.enemies[0].speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'WALK_RIGHT') this.game.enemies[0].speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'JUMP_RIGHT') this.game.enemies[0].speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'RUN_ATTACK_RIGHT') this.game.enemies[0].speed = -((2 * 0.6) * this.game.player.speed)
        }

       
  

    }
    handleInput() {
        if(this.game.enemies[0].checkerFrame == 1) this.game.enemies[0].setState(states.IDLE_LEFT)
        }
}

export class WarriorAttack3Right extends State {
    constructor(game) {
        super('ATTACK_3_RIGHT', game);
    }
    enter() {
        this.game.enemies[0].image = document.getElementById('warriorAttack_3_Right')
        this.game.enemies[0].maxFrame = 3;
        this.game.enemies[0].frameX = 0;
        this.game.enemies[0].reverseFrame = false;
        this.game.enemies[0].speed = 0;
        this.game.enemies[0].checkIn = true
        this.game.enemies[0].checkerFrame = 0

    }
    handleInput() {
        if(this.game.enemies[0].checkerFrame == 1) this.game.enemies[0].setState(states.IDLE_RIGHT)
    }
}

export class WarriorHurtLeft extends State {
    constructor(game) {
        super('HURT_LEFT', game);
    }
    enter() {
        this.game.enemies[0].image = document.getElementById('warriorHurtLeft')
        this.game.enemies[0].maxFrame = 1;
        this.game.enemies[0].frameX = this.game.enemies[0].maxFrame;
        this.game.enemies[0].reverseFrame = true;
        this.game.enemies[0].speed = 0;
        this.game.enemies[0].checkIn = true
        this.game.enemies[0].checkerFrame = 0
  

    }
    handleInput() {
        if(this.game.enemies[0].checkerFrame == 1) this.game.enemies[0].setState(states.IDLE_LEFT)
        }
}

export class WarriorHurtRight extends State {
    constructor(game) {
        super('HURT_RIGHT', game);
    }
    enter() {
        this.game.enemies[0].image = document.getElementById('warriorHurtRight')
        this.game.enemies[0].maxFrame = 1;
        this.game.enemies[0].frameX = 0;
        this.game.enemies[0].reverseFrame = false;
        this.game.enemies[0].speed = 0;
        this.game.enemies[0].checkIn = true
        this.game.enemies[0].checkerFrame = 0

    }
    handleInput() {
        if(this.game.enemies[0].checkerFrame == 1) this.game.enemies[0].setState(states.IDLE_RIGHT)
    }
}



