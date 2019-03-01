var ResourceManager = function(){
    
};

ResourceManager.m_atlasDic = null;
ResourceManager.LoadWindow = function(mName,LoadPrefabComplete){
    window.cc.loader.loadRes( window.Constant.RootPath.WIND_ROOT_PATH + mName +"/" + mName,LoadPrefabComplete);
},

ResourceManager.LoadPrefab = function(path,LoadPrefabComplete){
    window.cc.loader.loadRes(path,LoadPrefabComplete);
},

ResourceManager.LoadAtlasA = function(rootPath,atlasName)
{
    let atlasPath = rootPath + atlasName;
    window.cc.loader.loadRes(atlasPath,cc.SpriteAtlas,function(error,list){
        let spriteFrames = null;
        if(error){
            console.log("loadAtlas Error : "+atlasPath);
        }
        else
        {
            if(null == ResourceManager.m_atlasDic) ResourceManager.m_atlasDic = new window.dictionary(); 
            spriteFrames = list.getSpriteFrames();
            ResourceManager.m_atlasDic.add(atlasName,spriteFrames);
        }
    });
},

ResourceManager.LoadAtlas = function(atlasName,spriteObj,spriteName){
    let atlasPath = window.Constant.RootPath.ATLAS_ROOT_PATH + atlasName;
    window.cc.loader.loadRes(atlasPath,cc.SpriteAtlas,function(error,list){
        let spriteFrames = null;
        let sprite = null;
        if(error){
            console.log("loadAtlas Error : "+atlasPath);
        }
        else{
            spriteFrames = list.getSpriteFrames();
            ResourceManager.m_atlasDic.add(atlasName,spriteFrames);
            for(var i = 0;i<spriteFrames.length;i++)
            {
                if(spriteName == spriteFrames[i].name)
                {
                    sprite = spriteFrames[i];
                    if(spriteObj == null || spriteObj.spriteFrame == null)
                    {
                        console.log("spriteObj is null");
                        return;
                    }
                    spriteObj.spriteFrame = sprite;
                    break;
                }
            }
        }
    });
},

//atlasName,spriteName
ResourceManager.LoadSpriteFrameByName = function(spriteObj,iconPath){
    var arr = iconPath.split("/");
    var atlasName = arr[0];
    var spriteName = arr[1];
    if(ResourceManager.m_atlasDic == null)
    {
        ResourceManager.m_atlasDic = new window.dictionary();
    }

    var sprites = null;
    var sprite = null;
    if(!ResourceManager.m_atlasDic.containKey(atlasName))
    {
        ResourceManager.LoadAtlas(atlasName,spriteObj,spriteName);
        return;
    }

    sprites = ResourceManager.m_atlasDic.get(atlasName);

    for(var i = 0;i<sprites.length;i++)
    {
        if(spriteName == sprites[i].name)
        {
            sprite = sprites[i];
            if(spriteObj == null || spriteObj.spriteFrame == null)
            {
                console.log("spriteObj is null");
                return;
            }
            spriteObj.spriteFrame = sprite;
            break;
        }
    }
    if(null == sprite)
    {
        console.log("sprite is not exist" + spriteName);
    }
    //return sprite; 
},

ResourceManager.LoadSpriteByPath = function(spriteObj,iconPath){

    cc.loader.loadRes(iconPath, cc.SpriteFrame, function (err, spriteFrame) {
        if(err)
        {
            console.log("加载图集出错："+err);
        }
        spriteObj.spriteFrame = spriteFrame;
    });
}

// ResourceManager.LoadSpriteByPath=function(spriteObj,iconPath)
// {
//     cc.loader.loadRes(iconPath,cc.spriteFrame,function(err,spriteFrame))
//     {
//         if(err)
//         {
//             console.log("加载图集失败");
//             return;
//         }
//         spriteObj.getComponent(cc.Sprite).spriteFrame
//     }
// }



//加载网络资源
ResourceManager.LoadUrl = function(spriteObj,remoteUrl){
    cc.loader.load({url: remoteUrl, type: 'jpg'}, function (err,texture) {
        if(err)
        {
            console.log(err);
            return;
        }
        var sprite  = new cc.SpriteFrame(texture);
        if(spriteObj == null || spriteObj.spriteFrame == null)
        {
            console.log("spriteObj is null");
            return;
        }
        spriteObj.spriteFrame = sprite;
    });
},

module.exports = ResourceManager;