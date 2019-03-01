var CfgTestData=
{
    dataList:null,
    filePath:null,
    init:function()
    {
        this.dataList=new List();
        this.filePath=window.Constant.RootPath.CONFIG_ROOT_PATH+"test";
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
                this.dataList.add(mVoData);
            }
        }).bind(this));
    },
    GetRewardItemCfgData:function()
    {
        console.log("配置表信息:"+this.dataList);
        return this.dataList;
    },
}
module.exports=CfgTestData;

