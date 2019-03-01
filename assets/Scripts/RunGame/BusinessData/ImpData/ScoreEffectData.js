var ScoreEffectData=
{
    dataDiction:null,
    dataList:null,   //特效
    initCount:20,
    startArry:null,
    init:function()
    {
        this.dataList=new window.List();
        this._pool=new cc.NodePool("ScoreFxHandler");
        this.loadPath=window.Constant.RootPath.Effect+window.Constant.PrefabNameEnum.ScoreEffect;
        this.InitBarrier();
    },
    //初始化对象池
    InitBarrier:function()
    {
        window.ResourceManager.LoadPrefab(this.loadPath,function(err, prefab)
        {
            if(err!=null)
            {
                console.log("错误信息:"+err);
                return;
            }
            this.prefab=prefab;
            this.initPool();
        }.bind(this)); 
    },
    initPool:function()
    {
        
        for(var i=0;i<this.initCount;i++)
        {            
            let objNode=cc.instantiate(this.prefab);
            objNode.addComponent("ScoreFxHandler");
            this._pool.put(objNode);
        }
        this.startArry=new Array();
    },

    GetScoreFxPool:function(parent,pos)
    {       
        let nodeObj;
        if(this._pool.size()>0)
        {
            nodeObj=this._pool.get(); 
        }     
        else
        {
            nodeObj=cc.instantiate(this.prefab);
            nodeObj.addComponent("ScoreFxHandler");
        }
     //   nodeObj.getComponent("ScoreFxHandler").SetData(data,manager); 
        nodeObj.setParent(parent);
        nodeObj.setPosition(pos);
        this.dataList.add(nodeObj);
        console.log("得分效果");
        return nodeObj;
    },
    GetScoreFxData:function(type)
    {
        this.dataDiction=window.cfg.BarrierCfgData.GetBarrierCfgData();
        var barrier=this.dataDiction.get(type);
        if(barrier==null)
        {
            console.log("未获取到barrier数据");
            return;
        }
        return barrier;
    },
    
    RemoveScoreFx:function(objNode)
    {
        this.dataList.remove(objNode);
        this.PutScoreFxPool(objNode);

    },   
    PutScoreFxPool:function(objNode)
    {    
        this._pool.put(objNode);
    },
    RemoveAllScoreFx()
    {
        var len=this.dataList.count;
        for(var i=len-1;i>=0;i--)
        {
            var obj=this.dataList.get(i);
            this.RemoveScoreFx(obj);            
        }  
    }
}
module.exports=ScoreEffectData;