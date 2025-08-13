import { Arrow } from "./arrowArcher.js";


export function archerState(game) {
    let enemies = game.enemies;
    let deadMarker = true;

    enemies.forEach((enemy) => {  
        if(enemy.entity != "SkeletonArcher") return; 

        let archer = enemy; 
        
        // IdleLeft 
        if(archer.state == 'IDLE_LEFT') {
            if(archer.stateTimer >= archer.stateInterval) {
                    if(game.player.x + game.player.width*1.25 - archer.x >= -20 && game.player.x + game.player.width*1.25 - archer.x < (archer.width*1.5) * 0.5) archer.archerAttack1Left()
                }
            if(game.player.x + game.player.width*1.25 - archer.x <= -300 && game.player.x + game.player.width*1.25 - archer.x >= -600 && game.player.x < archer.x) archer.archerShot1Left()
            if((game.player.x + game.player.width*1.25 - archer.x > -300 && game.player.x + game.player.width*1.25 - archer.x < -20  &&  game.player.x < archer.x) || game.player.x + game.player.width*1.25 - archer.x < -600) archer.archerWalkLeft()
            if((archer.x + archer.width*1.5 - game.player.x > -300 && archer.x + archer.width*1.5 - game.player.x < -20 &&  game.player.x > archer.x) || archer.x + archer.width*1.5 - game.player.x < -600 ) archer.archerWalkRight()
            if(game.player.x + game.player.width*1.25 - archer.x < 0 && game.player.x + game.player.width*1.25 - archer.x >= -20 && archer.evasionTimer >= archer.evasionInterval) {
                archer.evasionInterval = 0;
                archer.archerEvasionLeft()
            }
        }

        // IdleRight
        if (archer.state == 'IDLE_RIGHT') {
            if(archer.stateTimer >= archer.stateInterval) {
                    if(archer.x + archer.width*1.5 - game.player.x >= -20 && archer.x + archer.width*1.5 - game.player.x > -(archer.width*1.5) * 0.5  && game.player.x > archer.x) archer.archerAttack1Right()
                }
            if(archer.x + archer.width*1.5 - game.player.x <= -300 && archer.x + archer.width*1.5 - game.player.x >= -600 && game.player.x > archer.x) archer.archerShot1Right()
            if((game.player.x + game.player.width*1.25 - archer.x > -300 && game.player.x + game.player.width*1.25 - archer.x < -20  &&  game.player.x < archer.x) || game.player.x + game.player.width*1.25 - archer.x < -600) archer.archerWalkLeft()
            if((archer.x + archer.width*1.5 - game.player.x > -300 && archer.x + archer.width*1.5 - game.player.x < -20 &&  game.player.x > archer.x) || archer.x + archer.width*1.5 - game.player.x < -600 ) archer.archerWalkRight()
            if(archer.x + archer.width*1.5 - game.player.x < 0 && archer.x + archer.width*1.5 - game.player.x >= -20 && archer.evasionTimer >= archer.evasionInterval) {
                archer.evasionInterval = 0;
                archer.archerEvasionRight()
            }
        }
        
        // WalkLeft
        if (archer.state == 'WALK_LEFT') {
            if(game.player.x + game.player.width*1.25 - archer.x <= -300 && game.player.x + game.player.width*1.25 - archer.x >= -600 && game.player.x < archer.x) archer.archerShot1Left()
            if(game.player.x + game.player.width*1.25 - archer.x >= -20 && game.player.x + game.player.width*1.25 - archer.x < 0) archer.archerAttack1Left()
            if(game.player.x > archer.x) archer.archerWalkRight()
           
            
        }

        // WalkRight
        if (archer.state == 'WALK_RIGHT') {
            if(archer.x + archer.width*1.5 - game.player.x <= -300 && archer.x + archer.width*1.5 - game.player.x >= -600 && game.player.x > archer.x) archer.archerShot1Right()
            if(archer.x + archer.width*1.5 - game.player.x >= -20 && archer.x + archer.width*1.5 - game.player.x < 0  && game.player.x > archer.x) archer.archerAttack1Right()
            if(game.player.x < archer.x) archer.archerWalkLeft()
            
        }

        // Attack1Left
        if (archer.state == 'ATTACK_1_LEFT') {
            if (archer.checkerFrame == 1) archer.archerAttack2Left()
        }

        // Attack1Right
        if (archer.state == 'ATTACK_1_RIGHT') {
            if (archer.checkerFrame == 1) archer.archerAttack2Right()
        }

        // Attack2Left
        if (archer.state == 'ATTACK_2_LEFT') {
            if (archer.checkerFrame == 1) archer.archerAttack3Left()
        }

        // Attack2Right
        if (archer.state == 'ATTACK_2_RIGHT') {
            if (archer.checkerFrame == 1) archer.archerAttack3Right()
        }

        // Attack3Left
        if (archer.state == 'ATTACK_3_LEFT') {
            if (archer.checkerFrame == 1) archer.archerIdleLeft()
        }
        
        // Attack3Right
        if (archer.state == 'ATTACK_3_RIGHT') {
            if (archer.checkerFrame == 1) archer.archerIdleRight()
        }

        // Shot1Left
        if (archer.state == 'SHOT_1_LEFT') {
            if (archer.frameX == 3 && archer.maxQuantityArrow < 1) {
                game.special.push(new Arrow(game, archer.x, archer.y, game.player.x, game.player.y, "ARROW_LEFT", archer.height, archer.reverseFrame, archer.vxArrowLeft, archer.frameXArrowLeft, archer.imageArrowLeft))
                archer.maxQuantityArrow++
            }
            if (archer.frameX == 4) archer.maxQuantityArrow = 0
            if (archer.checkerFrame == 2) archer.archerIdleLeft()
           
        }
        
        // Shot1Right
        if (archer.state == 'SHOT_1_RIGHT') {
            if (archer.frameX == 11 && archer.maxQuantityArrow < 1) {
                game.special.push(new Arrow(game, archer.x, archer.y, game.player.x, game.player.y, "ARROW_RIGHT", archer.height, archer.reverseFrame, archer.vxArrowRight, archer.frameXArrowRight, archer.imageArrowRight))
                archer.maxQuantityArrow++
            }
            if (archer.frameX == 10) archer.maxQuantityArrow = 0
            if (archer.checkerFrame == 1) archer.archerIdleRight()
            
        }

        // HurtLeft 
        if (archer.state == 'HURT_LEFT') {
            if(archer.checkerFrame == 1) archer.archerIdleLeft()
            if(archer.HP <= 0 && deadMarker == true) {
                deadMarker = false
                archer.archerDeadLeft()
            }
        }

        // HurtRight
        if (archer.state == 'HURT_RIGHT') {
            if(archer.checkerFrame == 1) archer.archerIdleRight()
            if(archer.HP <= 0 && deadMarker == true) {
                deadMarker = false
                archer.archerDeadRight()
            }
        }

        // DeadLeft
        if (archer.state == 'DEAD_LEFT') {
            if(archer.checkerFrame == 1) enemies.forEach((enemyArcher, index) => {
                enemyArcher.dead(index)
            })
        }

        // DeadRight
        if (archer.state == 'DEAD_RIGHT') {
            if(archer.checkerFrame == 1) enemies.forEach((enemyArcher, index) => {
                enemyArcher.dead(index)
            })
        }

        // EvasionLeft
        if (archer.state == 'EVASION_LEFT') {
            if(archer.checkerFrame == 1) archer.archerIdleLeft();
            if(archer.frameX == 3) {
                archer.x += 10;
                archer.vy = -4;
                
            }
        }

        // EvasionRight
        if (archer.state == 'EVASION_RIGHT') {
            if(archer.checkerFrame == 1) archer.archerIdleRight();
            if(archer.frameX == 3) {
                archer.x += -10;
                archer.vy = -4;
                
            }
        }
    })
}