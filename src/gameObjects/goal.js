import Block from "./block.js";
export default class Goal extends Block{
    constructor(scene, x, y,indX,indY,posIngroup){
        super(scene, x, y, 'meta',indX,indY,posIngroup);
        this.setInteractive();
        this.final = true;
        this.scene.physics.add.existing(this);   
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }


    
}