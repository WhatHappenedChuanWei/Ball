function RewardItemCfgVo()
{
    this.id;
    this.name;
    this.path;
    this.score;
}
RewardItemCfgVo.prototype.SetValue=function(mData)
{
    this.id=mData.id;
    this.name=mData.name;
    this.path=mData.path;
    this.score=mData.score;
}
module.exports=RewardItemCfgVo;