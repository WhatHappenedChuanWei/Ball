var StarSortData=
{
    dataList:null,
    dataDictionary:null,
    init:function()
    {
        this.dataList=new window.List();
        this.dataDictionary=new window.dictionary();
    },
    InitSortData:function()
    {
        this.dataList=window.cfg.StarSortCfgData.GetStarSortCfgData();
        for(var i=0;i<this.dataList.count;i++)
        {
            var tempData=this.dataList.get(i);
            var sortVoData=new window.SortVoData();

            let strPos=tempData.startPos;
            var myArray=this.GetPosList(strPos);

            sortVoData.id=tempData.id;
            sortVoData.name=tempData.name;
            sortVoData.rewardID=tempData.rewardID;
            sortVoData.posArray=myArray;
            sortVoData.SetValue(sortVoData);

            this.dataDictionary.add(sortVoData.id,sortVoData);
        }

    },
    GetSortDataList:function()
    {
        return this.dataDictionary;
    },
    GetPosList(strPos)
    {
        var myArray=new window.List();
        var arr=strPos.split('|');
        for(var i=0;i<arr.length;i++)
        {
            var tempStr=arr[i];
            var tempArr=tempStr.split(',');
            var x=parseInt(tempArr[0]);
            var y=parseInt(tempArr[1]);

            var pos=new cc.Vec2(x,y);
            myArray.add(pos); 
        }
        return myArray;
    }
}
module.exports=StarSortData;