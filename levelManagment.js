import { SkeletonWarrior } from "./skeletonWarrior.js";
import { SkeletonSpearman } from "./skeletonSpearman.js";
import { SkeletonArcher } from "./skeletonArcher.js";


class Level {
    constructor(game) {
        this.game = game;
    }
}

class Level_1 extends Level {
    constructor(game) {
        super(game);
        this.spawnInterval = 5000;
        this.spawnTimer = 0;
        this.quantityEntityMax = 0;
        this.quantity = 0;
        this.complete = false
    }
    update(deltaTime) {
        console.log(this.spawnTimer)
        if(this.spawnTimer >= this.spawnInterval && this.quantity <= this.quantityEntityMax) {
            this.game.enemies.push(new SkeletonArcher(this.game))
            this.quantity++
            this.spawnTimer = 0;
        } else if(this.quantity <= this.quantityEntityMax) this.spawnTimer += deltaTime
        else this.spawnTimer = 0
    }
}

class Level_2 extends Level {
    constructor(game) {
        super(game);
        this.spawnInterval = 5000;
        this.spawnTimer = 0;
        this.quantityEntityMax = 1;
        this.quantity = 0;
        this.complete = false
    }
    update(deltaTime) {
        console.log(this.spawnTimer)
        if(this.spawnTimer >= this.spawnInterval && this.quantity <= this.quantityEntityMax) {
            this.game.enemies.push(new SkeletonWarrior(this.game))
            this.quantity++
            this.spawnTimer = 0;
        } else if(this.quantity <= this.quantityEntityMax) this.spawnTimer += deltaTime
        else this.spawnTimer = 0
    }
}

class Level_3 extends Level {
    constructor(game) {
        super(game);
        this.spawnInterval = 5000;
        this.spawnTimer = 0;
        this.quantityEntityMax = 3;
        this.quantity = 0;
        this.complete = false
    }
    update(deltaTime) {
        console.log(this.spawnTimer)
        if(this.spawnTimer >= this.spawnInterval && this.quantity <= this.quantityEntityMax) {
            if (this.quantity <= 2) {
                this.game.enemies.push(new SkeletonSpearman(this.game)) 
                this.game.enemies.push(new SkeletonArcher(this.game)) 
            }
            this.quantity += 2
            this.spawnTimer = 0;
        } else if(this.quantity <= this.quantityEntityMax) this.spawnTimer += deltaTime
        else this.spawnTimer = 0
        
    }
}

export class LevelManagment {
    constructor(game) {
        this.game = game;
        this.level1 = new Level_1(game);
        this.level2 = new Level_2(game);
        this.level3 = new Level_3(game);
    }
    update(deltaTime) {
        console.log(this.game.player.killed)
        this.playerKilled = this.game.player.killed
        this.lvl1QtyEntity = this.level1.quantityEntityMax + 1
        this.lvl2QtyEntity = this.level2.quantityEntityMax + 1
        this.lvl3QtyEntity = this.level3.quantityEntityMax + 1

        // console.log(this.playerKilled)
        if (this.playerKilled < this.lvl1QtyEntity) {
            this.level1.update(deltaTime)
        }
        if (this.playerKilled < this.lvl1QtyEntity + this.lvl2QtyEntity && this.playerKilled >= this.lvl1QtyEntity) {
            this.level2.update(deltaTime)
        }
        if (this.playerKilled < this.lvl1QtyEntity + this.lvl2QtyEntity + this.lvl3QtyEntity && this.playerKilled >= this.lvl1QtyEntity + this.lvl2QtyEntity) {
            this.level3.update(deltaTime)
        }
    }
}


