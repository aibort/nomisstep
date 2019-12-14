
export default class Menu extends Phaser.Scene{
    constructor(){
        super({key:'MenuGame'}); 

        this.tweenMoving = false;
    }

    create(){
        console.log("Escena menú");
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
        //amaro_boton.on('pointerout',() => this.aplicaEfectoFotos(amaro_boton));
        this.tweens.add({
          targets: amaro_boton,
          y: '+=700', 
          ease: 'Sine.Out',
          duration: 1000,
        });

        let alberto_boton = this.add.sprite(300,0,'albertoBoton').setInteractive().setScale(0.2,0.121);;
        alberto_boton.on('pointerover',() => this.aplicaEfectoFotos(alberto_boton));
        //amaro_boton.on('pointerout',() => this.aplicaEfectoFotos(amaro_boton));
        this.tweens.add({
          targets: alberto_boton,
          y: '+=700', 
          ease: 'Sine.Out',
          duration: 1000,
        });

        //albertoBoton

      }

    paraTween(_target){
      _target.setTint(0xFFFFFF);
      this.tweens.add({
        targets: _target,
        scale: -1,
        duration: 500,
        yoyo: true,
        repeatDelay: 200,
      });
    }


    cargaEscenaCreativa(){
      this.scene.start('Creative');
    }

    aplicaTween(_target){
      _target.setTint(0x696969);
      this.tweens.add({
        targets: _target,
        scale: 1,
        duration: 500,
        yoyo: true,
        repeatDelay: 200,
      });
    }

    aplicaEfectoFotos(_foto){
      this.tweens.add({
        targets: _foto,
        angle: '+=360', 
        duration: 1000,
      });
    }


  }