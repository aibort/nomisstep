import preBoot from "./scenes/preBoot.js";

export default class Boot extends Phaser.Scene{
    constructor(){
        super({key:'boot'});

    }
    preload(){
        this.scene.sendToBack("boot");
        console.log("escena Boot");
        //Cargar imagenes del juego 
        this.load.image('inicio','./assets/Imagenes/inicio.png');
        this.load.image('meta','./assets/Imagenes/meta.png');
        this.load.image('muro','./assets/Imagenes/muro.png');
        this.load.image('camino','./assets/Imagenes/bloque.png');
        this.load.image('jugador', './assets/Imagenes/personaje.png');
        this.load.image('bloqueBase', './assets/Imagenes/baseBlock.png');
        this.load.image('trap', './assets/Imagenes/trap.png');
        this.load.image('penalizado', './assets/Botones/penalizado.png');
        this.load.image('gitAmaro','./assets/Imagenes/gitAmaro.png');
        this.load.image('twAmaro','./assets/Imagenes/twAmaro.png');


        //Fondo de escenas / menus
        this.load.image('baseMenu', './assets/Imagenes/fondoMenu.png');
        this.load.image('imagenInfo', './assets/Imagenes/tablaInformacion.png');
        this.load.image('menuBG', './assets/Imagenes/fondoStart.png');
        this.load.image('creativaBG', './assets/Imagenes/background.png');


        //Cargar imagenes de botones
        this.load.image('agregaBloque','./assets/Botones/agregaBloque.png');
        this.load.image('quitaBloque','./assets/Botones/quitaBloque.png');
        this.load.image('agregaTrampa','./assets/Botones/agregaTrampa.png');
        this.load.image('quitaTrampa','./assets/Botones/quitaTrampa.png');
        this.load.image('botonCreativa','./assets/Botones/BotonCreativo.png');
        this.load.image('botonTutorial','./assets/Botones/BotonTutorial.png');
        this.load.image('botonControles','./assets/Botones/BotonControles.png');
        this.load.image('amaroBoton',   './assets/Botones/amaroBoton.png');
        this.load.image('albertoBoton', './assets/Botones/albertoBoton.png');

        //Cargar animaciones
        this.load.spritesheet('caminoAnim',     './assets/Imagenes/bloqueSpriteSheet.png',  { frameWidth: 70, frameHeight:70 } );
        this.load.spritesheet('jugadorParado',  './assets/Imagenes/jugadorParado.png',      { frameWidth: 70, frameHeight:70 } );


        //Cargar logos
        this.load.image('logo','./assets/Logos/Logo.png' );

        //Cargar sonidos
        this.load.audio('trampaAudio','./assets/Audios/trampaSonido.mp3' );
        this.load.audio('menuTema','./assets/Audios/audioMenu.mp3' );
        this.load.audio('creativaTema','./assets/Audios/audioCreativa.mp3' );
        this.load.audio('audioDesafio','./assets/Audios/audioDesafio.mp3' );
        this.load.audio('desactivar','./assets/Audios/desactivar.wav' );
        this.load.audio('cuenta','./assets/Audios/cuenta.mp3' );
        this.load.audio('quitar','./assets/Audios/quitar.wav' );
        this.load.audio('tocaTrampa','./assets/Audios/tocaTrampa.wav');
        this.load.audio('click','./assets/Audios/click.wav' );
        this.load.audio('ponerMuro','./assets/Audios/ponerMuro.wav' );
        this.load.audio('error','./assets/Audios/error.mp3' );


        //cargar numeros
        this.load.image('0', './assets/Imagenes/0.png');
        this.load.image('1', './assets/Imagenes/1.png');
        this.load.image('2', './assets/Imagenes/2.png');
        this.load.image('3', './assets/Imagenes/3.png');
        this.load.image('4', './assets/Imagenes/4.png');
        this.load.image('5', './assets/Imagenes/5.png');
        this.load.image('6', './assets/Imagenes/6.png');
        this.load.image('7', './assets/Imagenes/7.png');
        this.load.image('8', './assets/Imagenes/8.png');
        this.load.image('9', './assets/Imagenes/9.png');


    }
    //Cambio a la escene creativa
    create(){
        this.scene.start('MenuGame');
    }
}