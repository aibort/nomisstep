import Block from "./block.js";

export default class Wall extends Block{
    constructor(scene, x, y){
        super(scene,x,y,'muro');
        this.scene.physics.add.existing(this, true);
        
    }

    delete(){
        delete this;
    }

}