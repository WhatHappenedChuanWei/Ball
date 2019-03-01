var PlayerData=
{
    playerData:null,

    init:function()
    {
        this.dataList=new window.dictionary();
    },
    AddPlayerData:function(key,value)
    {
        this.dataList.add(key,value);
        console.log(key);
        console.log(value);
    },
    GetPlayerData:function(key)
    {
        var dataDic=window.cfg.PlayersCfgData.GetPlayersCfgData();
        this.playerData=dataDic.get(key); 
        return this.playerData;
    },
}
module.exports=PlayerData;