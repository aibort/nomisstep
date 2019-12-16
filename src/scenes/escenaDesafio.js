import Player from      "../gameObjects/player.js";


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

        this.muros = escenaCreativa.getMuros();
        this.spawn = escenaCreativa.getSpawn();
        this.meta = escenaCreativa.getMeta();
        this.bases = escenaCreativa.getBase();
        this.trampas = escenaCreativa.getTrampas();
        this.caminos = escenaCreativa.getCaminos();
        this.desactivadores =  escenaCreativa.getNumTrampas();

        this.add.sprite(this.meta.x,this.meta.y,this.meta.texture.key);
        this.add.sprite(this.spawn.x,this.spawn.y,this.spawn.texture.key);
    
        this.player = new Player(this,this.spawn.getX(),this.spawn.getY(),'jugador').setScale(0.5);

        //Creacion de las bases exteriores
        this.physics.add.collider(this.player,this.bases,this.colisionContraBase());
        this.bases.getChildren().forEach(function(base) {
            this.add.sprite(base.x,base.y,base.texture.key);
            this.physics.add.collider(this.player,this.base,this.colisionContraBase());
        }, this);

        //Creación de muros
        this.physics.add.collider(this.player,this.muros,this.colisionContraMuro());
        this.muros.getChildren().forEach(function(muro) {
            this.add.sprite(muro.x,muro.y,muro.texture.key);
            this.physics.add.collider(this.player,this.muro,this.colisionContraBase());
        }, this);

        //Creación de caminos
        this.physics.add.collider(this.player,this.caminos,this.colisionContraMuro());
        this.caminos.getChildren().forEach(function(camino) {
            this.add.sprite(camino.x,camino.y,camino.texture.key);
            this.physics.add.collider(this.player,this.camino,this.colisionContraBase());
        }, this);

        //Creación de trampas   
        this.trampas.getChildren().forEach(function(trampa) {
            this.add.sprite(trampa.x,trampa.y,trampa.texture.key);
            this.physics.add.collider(this.player,trampa,() => this.colisionContraTrampa(trampa));
        }, this);

        console.log(this.meta);
        //Lógica de la meta
        this.physics.add.collider(this.player,this.meta,() => this.colisionContraMeta());


        //Cámara
        this.player.depth = 1;
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(4);
    }

    colisionContraMuro(){
        console.log("Contra muro");
    }

    colisionContraTrampa(_trampa){
        this.physics.world.disable(_trampa);
        this.player.mueveAlSpawn();
    }

    colisionContraBase(){
        console.log("Contra base");
    }

    colisionContraMeta(){
        console.log("Cambio de escena")
        this.scene.start('MenuGame');
    }
}

