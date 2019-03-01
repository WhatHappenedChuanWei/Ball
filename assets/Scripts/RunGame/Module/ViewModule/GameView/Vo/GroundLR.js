
cc.Class({
    extends: cc.Component,

    start () {

        this.jumpHeight=200;
        this.jumpAction=this.moveY();

        this.node.runAction(this.jumpAction);
   },

   moveY()
   {
       var jumpUp = cc.moveBy(1, cc.v2(this.jumpHeight,0)).easing(cc.easeCubicActionOut());
       var jumpDown = cc.moveBy(1, cc.v2(-this.jumpHeight,0)).easing(cc.easeCubicActionIn());
       return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
   }
});
