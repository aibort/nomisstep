import Player from  "../gameObjects/player.js";
import Wall from "../gameObjects/wall.js";
import Trap from "../gameObjects/tramp.js";
import Road from "../gameObjects/road.js";
import BaseBlock from "../gameObjects/baseBlock.js";
import Tramp from "../gameObjects/tramp.js";


//Globales para los caminos
const POS_CAMINO_X = 420;
const POS_CAMINO_Y = 210;
const NUM_CAMINOS_X = 5;
const NUM_CAMINOS_Y = 5;
const CAMINO_SIZE_X = 70;
const CAMINO_SIZE_Y = 70; 
//globales para los muros
const NUM_MUROS_TOTAL = NUM_CAMINOS_X * NUM_CAMINOS_Y;
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
//time
const START_TIME = 5000;
//Globales para renderizar el menu de herramientas
const SUB_MENU_X = 1000;
const SUB_MEU_Y = 200;


export default class Creative extends Phaser.Scene {
    constructor(){
        super({key:'Creative'}); 
        //Caminos
        this.caminosGroup;
        this.numCaminos = NUM_CAMINOS_X * NUM_CAMINOS_Y;
        
        //Muros
        this.puedoPonerBloque = false;
        this.murosGroup;
        this.numMuros = NUM_MUROS_TOTAL;

        //Base externa que no son interactuables 
        this.baseGroup;

        this.tableroGroup;

        //Trampas
        this.puedoPonerTrampa = false;
        this.trapGroup;
        this.numTrampas = 10;

        //Jugador
        this.player;
        this.actTime = START_TIME;

        //Contenedor del menú de herramientas
        this.menuHerramientas;


    }

    preload() { 
        console.log("Escena creativa cargada");
    }

