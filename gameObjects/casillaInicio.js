import Block from "./block.js";
export default class Spawn extends Block{
    constructor(scene, x, y, indX, indY, posIngroup){
        super(scene, x, y, 'inicio', indX, indY, posIngroup);
        this.setInteractive();
        this.inicio = true;
    }

    /*getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }*/
}