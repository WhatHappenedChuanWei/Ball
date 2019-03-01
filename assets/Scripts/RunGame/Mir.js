window.List = require("List");
window.dictionary = require("dictionary");

var EventBus = require("EventBus");
var Constant=require("Constant");
var UIManager = require("UIManager");
var ResourceManager = require("ResourceManager");
var LayerManager = require("LayerManager");
var  AudioController=require("AudioController");
// var ViewManage=require("ViweManage");
// var BaseWind=require("BaseWind");


window.cc;
window.EventBus = EventBus;
window.Constant=Constant;
window.UIManager = UIManager;
window.LayerManager = LayerManager;
// window.ViewManage=ViewManage;
// window.BaseWind=BaseWind;
window.ResourceManager = ResourceManager;
window.AudioController=AudioController;



//------------Data-------------//

var ButtlesCfgData=require("ButtlesCfgData");
var PlayersCfgData=require("PlayersCfgData");
var RewardItemCfgData=require("RewardItemCfgData");
var StarSortCfgData=require("StarSortCfgData");
var BarrierSortCfgData=require("BarrierSortCfgData");
var BarrierCfgData=require("BarrierCfgData");
var  CfgTestData=require("CfgTestData");

var PlayerData=require("PlayerData");
var RewardItemData=require("RewardItemData");
var StarSortData=require("StarSortData");
var ButtleData=require("ButtleData");
var BarrierData=require("BarrierData");
var BarrierSortData=require("BarrierSortData");
var ScoreEffectData=require("ScoreEffectData");
var GameRunData=require("GameRunData");
var StarRewardData=require("StarRewardData");
var YMData=require("YMData");
//------------VoData-------------//

window.ButtlesCfgVo=require("ButtlesCfgVo");
window.PlayersCfgVo=require("PlayersCfgVo");
window.RewardItemCfgVo=require("RewardItemCfgVo");
window.StarSortCfgVo=require("StarSortCfgVo");
window.BarrierCfgVo=require("BarrierCfgVo");
window.BarrierSortCfgVo=require("BarrierSortCfgVo");

window.PlayerVoData=require("PlayerVoData");
window.SortVoData=require("SortVoData");
window.BarrierVoData=require("BarrierVoData");

window.const = {
    Screen_Width : cc.winSize.width,
    Screen_Height : cc.winSize.height,
    Adaptation_Coefficient : cc.winSize.height/1920,          //适配系数比例
    init()
    {
        this.Screen_Width = cc.winSize.width;
        this.Screen_Height = cc.winSize.height;
        this.Adaptation_Coefficient = cc.winSize.height/1920;

    },
}

window.data = {

    PlayerData:PlayerData,
    RewardItemData:RewardItemData,
    StarSortData:StarSortData,
    ButtleData:ButtleData,
    GameRunData:GameRunData,
    BarrierSortData:BarrierSortData,  
    BarrierData:BarrierData,
    ScoreEffectData:ScoreEffectData,
    StarRewardData:StarRewardData,
    YMData:YMData,
    init()
    {
        PlayerData.init();
        StarSortData.init();
        ButtleData.init();
        BarrierSortData.init();
    },
};



window.cfg={

    ButtlesCfgData:ButtlesCfgData,
    PlayersCfgData:PlayersCfgData,
    RewardItemCfgData:RewardItemCfgData,
    StarSortCfgData:StarSortCfgData,
    BarrierSortCfgData:BarrierSortCfgData,
    BarrierCfgData:BarrierCfgData,
    CfgTestData:CfgTestData,
    init(){

        ButtlesCfgData.init();
        PlayersCfgData.init();
        RewardItemCfgData.init();
        StarSortCfgData.init();
        BarrierSortCfgData.init();
        BarrierCfgData.init();
        CfgTestData.init();
        
    },

}
