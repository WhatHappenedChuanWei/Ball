
cc.Class({
    extends: cc.Component,
    onLoad ()
    {
        window.const.init();    
        window.data.init();
        window.cfg.init();
        window.AudioController.init();
    },

 
    start()
    {          
     
        window.UIManager.showWindow(window.Constant.LayerEnum.UI,window.Constant.PrefabNameEnum.GAME_START_WIND);  
    }

});
