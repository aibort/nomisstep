
export default class Menu extends Phaser.Scene{
    constructor(){
        super({key:'MenuGame'}); 
    }

    create(){
        console.log("Escena menú");
        let fondo = this.add.sprite(700,400,'menuBG').setScale(1.2);
        //let logo = this.add.sprite(700,350,'logo');//El logo no es png...
        let boton_creativo = this.add.sprite(700,600,'botonCreativa').setInteractive().setScale(0.5);
        boton_creativo.on('pointerdown',() => this.cargaEscenaCreativa());
      }

    cargaEscenaCreativa(){
      this.scene.start('Creative');
    }
}