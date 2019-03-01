
cc.Class({
    extends: cc.Component,

     Data:null,
     gameManager:null,
     id:0,
     onLoad () {
        this.player=this.gameManager.player;
        this.scoreNode=this.gameManager.storePos;
        this.PlayerControll=this.player.getComponent("PlayerControll");

        //被吸收功能
        // this.schedule(function()
        // {
        //     if(this.PlayerControll.absorb)
        //     {
        //       // var vecByWorld=this.gameManager.node.convertToWorldSpaceAR(this.player.position);
        //        var newVec2 = this.node.parent.convertToWorldSpaceAR(this.node.position);
        //        var newPos=this.gameManager.node.convertToNodeSpaceAR(newVec2);

        //        console.log("玩家世界坐标:"+this.gameManager.player.position);
        //        console.log("奖励物质世界坐标:"+newPos);
        //        if(this.gameManager.player.position.x<newPos.x)
        //        {
        //            var dist = newPos.x-this.gameManager.player.position.x
        //            if(dist<600)
        //            {
        //                this.MoveToPlayer();  
        //                console.log("距离范围500以内");
        //            }
        //        }
            
        //     }
        // },0.5);
     },
     update(dt)
     {
       
     },
     SetData(id,gameManager)
     {
        this.gameManager=gameManager;
        var dataList=window.cfg.RewardItemCfgData.GetRewardItemCfgData();
        var data=dataList.get(id);
        this.Data=data;
        this.id=id;

     },
     MoveToStore: function () {

        var vecByThisInTheWorld=this.scoreNode.parent.convertToWorldSpaceAR(this.scoreNode.position);
        var newVec2 = this.node.parent.convertToNodeSpaceAR(vecByThisInTheWorld);

        var speed=this.PlayerControll.cameraSpeed*15+30;  //0.3s 是0.02的15倍
        var pos =newVec2.add(new cc.v2(speed,0));
        var moveUp=cc.moveTo(0.3,pos).easing(cc.easeCircleActionInOut());  
        var seq=cc.sequence(moveUp,cc.callFunc(function()
        {
            window.data.RewardItemData.RemoveRewardItem(this.node);   
            this.addSorce();   
        }.bind(this)));

        this.node.runAction(seq);
    },
    MoveToPlayer()
    {
     
        var vecByThisInTheWorld=this.scoreNode.parent.convertToWorldSpaceAR(this.player.position);
        var newVec2 = this.node.parent.convertToNodeSpaceAR(vecByThisInTheWorld);
        var pos =newVec2.add(new cc.v2(120,0));
        var moveUp=cc.moveTo(0.4,pos).easing(cc.easeCircleActionInOut());  
        var seq=cc.sequence(moveUp,cc.callFunc(function()
        {
            window.data.RewardItemData.RemoveRewardItem(this.node);   
            this.addSorce();   
          
        }.bind(this)));

        this.node.runAction(seq);
    },
    onCollisionEnter:function(other,self)
    {

        if(other.tag==1)
        {        
            this.MoveToStore();   //金币移动效果 
            window.AudioController.playSXF(window.Constant.GameClip.score);
        } 
        else if(other.tag==50)
        {
            window.data.RewardItemData.RemoveRewardItem(this.node);    
        }
    },
    ///添加分数
    addSorce:function()
    {
        
        window.data.GameRunData.SetSorce(this.Data.score);
    },
});
