
import { states } from "./PlayerState.js";
import { spearmanState } from "./spearmanState.js";

class Enemy {
    constructor(game) {
        this.game = game;
        this.gameWidth = game.width;
        this.gameHeight = game.height;
        this.width = 128;
        this.height = 128;
        this.x = this.gameWidth + this.width * 1.5;
        this.y = (this.gameHeight - this.height)
        this.reverseFrame = true;
        this.frameTimer = 0;
        this.fps = 60;
        this.intervalFrame = 1000 / this.fps;
    }
}


export class SkeletonSpearman extends Enemy {
    constructor(game) {
        super(game) 
        this.entity = "SkeletonSpearman"
        this.image = document.getElementById('spearmanIdleRight');
        this.frameX = 0;
        this.maxFrame = 6;
        this.speed = 1.5;
        this.state = "IDLE_LEFT"
        this.checkIn = false
        this.checkerFrame = 0;
        this.stateInterval = 2000
        this.stateTimer = 0;
        this.HP = 9;
        this.deadMarker = true; 


    }
    update(deltaTime) {
        // console.log(this.HP)
        // console.log(this.currentState)
        // console.log(this.game.player.currentState.state)
        // console.log(this.game.player.currentState.state == 'JUMP_RIGHT')
        // console.log(this.game.player.x - this.x + this.width*1.5)
        // console.log(this.x)
        // console.log(this.game.player.x - this.x)
        // console.log(this.speed)
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

          

        if (this.game.player.x < this.x &&
            (
                this.state == 'ATTACK_1_LEFT' ||
                this.state == 'ATTACK_2_LEFT' ||
                this.state == 'ATTACK_3_LEFT'
            )
        ) {
            if (this.game.player.currentState.state == 'RUN_RIGHT') this.speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'WALK_RIGHT') this.speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'JUMP_RIGHT') this.speed = ((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'RUN_ATTACK_RIGHT') this.speed = ((2 * 0.6) * this.game.player.speed)
        }

        if (this.game.player.x > this.x &&
            (
                this.state == 'ATTACK_1_LEFT' ||
                this.state == 'ATTACK_2_LEFT' ||
                this.state == 'ATTACK_3_LEFT'
            )
        ) {
            if (this.game.player.currentState.state == 'RUN_RIGHT') this.speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'WALK_RIGHT') this.speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'JUMP_RIGHT') this.speed = -((2 * 0.6) * this.game.player.speed)
            if (this.game.player.currentState.state == 'RUN_ATTACK_RIGHT') this.speed = -((2 * 0.6) * this.game.player.speed)
        }

       

        spearmanState(this.game)
        this.checkAttack()
 
        if (this.game.player.x < this.x) this.x += -this.speed;
        if (this.game.player.x > this.x) this.x += this.speed;

        if (this.HP < 0) this.HP = 0
        
    }
    draw(context) { 
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y - this.game.gameMargin * 1.25, this.width*1.5, this.height*1.5)
        if(this.game.gameDevMode) {
        context.strokeRect(this.x, this.y - this.game.gameMargin + 40, this.width * 1.5, this.height * 1.1)
        }
    }
    checkAttack() {
        const playerStates = states

        if( this.game.player.x < this.x && 
            this.game.player.y + this.game.player.height >= this.game.height - this.height &&
            this.game.player.x + this.game.player.width*1.25 - this.x > 50 &&
            this.game.player.x + this.game.player.width*1.25 - this.x < this.game.player.width*1.25 &&
            this.state == 'ATTACK_1_LEFT' &&
            this.frameX == 3 ||
            this.game.player.x < this.x && 
            this.game.player.y + this.game.player.height >= this.game.height - this.height &&
            this.game.player.x + this.game.player.width*1.25 - this.x > 50 &&
            this.game.player.x + this.game.player.width*1.25 - this.x < this.game.player.width*1.25 &&
            this.state == 'ATTACK_2_LEFT' &&
            this.frameX == 3 ||
            this.game.player.x < this.x && 
            this.game.player.y + this.game.player.height >= this.game.height - this.height &&
            this.game.player.x + this.game.player.width*1.25 - this.x > 50 &&
            this.game.player.x + this.game.player.width*1.25 - this.x < this.game.player.width*1.25 &&
            this.state == 'ATTACK_3_LEFT' &&
            this.frameX == 2 
        ) {
            this.game.player.setState(playerStates.HURT_RIGHT)
            this.game.player.HP -= 1

        }

        if( this.game.player.x > this.x && 
            this.game.player.y + this.game.player.height >= this.game.height - this.height &&
            this.game.player.x - this.x + this.width*1.5 < 330 &&
            this.game.player.x - this.x + this.width*1.5 > this.width*1.5 &&
            this.state == 'ATTACK_1_RIGHT' &&
            this.frameX == 1 ||
            this.game.player.x > this.x && 
            this.game.player.y + this.game.player.height >= this.game.height - this.height &&
            this.game.player.x - this.x + this.width*1.5 < 330 &&
            this.game.player.x - this.x + this.width*1.5 > this.width*1.5 &&
            this.state == 'ATTACK_2_RIGHT' &&
            this.frameX == 2 ||
            this.game.player.x > this.x && 
            this.game.player.y + this.game.player.height >= this.game.height - this.height &&
            this.game.player.x - this.x + this.width*1.5 < 330 &&
            this.game.player.x - this.x + this.width*1.5 > this.width*1.5 &&
            this.state == 'ATTACK_3_RIGHT' &&
            this.frameX == 1 
        ) {
            this.game.player.setState(playerStates.HURT_LEFT)
            this.game.player.HP -= 1
        }
    }

    dead(index) {
        if(this.deadMarker) {
            if(this.state == 'DEAD_LEFT' || this.state == 'DEAD_RIGHT') {
            this.game.enemies.splice(index, 1)
            this.deadMarker = false;
            ++this.game.player.killed
        }
        }
    }

