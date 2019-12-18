import Player from      "../gameObjects/player.js";
import Trap from        "../gameObjects/trap.js";
import Road from        "../gameObjects/road.js";
import Goal from "../gameObjects/goal.js";
import Spawn from "../gameObjects/casillaInicio.js";
import Wall from "../gameObjects/wall.js";
import BaseBlock from "../gameObjects/baseBlock.js";


export default class Challenger extends Phaser.Scene{
    constructor(){
        super({key:'Challenger'}); 
        
        this.temaFondo;
        this.tablero;
        this.player;
        this.spawn;
        this.meta;
        this.trampas;
        this.muros;
        this.bases;
        this.caminos;
        this.playerBloqueado = false;
        this.desactivadores;
        this.cursors;
        //Array para comprobar los caminos
        this.arrayCaminos = Array;
        this.caminoElegido;
        this.elegidoX;
        this.elegidoY;

        //Para no revisar más de un overlap
        this.revisandoLap = false;

        //Tiempo a penalizar 
        this.tiempoBloqueado;
        this.penalizadoImagen;
        this.teclaEnter;

    }

    preload(){
        //this.cursors = this.input.keyboard.createCursorKeys();

    }

    create(){
    
        console.log("Creada");
        let config = ({
            mute: false,
            volume: 0.7,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,  
            delay: 0,
            start : 2
          })
        this.temaFondo = this.sound.add('audioDesafio');
        this.temaFondo.play(config);
        let escenaCreativa = this.scene.get('Creative');
        this.add.sprite(escenaCreativa.getBG().x, escenaCreativa.getBG().y,escenaCreativa.getBG().texture.key ).setScale(0.5);




        this.tablero = escenaCreativa.getTablero();
        this.bases = escenaCreativa.getBase();
        this.desactivadores =  escenaCreativa.getNumTrampas();

        this.tiempoBloqueado = this.add.text({ fontSize: '32px', fill: '#000' });
        
        //Creación del player en la posición del spawn
        this.player = new Player(this,escenaCreativa.getSpawn().getX(),escenaCreativa.getSpawn().getY(),'jugador').setScale(0.5);

        //Creacion de las bases exteriores
        this.physics.add.collider(this.player,this.bases);
        this.bases.getChildren().forEach(function(base) {
            this.add.sprite(base.x,base.y,base.texture.key);
            this.physics.add.collider(this.player,this.base);
        }, this);

        //Creación de caminos
            //Se reserva el espacio para los caminos
        for(let x = 0 ; x < escenaCreativa.getNumBaseX() - 2 ; x++){
            this.arrayCaminos[x] = new Array;
            this.arrayCaminos[x] = [escenaCreativa.getNumBaseY() - 2];
        }

        //Creación de los bloques del juego
        let contador = 0;
        for(let x = 0 ; x < escenaCreativa.getNumBaseX() - 2; x++){
            for(let y = 0 ; y < escenaCreativa.getNumBaseY()- 2; y++){
                //Se crean con la información del tablero creado en la escena creactiva
                if(this.tablero[x][y].texture.key == "camino" || this.tablero[x][y].texture.key == "caminoAnim"){
                    this.arrayCaminos[x][y] = 
                    new Road(this, this.tablero[x][y].getX() ,this.tablero[x][y].getY(), this.tablero[x][y].getIndX(), 
                    this.tablero[x][y].getIndY(),contador);
                    contador++;
                    //Gestión de overlap del jugador y de los caminos
                    this.physics.add.overlap(this.player,this.arrayCaminos[x][y],()=> this.overlapCamino(x,y,this.arrayCaminos[x][y]));
                }
                else if(this.tablero[x][y].texture.key == "bloqueBase"){
                    this.arrayCaminos[x][y] = 
                    new BaseBlock(this, this.tablero[x][y].getX() ,this.tablero[x][y].getY(), this.tablero[x][y].getIndX(), 
                    this.tablero[x][y].getIndY(),contador);
                    contador++;
                    this.physics.add.collider(this.player,this.arrayCaminos[x][y]);

                }
                //Creación de una trampa en función del tablero de la escena creativa
                else if(this.tablero[x][y].texture.key == "trap"){
                    this.arrayCaminos[x][y] = 
                    new Trap(this, this.tablero[x][y].getX() ,this.tablero[x][y].getY(), this.tablero[x][y].getIndX(), 
                    this.tablero[x][y].getIndY(),contador).setTexture("camino");
                    contador++;

                    //Gestión de collision contra una trampa
                    //let zone = this.arrayCaminos[x][y].zone.add(this,this.arrayCaminos[x][y].x,this.arrayCaminos[x][y].y,140,140);
                    this.physics.add.collider(this.player,this.arrayCaminos[x][y],()=> this.colisionContraTrampa(this.arrayCaminos[x][y]));
                    contador++;
                    this.physics.add.overlap(this.player,this.arrayCaminos[x][y],()=> this.overlapCamino(x,y,this.arrayCaminos[x][y]));
                }
                else if(this.tablero[x][y].texture.key == "muro"){
                    this.arrayCaminos[x][y] = 
                    new Wall(this, this.tablero[x][y].getX() ,this.tablero[x][y].getY(), this.tablero[x][y].getIndX(), 
                    this.tablero[x][y].getIndY(),contador);
                    contador++;

                    this.physics.add.collider(this.player,this.arrayCaminos[x][y]);

                }   
                else if(this.tablero[x][y].texture.key == "meta"){
                    this.arrayCaminos[x][y] = 
                    new Goal(this, this.tablero[x][y].getX() ,this.tablero[x][y].getY(), this.tablero[x][y].getIndX(), 
                    this.tablero[x][y].getIndY(),contador);
                    contador++;

                    this.physics.add.collider(this.player,this.tablero[x][y],() => this.colisionContraMeta());
                }
                else if(this.tablero[x][y].texture.key == "inicio"){
                    this.arrayCaminos[x][y] = 
                    new Spawn(this, this.tablero[x][y].getX() ,this.tablero[x][y].getY(), this.tablero[x][y].getIndX(), 
                    this.tablero[x][y].getIndY(),contador);
                    contador++;

                }
                
            }
        }
        this.input.keyboard.on('keydown-' + 'ENTER',()=> this.salvaTrampa());




        //Cámara
        this.player.depth = 1;
        //this.cameras.main.startFollow(this.player);
        //this.cameras.main.setZoom(4);

        /*this.tweens.add({
            targets: this.player,
            scale: 1.5,
            duration: 1000,
            delay: 100,
            yoyo: true,
        });*/

        this.penalizadoImagen = this.add.sprite(700,400,"penalizado").setVisible(false);
        this,this.penalizadoImagen.depth = 2;

    }

