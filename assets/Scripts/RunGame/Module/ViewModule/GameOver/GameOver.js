cc.Class({
    extends: cc.Component,

     Restart:cc.Node,
     Exit:cc.Node,
     GoToMain:cc.Node,
     Releve:cc.Node,
     count:0,
     GameUI:cc.Node,
     onLoad () {

        this.InitComponent();
     },

     onEnable()
     {
         this.AddListener();
         window.AudioController.playerBG(window.Constant.GameClip.overBgm);
         this.Score.string=window.window.data.GameRunData.totalSocre.toString();
     },
     onDisable()
     {
         this.RemoveListener();

     },
     InitComponent()
     {

        this.BG=cc.find("BG",this.node);
        this.Restart=cc.find("Restart",this.BG);
        this.GoToMain=cc.find("GoToMain",this.BG);
        this.ScoreNo=cc.find("Score",this.BG);
        this.Score=this.ScoreNo.getComponent(cc.Label);
     },
     AddListener()
     {
        
         this.RestartEvent=this.Restart.on(cc.Node.EventType.TOUCH_END,this.onReStart.bind(this));
         this.GoToMainEvent=this.GoToMain.on(cc.Node.EventType.TOUCH_END,this.OnGoToMain.bind(this));

     },
     RemoveListener()
     {
         this.Restart.off(cc.Node.EventType.TOUCH_END,this.RestartEvent);
         this.GoToMain.off(cc.Node.EventType.TOUCH_END,this.GoToMainEvent);
     },
     //重新开始
     onReStart()
     {
        this.count++;
        this.clearData();
        window.UIManager.showWindow(window.Constant.LayerEnum.UI,window.Constant.PrefabNameEnum.GAME_TRANSITION_WID);
        window.UIManager.hideWindow(window.Constant.PrefabNameEnum.GAME_END_WIND);

     },
     //回到主页
     OnGoToMain()
     {
        this.clearData();
        window.UIManager.showWindow(window.Constant.LayerEnum.UI,window.Constant.PrefabNameEnum.GAME_START_WIND);
        window.UIManager.hideWindow(window.Constant.PrefabNameEnum.GAME_END_WIND);
     },
     clearData()
     {
         if(CC_WECHATGAME)
         {
             if(!window.window.data.GameRunData.totalSocre)
               return;
              var score=window.window.data.GameRunData.totalSocre;
               wx.postMessage({
                 messageType: 3,
                MAIN_MENU_NUM: "x1",
                  score:score
               });
         }
        window.data.GameRunData.ClearData();
        this.Score.string="";
     }
});
