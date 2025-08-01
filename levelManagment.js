import { SkeletonWarrior } from "./Enemies.js";

class Level {
    constructor(game) {
        this.game = game;
    }
}

class Level_1 extends Level {
    constructor(game) {
        super(game);
        this.spawnInterval = 10000;
        this.spawnTimer = 0;
        this.quantityWarriorMax = 2;
        this.quantity = 0;
        this.complete = false
    }
    update(deltaTime) {
        console.log(this.spawnTimer)
        if(this.spawnTimer >= this.spawnInterval && this.quantity <= this.quantityWarriorMax) {
            this.game.enemiesWarrior.push(new SkeletonWarrior(this.game))
            this.quantity++
            this.spawnTimer = 0;
        } else if(this.quantity <= this.quantityWarriorMax) this.spawnTimer += deltaTime
        else this.spawnTimer = 0
    }
}

class Level_2 extends Level {
    constructor(game) {
        super(game);
        this.spawnInterval = 10000;
        this.spawnTimer = 0;
        this.quantityWarriorMax = 4;
        this.quantity = 0;
        this.complete = false
    }
    update(deltaTime) {
        console.log(this.spawnTimer)
        if(this.spawnTimer >= this.spawnInterval && this.quantity <= this.quantityWarriorMax) {
            this.game.enemiesWarrior.push(new SkeletonWarrior(this.game))
            this.quantity++
            this.spawnTimer = 0;
        } else if(this.quantity <= this.quantityWarriorMax) this.spawnTimer += deltaTime
        else this.spawnTimer = 0
    }
}

export class LevelManagment {
    constructor(game) {
        this.game = game;
        this.level1 = new Level_1(game);
        this.level2 = new Level_2(game);
    }
    update(deltaTime) {
        this.playerKilled = this.game.player.killed
        this.lv1QtyWarrior = this.level1.quantityWarriorMax + 1
        this.lv2QtyWarrior = this.level2.quantityWarriorMax + 1

        console.log(this.playerKilled)
        if (this.playerKilled < this.lv1QtyWarrior) {
            this.level1.update(deltaTime)
        }
        if (this.playerKilled < this.lv1QtyWarrior + this.lv2QtyWarrior && this.playerKilled >= this.lv1QtyWarrior) {
            this.level2.update(deltaTime)
        }
    }
}


