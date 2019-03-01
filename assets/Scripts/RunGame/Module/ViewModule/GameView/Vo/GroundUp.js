
cc.Class({
    extends: cc.Component,

    properties: {

    },

    start () {

         this.jumpHeight=200;
         this.jumpAction=this.moveY();

         this.node.runAction(this.jumpAction);
    },

    moveY()
    {
        var jumpUp = cc.moveBy(0.4, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(0.4, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    }

});
