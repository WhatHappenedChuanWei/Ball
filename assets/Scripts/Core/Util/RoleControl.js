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
         m_bIsGravity:true,             //是否开启重力模式
         m_nGravity:30,                 //重力值        
         m_nResistance:10,              //x轴上的阻力值
         m_nAcceleration:30,            //x轴上的加速度
         m_nGround:1,                  //0,：未知状态，-1离开地面，1站在地面
         m_nJump:100,                    //角色跳的速度
         m_nYSpeed:0,                   //角色在Y轴方向上的速度
         m_nYMaxSpeed:10,               //Y轴上的最大速度
         m_nDirX:0,                     //0不移动，1向右移动，-1向做移动
         m_nXSpeed : 0,                 //角色在x轴方向上的速度
         m_nMaxSpeed:10,                //角色在x轴方向上的最大速度       
         m_nCollistionX :0,             //0不碰撞，1向右碰撞，-1向左碰撞
         m_nCollistionY:0,              //0不碰撞，1向下碰撞，-1向上碰撞
         m_dt:0,
    },
    // LIFE-CYCLE CALLBACKS:
     onLoad () {


        var manager = cc.director.getCollisionManager();
        manager.enabled=true;
        manager.enabledDrawBoundingBox=true;

       
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);   
     },
     onKeyDown:function(event)
     {
        switch(event.keyCode)
        {
             case cc.macro.KEY.j:
              this.jump();      
            break;
        }
     },
    start () {

        this.forwardMove();
    },
    move(dirX){
        if(this.m_nGround===-1)
        {
            return;
        }
        this.m_nDirX = dirX;
    },

    forwardMove()
    {
        this.move(1);
    },

    backMove(){
        this.move(-1);
    },

    stopMove(){
        this.move(0);
    },

    jump(){
        if(this.m_nGround===-1)
        {
            return;
        }
        this.move(0);
        this.m_nYSpeed=this.m_nJump;
        this.m_nGround=-1;
    },

    moveX(){
        this.acceleration();
        this.resistance();
    },

    //角色加速
    acceleration(){
        if(this.m_nDirX===1)
        {
            this.m_nXSpeed+=this.m_nAcceleration*this.dt,
            this.m_nXSpeed=this.m_nXSpeed>this.m_nMaxSpeed?this.m_nMaxSpeed:this.m_nXSpeed;
        }
        else if(this.m_nDirX===-1)
        {
            this.m_nXSpeed-=this.m_nAcceleration*this.dt,
            this.m_nXSpeed=this.m_nXSpeed<-this.m_nMaxSpeed?-this.m_nMaxSpeed:this.m_nXSpeed;
        }
    },

    //角色减速
    resistance(){
        if(this.m_nDirX===0)
        {
            if(this.m_nXSpeed>0)
            {
                this.m_nXSpeed-=this.m_nResistannce*this.dt;
                this.m_nXSpeed=this.m_nXSpeed<0?0:this.m_nXSpeed;
            }
            else
            {
                this.m_nXSpeed+=this.m_nResistance*this.dt;
                this.m_nXSpeed=this.m_nXSpeed>0?0:this.m_nXSpeed;
            }
        }
    },

    update (dt) {
        this.dt=dt;
        this.ground();
        this.moveX();
        this.refresh();
    },

    //重力效果
    gravity(){
        this.m_nYSpeed-=(this.dt*this.m_nGravity);
        this.m_nYSpeed=this.m_nYSpeed < -this.m_nYMaxSpeed?-this.m_nYMaxSpeed:this.m_nYSpeed;
    },

    //是否接触地面
    ground()
    {
        if(this.m_nGround===1)
        {
            this.m_nYSpeed = 0;
        }
        else if(this.m_nGround===-1)
        {
            if(this.m_bIsGravity)
            {
               this.gravity();   
            }
        }
    },

    //刷新角色位置信息
    refresh()
    {
      //  this.checkXY();
        this.node.y += this.m_nYSpeed;
        this.node.x += this.m_nXSpeed;
    }, 

    checkXY()
    {
        this.m_nXSpeed=this.m_nCollistionX*this.m_nXSpeed<0?0:this.m_nXSpeed;
        this.m_nYSpeed=this.m_nCollistionY*this.m_nYSpeed<0?0:this.m_nYSpeed;
    },

    onCollisionEnter:function (other, self)  {
        var otherAabb = other.world.aabb;
        var selfAabb = self.world.aabb;
        var otherPreAabb = other.world.preAabb.clone();
        var selfPreAabb = self.world.preAabb.clone();

        //处理x轴上的碰撞
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;
        if(cc.Intersection.rectRect(selfPreAabb,otherPreAabb))
        {       
            if(this.m_nXSpeed>0)
            {
                this.m_nCollistionX=-1;
            }
            else
            {
                this.m_nCollistionX=1;
            }
        }

        //处理Y轴上的碰撞
        otherPreAabb = other.world.preAabb.clone();
        selfPreAabb = self.world.preAabb.clone();
        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;
        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb))
        {
            if(this.m_nYSpeed>0)
            {
                this.m_nCollistionY =-1 ;
            }
            else {
                this.m_nGround=1;   
                this.m_nCollistionY=1;
            }
        }
    },
    onCollisionExit: function (other, self) {
        this.m_nCollistionX=this.m_nCollistionX*this.m_nXSpeed>0?0:this.m_nCollistionX;
        this.m_nCollistionY=this.m_nCollistionY*this.m_nYSpeed>0?0:this.m_nCollistionY;
    }
});
