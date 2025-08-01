export function warriorState(game) {
    let enemiesWarrior = game.enemiesWarrior;

    enemiesWarrior.forEach((warrior) => {

        // IdleLeft 
        if(warrior.state == 'IDLE_LEFT') {
            if(warrior.stateTimer >= warrior.stateInterval) {
                    if(game.player.x - warrior.x > -game.player.width*1.25 && game.player.x - warrior.x < 0  && game.player.x < warrior.x) warrior.warriorAttack1Left()
                }
            if(game.player.x - warrior.x > -500 && game.player.x - warrior.x < -game.player.width*1.25 && game.player.x < warrior.x) warrior.warriorWalkLeft()
            if(game.player.x - warrior.x < 500 && game.player.x - warrior.x >  warrior.width && game.player.x > warrior.x) warrior.warriorWalkRight()
            if(game.player.x - warrior.x < -500 && game.player.x < warrior.x) warrior.warriorRunLeft()
            if(warrior.HP <= 0) warrior.warriorDeadLeft()
        }

        // IdleRight
        if (warrior.state == 'IDLE_RIGHT') {
            if(warrior.stateTimer >= warrior.stateInterval) {
                    if(game.player.x - warrior.x < warrior.width*1.5 && game.player.x - warrior.x > 0  && game.player.x > warrior.x) warrior.warriorAttack1Right()
                }
            if(game.player.x - warrior.x > -500 && game.player.x - warrior.x < -warrior.width*1.5 && game.player.x < warrior.x) warrior.warriorWalkLeft()
            if(game.player.x - warrior.x < 500 && game.player.x - warrior.x >  warrior.width*1.5 && game.player.x > warrior.x) warrior.warriorWalkRight()
            if(game.player.x - warrior.x > 500 && game.player.x > warrior.x) warrior.warriorRunRight()
            if(warrior.HP <= 0) warrior.warriorDeadRight()
        }
        
        // RunLeft
        if (warrior.state == 'RUN_LEFT') {
            if(game.player.x - warrior.x > -500 && game.player.x < warrior.x) warrior.warriorWalkLeft()
            if(warrior.HP <= 0) warrior.warriorDeadLeft()
        }
        // RunRight
        if (warrior.state == 'RUN_RIGHT') {
            if(game.player.x - warrior.x < 500 && game.player.x > warrior.x) warrior.warriorWalkRight()
            if(warrior.HP <= 0) warrior.warriorDeadRight()
        }

        // WalkLeft
        if (warrior.state == 'WALK_LEFT') {
            if(game.player.x - warrior.x < -500 && game.player.x < warrior.x) warrior.warriorRunLeft()
            if(game.player.x - warrior.x <= -500 && game.player.x > warrior.x) warrior.warriorRunRight()
            if(game.player.x - warrior.x > -game.player.width*1.25 && game.player.x - warrior.x < 0  && game.player.x < warrior.x) warrior.warriorAttack1Left()
            if(game.player.x - warrior.x > 500 && game.player.x < warrior.x) warrior.warriorWalkLeft()
            if(game.player.x - warrior.x > -500 && game.player.x > warrior.x) warrior.warriorWalkRight()
            if(warrior.HP <= 0) warrior.warriorDeadLeft()
            
        }

        // WalkRight
        if (warrior.state == 'WALK_RIGHT') {
            if(game.player.x - warrior.x < warrior.width*1.5 && game.player.x - warrior.x > 0  && game.player.x > warrior.x) warrior.warriorAttack1Right()
            if(game.player.x - warrior.x < 500 && game.player.x < warrior.x) warrior.warriorWalkLeft()
            if(game.player.x - warrior.x < -500 && game.player.x > warrior.x) warrior.warriorWalkRight()
            if(game.player.x - warrior.x > 500 && game.player.x > warrior.x) warrior.warriorRunRight()
            if(warrior.HP <= 0) warrior.warriorDeadRight()
        }

        // Attack1Left
        if (warrior.state == 'ATTACK_1_LEFT') {
            if (warrior.checkerFrame == 2) warrior.warriorAttack2Left()
            if(warrior.HP <= 0) warrior.warriorDeadLeft()
        }

        // Attack1Right
        if (warrior.state == 'ATTACK_1_RIGHT') {
            if (warrior.checkerFrame == 1) warrior.warriorAttack2Right()
            if(warrior.HP <= 0) warrior.warriorDeadRight()
        }

        // Attack2Left
        if (warrior.state == 'ATTACK_2_LEFT') {
            if (warrior.checkerFrame == 2) warrior.warriorAttack3Left()
            if(warrior.HP <= 0) warrior.warriorDeadLeft()
        }

        // Attack2Right
        if (warrior.state == 'ATTACK_2_RIGHT') {
            if (warrior.checkerFrame == 1) warrior.warriorAttack3Right()
            if(warrior.HP <= 0) warrior.warriorDeadRight()
        }

        // Attack3Left
        if (warrior.state == 'ATTACK_3_LEFT') {
            if (warrior.checkerFrame == 2) warrior.warriorIdleLeft()
            if(warrior.HP <= 0) warrior.warriorDeadLeft()
        }
        
        // Attack3Right
        if (warrior.state == 'ATTACK_3_RIGHT') {
            if (warrior.checkerFrame == 1) warrior.warriorIdleRight()
            if(warrior.HP <= 0) warrior.warriorDeadRight()
        }

        // HurtLeft 
        if (warrior.state == 'HURT_LEFT') {
            if(warrior.checkerFrame == 1) warrior.warriorIdleLeft()
            if(warrior.HP <= 0) warrior.warriorDeadLeft()
        }

        // HurtRight
        if (warrior.state == 'HURT_RIGHT') {
            if(warrior.checkerFrame == 1) warrior.warriorIdleRight()
            if(warrior.HP <= 0) warrior.warriorDeadRight()
        }

        // DeadLeft
        if (warrior.state == 'DEAD_LEFT') {
            if(warrior.checkerFrame == 1) enemiesWarrior.forEach((enemyWarrior, index) => {
                game.player.killed += 1
                enemyWarrior.dead(index)
            })
        }

        // DeadRight
        if (warrior.state == 'DEAD_RIGHT') {
            if(warrior.checkerFrame == 1) enemiesWarrior.forEach((enemyWarrior, index) => {
                game.player.killed += 1
                enemyWarrior.dead(index)
            })
        }
    })
}