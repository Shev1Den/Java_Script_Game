import { states } from "./PlayerState.js";

export class Arrow {
    constructor(game, archerX, archerY, playerX, playerY, archerState, archerHeight, reverseFrame, vx, frameX, image) {
        this.game = game; 
        this.gameWidth = game.width;
        this.gameHeight = game.height;
        this.image = image;
        this.state = archerState;
        this.width = 48;
        this.height = 48;
        this.playerX = playerX;
        this.playerY = playerY; 
        this.archerX = archerX; 
        this.archerY = archerY;
        this.archerHeight = archerHeight;
        this.x = archerX;
        this.y = archerY;
        this.maxFrame = 5
        this.frameX = frameX;
        this.reverseFrame = reverseFrame;
        this.frameTimer = 0;
        this.fps = 4;
        this.intervalFrame = 1000 / this.fps;
        this.vy = 0.5;
        this.vx = vx;

    }
    update(deltaTime) {
        // console.log(this.x)
        // console.log(this.archerY)
        // console.log(this.y)
        // console.log(this.gameHeight);
        // console.log(this.archerHeight);
        // console.log(this.game.gameMargin * 1.25)
        // console.log(this.game.player.x - this.x + this.width)
        // console.log(this.gameHeight - this.archerHeight - this.game.gameMargin * 1.25)
        // console.log(this.y)
        // console.log(this.archerY - (this.game.gameMargin * 1.25))
        // console.log(this.y - (this.game.gameMargin * 1.25))
        // console.log(this.game.gameMargin*1.25)
        // console.log(this.image)
        // console.log(this.state)
        
        this.intervalFrame = 1000 / this.fps;


        if (this.frameTimer >= this.intervalFrame) {
            
                if (!this.reverseFrame) {
                    if (this.frameX < this.maxFrame) this.frameX++ 
                    this.frameTimer = 0;
            } 

                if (this.reverseFrame) {
                    if (this.frameX > 0) this.frameX -= 1 
                    this.frameTimer = 0;
            }
            
        } else this.frameTimer += deltaTime


        this.checkAttack()
        // (this.game.height - this.playerY + this.game.player.height * 1.5) + this.game.gameMargin + 15

            this.x += this.vx;
        
        if(this.y < 550) {
        this.y += this.vy;
        } else {
            this.y = 550
            this.vx = 0;
        }
        this.delete()

    }
    draw(context) { 
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x + 57, (this.y - this.game.gameMargin * 1.25) + 90, this.width, this.height)
        if(this.game.gameDevMode) {
        context.strokeRect(this.x + 57, (this.y - this.game.gameMargin * 1.25) + 90 , this.width, this.height)
        }
    }
    checkAttack() {
            const playerStates = states
    
            if( this.game.player.x < this.x && 
                this.game.player.y + this.game.player.height >= this.game.height - this.height &&
                this.game.player.x + this.game.player.width*1.25 - this.x > 110 &&
                this.game.player.x + this.game.player.width*1.25 - this.x < this.game.player.width*1.25 &&
                this.state == "ARROW_LEFT"
            ) {
                this.game.player.setState(playerStates.HURT_RIGHT)
                this.game.player.HP -= 1
                this.delete()
    
            }
    
            if( this.game.player.x > this.x && 
                this.game.player.y + this.game.player.height >= this.game.height - this.height &&
                this.game.player.x - this.x + this.width < 130 &&
                this.game.player.x - this.x + this.width > 110 &&
                this.state == "ARROW_RIGHT"
            ) {
                this.game.player.setState(playerStates.HURT_LEFT)
                this.game.player.HP -= 1
                this.delete()
            }
        }
    delete() {
        this.game.special.forEach((e, index) => {
            
            if(e.x + e.width * 2 < 0) this.game.special.splice(index, 1);
            
            if(this.game.player.x < this.x && 
                this.game.player.y + this.game.player.height >= this.game.height - this.height &&
                this.game.player.x + this.game.player.width*1.25 - this.x > 120 &&
                this.game.player.x + this.game.player.width*1.25 - this.x < this.game.player.width*1.25 &&
                this.state == "ARROW_LEFT") this.game.special.splice(index, 1);
            
                if(this.game.player.x > this.x && 
                this.game.player.y + this.game.player.height >= this.game.height - this.height &&
                this.game.player.x - this.x + this.width < 120 &&
                this.game.player.x - this.x + this.width > 110 &&
                this.state == "ARROW_RIGHT") this.game.special.splice(index, 1);

        })
    }
}