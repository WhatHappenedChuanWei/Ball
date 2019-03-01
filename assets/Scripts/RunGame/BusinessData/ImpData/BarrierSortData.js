var BarrierSortData=
{
    BarrierSortList:null,
    SortDiction:null,
    init()
    {
        this.BarrierSortList=new window.List();
        this.SortDiction=new window.dictionary();      
    },
    InitSortData()
    {
        this.BarrierSortList=window.cfg.BarrierSortCfgData.GetBarrierSortCfgData();
        this.GetBarrieAndSort();
    },
    GetBarrieAndSort()
    {
        for(var i=0;i<this.BarrierSortList.count;i++)
        {
            var tempData=this.BarrierSortList.get(i);
            var sortVoData=new window.BarrierVoData();

            let strPos=tempData.barrierPos;
            var myArray=this.GetPosList(strPos);

            sortVoData.id=tempData.id;
            sortVoData.name=tempData.name;
            sortVoData.BarrierID=tempData.BarrierID;
            sortVoData.posArray=myArray;
            sortVoData.SetValue(sortVoData);
            this.SortDiction.add(sortVoData.id,sortVoData);
        }
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
    },
    GetSortDataList:function()
    {
        return this.SortDiction;
    },


}
module.exports=BarrierSortData;