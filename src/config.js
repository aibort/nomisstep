var config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 800,
    backgroundColor: '#2C9FD1',
    pixelArt: true,
    input: {
        gamepad: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Boot, Creative],
    physics: { default: 'arcade', arcade: { debug: false } }
};
new Phaser.Game(config);