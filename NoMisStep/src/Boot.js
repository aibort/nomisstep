export default class Boot extends Phaser.Scene{
    constructor(){
        super({key:'boot'});
    }
    preload(){
        alert("BOOT");
        //Cargar imagenes del juego
        this.load.image('piedra',   '../assets/Imagenes/stone.png');
        this.load.image('square',    '../assets/Imagenes/bloque.png');
        this.load.image('jugador',  '../assets/Imagenes/personaje.png');
        this.load.image('background', '../assets/Imagenes/sky.png');

    }
    //Cambio a la escene creativa
    create(){
        this.scene.start('CreativeMode');
    }
}