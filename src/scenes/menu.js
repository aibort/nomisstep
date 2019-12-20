import Creative from '../scenes/escenaCreativa.js'

export default class Menu extends Phaser.Scene{
    constructor(){
        super({key:'MenuGame'}); 
      //Melodia de fondo
        this.temaFondo ;  
      }

      create(){
      this.scene.setVisible(true,"MenuGame");
        console.log("Escena menú");
        let config = ({
          mute: false,
          volume: 1,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,  
          delay: 0
        })
        this.temaFondo = this.sound.add('menuTema');
        this.temaFondo.play(config);
        let fondo = this.add.sprite(700,400,'menuBG').setScale(1.5);
        let boton_creativo = this.add.sprite(700,0,'botonCreativa').setInteractive().setScale(0.5);
        boton_creativo.on('pointerdown',() => this.cargaEscenaCreativa());
        boton_creativo.on('pointerover',() => this.aplicaTween(boton_creativo));
        boton_creativo.on('pointerout',() => this.paraTween(boton_creativo));
        this.tweens.add({
          targets: boton_creativo,
          y: '+=500', 
          ease: 'Quintic.Out',
          duration: 500,
        });

        let boton_tutorial = this.add.sprite(0,600,'botonTutorial').setInteractive().setScale(0.5);
        boton_tutorial.on('pointerover',() => this.aplicaTween(boton_tutorial));
        boton_tutorial.on('pointerout',() => this.paraTween(boton_tutorial));
        this.tweens.add({
          targets: boton_tutorial,
          x: '+=700',
          ease: 'Quintic.Out',
          duration: 700,
        });

        let boton_controles = this.add.sprite(1400,700,'botonControles').setInteractive().setScale(0.5);
        boton_controles.on('pointerover',() => this.aplicaTween(boton_controles));
        boton_controles.on('pointerout',() => this.paraTween(boton_controles));
        this.tweens.add({
          targets: boton_controles,
          x: '-=700', 
          ease: 'Quintic.Out',
          duration: 900,
        });

        let amaro_boton = this.add.sprite(1100,0,'amaroBoton').setInteractive().setScale(0.2);
        amaro_boton.on('pointerover',() => this.aplicaEfectoFotos(amaro_boton));
        amaro_boton.on('pointerdown',() => this.abreAmaroCreaditos());

        
        this.tweens.add({
          targets: amaro_boton,
          y: '+=700', 
          ease: 'Sine.Out',
          duration: 1000,
        });

        let alberto_boton = this.add.sprite(300,0,'albertoBoton').setInteractive().setScale(0.2,0.121);;
        alberto_boton.on('pointerover',() => this.aplicaEfectoFotos(alberto_boton));
        this.tweens.add({
          targets: alberto_boton,
          y: '+=700', 
          ease: 'Sine.Out',
          duration: 1000,
        });
      }

    //Devuelve a unos valores predestinados los botones
    paraTween(_target){
      _target.setInteractive(false);
      this.temaFondo.setVolume(1);
      _target.setTint(0xFFFFFF);
      this.tweens.add({
        targets: _target,
        scale: -1,
        duration: 500,
        yoyo: true,
        repeatDelay: 200,
        onComplete: function(){
          _target.setScale(1);
          _target.setInteractive(true);
        }
      });
    }

    //Cuando el jugador da click sobre el boton play
    cargaEscenaCreativa(){
      this.scene.add('Creative',Creative,true);
      this.scene.setVisible(false,"MenuGame");
      this.temaFondo.stop();
    }

    //Aplica efectos sobre los botones
    aplicaTween(_target){
      _target.setInteractive(false);
      this.temaFondo.setVolume(0.5);
      _target.setTint(0x696969);

      this.tweens.add({
        targets: _target,
        scale: 1,
        duration: 500,
        yoyo: true,
        repeatDelay: 200,
        onComplete: function(){
          _target.setInteractive(true);
        }

        
      });
    }

    //Efecto sobre las imagenes de los colaboradores
    aplicaEfectoFotos(_foto){
      this.tweens.add({
        targets: _foto,
        angle: '+=360', 
        duration: 1000,
        onComplete: function(){
                        _foto.setAngle(0);
                    }
      });
    }

    //Abre los creditos
    abreAmaroCreaditos(){
      let gitIMG = this.add.sprite(1150,570,"gitAmaro").setScale(0.1);
      gitIMG.setInteractive();
      gitIMG.on('pointerdown',function(){ 
        window.open("https://github.com/Sounagix");
      });
      this.tweens.add({
        targets: gitIMG,
        scale: '+=0.05', 
        duration: 1000,
        repeat: -1
      });

      let twiterIMG = this.add.sprite(1050,570,"twAmaro").setScale(0.17);
      twiterIMG.setInteractive();
      twiterIMG.on('pointerdown',function(){ 
        window.open("https://twitter.com/AmaroBlestPolo");
      });
      this.tweens.add({
        targets: twiterIMG,
        scale: '+=0.05', 
        duration: 1000,
        repeat: -1
      });

    }



  }