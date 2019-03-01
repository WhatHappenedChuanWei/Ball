 var dictionary = require("dictionary");
 var ResourceManager = require("ResourceManager");

var UIManager = function()
{
    
};

UIManager.m_windDic = new dictionary();

UIManager.createWindow = function(layer,mName)
{
   ResourceManager.LoadWindow(mName,function(err, prefab){
        if(null == prefab)
        {
            console.log("null == prefab !!!");
            console.log(err);
            return;
        } 
        var view = window.cc.instantiate(prefab);  
        UIManager.m_windDic.add(mName,view);

        var layerObj = window.LayerManager.getLayer(layer);
        if(null == layerObj) 
        {
            console.log("layerObj is null");
            return; 
        }
        layerObj.addChild(view);
        console.log(view);
        view.addComponent(mName);
        UIManager.showWindow(layer,mName);
    });
}

UIManager.showWindow = function(layer,mName)
{
    if(!UIManager.m_windDic.containKey(mName))
    {

        UIManager.createWindow(layer,mName);
        return;
    }
    UIManager.m_windDic.get(mName).active = true;
}

UIManager.hideWindow = function(mName)
{

    UIManager.m_windDic.get(mName).active = false;
} 

UIManager.destoryWindow = function(mName)
{
    UIManager.m_windDic.get(mName).destroy();
    UIManager.m_windDic.remove(mName);
}

UIManager.checkWindow = function(mName)
{
    if(UIManager.m_windDic.containKey(mName))
    {
        return true;
    }
    return false;
},

UIManager.clear = function()
{
   var count = this.m_windDic.count;
   for(var i = count-1; i >= 0;i--)
   {
       var name = this.m_windDic.getNameByIndex(i);
       this.destoryWindow(name);
   }
},

UIManager.showTip = function(content)
{
    window.cc.loader.loadRes(window.ResPathConst.PREFABS_ROOT_PATH + "Tip/Tip",function(err,prefab)
    {
        if(err)
        {
            console.log(err);
            return;
        }

        var obj = cc.instantiate(prefab);
        var canvas = cc.find("Canvas/UI");
        if(null == canvas) 
        {
            console.log("canvas is null");
            return;
        }
        canvas.addChild(obj);
        var tip = obj.getComponent("TipPanel");
        tip.showTip(content);
    });
},


module.exports = UIManager;
