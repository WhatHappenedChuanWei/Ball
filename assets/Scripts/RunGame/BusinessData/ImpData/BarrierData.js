var BarrierData=
{
    dataList:null, //
    dataAndPefabDic:null,  // key 对应的预制体
    dataDictiony:null,     //数据 对应的对象池
    prefab:cc.Prefab,
    loadPath:null,
    initCount:30,// 初始化个数
    count:0,
    BarrierCfgData:null,
    manager:null,
    init:function()
    {
        this.dataList=new window.List();
        this.dataDictiony=new window.dictionary();
        this.dataAndPefabDic=new window.dictionary();
        this.loadPath=window.Constant.RootPath.Barrier;
        this.BarrierCfgData=window.cfg.BarrierCfgData.GetBarrierCfgData();
        var len=this.BarrierCfgData.count;
        for(var i=0;i<len;i++)
        {
            var data=this.BarrierCfgData.values[i];
            if(data==null)
            {
                console.log("未取得配置文件索引:"+i);
                return;
            }       
            this.LoadPrefab(data);     
        }

    },
    //加载预制体
    LoadPrefab:function(data)
    {
        console.log("开始加载预制体");
        var path=this.loadPath+data.path;
        window.ResourceManager.LoadPrefab(path,function(err, prefab)
         {
             if(err!=null)
             {
                 console.log("错误信息:"+err);
                 return;
             }
             this.dataAndPefabDic.add(data.id,prefab);
         }.bind(this)); 
    },

    initStarPool:function()
    {  

        var len=this.dataAndPefabDic.count;
        for(var k=0;k<len;k++)
        {
            var pool=new cc.NodePool();
            var key=this.dataAndPefabDic.keys[k];
            for(var i=0;i<this.initCount;i++)
            {              
                var prefab=this.dataAndPefabDic.get(key);         
                var objNode=cc.instantiate(prefab);
                //添加脚本可以根据key值进行改变，也可以在RewardHandler中判断Key编写不一样的逻辑
                objNode.addComponent("BarrierHandler");     
                pool.put(objNode);
            }
            this.dataDictiony.add(key,pool);
        }           
    },

    GetRewardItemFromPool:function(parent,id,pos,manager)
    {    
        this.manager=manager;   
        var nodeObj;
        var pool=this.dataDictiony.get(id);
        if(pool==null)
        {
            console.log("id:"+id+"对象池为空");
            return;
        }
        if(pool.size()>0)
        {
            nodeObj=pool.get(); 
        }     
        else
        {
            var prefab=this.dataAndPefabDic.get(id);          
            nodeObj=cc.instantiate(prefab);
            nodeObj.addComponent("BarrierHandler");
        }
        nodeObj.getComponent("BarrierHandler").SetData(id,manager);
        nodeObj.setParent(parent);
        nodeObj.setPosition(pos);
        return nodeObj;
    },
    RemoveItem:function(objNode)
    {
        var id=objNode.getComponent("BarrierHandler").id;
        this.PutItemToPool(objNode,id);
    
    },   
    PutItemToPool:function(objNode,id)
    {    
        var pool=this.dataDictiony.get(id);
        pool.put(objNode);
    },  
    RemoveAllItem()
    {
        if(!this.manager)
        {
            return;
        }
       var barrierPos1=cc.find("barrierPos",this.manager.ground1);
       var barrierPos2=cc.find("barrierPos",this.manager.ground2);
       var barrierPos3=cc.find("barrierPos",this.manager.ground3);
       this.RemoveChild(barrierPos1);
       this.RemoveChild(barrierPos2);
       this.RemoveChild(barrierPos3);
    },
    RemoveChild(parent)
    {
        var childs=parent.children;
        var len=childs.length;
        for(var i=len-1;i>=0;i--)
        {
           this.RemoveItem(childs[i]);
        }
    }
}
module.exports=BarrierData;