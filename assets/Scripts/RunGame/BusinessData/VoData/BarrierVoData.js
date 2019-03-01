function BarrierVoData()
{
    this.id;
    this.name;
    this.BarrierID;
    this.posArray;
}
BarrierVoData.prototype.SetValue=function(mData)
{
    this.id=mData.id;
    this.BarrierID=mData.BarrierID;
    this.name=mData.name;
    this.posArray=mData.posArray;
}
module.exports=BarrierVoData;