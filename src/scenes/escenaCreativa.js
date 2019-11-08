import Player from  "../gameObjects/player.js";
import Block  from  "../gameObjects/block.js";
import Wall from "../gameObjects/wall.js";

export default class Creative extends Phaser.Scene {
    constructor(){
        super({key:'Creative'}); 
        this.size = 10;
        this.bloques = [];
        this.walls;
        this.arrow;
    }

    preload() {
        alert("CREATIVO");
        this.CargaArray();
    }
    create() { 

        this.CargaBloques();
        this.bases = this.add.group();
        this.walls  = new Wall(this,100,100);
        this.arrow  = new Player(this,100 ,100,"jugador").setScale(0.5);//370 700
        this.cameras.main.startFollow(this.arrow);
        this.cameras.main.setViewport(450, 200, 400, 400);
    }
    //Métodos   
    CargaArray(){
        for(var i = 0 ; i < this.size;i++ ){
            this.bloques[i] = new Array(this.size);
        }
    }

    CargaBloques(){
        var auxX = 370;
        var auxY = 70;
        for(var i = 0 ; i < this.size; i++){
            let a = [];
            for(var j = 0 ; j < this.size; j++){
                a.push(new Block(this,auxX,auxY,"square",this.arrow));
                this.bloques.push(a);
                auxX += 70;
            }
            auxX = 370;
            auxY += 70;
        } 
    }

}