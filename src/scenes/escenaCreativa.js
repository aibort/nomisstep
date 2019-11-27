import Player from  "../gameObjects/player.js";
import Wall from "../gameObjects/wall.js";
import Road from "../gameObjects/road.js";
import BaseBlock from "../gameObjects/baseBlock.js";

//Globales para los caminos
const POS_CAMINO_X = 420;
const POS_CAMINO_Y = 210;
const NUM_CAMINOS_X = 5;
const NUM_CAMINOS_Y = 5;
const CAMINO_SIZE_X = 70;
const CAMINO_SIZE_Y = 70;
//globales para los muros
const NUM_MUROS_X = NUM_CAMINOS_X + 2;
const NUM_MUROS_Y = NUM_CAMINOS_Y + 2;
const POS_MURO_X = 420;
const POS_MURO_Y = 140;
const MURO_SIZE_X = 70;
const MURO_SIZE_Y = 70;
//Globales para crear la base
const NUM_BASE_X = NUM_CAMINOS_X + 2;
const NUM_BASE_Y = NUM_CAMINOS_Y + 2;
const BASE_SIZE_X = 70;
const BASE_SIZE_Y = 70;
const POS_BASE_X = POS_CAMINO_X - BASE_SIZE_X;
const POS_BASE_Y = POS_CAMINO_Y - BASE_SIZE_Y;
const POS_DOWN_X = (NUM_CAMINOS_X * BASE_SIZE_X ) + POS_BASE_X + BASE_SIZE_X;
const POS_DOWN_Y = (NUM_CAMINOS_Y * BASE_SIZE_Y ) + POS_BASE_Y + BASE_SIZE_Y;


export default class Creative extends Phaser.Scene {
    constructor(){
        super({key:'Creative'}); 
        //Caminos
        this.caminosGroup;

        //Muros
        this.murosGroup;

        //Base externa que no son interactuables 
        this.baseGroup;

        this.tableroGroup;

        //Jugador
        this.player;
    }

    preload() { 
        console.log("Escena creativa cargada");
    }
    create() { 
        //inicialización de grupos
        this.baseGroup      = this.add.group();
        this.caminosGroup   = this.add.group();
        this.murosGroup     = this.add.group(); 
        this.tableroGroup   = this.add.group();
        this.input.setHitArea(this.caminosGroup.getChildren());
        
        this.CreaCaminos(); 
        //this.CreaMuros();
        this.CreaBase();
        this.player  = new Player(this,POS_CAMINO_X ,POS_CAMINO_Y,"jugador").setScale(0.5);
        this.physics.add.collider(this.player,this.baseGroup,this.onCollision);

        //Animaciones
            this.creaToqueAnim();


        //var sprite = this.add.sprite(400, 300, 'eye').setInteractive();
        //this.caminosGroup.setHitArea();
        //setHitArea(hitArea, hitAreaCallback)
        

        /*this.tweens.add({
            targets: grupoMuros.getChildren(),
            duration: 600,
            ease: 'Power1',
            y: 100,
            repeat: -1,
            yoyo: true
        });*/   

        //this.cameras.main.startFollow(this.player);
        //this.cameras.main.setViewport(450, 200, 400, 400);
    }


    onCollision(){
        console.log("COLISION");
    }


    //Crea las bases (extremos inamovibles) y los agrega al grupo de bases y al grupo del tablero
    CreaBase(){
        for(let i = 0; i < NUM_BASE_X;i++){
            let actBase = new BaseBlock(this,POS_BASE_X + BASE_SIZE_X * i,POS_BASE_Y);
            this.baseGroup.add(actBase);
            //this.tableroGroup.add(actBase);
            //this.baseGroup.add(new BaseBlock(this,POS_BASE_X + BASE_SIZE_X * i,POS_BASE_Y));
        }
        for(let i = 0; i < NUM_BASE_Y;i++){
            //this. baseGroup.add(new BaseBlock(this,POS_BASE_X, POS_BASE_Y + BASE_SIZE_X * i));
            let actBase = new BaseBlock(this,POS_BASE_X, POS_BASE_Y + BASE_SIZE_X * i);
            this.baseGroup.add(actBase);
            //this.tableroGroup.add(actBase);
        }
        for(let i = 0; i < NUM_BASE_X;i++){
            //this.baseGroup.add(new BaseBlock(this,POS_DOWN_X - BASE_SIZE_X * i, POS_DOWN_Y));
            let actBase = new BaseBlock(this,POS_DOWN_X - BASE_SIZE_X * i, POS_DOWN_Y);
            this.baseGroup.add(actBase);
            //this.tableroGroup.add(actBase);
        }
        for(let i = 0; i < NUM_BASE_Y;i++){
            //this.baseGroup.add(new BaseBlock(this,POS_DOWN_X, POS_DOWN_Y - BASE_SIZE_Y * i));
            let actBase = new BaseBlock(this,POS_DOWN_X, POS_DOWN_Y - BASE_SIZE_Y * i);
            this.baseGroup.add(actBase);
            //this.tableroGroup.add(actBase);
        }
    }

    //Crea los caminos y los agrega a al grupo de caminos y tablero
    CreaCaminos() {

        for(var i = 0 ; i < NUM_CAMINOS_X; i ++){
            for(var j = 0 ; j < NUM_CAMINOS_Y; j ++){
                let actCamino = new Road(this, POS_CAMINO_X + CAMINO_SIZE_X * i, POS_CAMINO_Y + CAMINO_SIZE_Y * j);
                this.tableroGroup.add(actCamino);
                this.caminosGroup.add(actCamino);   
            }
        }
    }


    //Crea los eventos para el input sobre una casilla tipo camino
    creaToqueAnim(){
        this.anims.create({
            key:    'tocando',
            frames:  this.anims.generateFrameNumbers('caminoAnim', {
                start : 1,
                end: 5,
            }),
            repeat: -1,
            frameRate: 10
        });

        this.anims.create({
            key:    'estatico',
            frames:  this.anims.generateFrameNumbers('caminoAnim', {
                start : 0,
                end: 0,
            }),
            repeat: -1,
            frameRate: 10
        });

        this.input.setHitArea(this.caminosGroup.getChildren()).on('gameobjectdown', function(pointer, gameObject) { 
            gameObject.destroy();
           // gameObject.
        
        
        });
        this.input.setHitArea(this.tableroGroup.getChildren()).on('gameobjectdown', function(pointer, gameObject) { 
            //gameObject.sprite.add("muro");
            //gameObject.disableInteractive();
            //gameObject.setTint(0x000000);
        
        
        });

        this.input.on('gameobjectmove', function (pointer, gameObject) {
            gameObject.anims.play('tocando');
            gameObject.setTint(0x696969);

    
        });
        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.anims.play('estatico');

            gameObject.setTint(0xFFFFFF);
        });

    }
    CreaMuros(){
        console.log("GG");

        /*for(var i = 0 ; i < NUM_MUROS_X; i ++){
            for(var j = 0 ; j < NUM_MUROS_Y; j ++){
                this.muros[i][j] = new Wall(this, POS_MURO_X + MURO_SIZE_X * i, MURO_SIZE_Y + POS_MURO_Y * j);
            }
        }

        /*for(var i = 0 ; i <NUM_MUROS_X; i++){
            this.muros[i][j] = new Wall(this, POS_MURO_X + MURO_SIZE_X * i, MURO_SIZE_Y + POS_MURO_Y * j);
        }*/
    }

}