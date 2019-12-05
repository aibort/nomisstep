export default class Block extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, name,indX,indY){
        super(scene, x, y, name,indX,indY);
        this.scene.add.existing(this);        
        this.niebla = false;
        this.indX = indX;
        this.indY = indY;
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

}