//////////////////////////////////////////////////////////// SPEARMAN_STATES ///////////////////////////////////////////////////////////////////////////////


    spearmanIdleLeft() {
        this.state = "IDLE_LEFT"
        this.image = document.getElementById('spearmanIdleLeft')
        this.maxFrame = 6;
        this.frameX = this.maxFrame;
        this.speed = 0;
        this.reverseFrame = true;
        this.speed = 0;
        this.checkIn = true;

    }

    spearmanIdleRight() {
        this.state = "IDLE_RIGHT";
        this.image = document.getElementById('spearmanIdleRight')
        this.frameX = 0;
        this.maxFrame = 6;
        this.reverseFrame = false;
        this.speed = 0;
        this.checkIn = false;

        
    }
    spearmanRunLeft() {
        this.state = "RUN_LEFT";
        this.image = document.getElementById('spearmanRunLeft')
        this.maxFrame = 5;
        this.frameX = this.maxFrame;
        this.reverseFrame = true;
        this.speed = 2;
        this.checkIn = false;

    }
    spearmanRunRight() {
        this.state = "RUN_RIGHT";
        this.image = document.getElementById('spearmanRunRight')
        this.maxFrame = 5;
        this.frameX = 0;
        this.reverseFrame = false;
        this.speed = 2;
        this.checkIn = false;

    }

    spearmanWalkLeft() {
        this.state = "WALK_LEFT";
        this.reverseFrame = true;
        this.image = document.getElementById('spearmanWalkLeft')
        this.maxFrame = 6;
        this.frameX = this.maxFrame;
        this.speed = 1.5;
        this.checkIn = false;
    }

    spearmanWalkRight() {
        this.state = "WALK_RIGHT"
        this.image = document.getElementById('spearmanWalkRight')
        this.maxFrame = 6;
        this.frameX = 0;
        this.reverseFrame = false;
        this.speed = 1.5;
        this.checkIn = false;

    }

    spearmanAttack1Left() {
        this.state = "ATTACK_1_LEFT";
        this.image = document.getElementById('spearmanAttack_1_Left')
        this.maxFrame = 3;
        this.frameX = this.maxFrame;
        this.reverseFrame = true;
        this.frameX = 0;
        this.speed = 0
        this.checkIn = true
        this.checkerFrame = 0

    }

    spearmanAttack1Right() {
        this.state = "ATTACK_1_RIGHT";
        this.image = document.getElementById('spearmanAttack_1_Right')
        this.maxFrame = 3;
        this.frameX = 0;
        this.reverseFrame = false;
        this.speed = 0;
        this.checkIn = true
        this.checkerFrame = 0

    }

    spearmanAttack2Left() {
        this.state = "ATTACK_2_LEFT";
        this.image = document.getElementById('spearmanAttack_2_Left')
        this.maxFrame = 3;
        this.frameX = this.maxFrame;
        this.reverseFrame = true;
        this.frameX = 0;
        this.speed = 0
        this.checkIn = true
        this.checkerFrame = 0

    }

    spearmanAttack2Right() {
        this.state = "ATTACK_2_RIGHT";
        this.image = document.getElementById('spearmanAttack_2_Right')
        this.maxFrame = 3;
        this.frameX = 0;
        this.reverseFrame = false;
        this.speed = 0;
        this.checkIn = true
        this.checkerFrame = 0

    }

    spearmanHurtLeft() {
        this.state = "HURT_LEFT";
        this.image = document.getElementById('spearmanHurtLeft')
        this.maxFrame = 2;
        this.frameX = this.maxFrame;
        this.reverseFrame = true;
        this.speed = 0;
        this.checkIn = true;
        this.checkerFrame = 0;

    }

    spearmanHurtRight() {
        this.state = "HURT_RIGHT";
        this.image = document.getElementById('spearmanHurtRight')
        this.maxFrame = 2;
        this.frameX = 0;
        this.reverseFrame = false;
        this.speed = 0;
        this.checkIn = true;
        this.checkerFrame = 0;

    }

    spearmanDeadLeft() {
        this.state = "DEAD_LEFT";
        this.image = document.getElementById('spearmanDeadLeft')
        this.maxFrame = 3;
        this.frameX = this.maxFrame;
        this.reverseFrame = true;
        this.speed = 0;
        this.checkIn = true;
        this.checkerFrame = 0;

    }

    spearmanDeadRight() {
        this.state = "DEAD_RIGHT";
        this.image = document.getElementById('spearmanDeadRight')
        this.maxFrame = 3;
        this.frameX = 0;
        this.reverseFrame = false;
        this.speed = 0;
        this.checkIn = true;
        this.checkerFrame = 0;

    }
}





