import Block from "./block.js";

export default class Wall extends Block{
    constructor(scene, x, y,indX,indY,posIngroup){
        super(scene, x, y,'muro' ,indX,indY,posIngroup);
        this.scene.physics.add.existing(this, true);
        this.body.immovable = true;
        this.setInteractive();
        this.ocupado = true;
    }

    //Para saber si un bloque está siendo ocupado.
    estaUsado(){
        return this.ocupado;
    }

}