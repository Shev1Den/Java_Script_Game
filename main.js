import { Background } from "./background.js";
import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { SkeletonWarrior } from "./Enemies.js";
import { LevelManagment } from "./levelManagment.js";

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas');
    canvas.width = 1000;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.enemiesExempler = [new SkeletonWarrior(this)];
            this.background = new Background(this)
            this.player = new Player(this)
            this.input = new InputHandler(this)
            this.levelManagment = new LevelManagment(this)
            this.enemiesWarrior = []
            this.debug = true;
            this.player.currentState.enter();
            this.gameMargin = 150; 
            this.gameOver = false
         
        }
        update(deltaTime) {
            if (this.input.keys.length > 1) {
            this.input.keys.shift();
        }
            this.levelManagment.update(deltaTime)
            this.background.update();
            this.player.update(this.input.keys, deltaTime)
            this.enemiesWarrior.forEach((enemy) => {
                enemy.update(deltaTime)
            })
        }
        draw(context) {
            this.background.draw(context)
            this.player.draw(context);
            this.enemiesWarrior.forEach((enemy) => {
                enemy.draw(context)
            })
        }

    }

    const game = new Game(canvas.width, canvas.height)

    let lastTime = 0
    if (game.gameOver) {}
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) {
            requestAnimationFrame(animate)
        }
    }

    animate(0);
})