
import { states } from "./PlayerState.js";
import { archerState } from "./archerState.js";

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
        this.intervalFrame = 0
    }
}



export class SkeletonArcher extends Enemy {
    constructor(game) {
        super(game) 
        this.entity = "SkeletonArcher"
        this.image = document.getElementById('archerIdleLeft');
        this.imageArrowLeft = document.getElementById('archerArrowLeft')
        this.imageArrowRight = document.getElementById('archerArrowRight')
        this.frameX = 0;
        this.maxFrame = 6;
        this.speed = 1.5;
        this.vy = 0
        this.state = "IDLE_LEFT"
        this.checkIn = false
        this.checkerFrame = 0;
        this.stateInterval = 2000;
        this.stateTimer = 0;
        this.evasionInterval = 15000;
        this.evasionTimer = 0;
        this.HP = 9;
        this.deadMarker = true;
        this.weight = 2 
        this.vxArrowLeft = -10;
        this.vxArrowRight = 10;
        this.frameXArrowLeft = 5;
        this.frameXArrowRight = 0;
        this.maxQuantityArrow = 0;


    }
    update(deltaTime) {
        // console.log(this.HP) 
        // console.log(this.y)
        // console.log(this.gameHeight);
        // console.log(this.height);
        // console.log(this.game.gameMargin * 1.25)
        // console.log(this.game.player.x + this.game.player.width*1.25 - this.x)
        // console.log((this.gameHeight - this.height ) - this.game.gameMargin * 1.25)
        // console.log(this.deadMarker)
        // console.log(this.evasionTimer)
        // console.log(this.x + this.width*1.5 - this.game.player.x)
        // console.log(this.game.player.x + this.game.player.width*1.25 - this.x)
        // console.log(this.frameX)
        console.log(this.state)
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
        this.intervalFrame = 1000 / this.fps;
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

        if(this.evasionTimer < this.evasionInterval) this.evasionTimer += deltaTime;

          

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

        

        archerState(this.game)
        this.checkAttack()
 
        if (this.game.player.x < this.x) this.x += -this.speed;
        if (this.game.player.x > this.x) this.x += this.speed;

        this.y += this.vy 
        if(this.y < this.gameHeight - this.height) this.vy += this.weight
        else this.vy = 0
        if (this.y >= this.gameHeight - this.height) this.y = (this.gameHeight - this.height )

        if (this.HP < 0) this.HP = 0
        
    }
    draw(context) { 
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y - this.game.gameMargin * 1.25, this.width*1.5, this.height*1.5)
        if(this.game.gameDevMode) {
        context.strokeRect(this.x, this.y - this.game.gameMargin * 1.25, this.width * 1.5, this.height * 1.5)
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

//////////////////////////////////////////////////////////// ARCHER_STATES ///////////////////////////////////////////////////////////////////////////////


    archerIdleLeft() {
        this.state = "IDLE_LEFT"
        this.image = document.getElementById('archerIdleLeft')
        this.fps = 60;
        this.maxFrame = 6;
        this.frameX = this.maxFrame;
        this.speed = 0;
        this.reverseFrame = true;
        this.checkIn = true;

    }

    archerIdleRight() {
        this.state = "IDLE_RIGHT";
        this.image = document.getElementById('archerIdleRight')
        this.fps = 60;
        this.frameX = 0;
        this.maxFrame = 6;
        this.reverseFrame = false;
        this.speed = 0;
        this.checkIn = false;
    }

    archerWalkLeft() {
        this.state = "WALK_LEFT";
        this.reverseFrame = true;
        this.image = document.getElementById('archerWalkLeft')
        this.fps = 30;
        this.maxFrame = 7;
        this.frameX = this.maxFrame;
        this.speed = 1.5;
        this.checkIn = false;
    }

    archerWalkRight() {
        this.state = "WALK_RIGHT"
        this.image = document.getElementById('archerWalkRight')
        this.fps = 30;
        this.maxFrame = 7;
        this.frameX = 0;
        this.reverseFrame = false;
        this.speed = 1.5;
        this.checkIn = false;

    }

    archerAttack1Left() {
        this.state = "ATTACK_1_LEFT";
        this.image = document.getElementById('archerAttack_1_Left')
        this.fps = 30;
        this.maxFrame = 4;
        this.frameX = this.maxFrame;
        this.reverseFrame = true;
        this.speed = 0
        this.checkIn = true
        this.checkerFrame = 0

    }

    archerAttack1Right() {
        this.state = "ATTACK_1_RIGHT";
        this.image = document.getElementById('archerAttack_1_Right')
        this.fps = 30;
        this.maxFrame = 4;
        this.frameX = 0;
        this.reverseFrame = false;
        this.speed = 0;
        this.checkIn = true
        this.checkerFrame = 0

    }

    archerAttack2Left() {
        this.state = "ATTACK_2_LEFT";
        this.image = document.getElementById('archerAttack_2_Left')
        this.fps = 30;
        this.maxFrame = 3;
        this.frameX = this.maxFrame;
        this.reverseFrame = true;
        this.speed = 0
        this.checkIn = true
        this.checkerFrame = 0

    }

    archerAttack2Right() {
        this.state = "ATTACK_2_RIGHT";
        this.image = document.getElementById('archerAttack_2_Right')
        this.fps = 30;
        this.maxFrame = 3;
        this.frameX = 0;
        this.reverseFrame = false;
        this.speed = 0;
        this.checkIn = true
        this.checkerFrame = 0

    }

    archerAttack3Left() {
        this.state = "ATTACK_3_LEFT";
        this.image = document.getElementById('archerAttack_3_Left')
        this.fps = 30;
        this.maxFrame = 2;
        this.frameX = this.maxFrame;
        this.reverseFrame = true;
        this.speed = 0
        this.checkIn = true;
        this.checkerFrame = 0;

    }

    archerAttack3Right() {
        this.state = "ATTACK_3_RIGHT";
        this.image = document.getElementById('archerAttack_3_Right')
        this.fps = 30;
        this.maxFrame = 2;
        this.frameX = 0;
        this.reverseFrame = false;
        this.speed = 0;
        this.checkIn = true;
        this.checkerFrame = 0;

    }

    archerShot1Left() {
        this.state = "SHOT_1_LEFT";
        this.image = document.getElementById('archerShot_1_Left')
        this.fps = 10;
        this.maxFrame = 14;
        this.frameX = this.maxFrame;
        this.reverseFrame = true;
        this.frameX = 0;
        this.speed = 0;
        this.checkIn = true;
        this.checkerFrame = 0;

    }

    archerShot1Right() {
        this.state = "SHOT_1_RIGHT";
        this.image = document.getElementById('archerShot_1_Right')
        this.fps = 10;
        this.maxFrame = 14;
        this.frameX = 0;
        this.reverseFrame = false;
        this.speed = 0;
        this.checkIn = true;
        this.checkerFrame = 0;

    }

    archerHurtLeft() {
        this.state = "HURT_LEFT";
        this.image = document.getElementById('archerHurtLeft')
        this.fps = 60;
        this.maxFrame = 1;
        this.frameX = this.maxFrame;
        this.reverseFrame = true;
        this.speed = 0;
        this.checkIn = true;
        this.checkerFrame = 0;

    }

    archerHurtRight() {
        this.state = "HURT_RIGHT";
        this.image = document.getElementById('archerHurtRight')
        this.fps = 60;
        this.maxFrame = 1;
        this.frameX = 0;
        this.reverseFrame = false;
        this.speed = 0;
        this.checkIn = true;
        this.checkerFrame = 0;

    }

    archerDeadLeft() {
        this.state = "DEAD_LEFT";
        this.image = document.getElementById('archerDeadLeft')
        this.fps = 60;
        this.maxFrame = 4;
        this.frameX = this.maxFrame;
        this.reverseFrame = true;
        this.speed = 0;
        this.checkIn = true;
        this.checkerFrame = 0;

    }

    archerDeadRight() {
        this.state = "DEAD_RIGHT";
        this.image = document.getElementById('archerDeadRight')
        this.fps = 60;
        this.maxFrame = 4;
        this.frameX = 0;
        this.reverseFrame = false;
        this.speed = 0;
        this.checkIn = true;
        this.checkerFrame = 0;

    }

    archerEvasionLeft() {
        this.state = "EVASION_LEFT";
        this.image = document.getElementById('archerEvasionLeft')
        this.fps = 15;
        this.maxFrame = 5;
        this.frameX = this.maxFrame;
        this.reverseFrame = true;
        this.speed = 0;
        this.checkIn = true;
        this.checkerFrame = 0;
    }

    archerEvasionRight() {
        this.state = "EVASION_RIGHT";
        this.image = document.getElementById('archerEvasionRight')
        this.fps = 15;
        this.maxFrame = 5;
        this.frameX = 0;
        this.reverseFrame = false;
        this.speed = 0;
        this.checkIn = true;
        this.checkerFrame = 0;

    }
}





