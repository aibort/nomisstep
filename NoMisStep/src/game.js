import CreativeMode from './escenaCreativa.js';
export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {

  }

  create() {


    this.creativeButton = this.add.text(100, 650, 'MODO CREATIVO', { fill: '#0f0' })
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverState() )
      .on('pointerout', () => this.enterButtonRestState() )
      .on('pointerdown', () => this.enterButtonActiveState() )
      .on('pointerup', () => {
        this.onButtonDown();
        this.enterButtonHoverState();
    });

    this.controlsButtom = this.add.text(100, 700 , 'CONTROLES', { fill: '#0f0' })
    .setInteractive()
    .on('pointerover', () => this.enterButtonHoverState() )
    .on('pointerout', () => this.enterButtonRestState(controlsButtom) )
    .on('pointerdown', () => this.enterButtonActiveState() )
    .on('pointerup', () => {
      this.onButtonDown();
      this.enterButtonHoverState();
  });

    //this.updateClickCountText(clickCount);
  }

  onButtonDown() {//Cuando el jugador apreta el boton
    alert(currButton);
    //this.scene.add("CreativeMode",new CreativeMode);
    //this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
  }

  enterButtonHoverState(currButton) {//cambia de color al pasar el cursor por encima
    alert(currButton);
    currButton.creativeButton.setStyle({ fill: '#ff0'});
    //this.creativeButton.setStyle({ fill: '#ff0'});
  }

  enterButtonRestState(currButton) {//Restrablece el color original del boton
    alert(currButton);
    //this.creativeButton.setStyle({ fill: '#0f0' });
    this.currButton.setStyle({ fill: '#0f0' });

  }

  enterButtonActiveState(currButton) {//Cambia el color del boton al ser pulsado
    alert(currButton);
    this.currButton.setStyle({ fill: '#0ff' });
    //this.creativeButton.setStyle({ fill: '#0ff' });

  }
  

  update(time, delta) {    
  }
}
