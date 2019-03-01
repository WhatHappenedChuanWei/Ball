var PlayersCfgData=
{
    dataList:null,
    filePath:null,
    init:function()
    {
        this.dataList=new window.dictionary();
        this.filePath=window.Constant.RootPath.CONFIG_ROOT_PATH+"players";
        window.cc.loader.loadRes(this.filePath,(function(err,array){

            if(err)
            {
                console.log("错误信息:"+err);
                return;
            }
            var arrs=array.json;
            var PlayerData=window.data.PlayerData;
            for(var i=0;i<arrs.length;i++)
            {
                var mData=arrs[i];
                var cfgDataVo=new window.PlayersCfgVo();
                cfgDataVo.SetValue(mData);
                this.dataList.add(cfgDataVo.id,cfgDataVo);

                // var dataVo=new window.PlayerVoData();
                // dataVo.SetValue(mData)
                // PlayerData.AddPlayerData(dataVo.id,dataVo);
            }

        }).bind(this));
    },
    GetPlayersCfgData:function()
    {
        return this.dataList;
    },
}
module.exports=PlayersCfgData;