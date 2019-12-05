export default class Boot extends Phaser.Scene{
    constructor(){
        super({key:'boot'});
    }
    preload(){
        console.log("escena Boot");
        //Cargar imagenes del juego
        this.load.image('inicio','./assets/Imagenes/inicio.png');
        this.load.image('meta','./assets/Imagenes/meta.png');
        this.load.image('muro','./assets/Imagenes/muro.png');
        this.load.image('camino','./assets/Imagenes/bloque.png');
        this.load.image('jugador', './assets/Imagenes/personaje.png');
        this.load.image('background', './assets/Imagenes/sky.png');
        this.load.image('bloqueBase', './assets/Imagenes/baseBlock.png');
        this.load.image('trap', './assets/Imagenes/trap.png')
        this.load.image('baseMenu', './assets/Imagenes/fondoMenu.png');
        //Cargar imagenes de botones
        this.load.image('agregaBloque','./assets/Botones/agregaBloque.png');
        this.load.image('quitaBloque','./assets/Botones/quitaBloque.png');
        this.load.image('agregaTrampa','./assets/Botones/agregaTrampa.png');
        this.load.image('quitaTrampa','./assets/Botones/quitaTrampa.png');
        this.load.image('botonCreativa','./assets/Botones/BotonCreativo.png');

        //Cargar animaciones
        this.load.spritesheet('caminoAnim', './assets/Imagenes/bloqueSpriteSheet.png', { frameWidth: 70, frameHeight:70 } );

        //Cargar logos
        this.load.image('logo','./assets/Logos/Logo.png' );

        //Cargar sonidos
        this.load.audio('trampaAudio','./assets/Audios/trampaSonido.mp3' );


    }
    //Cambio a la escene creativa
    create(){
        //this.scene.start('Creative');
        this.scene.start('MenuGame');


    }
}