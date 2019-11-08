export default class Boot extends Phaser.Scene{
    constructor(){
        super({key:'boot'});
    }
    preload(){
        alert("BOOT");

        //Cargar imagenes del juego
        this.load.image('muro',       './assets/Imagenes/muro.png');
        this.load.image('square',     './assets/Imagenes/bloque.png');
        this.load.image('jugador',    './assets/Imagenes/personaje.png');
        this.load.image('background', './assets/Imagenes/sky.png');
        this.physics.add.sprite(100, 100, 'muro');

    }
    //Cambio a la escene creativa
    create(){
        this.scene.start('Creative');
    }
}