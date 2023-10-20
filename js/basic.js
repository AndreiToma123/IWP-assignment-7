let game;

const gameOption = {
    monkeySpeed: 200,
    itemGravity: 100,
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
        scene: PlayGame
    },
    game = new Phaser.Game(gameConfig)
    window.focus();
}

class PlayGame extends Phaser.Scene {

    constructor() {
        super("PlayGame")
        this.score = 0;
    }

    preload(){
        this.load.image("ground", "assets/Free Platform Game Assets/Platform Game Assets/Tiles/png/128x128/Grass.png");
        this.load.image("monkey", "assets/2d monkey1.png");
        this.load.image("background", "assets/Free Platform Game Assets/Platform Game Assets/Background/png/1920x1080/All/Sky.png")
        this.load.image("banana", "assets/fruits/banana.png");
        this.load.image("pear", "assets/fruits/pear.png");
        this.load.image("orange", "assets/fruits/orange.png");
        this.load.image("bomb", "assets/fruits/bomb.png");
    }


    create(){

        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.groundGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false,
        })

        this.scoreText = this.add.text(8, 3, "0", {fontSize: "50px", fill: "#ffffff"})

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

        this.fruitGroup = this.physics.add.group({})
        this.bombGroup = this.physics.add.group({})
        this.physics.add.overlap(this.monkey, this.fruitGroup, this.collectFruit, null, this)
        this.physics.add.overlap(this.groundGroup, this.bombGroup, this.explodeBomb, null, this)

        this.cursors = this.input.keyboard.createCursorKeys();

        this.time.addEvent({
            callback: this.spawnFruit,
            callbackScope: this,
            delay: 1100,
            loop: true
        })

        this.time.addEvent({
            callback: this.spawnBomb,
            callbackScope: this,
            delay: 2000,
            loop: true
        })
        
    }

    spawnFruit() {
        if (Phaser.Math.Between(0, 1)) {
            this.fruitGroup.create(Phaser.Math.Between(0, this.game.config.width), 0, "banana").setScale(0.3);
            this.fruitGroup.create(Phaser.Math.Between(0, this.game.config.width), 0, "pear").setScale(0.3);
            this.fruitGroup.create(Phaser.Math.Between(0, this.game.config.width), 0, "orange").setScale(0.3);
            this.fruitGroup.setVelocityY(gameOption.monkeySpeed);
        }
    }

    spawnBomb() {
        if (Phaser.Math.Between(0, 1)) {
            this.bombGroup.create(Phaser.Math.Between(0, this.game.config.width), 0, "bomb").setScale(0.2);
            this.bombGroup.setVelocityY(gameOption.monkeySpeed);
        }
    }

    collectFruit(monkey, fruit) {
        fruit.disableBody(true, true);
        if(fruit.texture.key === "pear"){
            this.score += 1;
            this.scoreText.setText(this.score);
        }
        if(fruit.texture.key === "orange"){
            this.score += 5;
            this.scoreText.setText(this.score);
        }
        if(fruit.texture.key === "banana"){
            this.score += 10;
            this.scoreText.setText(this.score);
        }
    }

    explodeBomb() {
        this.scene.start("PlayGame");
    }

    update() {
        if(this.cursors.left.isDown){
            this.monkey.body.velocity.x = -gameOption.monkeySpeed;
        }
        else if(this.cursors.right.isDown){
            this.monkey.body.velocity.x = gameOption.monkeySpeed;
            // this.monkey.flipX = true;
        }
        else{
            this.monkey.body.velocity.x = 0;
        }
    }

}