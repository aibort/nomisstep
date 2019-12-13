export default class Button {
    constructor(scene, x, y, text, type) {
      this.type = type;
      this.button = scene.add.sprite(x, y, 'boton');
      this.scene.add.existing(this); 

    }
  }

    