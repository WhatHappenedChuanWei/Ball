var dictionary = require("dictionary");
var AudioController = {

    AudioClipList : new dictionary(),
    AudioSourceList:new dictionary(),

    init:function()
    {
        var audioParents=cc.find("AudioManager");
        var child=audioParents.children;
        child.forEach(key => {
            
            var audioSourece=key.getComponent(cc.AudioSource);        
            this.AudioSourceList.add(key.name,audioSourece);
        });
    },

    loadClip(type,mName,callBack)
    {
        var loadPath=window.Constant.RootPath.AUDIO_ROOT_PATH+type+"/"+mName;
        window.cc.loader.loadRes(loadPath,function(err,clip)
        {
            if(err!=null)
            {
                console.log("错误信息:"+err);
                return;
            }
            this.AudioClipList.add(mName,clip);
            if(callBack!=null)
            {
                callBack(clip);
            }
        }.bind(this));
      
    },
    /// name 表明 声音源 clip表示音效
    playerBG(mName)
    {
        var type=window.Constant.AudioType.BGAudio;
        this.playBG(type,mName);
    },
    playSXF(mName)
    {
        var type=window.Constant.AudioType.SXFAudio;
        var volume=1;
        this.playAudio(type,mName,volume);
    },
    playBG(type,mName)
    {
        var audioSource=this.AudioSourceList.get(type);     
        if(!this.AudioClipList.containKey(mName))
        {       
            this.loadClip(type,mName,function(gameclip)
            {
                audioSource.clip=gameclip
                audioSource.play();
            });
            return;
        }
        var clip=this.AudioClipList.get(mName);
        if(clip==null)
           return;
        audioSource.clip=clip;
        audioSource.play();
        
      
    },
    playAudio(type,mName,volume)
    {
        if(!this.AudioClipList.containKey(mName))
        {       
            this.loadClip(type,mName,function(gameclip)
            {
                cc.audioEngine.play(gameclip, false,volume);
            });
            return;
        }
        var clip=this.AudioClipList.get(mName);
        if(clip==null)
           return;
          cc.audioEngine.play(clip, false,volume);
    },
    

    pause:function()
    {
        array.forEach(element => {
            
            element.pause();
        });
    }
}
module.exports=AudioController;