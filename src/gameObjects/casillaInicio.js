import Block from "./block.js";
export default class Spawn extends Block{
    constructor(scene, x, y){
        super(scene,x,y,'inicio');
        this.setInteractive();
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
}