export class InputHandler {
    constructor(game) {
        this.keys = []
        this.game = game;
        window.addEventListener('keydown', (e) => {
            console.log(e.key)
            if (e.key === 'a' ||
                e.key == 'd' ||
                e.key === 's' ||
                e.key === 'w' ||
                e.key === 'A' ||
                e.key == 'D' ||
                e.key === 'S' ||
                e.key === ' ' ||
                e.key === 'f'||
                e.key === 'W' &&
                this.keys.indexOf(e.key) === -1 && this.keys.length < 2
            ) this.keys.push(e.key);
            else if (e.key === 'g') {
                this.game.debug = !this.game.debug;
            }
        })

        window.addEventListener('keyup', (e) => {
            console.log(e.key)
            if (e.key === 'a' ||
                e.key == 'd' ||
                e.key === 's' ||
                e.key === 'w' ||
                e.key === 'A' ||
                e.key == 'D' ||
                e.key === 'S' ||
                e.key === ' ' ||
                e.key === 'f'||
                e.key === 'W' 
            ) this.keys.splice(this.keys.indexOf(e.key), 1)
        })
        
    }
    }
       