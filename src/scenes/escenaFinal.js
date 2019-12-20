import Creative from "./escenaCreativa.js";

export default class Lobby extends Phaser.Scene{
    constructor(){
        super({key:'Lobby'});
        //Variables para el primer jugador
            this.tiempoPlayerA = -1;
            this.primeroTxt;
        //Variables para el segundo jugador
            this.tiempoPlayerB = -1;
            this.segundoTxt;
        //Grupo ed numeros
            this.elementosBorrables;
        this.HUD;
        this.estado = false;
        //Sonidos
            this.click;

    }
    preload(){
//primerTiempo
        this.load.image('volver','./assets/Botones/mainMenu.png');
        this.load.image('siguiente','./assets/Botones/siguienteTurno.png');

        this.load.image('primerTiempo','./assets/Imagenes/primerTiempo.png');
        this.load.image('segundoTiempo','./assets/Imagenes/segundoTiempo.png');

        this.load.image('primerGanador','./assets/Imagenes/primerGanador.png');
        this.load.image('segundoGanador','./assets/Imagenes/segundoGanador.png');
        this.load.image('segundos','./assets/Imagenes/segundos.png');
        this.load.image('empate','./assets/Imagenes/empate.png');

    }

    create(){

        this.add.sprite(700,400,'creativaBG').setScale(0.5);
        this.HUD = this.scene.get('HUD');
        this.elementosBorrables = this.add.group();
        this.click = this.sound.add("click");
        //Para que player está jugando
        if(this.tiempoPlayerA == -1){
            this.tiempoPlayerA = this.HUD.getTimer();
        }
        else {
            this.tiempoPlayerB = this.HUD.getTimer();
        }
    
        //Primer jugador
        let primerPlayerIMG = this.add.sprite(735,0,'primerTiempo').setScale(0.5);
        this.elementosBorrables.add(primerPlayerIMG);
        this.tweens.add({
            targets: primerPlayerIMG,
            y: '+=150', 
            ease: 'Quintic.Out',
            duration: 500,
        });

        //Creación de los tiempo que ha tardado
        let espacio = 75;
        let cadena = new String();
        cadena = this.tiempoPlayerA.toString();
        let divisorA;
        if(cadena.length > 1){
            divisorA = cadena.length;
        }
        else{
            divisorA = 2;
        }

        for(let i = 0 ; i < cadena.length; i++){ 
            let num = this.add.sprite((1400 / (divisorA)) + (espacio * i), 0,cadena[i]).setScale(0.5);
            this.elementosBorrables.add(num);
            this.tweens.add({
                targets: num,
                y: '+=200', 
                ease: 'Quintic.Out',
                duration: 5000,
            });
            if(i == cadena.length-1){
                let seg = this.add.sprite(735, 0,"segundos").setScale(0.5);
                this.elementosBorrables.add(seg);
                this.tweens.add({
                    targets: seg,
                    y: '+=250', 
                    ease: 'Quintic.Out',
                    duration: 5000,
                });
            }
        }
            
        

        if(this.tiempoPlayerB > 0){
            //Para el segundo jugador
            let segundoPlayerIMG = this.add.sprite(735,800,'segundoTiempo').setScale(0.5);
            this.elementosBorrables.add(segundoPlayerIMG);
            this.tweens.add({
            targets: segundoPlayerIMG,
            y: '-=400', 
            ease: 'Quintic.Out',
            duration: 500,
            });
            //Creación de los tiempo que ha tardado
            let espacioB = 75;
            let cadenaB = new String();
            let divisorB;
            cadenaB = this.tiempoPlayerB.toString();

            if(cadenaB.length > 1){
                divisorB = cadenaB.length;
            }
            else
            {
                divisorB = 2;
            }
            for(let i = 0 ; i < cadenaB.length; i++){ 
                let num = this.add.sprite((1400 / (divisorB)) + (espacioB * i), 800,cadenaB[i]).setScale(0.5);
                this.elementosBorrables.add(num);
                this.tweens.add({
                    targets: num,
                    y: '-=350', 
                    ease: 'Quintic.Out',
                    duration: 5000,
                });
                if(i == cadenaB.length-1){
                    let seg = this.add.sprite(735, 800,"segundos").setScale(0.5);
                    this.elementosBorrables.add(seg);
                    this.tweens.add({
                        targets: seg,
                        y: '-=300', 
                        ease: 'Quintic.Out',
                        duration: 5000,
                    });
                }
            }
        }

        //Para agregar el boton para el segundo jugador
        if(this.tiempoPlayerA > 0 && this.tiempoPlayerB == -1){
            let siguiente = this.add.sprite(1100,0,'siguiente').setInteractive().setScale(0.5);
            this.elementosBorrables.add(siguiente);
            siguiente.on('pointerdown',() => this.siguienteJugador());
            siguiente.on('pointerover',() => this.agregaTint(siguiente));
            siguiente.on('pointerout',() => this.quitaTint(siguiente));
            this.tweens.add({
                targets: siguiente,
                y: '+=750', 
                ease: 'Quintic.Out',
                duration: 500,
            });
            this.tweens.add({
                targets: siguiente,
                scale: '+=0.15', 
                ease: 'Quintic.Out',
                duration: 5000,
                repeat: -1
            });
        }


        //Determinar ganador
        if(this.tiempoPlayerA > 0 && this.tiempoPlayerB > 0){
            this.time.delayedCall(5000, () => this.aplicaGanador());
        }

        //Boton para volver al menu principal
        let boton_menu = this.add.sprite(300,0,'volver').setInteractive().setScale(0.5);
        boton_menu.on('pointerdown',() => this.cargaMenu());
        boton_menu.on('pointerover',() => this.agregaTint(boton_menu));
        boton_menu.on('pointerout',() => this.quitaTint(boton_menu));

        this.tweens.add({
          targets: boton_menu,
          y: '+=750', 
          ease: 'Quintic.Out',
          duration: 500,
        });
        this.tweens.add({
            targets: boton_menu,
            scale: '+=0.15', 
            ease: 'Quintic.Out',
            duration: 5000,
            repeat: -1
        });

    }

    aplicaGanador(){
        let ganador;
        if(this.tiempoPlayerA < this.tiempoPlayerB){
            ganador = this.add.sprite(700,0, "primerGanador").setScale(0.7);
        }
        else if(this.tiempoPlayerA > this.tiempoPlayerB){
            ganador = this.add.sprite(700,0, "segundoGanador").setScale(0.7);
        }
        else{   
            ganador = this.add.sprite(700,0, "empate").setScale(0.7);
        }
        this.tweens.add({
            targets: ganador,
            y: '+=650', 
            ease: 'Quintic.Out',
            duration: 10000,
          });
    }


    //Si el jugador sale del lobby
    cargaMenu(){
        this.click.play();
        this.scene.switch("MenuGame");
        this.scene.setVisible(true,"MenuGame"); 
        this.scene.remove("HUD");
        this.scene.remove("Lobby");
    }

    siguienteJugador(){
        this.click.play();
        this.scene.add('Creative',Creative,true);
        this.scene.remove("HUD");
    }

    quitaTint(_elem){
        _elem.setTint(0xFFFFFF);
    }

    agregaTint(_elem){
        _elem.setTint(0x696969);
    }



    
}