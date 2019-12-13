let instance = null;

class EventManager extends Phaser.Events.EventManager
{
    constructor()
    {
        super();
        if (instance == null)
        {
            instance=this;
        }

    }
    static getInstance()
    {
        if (instance==null)
        {
            instance= new EventManager();
        }
        return instance; 
    }
}