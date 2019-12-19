
export default class HUD extends Phaser.Scene{
    constructor(){
        super({key:'HUD'});
        this.desarmadores = 0 ;
        this.tempo = false;
        this.txtTempo;
        this.tiempo = true;
        this.escenaDueña;
    }

    create ()
    {
        this.escenaDueña = this.scene.get('Challenger');
        this.desarmadores = this.escenaDueña.getDesactivadores();
        let txtDesactivadores = this.add.text(10, 10, "Deactivator(s): " + this.desarmadores, { font: '48px Arial', fill: '#FFFFFF' });
        this.escenaDueña.events.on('quitaDesactivador', function () {

            this.desarmadores--;
            txtDesactivadores.setText( "Deactivator(s):" + this.desarmadores);

        }, this);

        this.escenaDueña.events.on('activaTimer',() => this.activaTemp());
        this.escenaDueña.events.on('desactivaTimer',() => this.desactivaTimer());

        this.txtTempo = this.add.text(0, 0,{ font: '48px Arial', fill: '#FFFFFF' });
        this.txtTempo.setActive(false);

    }
    
    update(){
        if(this.tempo){
            this.txtTempo.setText(this.escenaDueña.getTiempoPenalizado().toString().substr(0,2));
        }
    }

    activaTemp(){
        this.tempo = true;
        let ini = this.escenaDueña.getInicio();
        this.txtTempo.setVisible(true);        
        this.txtTempo = this.add.text(ini.getX() - 15, ini.getY(),{ font: '48px Arial', fill: '#FFFFFF' });
    }

    desactivaTimer(){
        this.tempo = false;
        this.txtTempo.setVisible(false);
    }
}
