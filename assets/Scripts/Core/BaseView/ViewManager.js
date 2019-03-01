var List = require("List");

var ViewManager = function()
{
    
};

ViewManager.m_viewList = new List();

ViewManager.addView = function(view)
{
    this.m_viewList.add(view);
    this.setViewHierarchy(view);
}

ViewManager.hideLastView = function()
{
    var count = this.m_viewList.count;
    var viewName = this.m_viewList.get(count-1);
    this.hideViewByName(viewName);
},

ViewManager.hideViewByName = function(viewName)
{
    if(!this.CheckViewByName(viewName)) return;
    window.UIManager.hideWindow(viewName);
    this.removeView(viewName);
},

ViewManager.getIndexViewByName = function(viewName)
{
   return window.UIManager.m_windDic.get(viewName).getSiblingIndex();
},

ViewManager.CheckViewByName = function(view)
{
    if(ViewManager.m_viewList.checkValue(view))
    {
        return true;
    }
    return false;
},

ViewManager.removeView = function(view)
{
    this.m_viewList.remove(view);
}

//设置界面同级父物体下的层级关系
ViewManager.setViewHierarchy = function(mName)
{
    var index = this.m_viewList.count - 1;

    if(!window.UIManager.m_windDic.containKey(mName)) return;
    window.UIManager.m_windDic.get(mName).setSiblingIndex(index);
}


ViewManager.clear = function()
{
    this.m_viewList.clear();
}

module.exports = ViewManager;
