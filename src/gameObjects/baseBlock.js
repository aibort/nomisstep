import Block from "./block.js";

export default class BaseBlock extends Block{
    constructor(scene, x, y){
        super(scene,x,y,'bloqueBase');
        this.scene.physics.add.existing(this);
        this.body.immovable = true;
        this.color = false;
    }
}