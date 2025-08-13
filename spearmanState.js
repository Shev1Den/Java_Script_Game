export function spearmanState(game) {
    let enemies = game.enemies;

    enemies.forEach((enemy) => {
        if(enemy.entity != "SkeletonSpearman") return;

        let spearman = enemy;
        
        // IdleLeft 
        if(spearman.state == 'IDLE_LEFT') {
            if(spearman.stateTimer >= spearman.stateInterval) {
                    if(game.player.x - spearman.x > -game.player.width*1.25 && game.player.x - spearman.x < 0  && game.player.x < spearman.x) spearman.spearmanAttack1Left()
                }
            if(game.player.x - spearman.x > -150 && game.player.x - spearman.x < -game.player.width*1.25 && game.player.x < spearman.x) spearman.spearmanWalkLeft()
            if(game.player.x - spearman.x < 150 && game.player.x - spearman.x >  spearman.width && game.player.x > spearman.x) spearman.spearmanWalkRight()
            if(game.player.x - spearman.x < -150 && game.player.x < spearman.x) spearman.spearmanRunLeft()
        }

        // IdleRight
        if (spearman.state == 'IDLE_RIGHT') {
            if(spearman.stateTimer >= spearman.stateInterval) {
                    if(game.player.x - spearman.x < spearman.width*1.5 && game.player.x - spearman.x > 0  && game.player.x > spearman.x) spearman.spearmanAttack1Right()
                }
            if(game.player.x - spearman.x > -150 && game.player.x - spearman.x < -spearman.width*1.5 && game.player.x < spearman.x) spearman.spearmanWalkLeft()
            if(game.player.x - spearman.x < 150 && game.player.x - spearman.x >  spearman.width*1.5 && game.player.x > spearman.x) spearman.spearmanWalkRight()
            if(game.player.x - spearman.x > 150 && game.player.x > spearman.x) spearman.spearmanRunRight()
        }
        
        // RunLeft
        if (spearman.state == 'RUN_LEFT') {
            if(game.player.x - spearman.x > -150 && game.player.x < spearman.x) spearman.spearmanWalkLeft()
        }
        // RunRight
        if (spearman.state == 'RUN_RIGHT') {
            if(game.player.x - spearman.x < 150 && game.player.x > spearman.x) spearman.spearmanWalkRight()
        }

        // WalkLeft
        if (spearman.state == 'WALK_LEFT') {
            if(game.player.x - spearman.x < -150 && game.player.x < spearman.x) spearman.spearmanRunLeft()
            if(game.player.x - spearman.x <= -150 && game.player.x > spearman.x) spearman.spearmanRunRight()
            if(game.player.x - spearman.x > -game.player.width*1.25 && game.player.x - spearman.x < 0  && game.player.x < spearman.x) spearman.spearmanAttack1Left()
            if(game.player.x - spearman.x > 150 && game.player.x < spearman.x) spearman.spearmanWalkLeft()
            if(game.player.x - spearman.x > -150 && game.player.x > spearman.x) spearman.spearmanWalkRight()
            
        }

        // WalkRight
        if (spearman.state == 'WALK_RIGHT') {
            if(game.player.x - spearman.x < spearman.width*1.5 && game.player.x - spearman.x > 0  && game.player.x > spearman.x) spearman.spearmanAttack1Right()
            if(game.player.x - spearman.x < 150 && game.player.x < spearman.x) spearman.spearmanWalkLeft()
            if(game.player.x - spearman.x < -150 && game.player.x > spearman.x) spearman.spearmanWalkRight()
            if(game.player.x - spearman.x > 150 && game.player.x > spearman.x) spearman.spearmanRunRight()
        }

        // Attack1Left
        if (spearman.state == 'ATTACK_1_LEFT') {
            if (spearman.checkerFrame == 2) spearman.spearmanAttack2Left()
        }

        // Attack1Right
        if (spearman.state == 'ATTACK_1_RIGHT') {
            if (spearman.checkerFrame == 1) spearman.spearmanAttack2Right()
        }

        // Attack2Left
        if (spearman.state == 'ATTACK_2_LEFT') {
            if (spearman.checkerFrame == 2) spearman.spearmanIdleLeft()
        }

        // Attack2Right
        if (spearman.state == 'ATTACK_2_RIGHT') {
            if (spearman.checkerFrame == 1) spearman.spearmanIdleRight()
        }

        // HurtLeft 
        if (spearman.state == 'HURT_LEFT') {
            if(spearman.checkerFrame == 1) spearman.spearmanIdleLeft()
            if(spearman.HP == 0) spearman.spearmanDeadLeft()
        }

        // HurtRight
        if (spearman.state == 'HURT_RIGHT') {
            if(spearman.checkerFrame == 1) spearman.spearmanIdleRight()
            if(spearman.HP == 0) spearman.spearmanDeadRight()
        }

        // DeadLeft
        if (spearman.state == 'DEAD_LEFT') {
            if(spearman.checkerFrame == 1) enemies.forEach((enemySpearman, index) => {
                enemySpearman.dead(index)
            })
        }

        // DeadRight
        if (spearman.state == 'DEAD_RIGHT') {
            if(spearman.checkerFrame == 1) enemies.forEach((enemySpearman, index) => {
                enemySpearman.dead(index)
            })
        }
    })
}