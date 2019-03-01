var StarSortCfgData=
{
    dataList:null,
    filePath:null,
    init:function()
    {
        this.dataList=new window.List();
        this.filePath=window.Constant.RootPath.CONFIG_ROOT_PATH+"StarSort";
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
                var mVoData=new window.StarSortCfgVo();
                mVoData.SetValue(mData);
                this.dataList.add(mVoData);
            }

        }).bind(this));
    },
    GetStarSortCfgData:function()
    {
        return this.dataList;
    }
}
module.exports=StarSortCfgData;