    create() { 
         //this.emitter = EventManager.getInstance(); //AQUI no funciona
        //inicialización de grupos
        this.baseGroup      = this.add.group();
        this.caminosGroup   = this.add.group();
        this.murosGroup     = this.add.group(); 
        this.tableroGroup   = this.add.group();
        this.trapGroup      = this.add.group();

        //Creación de los caminos en el estado inicial
        this.CreaCaminos(); 

        //Creación de los bloques externos
        this.CreaBase();


        //Amaro: Esto irá en la escena desafío
        //this.player  = new Player(this,POS_CAMINO_X ,POS_CAMINO_Y,"jugador").setScale(0.5);
        //Crea la colisión entre el jugador y los distintos elementos 
        //this.physics.add.collider(this.player,this.baseGroup,this.onCollision);
        //this.physics.add.collider(this.player,this.trapGroup,this.onCollision);
        
        //Animaciones
        this.creaToqueAnim();
        this.input.on('pointerdown',this.startDrag, this);
        
        //Creación del menu de herramientas
        this.creaMenuHerramientas();



        /*this.caminosGroup.children.iterate(item => {
            item.on('pointerdown',function(pointer){
                console.log("GG");
                if(this.puedoPonerBloque){
                    console.
                    this.murosGroup.add(new Wall(this, pointer.x,pointer.y));
                    //let actMuro = new Wall(this, pointer.x,pointer.y);
                    //this.tableroGroup.add(actMuro);
                }
            });
        })*/

        

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

    update(time,delta){ 
        this.actTime -= delta;
        this.menuHerramientas.getAt(5).setText(('Time: ' + this.actTime));
        this.menuHerramientas.getAt(1).setText(('Muros: ' + this.numMuros));
        this.menuHerramientas.getAt(2).setText(('Trampas: ' + this.numTrampas));

        
        
        //Amaro : Ésto debería ser en función de un delta, no de los FPS.
        //info.setText('\nTime: ' + Math.floor(timer.getElapsed()));
       //this.actTime.
       //el tiempo fucnciona
       /*if (this.actTime >= 0)
        {
            this.sigNivel = true;
            this.actTime--;
        }
        else
        {
            //comentar aqui para no parar el juego 
            this.emitter.emit('CAMBIO');  //pero el emitter de eventos no funciona
        }
       
       console.log(this.actTime);*/

    }

    //Métodos 
    creaEvento(){
      //  this.emitter.emit("Activado ")
    }

    //Crea los elementos del menú y los ingresa a un container
    creaMenuHerramientas(){
        this.menuHerramientas = this.add.container(100,100);
        this.fondoMenuHerramintas = this.add.image(SUB_MENU_X,SUB_MEU_Y,'baseMenu').setScale(0.30);
        this.menuHerramientas.add(this.fondoMenuHerramintas);

        //Inicialización del texto de los bloques
        this.textCaminos = this.add.text(SUB_MENU_X - 115, SUB_MEU_Y -100 , 'score: 0', { fontSize: '32px', fill: '#000' });
        this.textCaminos.setScale(0.8);
        this.textCaminos.setText('Bloques ' + this.numCaminos);
        this.menuHerramientas.add(this.textCaminos);

        //Inicialización del texto de las trampas
        this.textTrampas = this.add.text(SUB_MENU_X - 115, SUB_MEU_Y , 'score: 0', { fontSize: '32px', fill: '#000' });
        this.textTrampas.setScale(0.8);
        this.textTrampas.setText('Trampas ' + this.numTrampas);
        this.menuHerramientas.add(this.textTrampas);

        //Creación del botón que se encarga de activar la implementación de los muros
        let boton_agregarMuro = this.add.sprite(SUB_MENU_X + 85  ,SUB_MEU_Y - 80,'muro').setInteractive();
        let boton_trampa = this.add.sprite(SUB_MENU_X + 85,SUB_MEU_Y +25,'trap').setInteractive();
        //let boton_casillaIni = this.add.sprite(SUB_MENU_X + 85  ,SUB_MEU_Y - 80,'bloqueBase').setInteractive();
        console.log(this.puedoPonerBloque);

        boton_agregarMuro.on('pointerdown' , () => this.creaEventoMuro(boton_agregarMuro, boton_trampa));
        boton_trampa.on('pointerdown' , () => this.creaEventoTrampas(boton_trampa,boton_agregarMuro));
        //boton_casillaIni.on('pointerdown', () => this.creaEventoTrampas());
        
        this.menuHerramientas.add(boton_agregarMuro);
        this.menuHerramientas.add(boton_trampa);

        //Inicialización del texto para el timer
        this.textTiempo = this.add.text(SUB_MENU_X - 115, SUB_MEU_Y + 100 , 'score: 0', { fontSize: '32px', fill: '#000' });
        this.textTiempo.setScale(0.8);
        this.textTiempo.setText('Tiempo ' + this.actTime);
        this.menuHerramientas.add(this.textTiempo);
    }


    onCollision(){
        console.log("COLISION");
    }

    //Crea las bases (extremos inamovibles) y los agrega al grupo de bases y al grupo del tablero
    CreaBase(){
        for(let i = 0; i < NUM_BASE_X;i++){
            let actBase = new BaseBlock(this,POS_BASE_X + BASE_SIZE_X * i,POS_BASE_Y);
            this.baseGroup.add(actBase);
        }
        for(let i = 0; i < NUM_BASE_Y;i++){
            let actBase = new BaseBlock(this,POS_BASE_X, POS_BASE_Y + BASE_SIZE_X * i);
            this.baseGroup.add(actBase);
        }
        for(let i = 0; i < NUM_BASE_X;i++){
            let actBase = new BaseBlock(this,POS_DOWN_X - BASE_SIZE_X * i, POS_DOWN_Y);
            this.baseGroup.add(actBase);
        }
        for(let i = 0; i < NUM_BASE_Y;i++){
            let actBase = new BaseBlock(this,POS_DOWN_X, POS_DOWN_Y - BASE_SIZE_Y * i);
            this.baseGroup.add(actBase);
        }
    }

    //Crea los caminos y los agrega a al grupo de caminos y tablero
    CreaCaminos() {
        for(var i = 0 ; i < NUM_CAMINOS_X; i ++){
            for(var j = 0 ; j < NUM_CAMINOS_Y; j ++){
                let actCamino = new Road(this, POS_CAMINO_X + CAMINO_SIZE_X * i, POS_CAMINO_Y + CAMINO_SIZE_Y * j);
                this.tableroGroup.add(actCamino);
                this.caminosGroup.add(actCamino); 
                actCamino.on('pointerdown',() => this.creaInteractuable(actCamino)); 
                this.numCaminos--;
            }
        }
    }

    //Crea el evento para crear muros
    creaEventoMuro(boton_agregarMuro,boton_trampa){
        boton_agregarMuro.setTint(0x060968);
        boton_trampa.setTint(0xFFFFFF);
        this.puedoPonerBloque = true;
        this.puedoPonerTrampa = false;
        console.log("PuedoPonerBloque");
    }

    //Crea el evento para crear trampas
    creaEventoTrampas(boton_trampa,boton_agregarMuro){
        boton_trampa.setTint(0x68064D);
        boton_agregarMuro.setTint(0xFFFFFF);
        this.puedoPonerBloque = false;//430505
        this.puedoPonerTrampa =true;
        console.log("PuedoPonerTrampa");
    }

    //Falta eliminar el camino
    creaInteractuable(currCamino){   
        if(this.puedoPonerBloque && this.numMuros > 0){
            let muroX = currCamino.getX();
            let muroY = currCamino.getY();
            let currMuro = new Wall (this,muroX,muroY);
            this.murosGroup.add(currMuro);
            this.tableroGroup.add(currMuro);
            this.tweens.add({
                targets: currMuro,
                scaleX: 0.75,
                scaleY: 0.75,
                duration: 300,
                repeat: 1,
                yoyo: true,
                repeatDelay: 500
            });
            this.numMuros--;
            currCamino.destroy();
            }
        else if(this.puedoPonerTrampa && this.numTrampas > 0){
            let muroX = currCamino.getX();
            let muroY = currCamino.getY();
            let currTrampa = new Tramp(this,muroX,muroY);
            this.trapGroup.add(currTrampa);
            this.tableroGroup.add(currTrampa);
            this.numTrampas--;
            this.tweens.add({
                targets: currTrampa,
                angle: 90,
                duration: 300,
                repeat: -1,
                yoyo: true,
                repeatDelay: 500
            });
            currCamino.destroy();
        }
    }


    //Crea la animación y se los asigna (solo a los caminos)
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

        //Agrega el comportamiento solo a los elementos del camino
        this.caminosGroup.children.each(function(camino) {
            camino.on('pointermove', function() { 
            camino.anims.play('tocando');
            camino.setTint(0x696969);
            });
            camino.on('pointerout', function() { 
            camino.anims.play('estatico');
            camino.setTint(0xFFFFFF);
            });
        });
    }

    startDrag(pointer, targets){
        this.input.off('pointerdown',this.startDrag, this);
        this.dragObj = targets[0];
        this.input.on('pointermove',this.doDrag, this);
        this.input.on('pointerup', this.stopDrag, this);
    }
    doDrag(pointer)
    {
        this.dragObj.x = pointer.x;
        this.dragObj.y = pointer.y;
    }
    stopDrag(pointer, targets){
        this.input.on('pointerdown',this.startDrag, this);
        this.input.off('pointermove',this.doDrag, this);
        this.input.off('pointerup', this.stopDrag, this);
    }

    setListeners()
    {
        this.emitter.on('CAMBIO',this.scene.start('Challenger'));
    }

}