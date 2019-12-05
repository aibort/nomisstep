
export default class Menu extends Phaser.Scene{
    constructor(){
        super({key:'MenuGame'}); 
    }

    create(){
        console.log("Escena menú");
        let logo = this.add.sprite(700,350,'logo');//El logo no es png...
        let boton_creativo = this.add.sprite(400,400,'botonCreativa').setInteractive().setScale(0.5);
        boton_creativo.on('pointerdown',() => this.cargaEscenaCreativa());

      }

    cargaEscenaCreativa(){
      this.scene.start('Creative');
    }
}