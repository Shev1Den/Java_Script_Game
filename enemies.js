import { WarriorIdleLeft, 
    WarriorIdleRight, 
    WarriorRunRight, 
    WarriorRunLeft, 
    WarriorWalkLeft, 
    WarriorWalkRight, 
    WarriorAttack1Left, 
    WarriorAttack1Right, 
    WarriorAttack2Left, 
    WarriorAttack2Right, 
    WarriorAttack3Left, 
    WarriorAttack3Right, 
    WarriorHurtLeft, 
    WarriorHurtRight } from "./warriorState.js";

class Enemy {
    constructor(game) {
        this.game = game;
        this.gameWidth = game.width;
        this.gameHeight = game.height;
        this.width = 128;
        this.height = 128;
        this.x = this.gameWidth - this.width;
        this.y = (this.gameHeight - this.height)
        this.reverseFrame = true;
        this.frameTimer = 0;
        this.fps = 60;
        this.intervalFrame = 1000 / this.fps;
    }
}

export class SkeletonWarrior extends Enemy {
    constructor(game) {
        super(game) 
        this.image = document.getElementById('warriorIdleRight');
        this.frameX = 0;
        this.maxFrame = 6;
        this.speed = 1.5;
        this.states = [new WarriorIdleLeft(game), 
            new WarriorIdleRight(game), 
            new WarriorRunLeft(game), 
            new WarriorRunRight(game), 
            new WarriorWalkLeft(game), 
            new WarriorWalkRight(game), 
            new WarriorAttack1Left(game), 
            new WarriorAttack1Right(game), 
            new WarriorAttack2Left(game), 
            new WarriorAttack2Right(game), 
            new WarriorAttack3Left(game), 
            new WarriorAttack3Right(game), 
            new WarriorHurtLeft(game), 
            new WarriorHurtRight(game)]
        this.currentState = this.states[0]
        this.checkIn = false
        this.checkerFrame = 0;
        this.stateInterval = 2000
        this.stateTimer = 0;


    }
    update(deltaTime) {
        console.log(this.currentState)
        console.log(this.game.player.currentState.state)
        console.log(this.game.player.currentState.state == 'JUMP_RIGHT')
        console.log(this.x)
        console.log(this.game.player.x - this.x)
        console.log(this.speed)
        // console.log(-((2 * 0.6) * 3))
        // console.log(this.frameX)
        // console.log(this.reverseFrame)
        // console.log(this.checkerFrame)
        if (this.frameTimer >= this.intervalFrame) {
            
                if (!this.reverseFrame) {
                    if (this.frameX < this.maxFrame) this.frameX++ 
                    else this.frameX = 0;
                    this.frameTimer = 0;

                    if(this.checkIn) {
                        if(this.checkerFrame == 2) {
                            this.checkerFrame = 0
                    } else if(this.frameX == 0) this.checkerFrame++
                    }
                    
            } 

                if (this.reverseFrame) {
                    if (this.frameX > 0) this.frameX -= 1 
                    else this.frameX = this.maxFrame
                    this.frameTimer = 0;

                    if(this.checkIn) {
                        if(this.checkerFrame == 2) {
                            this.checkerFrame = 0
                    } else if(this.frameX == this.maxFrame) this.checkerFrame++
                    }
            }
        } else this.frameTimer += deltaTime

        if(this.stateTimer < this.stateInterval) this.stateTimer += deltaTime;
        else this.stateTimer = 0;

          this.currentState.handleInput()

        if (this.game.player.x < this.x &&
            (
                this.game.enemies[0].currentState.state == 'ATTACK_1_LEFT' ||
                this.game.enemies[0].currentState.state == 'ATTACK_2_LEFT' ||
                this.game.enemies[0].currentState.state == 'ATTACK_3_LEFT'
            )
        ) {
            if (this.game.player.currentState.state == 'RUN_RIGHT') this.speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'WALK_RIGHT') this.speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'JUMP_RIGHT') this.speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'RUN_ATTACK_RIGHT') this.speed = ((2 * 0.6) * this.game.player.speed)
        }

        if (this.game.player.x > this.x &&
            (
                this.game.enemies[0].currentState.state == 'ATTACK_1_LEFT' ||
                this.game.enemies[0].currentState.state == 'ATTACK_2_LEFT' ||
                this.game.enemies[0].currentState.state == 'ATTACK_3_LEFT'
            )
        ) {
            if (this.game.player.currentState.state == 'RUN_RIGHT') this.speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'WALK_RIGHT') this.speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'JUMP_RIGHT') this.speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'RUN_ATTACK_RIGHT') this.speed = -((2 * 0.6) * this.game.player.speed)
        }
 
        if (this.game.player.x < this.x) this.x += -this.speed;
        if (this.game.player.x > this.x) this.x += this.speed;
        
    }
    setState(state) {
        this.currentState = this.states[state]
        this.currentState.enter()
    }
    draw(context) { 
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y - this.game.gameMargin * 1.25, this.width*1.5, this.height*1.5)
        context.strokeRect(this.x, this.y - this.game.gameMargin + 40, this.width * 1.5, this.height * 1.1)

    }
}