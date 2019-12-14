import Block from "./block.js";
export default class Trap extends Block{
    constructor(scene, x, y,indX,indY,posIngroup){
        super(scene, x, y,'trap' ,indX,indY,posIngroup);
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