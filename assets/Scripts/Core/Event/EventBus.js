var dictionary = require("dictionary");

var EventBus = function(){

};

EventBus.m_eventDic = new dictionary();

EventBus.addListener = function(mkey,mListenerHandler){
    var mHandler = [];
    if(EventBus.m_eventDic.containKey(mkey))
    {
        mHandler = EventBus.m_eventDic.get(mkey);
        mHandler.push(mListenerHandler);
        return;
    }
    mHandler.push(mListenerHandler);
    EventBus.m_eventDic.add(mkey,mHandler);
},

EventBus.removeListener = function(mkey){

    EventBus.m_eventDic.remove(mkey);
},

EventBus.pos =function(mkey,value = null){
    if(!EventBus.m_eventDic.containKey(mkey))
    {
        console.log("EventBus---Key:" + mkey + " is not exist");
        return;
    }
    var mHandler = EventBus.m_eventDic.get(mkey);
    for(var i=0;i<mHandler.length;i++)
    {
        if(value == null)
            mHandler[i]();
        else
            mHandler[i](value);
    }
},

module.exports = EventBus;




