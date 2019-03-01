// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        this.onCameraXYShort();
    },
    onCameraXYShort()
    {
        var x= this.GameView.PlayerCamera.x;
        var y=GameView.PlayerCamera.y;
        this.squashAction = cc.moveTo(0.1, 100+x, y);
        this.stretchAction = cc.moveTo(0.1, -100+x, y);
        this.squashAction2= cc.moveTo(0.1, x, y);

        this.stretchAction2 = cc.moveTo(0.1, x, 100+y);
        this.stretchAction3 = cc.moveTo(0.1, x, -100+y);
        this.scaleBackAction = cc.moveTo(0.1, x, y);
        var seq = cc.sequence(this.squashAction, this.stretchAction,this.squashAction2,this.stretchAction2,
            this.stretchAction3,this.scaleBackAction, this.squashAction, this.scaleBackAction);     
        this.node.runAction(seq);
    }
    // update (dt) {},
});
