import Player       from    "../gameObjects/player.js";
import Trap         from    "../gameObjects/trap.js";
import Road         from    "../gameObjects/road.js";
import Goal         from    "../gameObjects/goal.js";
import Spawn        from    "../gameObjects/casillaInicio.js";
import Wall         from    "../gameObjects/wall.js";
import BaseBlock    from    "../gameObjects/baseBlock.js";
import HUD          from    "../scenes/HUD.js";
import Lobby        from    "./escenaFinal.js";


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
        //Sonidos
            this.trampaAlerta;

        //Array para comprobar los caminos
            this.arrayCaminos = Array;
        //Variables para determinar a qué casilla está apuntando el jugador
            this.caminoElegido;
            this.elegidoX;
            this.elegidoY;

        //Para no revisar más de un overlap
            this.revisandoLap = false;

        //Tiempo a penalizar 
            this.tiempoBloqueado;
            this.penalizadoImagen;
        //Desarmadores
            //Tecla para poner desarmadores
            this.teclaEnter;
            //El numero de desactivadores que tienes
            this.desactivadores;
            //Texto para renderizar la cantidad de desactivadores que quedan
            this.textoDesarmadores;

    }

    preload(){
        //cargar cancion
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
        this.trampaAlerta = this.sound.add('trampaAudio');

        
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

        //Creación de los bloques del juego en función del tablero de la escene creativa
        let contador = 0;
        for(let x = 0 ; x < escenaCreativa.getNumBaseX() - 2; x++){
            for(let y = 0 ; y < escenaCreativa.getNumBaseY()- 2; y++){
                //caminos
                if(this.tablero[x][y].texture.key == "camino" || this.tablero[x][y].texture.key == "caminoAnim"){
                    this.arrayCaminos[x][y] = 
                    new Road(this, this.tablero[x][y].getX() ,this.tablero[x][y].getY(), this.tablero[x][y].getIndX(), 
                    this.tablero[x][y].getIndY(),contador);
                    contador++;
                    //Gestión de overlap del jugador y de los caminos
                    this.physics.add.overlap(this.player,this.arrayCaminos[x][y],()=> this.overlapCamino(x,y,this.arrayCaminos[x][y]));
                }
                //Bloques base
                else if(this.tablero[x][y].texture.key == "bloqueBase"){
                    this.arrayCaminos[x][y] = 
                    new BaseBlock(this, this.tablero[x][y].getX() ,this.tablero[x][y].getY(), this.tablero[x][y].getIndX(), 
                    this.tablero[x][y].getIndY(),contador);
                    contador++;
                    this.physics.add.collider(this.player,this.arrayCaminos[x][y]);

                }
                //Creación de las trampas
                else if(this.tablero[x][y].texture.key == "trap"){
                    this.arrayCaminos[x][y] = 
                    new Trap(this, this.tablero[x][y].getX() ,this.tablero[x][y].getY(), this.tablero[x][y].getIndX(), 
                    this.tablero[x][y].getIndY(),contador).setTexture("camino");
                    contador++;

                    //Gestión de collision contra una trampa
                    let trampaColision = this.physics.add.collider(this.player,this.arrayCaminos[x][y],
                        ()=> this.colisionContraTrampa(this.arrayCaminos[x][y]));
                    this.physics.add.overlap(this.player,this.arrayCaminos[x][y],()=> this.overlapCamino(x,y,this.arrayCaminos[x][y]));
                    this.arrayCaminos[x][y].agregaColision(trampaColision);

                    //Gestión de colisión contra una zona para reproducir un sonido
                    let zona = this.add.zone(this.tablero[x][y].getX(), this.tablero[x][y].getY()).setSize(200, 200);
                    this.physics.world.enable(zona);
                    zona.body.debugBodyColor = 0x000EFF;
                    this.physics.add.overlap(zona,this.player,() => this.reproduceTrampa(zona));
    
                }
                //Creación de los muros
                else if(this.tablero[x][y].texture.key == "muro"){
                    this.arrayCaminos[x][y] = 
                    new Wall(this, this.tablero[x][y].getX() ,this.tablero[x][y].getY(), this.tablero[x][y].getIndX(), 
                    this.tablero[x][y].getIndY(),contador);
                    contador++;
                    this.physics.add.collider(this.player,this.arrayCaminos[x][y]);

                }   
                //Creación de meta
                else if(this.tablero[x][y].texture.key == "meta"){
                    this.arrayCaminos[x][y] = 
                    new Goal(this, this.tablero[x][y].getX() ,this.tablero[x][y].getY(), this.tablero[x][y].getIndX(), 
                    this.tablero[x][y].getIndY(),contador);
                    this.meta = this.arrayCaminos[x][y];
                    contador++;

                    this.physics.add.collider(this.player,this.tablero[x][y],() => this.colisionContraMeta());
                }
                //Creación de inicio
                else if(this.tablero[x][y].texture.key == "inicio"){
                    this.arrayCaminos[x][y] = 
                    new Spawn(this, this.tablero[x][y].getX() ,this.tablero[x][y].getY(), this.tablero[x][y].getIndX(), 
                    this.tablero[x][y].getIndY(),contador);
                    this.spawn = this.arrayCaminos[x][y];
                    contador++;

                }
                
            }
        }
        //Evento para colocar los salva trampas al precionar la tecla enter
        this.input.keyboard.on('keydown-' + 'ENTER',()=> this.salvaTrampa());
        //Llevar al jugador arriba en la escena
        this.player.depth = 1;

        //Cámara
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(4);
        //imagen que se ve al tocar una trampa
        this.penalizadoImagen = this.add.sprite(700,400,"penalizado").setVisible(false);
        this,this.penalizadoImagen.depth = 2;

        //Inicialización del HUD 
        this.scene.add("HUD",HUD,true);
    }

    update(time,delta){
        //console.log('Time: ' + time + '\nDelta: ' + delta);
    }

    //Cuando el jugador activa el salva trampas
    //*Caso de ser un camino, aplica efectos y quita un desactivador
    //*Caso de ser una trampa, desactiva la trampa y aplica lo anterior
    salvaTrampa(){
        if(this.desactivadores > 0  && this.caminoElegido.hasOwnProperty("revisado") 
        && !this.caminoElegido.haSidoDesactivado()){
            this.caminoElegido.desactivador();
            this.events.emit('quitaDesactivador');
            this.desactivadores--;
            this.caminoElegido.setTint(0xFF00E3);
            //En el caso de que sea una trampa, la desactiva
            if (this.caminoElegido.hasOwnProperty("trampaActiva")){
                this.caminoElegido.desarma();
                this.physics.world.removeCollider(this.caminoElegido.getColision());
            }  
            this.tweens.add({
                targets: this.caminoElegido,
                scale: "+=0.25",
                duration: 500,
                delay: 100,
                yoyo: true,
                repeat : -1
            });
        }
    }

    reproduceTrampa(_zona){
        _zona.destroy();
        this.trampaAlerta.play();
    }

    colisionContraMuro(){
        console.log("Contra muro");
    }

    getDesactivadores(){
        return this.desactivadores;
    }

    //Cuando el jugador colisiona contra una trampa
    //*Manda la hud a renderizar el tiempo de penalización
    shakeScene(){
        this.events.emit('activaTimer');
        this.tweens.add({
            targets: this.penalizadoImagen,
            scale: '+=0.05', 
            duration: 10000,
            rereat: -1
        });
        this.penalizadoImagen.setPosition(this.player.x,this.player.y - 75).setVisible(true).setScale(0.25);

    }

    //Devuelve el tiempo que tiene de penalización
    getTiempoPenalizado(){
        return this.player.tiempoParaEsperar();
    }

    //Devuelve el spawn
    getInicio(){
        return this.spawn;
    }

    //Manda al HUD a dejar de renderizar el tiempo de penalización
    quitaBloqueo(){
        this.events.emit('desactivaTimer');
        this.penalizadoImagen.setVisible(false);
        this.penalizadoImagen.setScale(-10);
    }

    //Cuando el jugador colisiona contra una trampa
    //*Desactiva la trampa, cambia la textura y manda al jugador a la linea de meta
    colisionContraTrampa(_trampa){  
        if(_trampa.estaActiva()){
            _trampa.desactivador();
            _trampa.desarma();
            _trampa.setTexture("trap");
            this.player.mueveAlSpawn(); 
            this.player.cambiaEstado(true,1000);
            this.physics.world.removeCollider(_trampa.getColision());
            this.shakeScene();
        }
    }

    //Devuelve el objeto que está siendo seleccionado
    getElegido(){
        return this.caminoElegido;
    }

    //Para determinar a qué casilla está apuntando el jugador
    overlapCamino(x,y,_elem){
        let dirPlayer = this.player.getDir();
        let auxCamino;
        let xAux;
        let yAux;
        if(!this.revisandoLap &&  (x >= 0 && x <= 9) && ( y >= 0 && y <= 8)){ //Comprueba extermos del tablero
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
                    if(x > 0 && x < 9 && this.arrayCaminos[x + 1][y] != undefined){
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
                    if(x > 0 && x < 9 && this.arrayCaminos[x - 1][y] != undefined ){
                        auxCamino = this.arrayCaminos[x - 1][y];
                        xAux = x - 1;
                        yAux = y;
                    }

                break;    
            
                default:
                break;  
            }
            //auxCamino.hasOwnProperty("estado")
            //Los únicos objectos que son selecionables son los que tienen la textura de camino
            if(auxCamino != undefined){
                if(auxCamino != undefined && auxCamino.hasOwnProperty("estado") /*auxCamino.texture.key == "camino"*/){
                    this.caminoElegido = auxCamino;
                    this.elegidoX = xAux;
                    this.elegidoY = yAux;
                    this.caminoElegido.cambiaEstado(true);
                }
            }
            this.revisandoLap = false;
        }
    
    }

    //Cuando el jugador llega a la meta
    colisionContraMeta(){
        this.temaFondo.stop();
        console.log("Cambio de escena");
        this.scene.switch('Lobby');
        this.scene.remove("Creative");
        this.scene.remove("Challenger");
        this.scene.remove("HUD");
        //Cargar la escena final
    }
}

