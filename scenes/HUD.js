
export default class HUD extends Phaser.Scene{
    constructor(){
        super({key:'HUD'});

        this.desarmadores = 0 ;
        this.activaPenalizacion = false;

        this.penalizadoTxt;
        this.tiempo = true;
        this.escenaDueña;
        //Para controlar el tiempo en la escena desafio
            this.totalTiempo;
            this.tiempoTxt;

        //Para controlar el tiempo penalizado
        this.penalizadoTiempo;
    }
    preload(){
        this.load.image('crono','./assets/Imagenes/timer.png');
    }

    create ()
    {   
        this.add.sprite(1150,30,"crono").setScale(0.05);
        this.escenaDueña = this.scene.get('Challenger');
        this.desarmadores = this.escenaDueña.getDesactivadores();
        
        //lógica para que se muestre la cantidad de desactivadores que hay
        let txtDesactivadores = this.add.text(10, 10, "Deactivator(s): " + this.desarmadores, { font: '48px Arial', fill: '#000000' });
        this.escenaDueña.events.on('quitaDesactivador', function () {
            this.desarmadores--;
            txtDesactivadores.setText( "Deactivator(s):" + this.desarmadores);

        }, this);

        //Escuchadores de la escena challenger
        this.escenaDueña.events.on('activaTimer',() => this.activaTemp());
        this.escenaDueña.events.on('desactivaTimer',() => this.desactivaTimer());

        this.escenaDueña.events.on('paraTiempo',() => this.paraTiempo());


        //Lógica para el tiempo de penalización
        this.penalizadoTxt = this.add.text(0, 0,{ font: '48px Arial', fill: '#000000' }).setVisible(false);

        //Tiempo total
        this.tiempoTxt = this.add.text(1200,10,{ font: '48px Arial', fill: '#000000' }).setScale(3);
        this.totalTiempo = this.time.addEvent({
            loop: true
        });
    }
    
    update(time, delta){

        if(this.activaPenalizacion){
            this.penalizadoTiempo--;
            this.penalizadoTxt.setText(this.penalizadoTiempo / 100);
        }


        if(this.penalizadoTiempo != undefined && this.penalizadoTiempo < 0){
            this.desactivaTimer();
        }
        //Tiempo total
        this.tiempoTxt.setText(Math.floor(this.totalTiempo.getElapsedSeconds()));
    }

    //Devuelve el total del tiempo de la escena desafio
    getTimer(){
        return Math.floor(this.totalTiempo.getElapsedSeconds());
    }

    paraTiempo(){
        this.totalTiempo.stop();
    }

    activaTemp(){
        this.activaPenalizacion = true;
        this.penalizadoTiempo = 1000;
        let ini = this.escenaDueña.getInicio();
        this.penalizadoTxt.setPosition(ini.getX() + 160 , ini.getY() - 250);
        this.penalizadoTxt.setColor("black");
        this.penalizadoTxt.setScale(2.5);
        this.penalizadoTxt.setVisible(true);        
    }

    desactivaTimer(){
        this.activaPenalizacion = false;
        this.penalizadoTxt.setVisible(false);
    }
}
