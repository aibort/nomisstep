import Block from "./block.js";

export default class Tramp extends Block{
    constructor(x,y,type){
        super(x,y,type,'trap');
        //this.setInteractive();
        this.setInteractive.draggable = true;
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

}