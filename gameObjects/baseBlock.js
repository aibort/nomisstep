import Block from "./block.js";

export default class BaseBlock extends Block{
    constructor(scene, x, y,posIngroup){
        super(scene,x,y,'bloqueBase',posIngroup);
        this.scene.physics.add.existing(this);
        this.body.immovable = true;
        this.color = false;
        this.ocupado = true;
    }
}