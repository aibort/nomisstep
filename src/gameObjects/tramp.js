import Block from "./block.js";

export default class Tramp extends Block{
    constructor(x,y,type){
        super(x,y,type,'trap');
        this.scene.physics.add.existing(this, false);
        this.setInteractive();
        this.body.immovable = true;
        this.setScale(0.4);
        this.audio;
        
    }
    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    playSonido(){
        this.audio = this.sound.add('trampaAudio');
        this.audio.play();
    }

}