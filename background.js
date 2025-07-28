class Layer {
    constructor(game, image) {
        this.game = game;
        this.width = this.game.width;
        this.height = this.game.height;
        this.imageWidth = 1067;
        this.x = 0;
        this.y = 0;
        this.vx = 2;
        this.bcSpeed = 0;
        this.speed = 0;
        this.image = image;

    }
    update() {
        if (this.game.player.currentState.state == 'WALK_RIGHT' ||
            this.game.player.currentState.state == 'RUN_RIGHT' ||
            this.game.player.currentState.state == 'RUN_ATTACK_RIGHT' ||
            this.game.player.currentState.state == 'JUMP_RIGHT') {
            this.x -= (this.vx * this.bcSpeed)*this.game.player.speed;
        } 
     
        if(this.x < -this.imageWidth) this.x = 0
    }
    draw(context) {
        context.drawImage(this.image, 0, this.y, this.imageWidth, this.height, this.x, this.y, this.imageWidth, this.height)
        if (this.x <= this.width - this.imageWidth) {
            context.drawImage(this.image, 0, this.y, this.imageWidth, this.height, (this.width + this.x) +66, this.y, this.imageWidth, this.height)
        }
    }
}

class Layer1 extends Layer {
    constructor(game) {
        super(game);
        this.bcSpeed = 0.1;
        this.image = document.getElementById('layer1')
    }
}

class Layer2 extends Layer {
    constructor(game) {
        super(game);
        this.bcSpeed = 0.2;
        this.image = document.getElementById('layer2')
    }
}

class Layer3 extends Layer {
    constructor(game) {
        super(game);
        this.bcSpeed = 0.3;
        this.image = document.getElementById('layer3')
    }
}

class Layer4 extends Layer {
    constructor(game) {
        super(game);
        this.bcSpeed = 0.4;
        this.image = document.getElementById('layer4')
    }
}

class Layer5 extends Layer {
    constructor(game) {
        super(game);
        this.bcSpeed = 0.5;
        this.image = document.getElementById('layer5')
    }
}

class Layer6 extends Layer {
    constructor(game) {
        super(game);
        this.bcSpeed = 0.6;
        this.image = document.getElementById('layer6')
    }
}

class Layer7 extends Layer {
    constructor(game) {
        super(game);
        this.bcSpeed = 0.6;
        this.image = document.getElementById('layer7')
    }
}

class Layer8 extends Layer {
    constructor(game) {
        super(game);
        this.bcSpeed = 0.7;
        this.image = document.getElementById('layer8')
    }
}

export class Background {
    constructor(game) {
        this.layers = [new Layer1(game), new Layer2(game), new Layer3(game), new Layer4(game), new Layer5(game), new Layer6(game), new Layer7(game), new Layer8(game)]
    }
    update() {
        this.layers.forEach((layer) => {
            layer.update()
        })
    }
    draw(context) {
        this.layers.forEach((layer) => {
            layer.draw(context)
        })
    }
}
