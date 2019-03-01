function SortVoData()
{
    this.id;
    this.name;
    this.rewardID;
    this.posArray;
}
SortVoData.prototype.SetValue=function(mData)
{
    this.id=mData.id;
    this.rewardID=mData.rewardID;
    this.name=mData.name;
    this.posArray=mData.posArray;
}
module.exports=SortVoData;