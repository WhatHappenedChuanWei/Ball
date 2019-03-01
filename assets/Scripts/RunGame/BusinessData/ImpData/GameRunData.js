
//保存 游戏的分数和走的路程
var GameRunData=
{
    totalSocre:null,
    totalDistance:null,
    playerSpeed:null,
    SetSorce(mValue)
    {
        this.totalSocre+=mValue;
        window.EventBus.pos(window.Constant.EventTypeID.OnScoreChange);
    },
    SetDistance(mValue)
    {
        this.totalDistance=mValue;
    },
    SetPlayerDate(playerData)
    {
       this.playerSpeed=playerData;
    },
    ClearData()
    {
        this.totalSocre=0;
        this.totalSocre=0;
        this.playerData=null;
    }
    
}
module.exports=GameRunData;