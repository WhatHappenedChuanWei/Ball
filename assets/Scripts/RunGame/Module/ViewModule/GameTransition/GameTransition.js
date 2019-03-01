cc.Class({

    extends: cc.Component,
    properties:
    {


    },
    onLoad()
    {
        this.Bg=cc.find("Bg",this.node);
        this.BgAnimation=this.Bg.getComponent(cc.Animation);
        this.Bground=cc.find("Canvas/bg");
        this.addListener();    
    },
    addListener()
    {
        this.BgAnimation.on('finished',(event)=>{
            
            this.playOver();
            
        },this);
    },
    playOver()
    {
        window.UIManager.showWindow(window.Constant.LayerEnum.UI, window.Constant.PrefabNameEnum.GAME_RUN_WIND);
        window.UIManager.hideWindow(window.Constant.PrefabNameEnum.GAME_TRANSITION_WID);
    },
    //节点第一次被创建且 enabled 为 true 会先调用此方法
    onEnable()
    {
        this.Bground.active=false;
        this.BgAnimation.play();
    },
    start()
    {
            //预制体初始化操作
            window.data.RewardItemData.init();    //初始化奖励物质预制体
            window.data.BarrierData.init();    //初始化障碍物预制体
            window.data.StarSortData.InitSortData();   //奖励物质 排序初始化
            window.data.BarrierSortData.InitSortData(); //障碍物 排序初始化
            window.data.YMData.init();
    },
    onDisable()
    {
        this.Bground.active=true;
    }

});