
var TestCfg = new Object();
TestCfg.m_dataList=null,
TestCfg.m_sPath="",

TestCfg.init = function(target){

        TestCfg.m_dataList =new window.List();
        TestCfg.m_sPath ="TestCfg";

        window.cc.loader.loadRes(TestCfg.m_sPath,(function(err,array){
            if(err)
            {
                console.log("错误信息:" + err);
                return;
            }
            let jsonArry=array.json;
            for(var i = 0;i < jsonArry.length;i++)
            {
                var mData = jsonArry[i];
                var mVoData = TestCfgVoData;
                mVoData.setValue(mData);
                TestCfg.m_dataList.add(mVoData);
            }
            target.node.emit("getTestCfg",{});
        }).bind(this));
    },

    TestCfg.getTestCfgData = function(){
        return this.m_dataList;
    },

module.exports = TestCfg;


function TestCfgVoData(){
   this. m_nId;
    this.m_sName;
};
TestCfgVoData.prototype.setValue = function(mData){
    this.m_nId = mData.id;
    this.m_sName = mData.name;
};





