/**
 * 界面基类
 */

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {},

    start () {

    },

    onEnable(){

    },

    onDestroy(){},

 
    createScrollList(tagListNode,itemPrefabe,count)
    {
        if(null == tagListNode)
        {
            console.log("tagListNode is null");
            return;
        }
        if(null == itemPrefabe)
        {
            console.log("itemPrefabe is null");
            return;
        }
        var tagChildCount = tagListNode.children.length;

        if(tagChildCount > count) 
        {
            this.clearMoreItem(tagListNode,tagChildCount,count);
            return;
        }
        for(var i = tagChildCount;i<count;i++)
        {
            var tmpObj = cc.instantiate(itemPrefabe);
            tmpObj.active = true;
            tagListNode.addChild(tmpObj);
        }
    },

    clearMoreItem(tagListNode,tagChildCount,count)
    {
        var tagChild = tagListNode.children;

        for(var i = tagChildCount-1;i>=count;i--)
        {
            tagChild[i].destroy();
        }
    },

    clearScrollList(tagListNode)
    {
        var tagChild = tagListNode.children;
        for(var i=0;i<tagChild.length;i++)
        {
            tagChild[i].destroy();
        }
    },

    removeScrollItemByIndex(tagListNode,index)
    {
        var tagChild = tagListNode.children;
        tagChild[index].destroy();
    },

    show()
    {
        this.node.active = true;
    },

    hide()
    {
        this.node.active = false;
    },


    //update (dt) {},

});