    update(time,delta){
        this.tiempoPenalizar = time / 10000;

    }

    salvaTrampa(){
        this.arrayCaminos[this.elegidoX][this.elegidoY].setTint(0xFF00E3);
        this.tweens.add({
            targets: this.arrayCaminos[this.elegidoX][this.elegidoY],
            angle: "+=25",
            duration: 500,
            delay: 100,
            yoyo: true,
            repeat : -1
        });
    }


    colisionContraMuro(){
        console.log("Contra muro");
    }

    escribeTiempoEspera(){
        this.tiempoBloqueado.setPosition(this.player.x - 10,this.player.y + 20);
        this.tiempoBloqueado.setText((this.player.tiempoParaEsperar() / 100).toString().substr(0));
    }

    shakeScene(){
        this.tiempoBloqueado.setVisible(true);
        this.penalizadoImagen.setPosition(this.player.x,this.player.y - 75).setVisible(true).setScale(0.25);
        this.tweens.add({
            targets: this.penalizadoImagen,
            scale: '+=0.05', 
            duration: 10000,
            rereat: -1
        });
        this.tiempoBloqueado.setVisible(true);
    }

    quitaBloqueo(){
        this.penalizadoImagen.setVisible(false);
        this.penalizadoImagen.setScale(-10);
        this.tiempoBloqueado.setVisible(false);
    }

    colisionContraTrampa(_trampa){  
        _trampa.setTint(0x00FF63);
        _trampa.body.destroy();
        this.player.mueveAlSpawn(); 
        this.player.cambiaEstado(true,1000);
    }

    quitaTintElegido(){
        if(this.caminoElegido != undefined){
            this.caminoElegido.setTint(0xFFFFFF);
        }

    }
    //!actPos.hasOwnProperty("final")

    overlapCamino(x,y,_elem){

        if(_elem.texture.key = "camino"){
            let dirPlayer = this.player.getDir();
            let auxCamino;
            let xAux;
            let yAux;
            if(!this.revisandoLap &&  (x >= 0 && x <= 9) && ( y >= 0 && y <= 8)){
                this.revisandoLap = true;
                
                switch (dirPlayer) {
                    case 0: //ARRIBA
                        if(y > 0  && y < 8 && this.arrayCaminos[x][y - 1] != undefined){
                            auxCamino = this.arrayCaminos[x][y - 1];
                            xAux = x;
                            yAux = y - 1;
                        }
                    break;
                    case 1://DERECHA
                        if(x > 0 && x < 8 && this.arrayCaminos[x + 1][y] != undefined){
                            auxCamino = this.arrayCaminos[x + 1][y];
                            xAux = x + 1;
                            yAux = y;
                        }
                        
                    break;
                    case 2://ABAJO
                        if(y > 0  && y < 8 && this.arrayCaminos[x][y + 1] != undefined ){
                            auxCamino = this.arrayCaminos[x][y + 1];      
                            xAux = x;
                            yAux = y + 1;              
                        }
                    break;
                    case 3://IZQUIERDA
                        if(x > 0 && x < 8 && this.arrayCaminos[x - 1][y] != undefined ){
                            auxCamino = this.arrayCaminos[x - 1][y];
                            xAux = x - 1;
                            yAux = y;
                        }

                    break;    
                
                    default:
                    break;  
                }


                if( auxCamino != undefined && auxCamino.hasOwnProperty("estado")){
                    this.caminoElegido = auxCamino;
                    this.elegidoX = xAux;
                    this.elegidoY = yAux;
                    this.caminoElegido.cambiaEstado(true);
                }
                
                this.revisandoLap = false;
            }
        }
        




    }

    esSeleccionable(_elem){
        if(_elem.hasOwnProperty("final") || _elem.hasOwnProperty("inicio")){
            return false;
        }
        else return true;
    }

    colisionContraMeta(){
        this.temaFondo.stop();
        console.log("Cambio de escena");
        this.scene.switch('MenuGame');
    }
}

