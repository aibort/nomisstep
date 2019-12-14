export default class Challenger extends Phaser.Scene{
    constructor(tablero,player){
        super({key:'Challenger'}); 
        this.tablero = tablero;
        this.player = player;
    }
    /*create(){
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


    }*/
    create(){
    
        console.log("Creada");
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

    }
}

