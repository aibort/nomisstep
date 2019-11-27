export default class Tramp extends Phaser.GameObject.Sprite{
    constructor(x,y,type){
        super(x,y,type);
        this.scene.add.existing(this);
    }

}