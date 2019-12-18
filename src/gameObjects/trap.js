import Block from "./block.js";
export default class Trap extends Block{
    constructor(scene, x, y,indX,indY,posIngroup){
        super(scene, x, y,'trap' ,indX,indY,posIngroup);
        this.scene.physics.add.existing(this, false);
        this.setInteractive();
        this.body.immovable = true;
        this.trampaActiva = true;
        this.estado = false;
    }
    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    desarma(){
        this.trampaActiva = false;
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