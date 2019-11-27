
export default class Menu extends Phaser.Scene{
    constructor(){
        super({key:'MenuGame'}); 
    }

    preload() {

        this.load.spritesheet('boton', 'https://res.cloudinary.com/ducpf6etd/image/upload/v1535675770/button/button.png', { frameWidth: 300, frameHeight: 50, startFrame: 0, endFrame: 8 });
      }
    
      create() {
        this.anims.create({ key: 'button-inactive', frames: this.anims.generateFrameNumbers('boton', { start: 0, end: 0 }), frameRate: 20, repeat: 0, yoyo: false });
        this.anims.create({ key: 'button-activate', frames: this.anims.generateFrameNumbers('boton', { start: 0, end: 3 }), frameRate: 20, repeat: 0, yoyo: false });
        this.anims.create({ key: 'button-idle', frames: this.anims.generateFrameNumbers('boton', { start: 3, end: 3 }), frameRate: 20, repeat: 0, yoyo: false });
        this.anims.create({ key: 'button-pulse', frames: this.anims.generateFrameNumbers('boton', { start: 3, end: 8 }), frameRate: 20, repeat: 0, yoyo: true });
        this.anims.create({ key: 'button-select', frames: this.anims.generateFrameNumbers('boton', { start: 3, end: 8 }), frameRate: 20, repeat: 0, yoyo: false });
    
        this.inactiveButton =   new Button(this, 200, 50, 'click to pulse', 'pulse');
        this.selectableButton = new Button(this, 200, 125, 'click to toggle highlight', 'selectable');
        this.idlebutton =       new Button(this, 200, 200, 'inactive button', '');
      }

    create(){
        console.log("Escena menú");
        //this.scene.start('Boot');
    }
}