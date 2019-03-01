
cc.Class({
    extends: cc.Component,

     Data:null,
     gameManager:null,
     barrierPos:null,
     id:0,
     onLoad () {

         this.initComponent();
     },
     onDisable()
     {
        var sprite=this.node.getComponent(cc.Sprite);
        var name=sprite.spriteFrame.name
        if(name=="DZ2")
        {
          this.ChangeUIData();
        }
     },
     initComponent()
     {
        
     },  
     SetData(id,gameManager)
     {
        this.gameManager=gameManager;
        var dataList=window.cfg.BarrierCfgData.GetBarrierCfgData();
        this.id=id;
        var data=dataList.get(id);
        this.Data=data;
       
     },
    onCollisionEnter:function(other,self)
    {
       if(other.tag==50)
       {
           window.data.BarrierData.RemoveItem(this.node);      
       }
       if(this.id==window.Constant.BarrierType.WoodBarrier)
       {
           return;
       }
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
            this.node.getComponent(cc.Animation).play();
            return;
         }    
         window.data.BarrierData.RemoveItem(this.node);   
         this.gameManager.player.getComponent("PlayerControll").PlayerDie("撞到地上野怪");
       }
       
    },
    ChangeUIData:function()
    {
        var path="barrier/DZ1";
        var spriteObj=this.node.getComponent(cc.Sprite);
        window.ResourceManager.LoadSpriteFrameByName(spriteObj,path);
    },
    
});
