var ButtleData=
{
    dataDiction:null,
    dataList:null,   //生产的子弹集合
    initCount:3,
    startArry:null,
    prefab:cc.Prefab,
    init:function()
    {
        this.dataList=new window.List();
        this._pool=new cc.NodePool("ButtleHandler");
        this.loadPath=window.Constant.RootPath.Buttle+window.Constant.PrefabNameEnum.Buttle;
        this.InitButtle();
    },
    //初始化对象池
    InitButtle:function()
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
            var objNode=cc.instantiate(this.prefab);
            objNode.addComponent("ButtleHandler");
            this._pool.put(objNode);
        }
        this.startArry=new Array();
    },

    GetButtleFromPool:function(parent,type,pos,manager)
    {   
        this.manager=manager;    
        let nodeObj;
        if(this._pool.size()>0)
        {
            nodeObj=this._pool.get(); 
        }     
        else
        {
            nodeObj=cc.instantiate(this.prefab);
            nodeObj.addComponent("ButtleHandler");
        }
        nodeObj.getComponent("ButtleHandler").SetData(type,manager); 
        nodeObj.setParent(parent);
        nodeObj.setPosition(pos);
        return nodeObj;
    },
    GetButtleData:function(type)
    {
        this.dataDiction=window.cfg.ButtlesCfgData.GetBattleCfgData();
        var buttle=this.dataDiction.get(type);
        if(buttle==null)
        {
            console.log("未获取到buttle数据");
            return;
        }
        return buttle;
    },
    
    RemoveButtle:function(objNode)
    {
        this.PutButtleToPool(objNode);

    },   
    PutButtleToPool:function(objNode)
    {    
        this._pool.put(objNode);
    },
    RemoveAllItem()
    {
        if(!this.manager)
        {
            return;
        }
       var buttlePos=this.manager.ButtleParent;
       this.RemoveChild(buttlePos);
    },
    RemoveChild(parent)
    {
        var childs=parent.children;
        var len=childs.length;
        for(var i=len-1;i>0;i--)
        {
           this.RemoveButtle(childs[i]);
        }
    }
}
module.exports=ButtleData;