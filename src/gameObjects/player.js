export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,type){
        super(scene,x,y,type);
        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this);   
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
        //Trampas
        this.trampas = [];
        //métodos
        this.RespawnPlayer();
        this.CambiaDir(status);
    }
    
    create(){

        this.estado = estados.ARRIBA;
        this.xPos = x;
        this.yPos = y;
    }

    preUpdate(){

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
            this.setTint(0xffffff);
            this.body.setVelocity(0);
        }

        if(this.body.onFloor()){
            console.log("Collision detectada");
        }
    }

    RespawnPlayer(){
        this.x = this.xPos;
        this.y = this.yPos;
    }
    
    CambiaDir(num){
        switch(num){
            case 0:
                this.setAngle(360);
                break;
            
            case 2:
                this.setAngle(180);
                break;
            
            case 1:
                this.setAngle(90);
                break;
            
            case 3:
                this.setAngle(270);
                break;
        }
    }
}