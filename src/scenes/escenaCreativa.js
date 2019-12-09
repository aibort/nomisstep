import Player from      "../gameObjects/player.js";
import Wall from        "../gameObjects/wall.js";
import Trap from        "../gameObjects/tramp.js";
import Road from        "../gameObjects/road.js";
import BaseBlock from   "../gameObjects/baseBlock.js";
import Tramp from       "../gameObjects/tramp.js";
import Spawn from       "../gameObjects/casillaInicio.js";
import Goal from "../gameObjects/goal.js";


//Globales para los caminos
const POS_CAMINO_X = 200;
const POS_CAMINO_Y = 100;
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
        this.puedoPonerMuro = false;
        this.puedoQuitarMuro = false;
        this.murosGroup;
        this.numMuros = NUM_MUROS_TOTAL;

        //Base externa que no son interactuables 
        this.baseGroup;

        this.tableroGroup;

        //Trampas
        this.puedoPonerTrampa = false;
        this.puedoBorrarTrampa = false;
        this.trapGroup;
        this.numTrampas = 10;

        //Jugador
        this.player;
        this.actTime = START_TIME;

        //Contenedor del menú de herramientas
        this.menuHerramientas;

        //Variables para determinar si el jugador ha colocado el inicio y final
        this.spawn;
        this.meta;
        this.spawnPuesto = false;
        this.metaPuesta = false;

        this.temaFondo ;
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


        
        //Animaciones
        this.creaToqueAnim();
        //this.input.on('pointerdown',this.startDrag, this);
        
        //Creación del menu de herramientas
        this.creaMenuHerramientas();
        //Agrega audio de fondo a la escena creativa
        this.temaFondo = this.sound.add('creativaTema').play();



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


    }

    update(time,delta){ 
        this.actTime -= delta;
        //this.menuHerramientas.getAt(8).setText(('Time: ' + this.spawnPuesto));
        this.menuHerramientas.getAt(1).setText(('Muros: ' + this.numMuros));
        this.menuHerramientas.getAt(2).setText(('Trampas: ' + this.numTrampas));
    }

    //Métodos 


    //Crea los elementos del menú y los ingresa a un container
    creaMenuHerramientas(){
        this.menuHerramientas = this.add.container(100,100);
        this.fondoMenuHerramintas = this.add.image(SUB_MENU_X,SUB_MEU_Y,'baseMenu').setScale(0.30);
        this.menuHerramientas.add(this.fondoMenuHerramintas);//0

        //Inicialización del texto de los bloques
        this.textCaminos = this.add.text(SUB_MENU_X - 115, SUB_MEU_Y -100 , 'score: 0', { fontSize: '32px', fill: '#000' });
        this.textCaminos.setScale(0.8);
        this.textCaminos.setText('Bloques ' + this.numCaminos);
        this.menuHerramientas.add(this.textCaminos);//1

        //Inicialización del texto de las trampas
        this.textTrampas = this.add.text(SUB_MENU_X - 115, SUB_MEU_Y , 'score: 0', { fontSize: '32px', fill: '#000' });
        this.textTrampas.setScale(0.8);
        this.textTrampas.setText('Trampas ' + this.numTrampas);
        this.menuHerramientas.add(this.textTrampas);//2

        //Creación del botón que se encarga de activar la implementación de los muros
        let boton_agregarMuro = this.add.sprite(SUB_MENU_X + 85  ,SUB_MEU_Y - 80,'agregaBloque').setInteractive().setScale(0.5);
        let boton_quitaMuro = this.add.sprite(SUB_MENU_X + 125  ,SUB_MEU_Y - 80,'quitaBloque').setInteractive().setScale(0.5);
        let boton_agregaTrampa = this.add.sprite(SUB_MENU_X + 85,SUB_MEU_Y +25,'agregaTrampa').setInteractive().setScale(0.5);
        let boton_quitaTrampa = this.add.sprite(SUB_MENU_X + 125  ,SUB_MEU_Y+25,'quitaTrampa').setInteractive().setScale(0.5);

        boton_agregarMuro.on('pointerdown' , () => this.creaEventoMuro(boton_agregarMuro, boton_agregaTrampa,boton_quitaMuro,boton_quitaTrampa));
        boton_agregaTrampa.on('pointerdown' , () => this.creaEventoTrampas(boton_agregaTrampa,boton_agregarMuro,boton_quitaMuro,boton_quitaTrampa));
        
        boton_quitaMuro.on('pointerdown',() => this.quitaEventoMuro(boton_quitaMuro,boton_quitaTrampa,boton_agregarMuro,boton_agregaTrampa));
        boton_quitaTrampa.on('pointerdown',() => this.quitaEventoTrampa(boton_quitaMuro,boton_quitaTrampa,boton_agregarMuro,boton_agregaTrampa));

        this.menuHerramientas.add(boton_agregarMuro);//3
        this.menuHerramientas.add(boton_agregaTrampa);//4
        this.menuHerramientas.add(boton_quitaTrampa);//5
        this.menuHerramientas.add(boton_quitaMuro);//6

        //Inicialización del texto para el timer
        this.textTiempo = this.add.text(SUB_MENU_X - 115, SUB_MEU_Y + 100 , 'score: 0', { fontSize: '32px', fill: '#000' });
        this.textTiempo.setScale(0.8);
        this.textTiempo.setText('Tiempo ' + this.actTime);
        this.menuHerramientas.add(this.textTiempo);//7

        //Inicializa el tablero de ayuda
        this.informador = this.add.sprite(SUB_MENU_X,SUB_MEU_Y + 300,'imagenInfo').setScale(0.6);
        this.menuHerramientas.add(this.informador);//8
        this.textInfo = this.add.text(SUB_MENU_X - 140 ,SUB_MEU_Y + 250,'Place the starting block'+ "\n" + "on a board limit.", { fontSize: '20px', fill: '#000' });
        this.menuHerramientas.add(this.textInfo);//9

    }   
    
    creaEventoMuro(boton_agregarMuro,boton_agregaTrampa,boton_quitaMuro,boton_quitaTrampa){
        if(this.metaPuesta){
            boton_agregarMuro.setTint(0x060968);
            boton_agregaTrampa.setTint(0xFFFFFF);
            boton_quitaMuro.setTint(0xFFFFFF);
            boton_quitaTrampa.setTint(0xFFFFFF);
            this.puedoPonerMuro = true;
            this.puedoPonerTrampa = false;
            this.puedoBorrarTrampa = false;
            this.puedoQuitarMuro = false;
            console.log("PuedoPonerMuro");

        }

    }

    quitaEventoMuro(boton_quitaMuro, boton_quitaTrampa, boton_agregarMuro , boton_agregaTrampa){
        if(this.metaPuesta){
            this.puedoQuitarMuro = true;
            this.puedoBorrarTrampa = false;
            this.puedoPonerMuro = false;
            this.puedoPonerTrampa = false;
            boton_quitaMuro.setTint(0x060968);
            boton_quitaTrampa.setTint(0xFFFFFF);
            boton_agregarMuro.setTint(0xFFFFFF);
            boton_agregaTrampa.setTint(0xFFFFFF);
            console.log("PuedoQuitarMuro");
        }
    }

    quitaEventoTrampa(boton_quitaMuro, boton_quitaTrampa, boton_agregarMuro , boton_agregaTrampa){
        if(this.metaPuesta){
            this.puedoBorrarTrampa = true;
            this.puedoQuitarMuro = false;
            this.puedoPonerMuro = false;
            this.puedoPonerTrampa = false;
            boton_quitaMuro.setTint(0xFFFFFF);
            boton_quitaTrampa.setTint(0x68064D);
            boton_agregarMuro.setTint(0xFFFFFF);
            boton_agregaTrampa.setTint(0xFFFFFF);
            console.log("PuedoQuitarTrampa");
        }
    }

    //Crea el evento para crear trampas
    creaEventoTrampas(boton_trampa,boton_agregarMuro,boton_quitaMuro,boton_quitaTrampa){
        if(this.metaPuesta){
            boton_trampa.setTint(0x68064D);
            boton_agregarMuro.setTint(0xFFFFFF);
            boton_quitaMuro.setTint(0xFFFFFF);
            boton_quitaTrampa.setTint(0xFFFFFF);
            this.puedoPonerMuro = false;//430505
            this.puedoPonerTrampa = true;
            this.puedoBorrarTrampa = false;
            this.puedoQuitarMuro = false;
            console.log("PuedoPonerTrampa");
        }
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

    //Crea los caminos y los agrega a al grupo de caminos y tablero al inicio del juego
    CreaCaminos() {
        for(var y = 0 ; y < NUM_CAMINOS_Y; y++){
            for(var x = 0 ; x < NUM_CAMINOS_X; x++){
                let actCamino = new Road(this, POS_CAMINO_X + (CAMINO_SIZE_X * x), POS_CAMINO_Y + (CAMINO_SIZE_Y * y) ,x ,y);
                this.aplicaAnim(actCamino);
                this.tableroGroup.add(actCamino);
                this.caminosGroup.add(actCamino); 
                let tx = this.add.text(actCamino.getX() - 30,actCamino.getY() - 30);
                tx.setText(actCamino.getX() + "/" + actCamino.getY() + "\n" + actCamino.getIndX() + "/" +actCamino.getIndY() + "\n" + this.caminosGroup.getLength());
                actCamino.on('pointerdown',() => this.creaInteractuable(actCamino)); 
                this.numCaminos--;
            }

        }
    }

    //Crea un muro
    creaMuro(currCamino){
        let currMuro = new Wall (this,currCamino.getX(),currCamino.getY(),currCamino.getIndX(),currCamino.getIndY());
        let tx = this.add.text(currMuro.getX() - 30,currMuro.getY() - 30);
        tx.setText(currMuro.getX() + "/" + currMuro.getY() + "\n" + currMuro.getIndX() + "/" +currMuro.getIndY() + "\n" + this.murosGroup.getLength());
        currMuro.on('pointerdown',() => this.quitarMuroPonerCamino(currMuro)); 
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

    quitarMuroPonerCamino(currMuro){
        if(this.puedoQuitarMuro){
            this.numMuros++;
            this.creaCamino(currMuro);
            currMuro.destroy();
        }

    }

    quitaTrampaPoneCamino(currTrampa){
        if(this.puedoBorrarTrampa){
            this.numTrampas++;
            this.creaCamino(currTrampa);
            currTrampa.destroy();
        }
    }

    //Crea camino en una posición de otro objeto
    creaCamino(currElem){
        let currCamino = new Road(this,currElem.getX(),currElem.getY(),currElem.getIndX(),currElem.getIndY());
        this.caminosGroup.add(currCamino);
        this.tableroGroup.add(currCamino);
        currCamino.on('pointerdown',() => this.creaInteractuable(currCamino)); 
        this.aplicaAnim(currCamino);
        currElem.destroy();
    }

    //Crea una trampa en la posición de un camino determinado
    creaTrampa(currCamino){
        let currTrampa = new Tramp(this,currCamino.getX(),currCamino.getY(),currCamino.getIndX(),currCamino.getIndY());
        let tx = this.add.text(currTrampa.getX() - 30,currTrampa.getY() - 30);
        tx.setText(currTrampa.getX() + "/" + currTrampa.getY() + "\n" + currTrampa.getIndX() + "/" +currTrampa.getIndY() + "\n" + this.trapGroup.getLength());
        currTrampa.on('pointerdown',() => this.quitaTrampaPoneCamino(currTrampa)); 
        let audio = this.sound.add('trampaAudio');
        audio.play();
        this.trapGroup.add(currTrampa);
        this.tableroGroup.add(currTrampa);
        this.numTrampas--;
        this.tweens.add({
            targets: currTrampa,
            angle: 90,
            duration: 600,
            repeat: -1,
            yoyo: true,
            repeatDelay: 500
        });
        currCamino.destroy();
    }

    //Después del tocar una casilla se encarga de determinar qué elemento poner
    creaInteractuable(currCamino){ 
       
        if(this.puedoPonerMuro && this.numMuros > 0){
            this.creaMuro(currCamino);
            }
        else if(this.puedoPonerTrampa && this.numTrampas > 0){
            this.creaTrampa(currCamino);
        }
        else if(!this.spawnPuesto && this.dentroLimites(currCamino)){
            this.spawnPuesto = true;
            let caminoX = currCamino.getX();
            let caminoY = currCamino.getY();
            this.spawn = new Spawn (this,caminoX,caminoY,currCamino.getIndX(),currCamino.getIndY());
            this.tableroGroup.add(this.spawn);
            this.tweens.add({
                targets: this.spawn,
                angle: 15,
                duration: 100,
                repeat: 10,
                yoyo: true,
                repeatDelay: 200
            });
            currCamino.destroy();
            this.menuHerramientas.getAt(9).setText('Place the goal block' + "\n" + "on a board limit.");
        }  
        else if(!this.metaPuesta && this.dentroLimites(currCamino)){
            this.metaPuesta = true;
            let caminoX = currCamino.getX();
            let caminoY = currCamino.getY();
            this.meta = new Goal (this,caminoX,caminoY,currCamino.getIndX(),currCamino.getIndY());
            this.tableroGroup.add(this.meta);
            this.tweens.add({
                targets: this.meta,
                angle: 15,
                duration: 100,
                repeat: 10,
                yoyo: true,
                repeatDelay: 200
            });
            currCamino.destroy();
            this.menuHerramientas.getAt(9).setText('Create the stage '+ "\n" + "before time runs out.");

        this.caminosGroup.children.each(function(camino) {
            camino.off('pointermove');
            camino.off('pointerout');
            camino.on('pointermove',  function() { 
            camino.setTint(0x696969);
            camino.anims.play('tocando');
            });
            camino.on('pointerout', function() { 
            camino.anims.play('estatico');
            camino.setTint(0xFFFFFF);
            });
        });

        }
    }

    //Crea la animación de toque
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
        /*this.caminosGroup.children.each(function(camino) {

            camino.on('pointermove',  function() { 
            camino.setTint(0x696969);
            camino.anims.play('tocando');
            });
            camino.on('pointerout', function() { 
            camino.anims.play('estatico');
            camino.setTint(0xFFFFFF);
            });
        });*/
    }
         
    //Agrega el comportamiento a un elemento en función del juego
    aplicaAnim(elemt){

        if(this.dentroLimites(elemt) && !this.metaPuesta){
            elemt.on('pointermove',  function() { 
                elemt.setTint(0xFCFF00);
                elemt.anims.play('tocando');
            });
            elemt.on('pointerout', function() { 
                elemt.anims.play('estatico');
                elemt.setTint(0xFFFFFF);
            });

        }
        else{
            elemt.on('pointermove',  function() { 
                elemt.setTint(0x696969);
                elemt.anims.play('tocando');
            });
            elemt.on('pointerout', function() {     
                elemt.anims.play('estatico');
                elemt.setTint(0xFFFFFF);
            });


        }
        
        
    }

    //Determina su una casilla está en los extremos del tablero
    dentroLimites(elem){

        if((elem.getIndX() == NUM_CAMINOS_X - 1 || elem.getIndX() == 0 || elem.getIndY() == 0 || elem.getIndY() == NUM_CAMINOS_Y - 1 )){
            return true;
        }
        return false;

    }

    //Determina si la poner un bloque en esa posición bloquea un camino
    esValido(){
        let contador = 0;
        const dir = {
            ARRIBA : 0,
            DERECHA: 1,
            ABAJO: 2,
            IZQUIERDA : 3
        }

        actDir = dir.ARRIBA;
        let sigPos = {
            ARRIBA: -1,
            DERECHA : -1,
            ABAJO : -1,
            IZQUIERDA: -1
        }

        while(contador < 4){
            let arriba = false;
            while(!arriba && this.spawn.getIndY() < NUM_CAMINOS_Y){
                sigPos.ARRIBA = this.currCamino.get();

            }
        }

    }


    

}