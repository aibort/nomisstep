export default class Block extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, name,indX,indY,posIngroup){
        super(scene, x, y, name,indX,indY,posIngroup);
        this.scene.add.existing(this);        
        this.niebla = false;
        this.indX = indX;
        this.indY = indY;
        this.posIngroup = posIngroup;
        this.direcciones = [{
            arriba : false,
            derecha : false,
            abajo : false,
            izquierda : false
        }] 


        
    }

    revisa (actDir){
        switch(actDir){
            case "arriba":
                return this.direcciones.arriba;
            break;

            case "derecha":
                    return this.direcciones.derecha;

            break;
            case "abajo":
                    return this.direcciones.abajo;
            break;

            case "izquierda":
                    return this.direcciones.izquierda;
            break;
        }
    }

    reasigna(actDir){
        switch(actDir){
            case "arriba":
                this.direcciones.arriba = true;
            break;

            case "derecha":
                this.direcciones.derecha = true;

            break;
            case "abajo":
                this.direcciones.abajo = true;
            break;

            case "izquierda":
                this.direcciones.izquierda = true;
            break;
        }
    }

    reiniciaEstados(){
        this.direcciones.arriba = false;
        this.direcciones.derecha = false;
        this.direcciones.abajo = false;
        this.direcciones.izquierda = false;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getIndX(){
        return this.indX;
    }

    getIndY(){
        return this.indY;   
    }

    getPosEnGrupo(){
        return this.posIngroup;
    }
}


