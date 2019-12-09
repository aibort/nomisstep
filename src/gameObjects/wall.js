import Block from "./block.js";

export default class Wall extends Block{
    constructor(scene, x, y,indX,indY){
        super(scene, x, y,'muro' ,indX,indY);
        this.scene.physics.add.existing(this, true);
        this.body.immovable = true;
        this.setInteractive();
    }

}