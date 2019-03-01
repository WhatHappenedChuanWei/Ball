var BarrierSortCfgData=
{
    dataList:null,
    filePath:null,
    init:function()
    {
        this.dataList=new window.List();
        this.filePath=window.Constant.RootPath.CONFIG_ROOT_PATH+"BarrierSort";
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
                var mVoData=new window.BarrierSortCfgVo();
                mVoData.SetValue(mData);
                this.dataList.add(mVoData);
            }
        }).bind(this));
    },
    GetBarrierSortCfgData:function()
    {
        return this.dataList;
    }
}
module.exports=BarrierSortCfgData;

