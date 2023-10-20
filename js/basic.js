let game;

const gameOption = {
    monkeySpeed: 200
}

window.onload = function(){
    let gameConfig = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 1000,

        },
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
                gravity:{
                    y: 0 
                }
            }
        },
        scene: playGame
    },
    game = new Phaser.Game(gameConfig)
    window.focus();
}

class playGame extends Phaser.Scene {
    preload(){
        this.load.image("ground", "assets/Free Platform Game Assets/Platform Game Assets/Tiles/png/128x128/Grass.png");
        this.load.image("monkey", "assets/2d monkey1.png");
        this.load.image("background", "assets/Free Platform Game Assets/Platform Game Assets/Background/png/1920x1080/All/Sky.png")
    }


    create(){

        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.groundGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false,
        })

        this.groundGroup.create(60, 970, 'ground');
        this.groundGroup.create(180, 970, 'ground');
        this.groundGroup.create(300, 970, 'ground');
        this.groundGroup.create(420, 970, 'ground');
        this.groundGroup.create(540, 970, 'ground');
        this.groundGroup.create(660, 970, 'ground');
        this.groundGroup.create(760, 970, 'ground');

        

        

        this.monkey = this.physics.add.sprite(this.game.config.width / 2, 870, 'monkey').setScale(0.2);
        this.monkey.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.monkey, this.groundGroup);

        this.monkey.setSize(250, 200, true);

        this.cursors = this.input.keyboard.createCursorKeys();
        
    }

    update() {
        if(this.cursors.left.isDown){
            this.monkey.body.velocity.x = -gameOption.monkeySpeed;
        }
        else if(this.cursors.right.isDown){
            this.monkey.body.velocity.x = gameOption.monkeySpeed;
        }
        else{
            this.monkey.body.velocity.x = 0;
        }
    }

}