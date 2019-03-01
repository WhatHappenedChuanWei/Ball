var StarRewardData=
{
    dataList:null, //生产出的星星
    dataAndPefabDic:null,  // key 对应的预制体
    dataDictiony:null,     //数据 对应的对象池
    prefab:cc.Prefab,
    loadPath:null,
    initCount:30,// 初始化个数
    count:0,
    BarrierCfgData:null,
    init:function()
    {
        console.log("开始获取配置信息,初始化数据");
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

        console.log("开始初始化对象池");
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
     
        console.log("从对象池中获取对象");
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

        this.dataList.add(nodeObj);

        return nodeObj;
    },

    RemoveItem:function(objNode)
    {
        this.dataList.remove(objNode);
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
        var len=this.dataList.count;
        for(var i=len-1;i>=0;i--)
        {
            var obj=this.dataList.get(i);
            this.RemoveItem(obj);
        }
    }
}
module.exports=StarRewardData;