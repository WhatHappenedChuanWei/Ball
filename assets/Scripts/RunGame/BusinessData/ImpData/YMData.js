var YMData=
{
    dataList:null, //
    dataAndPefabDic:null,  // key 对应的预制体
    dataDictiony:null,     //数据 对应的对象池
    prefab:cc.Prefab,
    loadPath:null,
    initCount:30,// 初始化个数
    init:function()
    {
        this.loadPath=window.Constant.RootPath.PREFAB_ROOT_PATH+"YM/YM";
        this.LoadPrefab();
    },
    //加载预制体
    LoadPrefab:function()
    {
        var path=this.loadPath;
        window.ResourceManager.LoadPrefab(path,function(err, prefab)
         {
             if(err!=null)
             {
                 console.log("错误信息:"+err);
                 return;
             }
            this.prefab=prefab;
         }.bind(this)); 
    },
    initStarPool:function()
    {  
      
        this.pool=new cc.NodePool();
        for(var i=0;i<this.initCount;i++)
        {                   
            var objNode=cc.instantiate(this.prefab);   
            this.pool.put(objNode);
        }       
    },

    GetItemFromPool:function(parent,pos)
    {       
        var nodeObj;
        if(this.pool.size()>0)
        {
            nodeObj=this.pool.get(); 
        }     
        else
        {     
            nodeObj=cc.instantiate(this.prefab);
        }
        nodeObj.setParent(parent);
        nodeObj.setPosition(pos);
        return nodeObj;
    },
    RemoveItem:function(objNode)
    {
        this.PutItemToPool(objNode);  
    },   
    PutItemToPool:function(objNode)
    {    
        this.pool.put(objNode);
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
module.exports=YMData;