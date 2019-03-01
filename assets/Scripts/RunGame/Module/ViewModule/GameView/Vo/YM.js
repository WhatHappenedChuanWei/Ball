cc.Class({
    extends: cc.Component,

    properties: {
  
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () 
     {
         this.ani=this.getComponent(cc.Animation);
         this.ani.on('finished',(event)=>{       
            this.playOver();          
        },this);
     },

    start () {

    },
    onEnable()
    {
        this.ani.play();
    },
    playOver()
    {
        window.data.YMData.RemoveItem(this.node);

    },
});
