

cc.Class({
    extends: cc.Component,

    score:cc.Label,
    onLoad () 
    {
        this.initComponent();
      
    },
    initComponent()
    {
        this.score=this.getComponent(cc.Label);
    },
    AddListener()
    {
        window.EventBus.addListener(window.Constant.EventTypeID.OnScoreChange,this.OnScoreChange.bind(this));
    },
    OnScoreChange()
    {
        
        this.score.string=window.data.GameRunData.totalSocre.toString();
    },
    onEnable()
    {
        this.AddListener();
    },
    onDisable()
    {
        this.score.string="";
        this.RemoveListener();
    },
    RemoveListener()
    {
        window.EventBus.removeListener(window.Constant.EventTypeID.OnScoreChange,this.OnScoreChange.bind(this));
    },
});
