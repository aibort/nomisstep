import Block from "./block.js";

export default class Tramp extends Block{
    constructor(scene, x, y,indX,indY){
        super(scene, x, y,'trap' ,indX,indY);
        this.scene.physics.add.existing(this, false);
        this.setInteractive();
        this.body.immovable = true;
        this.setScale(0.4);
        
    }
    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }


}