
cc.Class({
    extends: cc.Component,
    properties: {

        cameraSpeed:0,
        m_nYSpeed:0,
        m_nYMaxSpeed:50,
        m_nGravity:50,
        m_nGround:-1,    //1在地面 -1不在地面
        m_nXSpeed:0,
        m_nJump:0,
        // playerName:"",
        // startPosY:null,
        groundY:-600,
        isGameOver:false,
        GameView:null,
        prePlayerType:null, //场景中的角色类型
        curPlayerType:null,//按钮显示的当前玩家类型
        playerIndex:0,
        touchNumber:0,

        invincible:false,//是否无敌
        invincibleTime:2, //无敌时间
        tempInvincibleTime:0,// 临时时间

        absorb:true, //吸收
        absorbTime:3,//时间
        tempAbsorbTime:0,
        ballSprite:null,
    },

    onLoad:function() {

        cc.director.getCollisionManager().enabled = true;
       //  cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);   
        this.ballSprite=cc.find("ball",this.node);
        this.ballAni=this.ballSprite.getComponent(cc.Animation);
    },
    onEnable()
    {
        this.arry=new Array();
        this.arry.push(window.Constant.PlayerType.NormalBall);
        this.arry.push(window.Constant.PlayerType.SteelBall);
        this.curPlayerType=this.arry[this.playerIndex];
        this.collisionY=0;              //0 有重力 -1 无重力
        this.collisionX=0;              //1 被阻挡了 0无阻挡
        this.prePos=this.node.x;
        this.isGameOver=false;
    },
    ///由GameView调用控制  初始化角色数据默认值
    init(GameView)
    {
        this.GameView=GameView;   
            ///前一次的临界点    
        this.playerIndex=0;
        this.curPlayerType=window.Constant.PlayerType.NormalBall;      
        this.OnPlayerDataChange(this.curPlayerType);
        this.addListerner();
    },

    GetRandomChangePlayerType()
    {     
       if(this.isGameOver)
          return; 
       this.OnPlayerDataChange(this.curPlayerType);
    },
    OnPlayerDataChange:function(playerType)
    {
        this.curPlayerType=playerType;
        var playerVoData=window.data.PlayerData.GetPlayerData(playerType);
        this.ChangePlayerData(playerVoData);
        this.ChangeShow(this.playerName);
        this.prePlayerType=this.curPlayerType;     
        //获取下一个玩家信息
        this.GetRandomPlayerData();
    }, 

    onKeyDown:function(event)
    {
       switch(event.keyCode)
       {      
            case cc.macro.KEY.j:
              this.jump();   
           break;
           case cc.macro.KEY.f:
             this.GetRandomChangePlayerType();              
           break;
           case cc.macro.KEY.r:
            this.Restart();
            break;
       }
    },
    onKeyUp:function(event)
    {

    },
    onCollisionEnter:function(other, self)
    {     
        
        //限制Y轴  
        if(other.tag==10)
        {     
            this.touchNumber++;
            this.collisionY = -1;
            this.m_nYSpeed=0;
            this.canJumpCount=0;
            var otherAabb = other.world.aabb;
            var selfAabb = self.world.aabb;
            var otherPreAabb = other.world.preAabb.clone();
            var selfPreAabb = self.world.preAabb.clone();
            //处理Y轴上的碰撞
            selfPreAabb.y = selfAabb.y;
            otherPreAabb.y = otherAabb.y;
            if(cc.Intersection.rectRect(selfPreAabb,otherPreAabb))
            {
                if(selfPreAabb.y<otherPreAabb.y)
                {
                    this.collisionY=0;
                    this.canJumpCount=3; 
                }else
                {
                    this.m_nGround = 1;                   
                }
                      
                var intersection=new cc.Rect();
                selfPreAabb.intersection(intersection, otherPreAabb);
                this.node.y+=intersection.height;   
                return;
            }
        }
        //限制X轴
        if(other.tag==15)
        {

            var otherAabb = other.world.aabb;
            var selfAabb = self.world.aabb;
            var otherPreAabb = other.world.preAabb.clone();
            var selfPreAabb = self.world.preAabb.clone();
                  //处理X轴上的碰撞
            selfPreAabb.x = selfAabb.x;
            otherPreAabb.x = otherAabb.x;
          //  this.collisionX=1;
            if(cc.Intersection.rectRect(selfPreAabb,otherPreAabb))
            {
              //  this.m_nGround = 1;             
                var intersection=new cc.Rect();
                this.collisionX=1;
                selfPreAabb.intersection(intersection, otherPreAabb);      
                this.node.x-=intersection.width;     
            }
        }
        if(other.tag==50)
        {
            this.PlayerDie("撞到边界线死亡");
        }
    },
    onCollisionExit: function (other) {

        if(other.tag==10)
        {
            this.touchNumber--;
            {
                if(this.touchNumber==0)
                {
                    this.collisionY = 0;     
                }
            }          
        } 
        if(other.tag==15)
        {
            this.collisionX=0;            
        }
      
    },
    update:function(dt) {

        if(this.GameView==null)
           return;
        this.dt=dt;
        this.gravityUp();
        this.refresh();
        if(this.invincible)
        {
           this.Invincible();
        }
        // if(this.absorb)
        // {
        //     this.Absorb();
        // }
    },
    lateUpdate()
    {
        if(this.GameView==null)
           return;
        if(this.cameraSpeed==0)
           return;
        if(this.isGameOver) 
          return;  
       this.GameView.PlayerCamera.x+=this.cameraSpeed;
       this.GetPlayerDistance();   
    },
    //更换玩家数据
    ChangePlayerData(mData)
    {
        //重玩的速度
      //  this.Speed=mData.speed;
        this.m_nXSpeed=mData.speed;
        this.m_nJump=mData.jump;
        this.m_nYMaxSpeed=mData.maxYSpeed;
        this.m_nGravity=mData.gravity;
        this.playerName=mData.path;       //图集路径
        this.cameraSpeed=mData.speed;
    },
    // 换图片
    ChangeShow:function(name)
    {
        var path=name;
        var spriteObj=this.ballSprite.getComponent(cc.Sprite);
        window.ResourceManager.LoadSpriteFrameByName(spriteObj,path);
        if(this.curPlayerType==window.Constant.PlayerType.NormalBall)
        {
            this.ballAni.play();
        }else
        {
            this.ballAni.stop();
        }
      
    },
    //玩家碰到障碍物
    PlayerDie:function(msg)
    {

        this.collisionY=-1;   
        this.m_nYSpeed=0;
        this.m_nXSpeed=0;  
        this.m_nGround=1;
        this.canJumpCount=0;
        console.log(msg);
        this.isGameOver=true;     
      //  this.showRestarBG();   //点击播放视频 调用
        //this.gameOver();       //震动效果完了执行
        this.onVibrateShort();
        this.onCameraXYShort();
    },
    showRestarBG()
    {
        this.GameView.RestarBG.active=true;
    },
    hideRestarBG()
    {
        this.GameView.RestarBG.active=false;
    },
    Restart()
    {  
        this.invincible=true;
        this.hideRestarBG();   
        this.collisionY=0;
        this.isGameOver=false;
        this.node.y=400;
        this.m_nXSpeed= this.Speed;   
        this.node.x=this.GameView.PlayerCamera.x;
       // this.node.getComponent(cc.Animation).play();
    },
    gameOver()
    {
      //  this.hideRestarBG();
        window.EventBus.pos(window.Constant.EventTypeID.OnGameOver); 
    },
    //重力效果
    gravityUp()
    {
        if(this.collisionY!=0)
         return;
        this.m_nYSpeed-=(this.dt*this.m_nGravity);
        this.m_nYSpeed=this.m_nYSpeed < -this.m_nYMaxSpeed?-this.m_nYMaxSpeed:this.m_nYSpeed;
    },
    refresh()
    {   

        if(this.isGameOver)
           return;     
        this.node.y += this.m_nYSpeed;
        this.checkAndMoveX();
        if(this.node.y<this.groundY)
        {
            this.collisionY=-1;   
            this.m_nYSpeed=0;
            this.m_nXSpeed=0;              
            this.PlayerDie("掉入深渊死亡发送");
                 
        }
    }, 

    checkAndMoveX()
    {
       
        if(this.collisionX==1)
          return; 

        if(this.node.x<this.GameView.PlayerCamera.x&&this.node.x!=this.GameView.PlayerCamera.x)
        {
             this.node.x+=this.m_nXSpeed+3;
        }else
        {    
            this.node.x += this.m_nXSpeed;
        }
    },
    checkAndMoveY()
    {

    },
    jump()
    {
        if(this.m_nGround==-1&&this.canJumpCount>2)
        {
            return;
        }
        this.jumpAction();
        window.data.YMData.GetItemFromPool(this.GameView.node,this.node.position);
        window.AudioController.playSXF(window.Constant.GameClip.jump);
        this.m_nYSpeed=this.m_nJump;
        this.m_nGround=-1;
        this.canJumpCount++;
    },
    ///每一千米 增加一次分数
    GetPlayerDistance()
    {
        if((this.node.x-this.prePos)/100>10)
        {
            this.prePos=this.node.x;
            window.data.GameRunData.SetSorce(1);
        }
    },
    //按顺序来吧
    GetRandomPlayerData()
    {         
        this.playerIndex++;
        this.playerIndex%=this.arry.length; 
        this.curPlayerType=this.arry[this.playerIndex];
    },


    addListerner()
    {
        this.JumpEvent= this.GameView.jumpBtn.on(cc.Node.EventType.TOUCH_END,this.jump.bind(this));
        this.ChangeBtnEvent=this.GameView.ChangeBtn.on(cc.Node.EventType.TOUCH_END,this.GetRandomChangePlayerType.bind(this));
        this.reStarEvent= this.GameView.restarBtn.on(cc.Node.EventType.TOUCH_END,this.Restart.bind(this));
        this.gameOverEvent= this.GameView.gameOverBtn.on(cc.Node.EventType.TOUCH_END,this.gameOver.bind(this));
    },
    removeListener()
    {
        this.GameView.jumpBtn.off(cc.Node.EventType.TOUCH_END,this.JumpEvent);
        this.GameView.ChangeBtn.off(cc.Node.EventType.TOUCH_END,this.ChangeBtnEvent);
        this.GameView.restarBtn.off(cc.Node.EventType.TOUCH_END,this.reStarEvent);
        this.GameView.gameOverBtn.off(cc.Node.EventType.TOUCH_END,this.gameOverEvent);
    },
    onDisable()
    {
       this.removeListener();
    },
    Invincible()
    {
        this.tempInvincibleTime+=this.dt;
        if(this.tempInvincibleTime>this.invincibleTime)
        {
            this.tempInvincibleTime=0;
            this.invincible=false;
           // this.node.getComponent(cc.Animation).stop();
            this.node.color=cc.Color.WHITE;
        }    
    },
    Absorb()
    {
        // this.tempAbsorbTime+=this.dt;
        // if(this.tempAbsorbTime>this.tempAbsorbTime)
        // {
        //     this.tempAbsorbTime=0;
        //     this.absorb=false;
        // }

    },
    jumpAction()
    {
        
        if(this.prePlayerType==window.Constant.PlayerType.SteelBall) //钢球不做处理
           return; 
        this.squashAction = cc.scaleTo(0.2, 1, 0.6);
        this.stretchAction = cc.scaleTo(0.2, 1, 1.2);
        this.scaleBackAction = cc.scaleTo(0.1, 1, 1);
        var seq = cc.sequence(this.squashAction, this.stretchAction,
            this.scaleBackAction, this.squashAction, this.scaleBackAction);     
        this.node.runAction(seq);
    },
    //震动效果
    onVibrateShort() {
        
        //区分设备
       if(!cc.sys.isMobile)
       {                  
            return;
       }
        wx.vibrateLong(
          {
              //震动效果执行完毕 执行
            complete()
            {
                this.gameOver();
            }
          })
    },
    onCameraXYShort()
    {
        var x= this.GameView.PlayerCamera.x;
        var y= this.GameView.PlayerCamera.y;
        this.squashAction = cc.moveTo(0.1, 50+x, y);
        this.stretchAction = cc.moveTo(0.1, -50+x, y);

        this.scaleBackAction = cc.moveTo(0.1, x, y);
        var seq = cc.sequence(this.squashAction, this.stretchAction,this.squashAction2,this.scaleBackAction, this.squashAction, 
            this.scaleBackAction,cc.callFunc(function()
            {
                this.gameOver();                
            }.bind(this)));     
        this.GameView.PlayerCamera.runAction(seq);
    }
});
