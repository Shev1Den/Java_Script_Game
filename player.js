import { 
    IdleRight, 
    IdleLeft, 
    WalkRight, 
    WalkLeft, 
    RunRight, 
    RunLeft, 
    JumpRight, 
    JumpLeft, 
    Attack1Right,
    Attack1Left, 
    Attack2Right, 
    Attack2Left, 
    Attack3Right, 
    Attack3Left, 
    RunAttackRight, 
    RunAttackLeft, 
    HurtRight, 
    HurtLeft,
    DeadRight,
    DeadLeft } from "./PlayerState.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 128;
        this.height = 128;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.vx = 5;
        this.frameX = 0;
        this.maxFrame = 7;
        this.reverseFrame = false;
        this.states = [
            new IdleRight(game), 
            new IdleLeft(game), 
            new WalkRight(game), 
            new WalkLeft(game), 
            new RunRight(game), 
            new RunLeft(game), 
            new JumpRight(game), 
            new JumpLeft(game), 
            new Attack1Right(game), 
            new Attack1Left(game), 
            new Attack2Right(game), 
            new Attack2Left(game), 
            new Attack3Right(game), 
            new Attack3Left(game), 
            new RunAttackRight(game), 
            new RunAttackLeft(game),
            new HurtRight(game), 
            new HurtLeft(game),
            new DeadRight(game),
            new DeadLeft(game)
            ];
        this.currentState = this.states[0];
        this.image = document.getElementById('playerIdleRight');
        this.speed = 0;
        this.maxSpeed = 3;
        this.weight = 1
        this.vy = 0;
        this.fps = 60;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.HP = 50;
        this.killed = 0;
    }
    update(input, deltaTime) {
        // horizontal movement
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x >= this.game.width - this.width) {
            this.x = this.game.width - this.width;
        }
        this.x += this.maxSpeed * this.speed;
        // vertical movement
            this.y += this.vy;
        if (!this.game.player.onGround()) this.vy += this.weight;
        else this.vy = 0;
        // vertical boundaries
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height

        this.currentState.handleInput(input)
        // sprite animation 
        if (this.frameTimer >= this.frameInterval) {
            if (!this.reverseFrame) {
                this.frameTimer = 0;
                if (this.frameX < this.maxFrame) {
                    this.frameX++;
                }
                else this.frameX = 0;
            }
            if (this.reverseFrame) {
                this.frameTimer = 0;
                if (this.frameX > 0) {
                    this.frameX--;
                }
                else this.frameX = this.maxFrame;
            }
          
        } else this.frameTimer += deltaTime
        this.checkAttack()
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y - this.game.gameMargin, this.width*1.25, this.height*1.25)
        context.strokeRect(this.x, this.y - this.game.gameMargin + 40, this.width * 1.25, this.height * 1.1)
    }
    onGround() {
        return this.y >= this.game.height - this.height 
    }
    setState(state) {
        this.currentState = this.states[state]
        this.currentState.enter()
    }
    checkAttack() {

        this.game.enemiesWarrior.forEach((warrior) => {

        if( this.x < warrior.x && 
            this.x + this.width*1.25 - warrior.x > 85 &&
            this.x + this.width*1.25 - warrior.x < this.width*1.25 &&
            this.currentState.state == 'ATTACK_1_RIGHT' &&
            this.frameX == 4 ||
            this.x < warrior.x && 
            this.x + this.width*1.25 - warrior.x > 85 &&
            this.x + this.width*1.25 - warrior.x < this.width*1.25 &&
            this.currentState.state == 'ATTACK_2_RIGHT' &&
            this.frameX == 2 ||
            this.x < warrior.x && 
            this.x + this.width*1.25 - warrior.x > 85 &&
            this.x + this.width*1.25 - warrior.x < this.width*1.25 &&
            this.currentState.state == 'ATTACK_3_RIGHT' &&
            this.frameX == 3 ||
            this.x < warrior.x && 
            this.x + this.width*1.25 - warrior.x > 85 &&
            this.x + this.width*1.25 - warrior.x < this.width*1.25 &&
            this.currentState.state == 'RUN_ATTACK_RIGHT' &&
            this.frameX == 4
        ) {
            warrior.warriorHurtLeft();
            --warrior.HP;
        }

        if( this.x > warrior.x && 
            this.x - warrior.x + warrior.width*1.5 < 320 &&
            this.x - warrior.x + warrior.width*1.5 > warrior.width*1.5 &&
            this.currentState.state == 'ATTACK_1_LEFT' &&
            this.frameX == 1 ||
            this.x > warrior.x && 
            this.x - warrior.x + warrior.width*1.5 < 320 &&
            this.x - warrior.x + warrior.width*1.5 > warrior.width*1.5 &&
            this.currentState.state == 'ATTACK_2_LEFT' &&
            this.frameX == 1 ||
            this.x > warrior.x && 
            this.x - warrior.x + warrior.width*1.5 < 320 &&
            this.x - warrior.x + warrior.width*1.5 > warrior.width*1.5 &&
            this.currentState.state == 'ATTACK_3_LEFT' &&
            this.frameX == 1 ||
            this.x > warrior.x && 
            this.x - warrior.x + warrior.width*1.5 < 320 &&
            this.x - warrior.x + warrior.width*1.5 > warrior.width*1.5 &&
            this.currentState.state == 'RUN_ATTACK_LEFT' &&
            this.frameX == 3
        ) {
            warrior.warriorHurtRight()
            --warrior.HP
        }
        })
        
    }
}