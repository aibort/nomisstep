export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,type){
        super(scene,x,y,type);
        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this);   
        this.body.setCollideWorldBounds(true);
        this.xPos = x;
        this.yPos = y;
        this.speed = 150;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.someKeyIsDown = false;
        this.currCursor;

        //dirección del jugador
        const estados = {
            ARRIBA:     0,
            DERECHA:    1,
            ABAJO:      2,
            IZQUIERDA:  3
        }
        this.estado = estados.ARRIBA;
        this.trampas = [];
        //métodos

        //this.CambiaDir(status);
        this.penalizado = false;
        this.tiempoPenalizado;
        this.tiempoParaDespenalizar;
    }

    create(){

    }



    preUpdate(){
    
        if(!this.penalizado){
            if (this.cursors.up.isDown){
                this.CambiaDir(0);
                this.setTint(0xff0000);
                this.body.setVelocityY(-this.speed);
                this.body.setVelocityX(0);
            }
            else if (this.cursors.right.isDown){
                this.CambiaDir(1);
                this.setTint(0xff0000);
                this.body.setVelocityX(this.speed);
                this.body.setVelocityY(0);
            }
            else if (this.cursors.down.isDown) {
                this.setTint(0xff0000);
                this.CambiaDir(2);
                this.body.setVelocityY(this.speed);
                this.body.setVelocityX(0);
            }
            else if (this.cursors.left.isDown) {
                this.CambiaDir(3);
                this.setTint(0xff0000);
                this.body.setVelocityX(-this.speed);
                this.body.setVelocityY(0);
            }
            else{
                this.someKeyIsDown = false;
                this.scene.quitaTintElegido();
                this.setTint(0xffffff);
                this.body.setVelocity(0);
            }
    
        }
        else{
            this.tiempoParaDespenalizar --; 
            if(this.tiempoParaDespenalizar <= 0){
                this.penalizado = false;
                this.scene.quitaBloqueo();
                console.log("Quita bloqueo");
            }
            else{
                this.scene.escribeTiempoEspera();
            }

        }
    }

    cambiaEstado(_estado, tiempo){
        this.penalizado = _estado;
        this.tiempoParaDespenalizar = tiempo;
        this.scene.shakeScene();
    }

    tiempoParaEsperar(){
        return this.tiempoParaDespenalizar;
    }

    mueveAlSpawn(){
        this.x = this.xPos;
        this.y = this.yPos;
    }

    estaPenalizado(){
        return this.penalizado;
    }
    
    getDir(){
        return this.estado;
    }

    
    CambiaDir(num){
        this.scene.quitaTintElegido();
        switch(num){
            case 0:
                this.setAngle(360);
                this.estado = 0;
                break;
            
            case 2:
                this.setAngle(180);
                this.estado = 2;
                break;
            
            case 1:
                this.setAngle(90);
                this.estado = 1;
                break;
            
            case 3:
                this.setAngle(270);
                this.estado = 3;
                break;
        }

    }
}