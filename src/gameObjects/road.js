import Block from "./block.js";
export default class Road extends Block{
    constructor(scene, x, y,indX,indY){
        super(scene,x,y,'camino',indX,indY);
        this.setInteractive();        
        this.indX = indX;
        this.indY = indY;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
}





