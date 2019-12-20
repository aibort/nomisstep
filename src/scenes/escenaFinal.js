
export default class Lobby extends Phaser.Scene{
    constructor(){
        super({key:'Lobby'});
        this.tiempoPlayerA;
        this.tiempoPlayerB;
        this.HUD;
        this.estado = false;

    }
    preload(){
//primerTiempo
        this.load.image('volver','./assets/Botones/mainMenu.png');
        this.load.image('siguiente','./assets/Botones/siguienteTurno.png');


        this.load.image('primerTiempo','./assets/Imagenes/primerTiempo.png');
        this.load.image('segundoTiempo','./assets/Imagenes/segundoTiempo.png');
        this.load.image('primerTiempo','./assets/Imagenes/primerTiempo.png');
        this.load.image('primerGanador','./assets/Imagenes/primerGanador.png');
        this.load.image('segundoGanador','./assets/Imagenes/segundoGanador.png');
    }

    create(){
        this.add.sprite(700,400,'menuBG').setScale(1.5);
        this.HUD = this.scene.get('HUD');

        let boton_menu = this.add.sprite(700,0,'volver').setInteractive().setScale(0.5);
        boton_menu.on('pointerdown',() => this.cargaMenu());
        boton_menu.on('pointerover',function(boton_menu){
            boton_menu.setTint(0x696969);
        });
        boton_menu.on('pointerout',function(boton_menu){
            boton_menu.setTint(0xFFFFFFF);
        });
        this.tweens.add({
          targets: boton_menu,
          y: '+=500', 
          ease: 'Quintic.Out',
          duration: 500,
        });




        if(this.tiempoPlayerA == undefined){
            this.tiempoPlayerA = this.HUD.getTimer();
        }else{
            this.tiempoPlayerB = this.HUD.getTimer();
            this.estado = true;
        }

        if(!this.estado){
            console.log("tiempo A " +  this.tiempoPlayerA);
        }
        else{
            console.log("tiempo B " +  this.tiempoPlayerB);
        }




    }

    cargaMenu(){
        this.scene.switch("MenuGame");
    }

    
}