import Block from "./block.js";
export default class Road extends Block{
    constructor(scene, x, y,indX,indY,posIngroup){
        super(scene,x,y,'camino',indX,indY,posIngroup);
        this.scene.physics.add.existing(this);   
        this.setInteractive();   
        this.tieneTrampa = false;
        this.estado = false;
        this.revisado = false;
    }

    haSidoDesactivado(){
        return this.revisado;
    }

    desactivador(){
        this.revisado = true;
    }

    cambiaColor(_color){
        this.setTint(_color);
    }

    cambiaEstado(actEstado){
        this.estado = actEstado;
    }

    getEstado(){
        return this.estado;
    }

    preUpdate(){

        if(this.estado){
            if(this.scene.getElegido() == this){
                this.setTint(0xAFAFAF);
            }
            else{
                this.setTint(0xFFFFFF);
                this.estado = false;

            }
        } 
    }

}





