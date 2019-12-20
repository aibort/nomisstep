


export default class Controls extends Phaser.Scene{
    constructor(){
        super({key:'Controls'}); 
      
    }
    preload() { 
        console.log("Escena controles cargada");
    }

    create ()
    {           
        let demo = this.add.sprite(700,400,'ctrls').setScale(0.8);    
        let boton_play= this.add.sprite(650,30,'botonCreativa').setInteractive().setScale(0.5);
        boton_play.on('pointerdown',() => this.cargaEscenaCreativa());
        let boton_menu = this.add.sprite(1000,30,'botonMenu').setInteractive().setScale(0.5);
        boton_menu.on('pointerdown',() => this.cargaEscenaMenu());
    }
    cargaEscenaCreativa(){
        this.scene.start('Creative');
        
      }
    cargaEscenaMenu(){
        this.scene.start('MenuGame');
        
      }  
}
