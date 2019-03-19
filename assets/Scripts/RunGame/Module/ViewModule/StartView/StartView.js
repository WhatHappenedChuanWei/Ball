cc.Class({

    extends: cc.Component,
    startBtn: null,
    GameView: cc.Node,
    onLoad() {
        this.initComponent();
       
    },
    start()
    {

        this.tex = new cc.Texture2D();
    },

    onEnable: function () {
        this.addListener();
        window.AudioController.playerBG(window.Constant.GameClip.startBgm);
        if(CC_WECHATGAME)
        {
            this.showAd();      
        }
    },
    onDisable: function () {
        this.removeListener();
        this.displayHide();
        if(CC_WECHATGAME)
        {
          this.bannerAd.hide();
        }
    },
    initComponent: function () {
        this.startBtn = cc.find("startBtn", this.node);
        this.SharetBtn = cc.find("SharetBtn", this.node);
        this.returnBtn=cc.find("ReturnBtn",this.node);
        this.display=cc.find("Display",this.node);
        this.rankBtn=cc.find("RankBtn",this.node);
        this.helpBtn=cc.find("helpBtn",this.node);
        this.helpBG=cc.find("helpBG",this.node);  
        this.helpSure=cc.find("helpSure",this.helpBG);  
    },
    addListener: function () {
        this.startEvent = this.startBtn.on(cc.Node.EventType.TOUCH_END, this.onStartClick.bind(this));

        //微信开发者工具或者微信才能使用
        this.shareEvent = this.SharetBtn.on(cc.Node.EventType.TOUCH_END, this.onShareClick.bind(this));
        this.returnEvent=this.returnBtn.on(cc.Node.EventType.TOUCH_END,this.onReturnClick.bind(this));
        //微信开发者工具或者微信才能使用
        this.rankEvent=this.rankBtn.on(cc.Node.EventType.TOUCH_END,this.onRankClick.bind(this));
        this.helpEvent=this.helpBtn.on(cc.Node.EventType.TOUCH_END,this.onHelpClick.bind(this));
        this.helpSureEvent=this.helpSure.on(cc.Node.EventType.TOUCH_END,this.onHelpSureClick.bind(this));
    },
    removeListener: function () {
        this.startBtn.off(cc.Node.EventType.TOUCH_END, this.startEvent);
        this.SharetBtn.off(cc.Node.EventType.TOUCH_END, this.shareEvent);
        this.returnBtn.off(cc.Node.EventType.TOUCH_END,this.returnEvent);
        this.rankBtn.off(cc.Node.EventType.TOUCH_END,this.rankEvent);
        this.helpBtn.off(cc.Node.EventType.TOUCH_END,this.helpEvent);
        this.helpSure.off(cc.Node.EventType.TOUCH_END,this.helpSureEvent);
    },
    onStartClick: function () {
        window.UIManager.showWindow(window.Constant.LayerEnum.UI, window.Constant.PrefabNameEnum.GAME_TRANSITION_WID);
        window.UIManager.hideWindow(window.Constant.PrefabNameEnum.GAME_START_WIND);
       
    },
    onShareClick: function () {

        var shareImgUrl ="";
        wx.shareAppMessage
            ({
                title: "跑的赢我，球球就是你的啦",
                imageUrl: shareImgUrl,
                success: function success(res) {
                    console.log("分享成功", res);
                },
            });
    },
    onRankClick:function()
    {
        this.isShow = 1;
        this.display.active=true;
        this.returnBtn.active=true;
        this.hideBtn();
        wx.postMessage({
            messageType: 1,
            MAIN_MENU_NUM: "x1",
        })
        this.bannerAd.hide();
    },
    onReturnClick()
    {
        this.displayHide();
        this.showBtn();
        this.bannerAd.show();
    },
    onHelpClick()
    {
        this.helpBG.active=true;
        this.hideBtn();
        this.bannerAd.hide();
    },
    onHelpSureClick()
    {
        this.helpBG.active=false;
        this.showBtn();
        this.bannerAd.show();
    },
    displayHide()
    {
        this.isShow=0;
        this.display.active=false;
        this.returnBtn.active=false;
    },
    hideBtn()
    {
        this.startBtn.active=false;
        this.SharetBtn.active=false;
        this.rankBtn.active=false;
        this.helpBtn.active=false;
    },
    showBtn()
    {
        this.startBtn.active=true;
        this.SharetBtn.active=true;
        this.rankBtn.active=true;
        this.helpBtn.active=true;
    },
    update(dt)
    {   
        
        if(this.isShow!=1)
           return;
        this._updateSubDomainCanvas();
    },
    _updateSubDomainCanvas () {
        if (!this.tex) {
            return;
        }
        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.display.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.tex);
    },
    showAd(){
        var winSize = wx.getSystemInfoSync();
        console.log(winSize);
        var bannerHeight = 50;
        var bannerWidth = 300;
        this.bannerAd = wx.createBannerAd({
          adUnitId:"adunit-cb7231aaca0552b1",
          style: {
            left:0,
            top: 0,
            width: bannerWidth
          }
        });
        this.bannerAd.show();
        this.bannerAd.onResize(res => {
            this.bannerAd.style.top = 0;
        });
        this.bannerAd.onError(function(err) {
          console.log(err);
        });
        this.bannerAd.onLoad(function() {
          console.log("banner 广告加载成功");
        });
    },
});
