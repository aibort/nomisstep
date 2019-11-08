export default class Block extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,type){
        super(scene,x,y,type);
        this.scene.add.existing(this); 
        this.scene.physics.add.existing(this,true);   
        //this.body.setImmovable(true);
        this.isFoged = true;
        /*this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        baseGroup.add(this);
        this.y -= this.height / 2 + platform.height / 2;*/

    }
    
    create(){

        this.setInteractive();
        this.input.enabled = true;
        this.on('clicked', clickHandler, this);
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);
    }

    clickHandler (){
    console.log("BLOQUE TOCADO");
    this.off('clicked', clickHandler);
    this.input.enabled = false;
    this.setVisible(false);
    }


}


