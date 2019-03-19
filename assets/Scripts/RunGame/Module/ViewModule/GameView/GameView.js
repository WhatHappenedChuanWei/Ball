//主场景
cc.Class({
    extends: cc.Component,
    player:cc.Node,
    bg1:cc.Node,
    bg2:cc.Node,
    bg3:cc.Node,
    score:cc.Node,
    UI:cc.Node,
    PlayerCamera:cc.Node,
    buttlePos:cc.Node,
    gameOverBG:cc.Node,
    barrierPos:cc.Node,
    storePos:cc.Node,
    distance:cc.Node,
    Count:0,
    jumpBtn:cc.Node,
    isOnGame:false,
    GameOverUI:cc.Node,
    cameraBg:cc.Node,
    ground1:cc.Node,
    ground2:cc.Node,
    ground3:cc.Node,
    ButtleParent:cc.Node,   //存放子弹的点
    initData:function()  
    {   
      
        this.player.setPosition(-450,450);
        this.buttlePos.setPosition(625,0);
        this.barrierPos.setPosition(-980,0);
        this.PlayerCamera.setPosition(0,0);
        this.storePos.setPosition(-640,450);


        //背景1
        this.bg1.setPosition(0,0);
        this.bg2.setPosition(1920,0);
        this.bg3.setPosition(3840,0); 
        this.criticalOne=this.bg2.x;
        this.criticalTwo=this.bg3.x;
        this.criticalThree=this.bg2.x+this.bg3.x;

    //   //背景2
        this.bgm1.setPosition(0,0,0);
        this.bgm2.setPosition(1920,0);
        this.bgm3.setPosition(3840,0);

        //背景3
        this.bgt1.setPosition(0,0,0);
        this.bgt2.setPosition(1920,0);
        this.bgt3.setPosition(3840,0);

    },
    onLoad()
    {     
      
        this.initComponet();
        window.data.RewardItemData.initStarPool();  //初始化奖励物质对象池    
        window.data.BarrierData.initStarPool();  //初始化障碍物对象池
        window.data.YMData.initStarPool();       //初始化跳跃特效
        this.SortDiction=window.data.StarSortData.GetSortDataList();   
        this.BarrierSortDiction=window.data.BarrierSortData.GetSortDataList();
    },
    start()
    {
        
    },
    onEnable()
    {

        window.AudioController.playerBG(window.Constant.GameClip.gameBgm);
        this.isOnGame=true;
        this.Count=0;
        this.initData(); 
        this.addListener();

        /// 临时处理随机出现的星星排序情况
        this.arry=new Array();
        this.arry.push(window.Constant.SortType.OneLineType);
        this.arry.push(window.Constant.SortType.LType);
        this.arry.push(window.Constant.SortType.IType);

        this.butArry=new Array();
        this.butArry.push(window.Constant.BullteType.MiniButtle);

        this.BarrierArry=new Array();
        this.BarrierArry.push(window.Constant.BarrierSortType.IType);
        this.BarrierArry.push(window.Constant.BarrierSortType.OneLineType);

        this.loadPlayer(); 
        this.loadStart(window.Constant.SortType.OneLineType,this.bg1Swap,this.bg1Swap1);
        this.loadStart(window.Constant.SortType.OneLineType,this.bg2Swap,this.bg2Swap1);
        this.loadStart(window.Constant.SortType.OneLineType,this.bg3Swap,this.bg3Swap1);
        this.offset=this.PlayerCamera.x-this.barrierPos.x; 
        this.storeOffset=this.PlayerCamera.x-this.storePos.x;
     
    },
    onDisable()
    {
        this.removeListener();
        
    },
    update(dt)
    {

        if(!this.isOnGame)
           return;
        this.MoveBackground();
        this.MoveBackgroundBG2(this.bgt1,this.bgt2,this.bgt3);
        this.MoveBackgroundBG2(this.bgm1,this.bgm2,this.bgm3);
        this.MoveButtlePos();
        this.BarrierPosFollow();
        this.StorePosFollow();
        this.GetDistance();
        if(this.playerComponent.cameraSpeed)
        {
            var speed1=this.playerComponent.cameraSpeed/2;
            var speed2=this.playerComponent.cameraSpeed/2+3;

            this.bgm1.x+=speed1;
            this.bgm2.x+=speed1;
            this.bgm3.x+=speed1;

            this.bgt1.x+=speed2;
            this.bgt2.x+=speed2;
            this.bgt3.x+=speed2;
        }

    },
    initComponet()
    {
       
        // this.GameOverUI=cc.find("GameOver",this.node.parent);
        this.player=cc.find("PlayerBall",this.node); 
        this.UI=cc.find("UI",this.node);
        this.PlayerCamera=cc.find("PlayerCamera",this.node.parent);
        this.RestarBG=cc.find("RestarBG",this.UI);
        this.restarBtn=cc.find("reStarBtn",this.RestarBG);
        this.gameOverBtn=cc.find("gameOverBtn",this.RestarBG);
        this.cameraBg=cc.find("PlayerCameraBG",this.node.parent);
        this.buttlePos=cc.find("ButtlePos",this.node);    //子弹生产点
        this.barrierPos=cc.find("barrierPos",this.node);  //屏障生产点
        this.storePos=cc.find("storePos",this.node);  
        this.distance=cc.find("distance",this.UI);
        this.Score=cc.find("Score",this.UI);
        this.ButtleParent=cc.find("ButtleParent",this.node);
        this.jumpBtn=cc.find("Jump",this.UI);
        this.BG=cc.find("BG",this.node);
        this.bg1=cc.find("bg1",this.BG);
        this.bg2=cc.find("bg2",this.BG);
        this.bg3=cc.find("bg3",this.BG);

        this.ground1=cc.find("ground",this.bg1);
        this.ground2=cc.find("ground",this.bg2);
        this.ground3=cc.find("ground",this.bg3);

        this.bg1Swap=cc.find("SwapPos",this.ground1);
        this.bg1Swap1=cc.find("SwapPos1",this.ground1);
        this.barrierSwap1=cc.find("barrierPos",this.ground1);

        this.bg2Swap=cc.find("SwapPos",this.ground2);
        this.bg2Swap1=cc.find("SwapPos1",this.ground2);
        this.barrierSwap2=cc.find("barrierPos",this.ground2);

        this.bg3Swap=cc.find("SwapPos",this.ground3);
        this.bg3Swap1=cc.find("SwapPos1",this.ground3);
        this.barrierSwap3=cc.find("barrierPos",this.ground3);

        this.BG2=cc.find("BG2",this.node);     
        this.bgm1=cc.find("cloud1",this.BG2);
        this.bgm2=cc.find("cloud2",this.BG2);
        this.bgm3=cc.find("cloud3",this.BG2);

        this.BG3=cc.find("BG3",this.node);
        this.bgt1=cc.find("cloud1",this.BG3);
        this.bgt2=cc.find("cloud2",this.BG3);
        this.bgt3=cc.find("cloud3",this.BG3);
        this.ChangeBtn=cc.find("ChangeBtn",this.UI);
    },
    addListener()
    {
        window.EventBus.addListener(window.Constant.EventTypeID.OnGameOver,this.GameOver.bind(this)); 
    },
    GetDistance:function()
    {

        var distance=Math.floor(this.player.x/100);
        if(distance<0)
        {
            return;
        }
        this.distance.getComponent(cc.Label).string=distance.toString();
    },
    //根据要求加载玩家
    loadPlayer()
    {
        if(this.player==null)
           return;       
        this.playerComponent=this.player.getComponent("PlayerControll");  
        if(this.playerComponent==null)
        {
           this.playerComponent=this.player.addComponent("PlayerControll");
        }
        this.playerComponent.init(this);        
    },
    ///加载星星
    loadStart(SortType,swapPos,swapPos1)
    {  

     //    var tempPos=new cc.Vec2(this.GetRandom(200,-200),0); 
         var sortData=this.SortDiction.get(SortType);
         var len=sortData.posArray.count;
         for(var i=0;i<len;i++)
         {
            var id=sortData.rewardID; 
            var dataPos=sortData.posArray.get(i);
            var start=window.data.RewardItemData.GetRewardItemFromPool(swapPos,id,dataPos,this); 
            window.data.RewardItemData.GetRewardItemFromPool(swapPos1,id,dataPos,this);        
         }  
    },
    loadButtle(type)
    {

        this.buttlePos.y=this.GetRandomposY();
        var number=this.GetRandom(1,10);
        if(number>5)
        {
            return;
        }
        var buttle=window.data.ButtleData.GetButtleFromPool(this.ButtleParent,type,this.buttlePos,this);     
    },
    ///this.node.x; 是player;
    MoveBackground()
    {
 
        var isCanMove1=this.PlayerCamera.x>this.criticalOne;
        if(isCanMove1)
        {                
            var curPos=this.criticalThree; //移动后的位置
            this.criticalOne=curPos+this.bg1.width;       //移动的临界点  
            this.bg1.setPosition(new cc.Vec2(curPos,0));
            this.MoveBgGround(this.ground1); 
            if(this.ground1.y<10)
            {
                this.SwapBarrier(this.barrierSwap1,this.GetTypeRandomIndex(this.BarrierArry));
            }                                   
            this.loadStart(this.GetTypeRandomIndex(this.arry),this.bg1Swap,this.bg1Swap1);           
        }
        var isCanMove2=this.PlayerCamera.x>this.criticalTwo;
        if(isCanMove2)
        {  
            var curPos2=this.criticalOne;
            this.criticalTwo=curPos2+this.bg1.width;        
            this.bg2.setPosition(new cc.Vec2(curPos2,0));
            this.MoveBgGround(this.ground2);
            if(this.ground2.y>-300&&this.ground2.y<10)
            {
                this.SwapBarrier(this.barrierSwap2,this.GetTypeRandomIndex(this.BarrierArry));
            }  
            this.loadStart(this.GetTypeRandomIndex(this.arry),this.bg2Swap,this.bg2Swap1);     
           
         }
        var isCanMove3=this.PlayerCamera.x>this.criticalThree;
        if(isCanMove3)
        {                   
            var curPos=this.criticalTwo;
            this.criticalThree=curPos+this.bg1.width;
            this.bg3.setPosition(new cc.Vec2(curPos));
            this.MoveBgGround(this.ground3);
            if(this.ground3.y>-300&&this.ground3.y<10)
            {
                this.SwapBarrier(this.barrierSwap3,this.GetTypeRandomIndex(this.BarrierArry));
            }         
            this.loadStart(this.GetTypeRandomIndex(this.arry),this.bg3Swap,this.bg3Swap1);               
        }      
    },
    MoveBackgroundBG2(bg1,bg2,bg3)
    {
 
        var isCanMove1=this.PlayerCamera.x>bg2.x+bg2.width/2;
        if(isCanMove1)
        {           
            var postion=bg3.x+bg3.width-5;
            bg1.setPosition(new cc.Vec2(postion));
        }
        var isCanMove2=this.PlayerCamera.x>bg3.x+bg3.width/2;
        if(isCanMove2)
        {   
            var postion=bg1.x+bg3.width-5;
            bg2.setPosition(new cc.Vec2(postion));
         }
         var isCanMove3=this.PlayerCamera.x>bg3.x+bg3.width*1.5;
        if(isCanMove3)
        {                     
            var postion=bg2.x+bg1.width-5;
            bg3.setPosition(new cc.Vec2(postion));
        }          
    },
    MoveButtlePos()
    {
        var isCanMove=this.PlayerCamera.x>this.buttlePos.x;
        if(isCanMove)
        {
            this.buttlePos.x+=this.bg1.width;
            this.loadButtle(this.GetTypeRandomIndex(this.butArry));     
        }
    },
    ///销毁墙(撞到就销毁)
    BarrierPosFollow()
    {   
        this.barrierPos.x=this.PlayerCamera.x-this.offset;
    },
    StorePosFollow()
    {
        this.storePos.x=this.PlayerCamera.x-this.storeOffset;
    },
    //获取一个生成 星星排序 或者 子弹随机类型
    GetTypeRandomIndex:function(Arry)
    {      
        var index=Math.floor(Math.random()*Arry.length);
        return Arry[index];
    },

    //游戏结束 数据处理
    GameOver:function()
    {      
        this.isOnGame=false;
        window.data.RewardItemData.RemoveAllItem();
         window.data.BarrierData.RemoveAllItem();
         window.data.ButtleData.RemoveAllItem();
         this.distance.getComponent(cc.Label).string="";
         this.PlayerCamera.x=0;
         this.GameOverChangeUI();
    },
    // 切换界面
    GameOverChangeUI()
    {
        window.UIManager.hideWindow(window.Constant.PrefabNameEnum.GAME_RUN_WIND);
        window.UIManager.showWindow(window.Constant.LayerEnum.UI,window.Constant.PrefabNameEnum.GAME_END_WIND);
    },
    ///取一个随机值
    GetRandomposY:function()
    {
        var y=this.GetRandom(400,-500);
        return y;
    },
    GetRandomPosX:function()
    {
        var x=Math.floor(Math.random()*100-100);
        return x;
    },
    ///重新开始
    Restart()
    {
        this.isOnGame=false;
    },
    //生产障碍物
    SwapBarrier(swapPos,SortType)
    {
        var sortData=this.BarrierSortDiction.get(SortType);       
        var len=sortData.posArray.count;
        for(var i=0;i<len;i++)
        {
            var id=sortData.BarrierID; 
            var dataPos=sortData.posArray.get(i);
            var temPos=new cc.Vec2(dataPos.x,dataPos.y);
            window.data.BarrierData.GetRewardItemFromPool(swapPos,id,temPos,this);  
        }  
    },
    removeListener()
    {
        window.EventBus.removeListener(window.Constant.EventTypeID.OnGameOver);
    },
    MoveBgGround(parentNode)
    {
        var x=this.GetRandom(-200,200);
        var y=this.GetRandom(-500,50);
        parentNode.setPosition(x,y);
    },
    GetRandom(minValue,MaxValue)
    {
        return Math.floor(Math.random()*(MaxValue-minValue+1)+minValue);
    },
    ChnagezIndex(bg1,bg2,bg3)
    {
        bg1.zIndex=1;
        bg2.zIndex=2;
        bg3.zIndex=3;
    }
});
