import Player from  "./player.js";
import Block  from  "./block.js";

export default class Creativa extends Phaser.Scene {
    constructor(){
        super({key:'CreativeMode'});
        this.size = 10;
        this.bloques = [];// new Array(this.size);
    }
   

    preload() {
        alert("CREATIVO");
        this.CargaArray();

    }
    
      create() { 
         
          this.CargaBloques();
          this.arrow  = new Player(this,700,400,"jugador").setScale(0.5);
    }

    //Métodos
    CargaArray(){
        for(var i = 0 ; i < this.size;i++ ){
            this.bloques[i] = new Array(this.size);
        }
    }

    CargaBloques(){
        var auxX = 350;
        var auxY = 75;

        for(var i = 0 ; i < this.size; i++){
            let a = [];
            for(var j = 0 ; j < this.size; j++){
                a.push(new Block(this,auxX,auxY,"square"));//probsr fuera 
                this.bloques.push(a);
                auxX += 75;
            }
            auxX = 350;
            auxY += 75;

        }
    }

    

}