var dictionary = require("dictionary");

var LayerManager = function(){
};

LayerManager.m_layerDic = new dictionary();

LayerManager.init = function(){
},

LayerManager.getLayers = function(layer){
    if(!this.m_layerDic.containKey(layer))
    {
        console.log(layer + " is not exist");
        return;
    }
    return  this.m_layerDic.get(layer);
},

LayerManager.getLayer = function(layer)
{
    return  cc.find("Canvas/" + layer);
},

module.exports = LayerManager;