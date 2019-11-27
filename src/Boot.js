export default class Boot extends Phaser.Scene{
    constructor(){
        super({key:'boot'});
    }
    preload(){
        console.log("escena Boot");
        //Cargar imagenes del juego
        this.load.image('boton',      './assets/Botones/Boton.png');
        this.load.image('muro',       './assets/Imagenes/muro.png');
        this.load.image('camino',     './assets/Imagenes/bloque.png');
        this.load.spritesheet('caminoAnim', './assets/Imagenes/bloqueSpriteSheet.png', { frameWidth: 70, frameHeight:70 } );
        this.load.image('jugador',    './assets/Imagenes/personaje.png');
        this.load.image('background', './assets/Imagenes/sky.png');
        this.load.image('bloqueBase', './assets/Imagenes/baseBlock.png');
    }
    //Cambio a la escene creativa
    create(){
        this.scene.start('Creative');
    }
}