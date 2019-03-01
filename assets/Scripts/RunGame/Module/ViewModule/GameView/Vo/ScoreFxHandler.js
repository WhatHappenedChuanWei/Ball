
cc.Class({
    extends: cc.Component,
     properties:
     {
        stayTime:0.5,
        tempTime:0,

     },
  
     onLoad () {

     },
     //回收  当将节点回收时会启用这个函数
     unuse:function()
     {
        
     },
     //复用 对象池去对象时调用这个函数
     reuse:function()
     {

     },
     update(dt)
     {
        this.tempTime+=dt;
        if(this.tempTime>this.stayTime)
        {
            this.tempTime=0;
            window.data.ScoreEffectData.RemoveScoreFx(this.node);
        }
     }
});
