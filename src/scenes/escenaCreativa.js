import Player from  "../gameObjects/player.js";
import Block  from  "../gameObjects/block.js";
import Wall from "../gameObjects/wall.js";
//import GraphicInp from "../gameObjects/GraphicInp.js"

export default class Creative extends Phaser.Scene {
    constructor(){
        super({key:'Creative'}); 
        this.size = 10;
        this.bloques = [];
        this.walls;
        this.arrow;
        this.graphics;
        
    }

    preload() {
        alert("CREATIVO");
        this.CargaArray();
    }
    create() { 
        this.graphics = this.add.graphics(30, 20);
        this.drawShape(0x027a71, 0x02fdeb);
        this.graphics.inputEnabled = true;
        this.graphics.input.useHandCursor = true;    
        /*this.graphics.events.onInputDown.add(onDown, this);
        this.graphics.events.onInputUp.add(onUp, this);
        this.graphics.events.onInputOver.add(onOver, this);
        this.graphics.events.onInputOut.add(onOut, this);*/
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

    drawShape(fill, style) {


        this.graphics.clear();
    
        //this.graphics.beginFill(fill);
        this.graphics.lineStyle(4, style, 1);
    
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(250, 0);
        this.graphics.lineTo(250, 200);
        this.graphics.lineTo(125, 100);
        this.graphics.lineTo(0, 200);
        this.graphics.lineTo(0, 0);
    
        //this.graphics.endFill();
    
    }
     onOver() {

        drawShape(0xab3602, 0xeb6702);
    
    }
    
    onDown() {
    
        drawShape(0x717a02, 0xebfd02);
    
    }
    
     onUp() {
    
        drawShape(0x027a71, 0x02fdeb);
    
    }
    
     onOut() {
    
        drawShape(0x027a71, 0x02fdeb);
    
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