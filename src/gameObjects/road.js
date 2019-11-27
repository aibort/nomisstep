import Block from "./block.js";
export default class Road extends Block{
    constructor(scene, x, y){
        super(scene,x,y,'camino');
        this.setInteractive();
        this.setInteractive.draggable = true;

        this.preCreate();
    }

    preCreate(){
        console.log("GGWP");


    }
}


