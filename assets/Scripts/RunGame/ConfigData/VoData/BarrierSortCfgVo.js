function BarrierSortCfgVo()
{
    this.id;
    this.name;
    this.BarrierID;
    this.barrierPos;   
}
BarrierSortCfgVo.prototype.SetValue=function(mData)
{
    this.id=mData.ID;
    this.name=mData.Name;
    this.BarrierID=mData.BarrierID;
    this.barrierPos=mData.barrierPos;
}
module.exports=BarrierSortCfgVo;