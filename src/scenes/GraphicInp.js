export default class GraphicInp extends Phaser.GameObjects.Sprite{

    create(){
    
    
    drawShape(0x027a71, 0x02fdeb);
    this.inputEnabled = true;
    this.input.useHandCursor = true;
   
   
   
   this.events.onInputDown.add(onDown, this);
   this.events.onInputUp.add(onUp, this);
   this.events.onInputOver.add(onOver, this);
   this.events.onInputOut.add(onOut, this);
    }

     drawShape(fill, style) {

        this.clear();
        this.beginFill(fill);
        this.lineStyle(4, style, 1);
    
        this.moveTo(0, 0);
        this.lineTo(250, 0);
        this.lineTo(250, 200);
        this.lineTo(125, 100);
        this.lineTo(0, 200);
        this.lineTo(0, 0);
    
        this.endFill();
    
    }
     onOver() {

        drawShape(0xab3602, 0xeb6702);
    
    }
    
     onDown() {
    
        drawShape(0x717a02, 0xebfd02);
    
    }
    
     onUp() {
    
        drawShape(0x027a71, 0x02fdeb);
    
    }
    
     onOut() {
    
        drawShape(0x027a71, 0x02fdeb);
    
    }
}


