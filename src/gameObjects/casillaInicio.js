import Block from "./block.js";
export default class Spawn extends Block{
    constructor(scene, x, y, indX, indY, posIngroup){
        super(scene, x, y, 'inicio', indX, indY, posIngroup);
        this.setInteractive();
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
}