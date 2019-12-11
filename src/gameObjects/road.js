import Block from "./block.js";
export default class Road extends Block{
    constructor(scene, x, y,indX,indY,posIngroup){
        super(scene,x,y,'camino',indX,indY,posIngroup);
        this.setInteractive();   
        this.tieneTrampa= false;
    }

}





