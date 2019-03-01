function ButtlesCfgVo()
{
    this.id;
    this.name;
    this.path;
    this.attck;
    this.speed;
}
ButtlesCfgVo.prototype.SetValue=function(mData)
{
    this.id=mData.ID;
    this.name=mData.name;
    this.path=mData.path;
    this.attck=mData.attck;
    this.speed=mData.speed;
}
module.exports=ButtlesCfgVo;