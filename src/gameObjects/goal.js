import Block from "./block.js";
export default class Goal extends Block{
    constructor(scene, x, y,indX,indY){
        super(scene, x, y, 'meta',indX,indY);
        this.setInteractive();
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
}