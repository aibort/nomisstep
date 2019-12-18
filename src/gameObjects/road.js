import Block from "./block.js";
export default class Road extends Block{
    constructor(scene, x, y,indX,indY,posIngroup){
        super(scene,x,y,'camino',indX,indY,posIngroup);
        this.scene.physics.add.existing(this);   
        this.setInteractive();   
        this.tieneTrampa = false;
        this.estado = false;
    }

    cambiaColor(_color){
        this.setTint(_color);
    }

    cambiaEstado(actEstado){
        this.estado = actEstado;
    }

    preupdate(){
        if(this.estado){
            this.setTint(0x938E8E);
        }   
        else{
            this.setTint(0xFFFFFF);
        }
    }

}





