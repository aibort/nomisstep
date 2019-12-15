import Player from      "../gameObjects/player.js";
import Wall from        "../gameObjects/wall.js";
import Trap from        "../gameObjects/trap.js";
import Road from        "../gameObjects/road.js";
import BaseBlock from   "../gameObjects/baseBlock.js";
import Spawn from       "../gameObjects/casillaInicio.js";
import Goal from        "../gameObjects/goal.js";

const NUM_CAMINOS_X = 10;
const NUM_CAMINOS_Y = 9;
const NUM_BASE_X = NUM_CAMINOS_X + 2;
const NUM_BASE_Y = NUM_CAMINOS_Y + 2;
const POS_CAMINO_X = 200;
const POS_CAMINO_Y = 100;

const BASE_SIZE_X = 70;
const BASE_SIZE_Y = 70;

const POS_BASE_X = POS_CAMINO_X - BASE_SIZE_X;
const POS_BASE_Y = POS_CAMINO_Y - BASE_SIZE_Y;


export default class Challenger extends Phaser.Scene{
    constructor(tablero,player){
        super({key:'Challenger'}); 
        this.tablero = tablero;
        this.player = player;
        this.baseGroup;
        this.murosGroup;
    }
    create(){
        this.player = new Player(this,200,200, 'jugador'); //posx, posy deberian ser de escenacreativa
        console.log("Creada");
        //this.player = new Player(this,'jugador',);
        //Crea la colisión entre el jugador y los distintos elementos
        
        
        this.physics.add.collider(this.player,this.baseGroup);//,this.onCollision); // revisar onCollision
        this.physics.add.collider(this.player,this.trapGroup,this.onCollision);
        
        //this.CreaBase();
        //this.scene.load('Challenger',info);
        
    } 
        onCollision(){
            this.player.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
        }
        CreaBase(){
            let contador = 0;
            for(let i = 0 ; i < NUM_BASE_Y ; i++){
                
                if(i == 0 || contador == NUM_BASE_Y - 1){
                    for(let j = 0 ; j < NUM_BASE_X ; j++){
                        let actBase = new BaseBlock(this,POS_BASE_X + BASE_SIZE_X * j,POS_BASE_Y + BASE_SIZE_Y * contador);
                        this.baseGroup.add(actBase);
                        
                    }
                    contador++;
                }
                else {
                    let baseDer = new BaseBlock(this, POS_BASE_X , POS_BASE_Y + BASE_SIZE_Y * contador);
                    this.baseGroup.add(baseDer);
                    //this.tableroGroup[i][contador] = baseDer;
                    let baseIzq = new BaseBlock(this,POS_BASE_X + BASE_SIZE_X * (NUM_BASE_X - 1) ,POS_BASE_Y + BASE_SIZE_Y * contador);
                    this.baseGroup.add(baseIzq);
                    //this.tableroGroup[NUM_BASE_X - 1][contador] = baseIzq;
                    contador++;
    
                }
    
            }
        }//*/
       
}


    
   // create(){
    
        
        //Amaro: Esto irá en la escena desafío
        //Crea la colisión entre el jugador y los distintos elementos 
        //this.physics.add.collider(this.player,this.baseGroup,this.onCollision);
        //this.physics.add.collider(this.player,this.trapGroup,this.onCollision);
        //this.cameras.main.startFollow(this.player);
        //this.cameras.main.setViewport(450, 200, 400, 400);


        //Poner base
        //renderizar tablero
        //set visible player
        //*complemento de trampa para exploten
        //se tiene que borrar la trampa del tablero o  trampa ser visible y quitar colision
        //un timer para saber
        //Crear clase desactivadora de trampas
        //player tween
        
        //gestionar colision contra la meta
        //opcional mejorar movimiento player
        //opcional escribir sobre json los recods


