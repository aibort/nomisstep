//import EscenaBase from "../scenes/escenaCreativa.js";
import Player from "../gameObjects/player.js";
import Road from        "../gameObjects/road.js";
import BaseBlock from   "../gameObjects/baseBlock.js";
import Tramp from       "../gameObjects/tramp.js";
import Wall from        "../gameObjects/wall.js";
import Trap from        "../gameObjects/tramp.js";


export default class Challenger extends Phaser.Scene{
    
    constructor(){
        super({key:'Challenger'}); 
        this.player;
    }
    create(){
        this.player  = new Player(this,POS_CAMINO_X ,POS_CAMINO_Y,"jugador").setScale(0.5);
        //Crea la colisión entre el jugador y los distintos elementos
        this.physics.add.collider(this.player,this.baseGroup);//,this.onCollision); // revisar onCollision
        this.physics.add.collider(this.player,this.trapGroup,this.onCollision);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setViewport(450, 200, 400, 400);
        //this.scene.load('Challenger',info);
        //Phaser.Scene.call(,)
        //cargar desde tablero, 
        //trampa invisible como camino y con posibilidiad de desactivarla (sprite si es posible)
    } 
        onCollision(){
            this.player.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
        }
       
}



