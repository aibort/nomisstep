export default class preBoot extends Phaser.Scene{
    constructor(){
        super({key:'preBoot'});
    }

    preload(){
        //Escena anterior al boot para rellenar el tiempo de espera
        console.log("cargado preBoot");
        this.load.image('loading','./assets/Imagenes/loading.png');
    }
    create(){
        this.add.image(700,400,"loading");
        this.scene.launch('boot');
    }
}