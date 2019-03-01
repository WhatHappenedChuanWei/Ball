
cc.Class({
     extends: cc.Component,
     Data:null,
     prePos:null,
     gameManager:null,
     curType:null,
     onLoad () {
             
     },
     update(dt)
     {
         this.dt=dt;
         this.Move();
     },
     //回收  当将节点回收时会启用这个函数
     unuse:function()
     {     
      
     },
     //复用 对象池去对象时调用这个函数
     reuse:function()
     {
      

     },
  
     // 换图片
     ChangeUIData:function(name)
     {
         var path=window.Constant.RootPath.ATLAS_ROOT_PATH+"Buttle/"+name;
         var spriteObj=this.node.getComponent(cc.Sprite);
         window.ResourceManager.LoadSpriteByPath(spriteObj,path);
     },
     SetData(type,gameManager)
     {
        this.gameManager=gameManager;
        this.Data=window.data.ButtleData.GetButtleData(type);
        this.curType=type;
     //   this.ChangeUIData(this.Data.path);
      ///  this.accordingTypeDesineAction();
     },

    onCollisionEnter:function(other,self)
    {
           
       if(other.tag==1)
       {
           var playerControll=other.node.getComponent("PlayerControll");
           if(playerControll.invincible)
           {
               console.log("无敌状态");
               return;
           }
          if(playerControll.prePlayerType==window.Constant.PlayerType.SteelBall)
          {
            console.log("免疫伤害");
            return;
          }
          /// 吸收子弹
        //   if(this.curType==window.Constant.BullteType.MaxButtle)
        //   {
        //       playerControll.absorb=true;
        //       this.PutToPool();
        //       console.log("吃到吸收");
        //       return;
        //   }
           this.PutToPool();
           this.gameManager.player.getComponent("PlayerControll").PlayerDie("撞到子弹死亡发送");
       }else if(other.tag==50)
       {
           this.PutToPool();
       }
    },
    Move:function()
    {

        this.node.x-=this.Data.speed*this.dt;
        this.CheckDistance();
    },
    //Destory
    PutToPool()
    {
        window.data.ButtleData.RemoveButtle(this.node);
        if(this.jumpAction!=null)
        {
            this.node.stopAction(this.jumpAction);
        }
      
    },
    CheckDistance:function()
    {
        var pos=this.gameManager.barrierPos;
        if(pos==null)
          return;
       if(pos.x<this.node.x)
          return;
       var distance=pos.x-this.node.x;
       if(distance>5)
       {
           this.PutToPool();      
       }  
    },
    //根据类型定义运动轨迹
    accordingTypeDesineAction()
    {
        switch(this.curType)
        {
            case window.Constant.BullteType.MiniButtle:
               
                    this.jumpHeight=200;
                    this.jumpAction=this.UpAndDown();          
                    this.node.runAction(this.jumpAction);   
                    break;
            
        }
    },
    UpAndDown()
    {
        var jumpUp = cc.moveBy(1, cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(1, cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },
    

});
