function StarSortCfgVo()
{
    this.id;
    this.name;
    this.rewardID;
    this.startPos;   //起始位置
    this.interVal;   //间隔距离
}
StarSortCfgVo.prototype.SetValue=function(mData)
{
    this.id=mData.ID;
    this.name=mData.Name;
    this.rewardID=mData.rewardID;
    this.startPos=mData.startPos;
    this.interVal=mData.interVal;
}
module.exports=StarSortCfgVo;