let game;

const gameOption = {
    monkeySpeed: 100
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
    
}