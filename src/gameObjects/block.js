export default class Block extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, name){
        super(scene, x, y, name);
        this.scene.add.existing(this);        
        this.niebla = false;
    }

}


