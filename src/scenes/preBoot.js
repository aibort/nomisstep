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
        let loading = this.add.image(700,800,"loading");
        this.tweens.add({
            targets: loading,
            scale: 0.15, 
            y: 0,
            ease: 'Quintic.Out',
            duration: 1000,
            repeat: -1
        });
        this.scene.launch('boot');
    }
}