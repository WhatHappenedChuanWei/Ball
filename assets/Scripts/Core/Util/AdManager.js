var AdManager = {

    rewardedVideoAd : null,

    videoPlayComplete : null,
    videoPlayFail : null,
    videoLoadError:null,
    videoPalyError:null,

    reqCount : null,
    onVideoHandler : null,

    init()
    {
        this.reqCount = 0;
        this.createRewardeVideoAd();
        this.addLisener();
        this.LoadRewardVideoAd();
    },

    addLisener()
    {
        this.rewardedVideoAd.onError(this.onRewardedVideoAdError.bind(this));
        this.rewardedVideoAd.onClose(this.onRewardeVideoClose.bind(this));
    },

    getReqCount(){
        return this.reqCount;
    },
    removeLisener()
    {
        this.rewardedVideoAd.offError(this.onRewardedVideoAdError);
        this.rewardedVideoAd.offClose(this.onRewardeVideoClose);
    },

    registerVideoPlayComplete(ret_handler)
    {//广告完整播放
        this.videoPlayComplete = ret_handler;
    },

    registerVideoPlayFail(ret_handler)
    {//广告没有完整播放
        this.videoPlayFail = ret_handler;
    },

    registerOnVideoHandler(ret_handler)
    {//广告播放错误
        this.onVideoHandler = ret_handler;
    },

    onRewardedVideoAdError(res)
    {
        console.log("视屏错误"+res);
        switch(res.errCode){
            case 1000:
            console.log("后端接口调用失败")
            this.reqCount = 1;
            break;
            case 1001:
            console.log("参数错误")
            this.reqCount = 1;
            break;
            case 1002:
            console.log("广告单元无效")
            this.reqCount = 1;
            break;
            case 1003:
            console.log("内部错误")
            this.reqCount = 1;
            break;
            case 1004:
            console.log("无适合广告")
            this.reqCount = 1;
            break;
            case 1005:
            console.log("广告组件审核中")
            this.reqCount = 1;
            break;
            case 1006:
            console.log("广告组件被驳回")
            this.reqCount = 1;
            break;
            case 1007:
            console.log("广告组件被禁用")
            this.reqCount = 1;
            break;
            case 1008:
            console.log("广告单元已关闭")
            this.reqCount = 1;
            break;
        }
        this.reqCount = 1;
    },

    onRewardeVideoClose(res)
    {
       
        if(res && res.isEnded || res === undefined)
        {
            console.log("播放广告结束");
            if(this.videoPlayComplete == null) return;
            this.videoPlayComplete();
            return;
        }
        console.log("中途退出！");
        if(this.videoPlayFail == null) return;
        this.videoPlayFail();
    },

    createRewardeVideoAd()
    {
        this.rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: 'adunit-842b44e3e7924137' });
    },

    LoadRewardVideoAd(ret_handler = null)
    {
        this.rewardedVideoAd.onLoad(() => {
            this.reqCount = 0;
            console.log('激励视频 广告加载成功');
            if(ret_handler == null) return;
            ret_handler();
          });
    },

    showRewardeVideo()
    {
        this.rewardedVideoAd.show().catch(this._onShowRewardVideoAdError.bind(this));
    },

    _onShowRewardVideoAdError(err)
    {
        console.log("视屏播放错误");
        console.log(err);
        console.log(err.errCode);
        this.showError(err.errCode);
        // if(this.reqCount >= 10)
        // {
        //     if(this.onVideoHandler == null) return;
        //     this.onVideoHandler(); 
        //     return;
        // }
        // this.reqCount ++;
        // this.showRewardeVideo();
    },

    showError(id){
        switch(id){
            case 0:
            console.log("没有合适的广告位")
            this.onVideoHandler(); 
            break;
            case 1000:
            console.log("后端接口调用失败")
            this.onVideoHandler(); 
            break;
            case 1001:
            console.log("参数错误")
            this.onVideoHandler(); 
            break;
            case 1002:
            console.log("广告单元无效")
            this.onVideoHandler(); 
            break;
            case 1003:
            console.log("内部错误")
            this.onVideoHandler(); 
            break;
            case 1004:
            console.log("无适合广告")
            this.onVideoHandler(); 
            break;
            case 1005:
            console.log("广告组件审核中")
            this.onVideoHandler(); 
            break;
            case 1006:
            console.log("广告组件被驳回")
            this.onVideoHandler(); 
            break;
            case 1007:
            console.log("广告组件被禁用")
            this.onVideoHandler(); 
            break;
            case 1008:
            console.log("广告单元已关闭")
            this.onVideoHandler(); 
            break;
        default:
        console.log("未知错误");
          this.onVideoHandler();
        }
    },

}
module.exports = AdManager;