function BarrierCfgVo()
{
    this.id;
    this.name;
    this.path;
    this.attck;
}
BarrierCfgVo.prototype.SetValue=function(mData)
{
    this.id=mData.ID;
    this.name=mData.Name;
    this.path=mData.path;
    this.attck=mData.attck;
}
module.exports=BarrierCfgVo;