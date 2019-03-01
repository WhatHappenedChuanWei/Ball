var ButtlesCfgData=
{
    dataList:null,
    filePath:null,
    init:function()
    {
        this.dataList=new window.dictionary();
        this.filePath=window.Constant.RootPath.CONFIG_ROOT_PATH+"Buttles";
        this.dataDic=window.data.ButtleData.dataDiction;
        window.cc.loader.loadRes(this.filePath,(function(err,array)
        {
            if(err)
            {
                console.log("错误信息:"+err);
                return;
            }
            var arrs=array.json;
            for(var i=0;i<arrs.length;i++)
            {
                var mData=arrs[i];
                var mVoData=new window.ButtlesCfgVo();
                mVoData.SetValue(mData);
                this.dataList.add(mVoData.id,mVoData);
            }

        }).bind(this));
    },
    GetBattleCfgData:function()
    {
        return this.dataList;
    }
}
module.exports=ButtlesCfgData;

