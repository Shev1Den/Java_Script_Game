class Level {
    constructor(game) {
        this.game = game;
        this.warrior = this.game.enemiesExempler[0];
    }
}

class Level_1 {
    constructor(game) {
        super(game);
        this.spawnInterval = 5000;
        this.spawnTimer = 0;
        this.quantityMax = 3;
        this.quantity = 0;
    }
    update(deltaTime) {

        if(this.spawnTimer >= this.spawnInterval && this.quantity <= this.quantityMax) {
            this.game.enemies.push(warrior)
            this.quantity++
            this.spawnTimer = 0;
        }



        this.game.enemies.push(this.warrior)
    }
}