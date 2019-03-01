var RewardItemData=
{
    dataList:null, //生产出的星星
    dataAndPefabDic:null,  // key 对应的预制体
    dataDictiony:null,     //数据 对应的对象池
    prefab:cc.Prefab,
    loadPath:null,
    initCount:50,// 初始化个数
    count:0,
    ItemCfgData:null,
    init:function()
    {
        this.dataList=new window.List();
        this.dataDictiony=new window.dictionary();
        this.dataAndPefabDic=new window.dictionary();
        this.loadPath=window.Constant.RootPath.RewardItem;
        this.ItemCfgData=window.cfg.RewardItemCfgData.GetRewardItemCfgData();
        var len=this.ItemCfgData.count;
        for(var i=0;i<len;i++)
        {
            var data=this.ItemCfgData.values[i];
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
                objNode.addComponent("RewardHandler");
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
            nodeObj.addComponent("RewardHandler");
        }
        nodeObj.getComponent("RewardHandler").SetData(id,manager); 
        nodeObj.setParent(parent);
        nodeObj.setPosition(pos);
        return nodeObj;
    },

    RemoveRewardItem:function(objNode)
    {
        var id=objNode.getComponent("RewardHandler").id;
        this.PutRewardItemToPool(objNode,id);
    },   
    PutRewardItemToPool:function(objNode,id)
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
       var SwapPosfirst1=cc.find("SwapPos",this.manager.ground1);
       var SwapPosfirst2=cc.find("SwapPos1",this.manager.ground1);

       var SwapPosSecond1=cc.find("SwapPos",this.manager.ground2);
       var SwapPosSecond2=cc.find("SwapPos1",this.manager.ground2);


       var SwapPosThird1=cc.find("SwapPos",this.manager.ground3);
       var SwapPosThird2=cc.find("SwapPos1",this.manager.ground3);

       this.RemoveChild(SwapPosfirst1);
       this.RemoveChild(SwapPosfirst2);
       this.RemoveChild(SwapPosSecond1);
       this.RemoveChild(SwapPosSecond2);
       this.RemoveChild(SwapPosThird1);
       this.RemoveChild(SwapPosThird2);
    },
    RemoveChild(parent)
    {
        var childs=parent.children;
        var len=childs.length;
        for(var i=len-1;i>=0;i--)
        {
           this.RemoveRewardItem(childs[i]);
        }
    }
}
module.exports=RewardItemData;