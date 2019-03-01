var RewardItemCfgData=
{
    dataList:null,
    filePath:null,
    init:function()
    {
        this.dataList=new window.dictionary();
        this.filePath=window.Constant.RootPath.CONFIG_ROOT_PATH+"RewardItem";
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
                var mVoData=new window.RewardItemCfgVo();
                mVoData.SetValue(mData);
                this.dataList.add(mVoData.id,mVoData);
            }

        }).bind(this));
    },
    GetRewardItemCfgData:function()
    {
        return this.dataList;
    }
}
module.exports=RewardItemCfgData;

