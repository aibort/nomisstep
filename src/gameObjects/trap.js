import Block from "./block.js";
export default class Trap extends Block{
    constructor(scene, x, y,indX,indY,posIngroup){
        super(scene, x, y,'trap' ,indX,indY,posIngroup);
        this.collision;
        this.scene.physics.add.existing(this, false);
        this.setInteractive();
        this.body.immovable = true;
        this.trampaActiva = true;
        this.estado = false;
        this.revisado = false;
    }

    haSidoDesactivado(){
        return this.revisado;
    }

    desactivador(){
        this.revisado = true;
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

    estaActiva(){
        return this.trampaActiva;
    }

    cambiaEstado(actEstado){
        this.estado = actEstado;
    }

    getEstado(){
        return this.estado;
    }

    getColision(){
        return this.collision;
    }

    agregaColision(_colision){
        this.collision = _colision;
    }

    getColision(){
        if(this.collision != undefined){
            return this.collision;
        }
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
        else{
            this.setTint(0xFFFFFF);
        }
    }


}