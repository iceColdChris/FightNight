/**
 * Created by httpnick on 2/11/15.
 */
function Character(game, spritesheet, playerNumber,assets,name) {
    this.spritesheet = spritesheet;
    this.animate = null;
    this.PunchAnimate = null;
    this.KickAnimate = null;
    this.WalkAnimate = null;
    this.BlockAnimate = null;
    this.HoldBlock = null;
    this.JumpAnimate = null;
    this.FallAnimate = null;
    this.opponent = null;
    this.EmoteAnimate = null;
    this.CrouchAnimate = null;
    this.HoldCrouchAnimate = null;
    this.game = game;
    this.name = name;
    this.ctx = game.ctx;
    this.assets = assets;
    this.health = 100;
    this.playerNumber = playerNumber;
    if (this.playerNumber === 1) {
        this.x = 0;
    } else {
        this.x = 1000;
    }
    this.y = this.game.floorY;
    this.isPunching = false;
    this.isKicking = false;
    this.walkingRight = false;
    this.walkingLeft = false;
    this.isBlocking = false;
    this.isHoldingBlock = false;
    this.isJumping = false;
    this.isThrowing = false;
    this.isFalling = false;
    this.isEmoting = false;
    this.isCrouching = false;
    this.isHoldingCrouch = false;
    this.canvas = document.getElementById('gameCanvas');
    this.canvasWidth = this.canvas.width;
    this.HealthBar = null;
    if (this.playerNumber === 1) {
        this.HealthBar = new HealthBar(this.game, 100, 0, this.health, 75, 500);
    } else {
        this.HealthBar = new HealthBar(this.game, 1599, 0, this.health, 75, 500);
    }

    this.delta = null;
    this.diff = null;
    this.damage = null;




    //Sound Objects
    this.playPunchSound = false;
    this.playKickSound = false;
    this.playGetPunchedSound = false;
    this.playGetKickedSound = false;
    this.playJumpSound = false;
    this.playVictorySound = false;

}

Character.prototype.setOpponent = function(opponent) {
    this.opponent = opponent;

    this.delta = 370/2;

    if(this.opponent.name === "DrChinn" || this.opponent.name === "DrTolentino" )
        this.damage = 2;
    else
        this.damage = .60;
};

Character.prototype.draw = function() {
    this.HealthBar.draw();
    if(this.isJumping){
        this.JumpAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else if (this.isFalling) {
        this.FallAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else if (this.isCrouching) {
        this.CrouchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        if (this.CrouchAnimate.isDone()) {
            this.isCrouching = false;
        }
    } else if (this.isHoldingCrouch) {
        this.HoldCrouchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else if (this.isEmoting) {
        this.EmoteAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        this.playVictory();
        if (this.EmoteAnimate.isDone()) {
            this.EmoteAnimate.elapsedTime = 0;
            this.isEmoting = false;
        }
    } else if (this.isPunching) {
        this.PunchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        if(this.playPunchSound === false){
            this.playPunch();
            this.playPunchSound = true;
        }
        // checks to see if the punch loop is over, if so set punching to be false.
        if (this.PunchAnimate.isDone()) {
                // this.health -= 5;
            this.HealthBar.setHealth(this.health);
            this.PunchAnimate.elapsedTime = 0;
            this.isPunching = false;
            this.playPunchSound = false;
        }
    } else if(this.isKicking) {
        this.KickAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        if(this.playKickSound === false){
            this.playKick();
            this.playKickSound = true;
        }
        // checks to see if the kick loop is over, if so set kicking to be false.
        if (this.KickAnimate.isDone()) {
            if (this.isThrowing) {
                this.throwBook();
                this.isThrowing = false;
            } else {
                // this.health -= 5;
                this.HealthBar.setHealth(this.health);
            }
            this.KickAnimate.elapsedTime = 0;
            this.isKicking = false;
            this.playKickSound = false;
        }
    } else if(this.isBlocking) {
        this.BlockAnimate.drawFrame(this.game.clockTick,this.ctx,this.x,this.y);
        if (this.BlockAnimate.isDone()) {
            this.isBlocking = false;
        }
    } else if (this.isHoldingBlock) {
        this.HoldBlock.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }else if (this.walkingRight || this.walkingLeft) {
        // walk animation (to the right)
        this.WalkAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else {
        // default standing animation
        this.animate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
};

Character.prototype.update = function() {

    //Inserted just so I can try pushing again
    if (this.playerNumber === 1) {
        this.updatePlayerOne();
    } else {
        this.updatePlayerTwo();
    }

    if (this.isJumping) {
        this.y -= 20;
        if(this.playJumpSound === false){
            this.playJump();
            this.playJumpSound = true;
        }
        if (this.JumpAnimate.isDone()) {
            this.JumpAnimate.elapsedTime = 0;
            this.isJumping = false;
            this.isFalling = true;
            this.playJumpSound = false;
        }
    } if (this.isFalling) {
        if (this.y >= this.game.floorY) {
            this.isFalling = false;
        } else {
            this.y += 20;
        }
    }

};

Character.prototype.updatePlayerOne = function() {
    if (this.game.w && !this.isJumping && !this.isFalling) {
        this.isJumping = true;
    }  else if (this.game.s) {
        if (!this.isHoldingCrouch) {
            this.isCrouching = true;
        }
        if (this.CrouchAnimate.isDone() && this.game.s) {
            this.isHoldingCrouch = true;
            this.CrouchAnimate.elapsedTime = 0;
            this.isCrouching = false;
        }
    } else if (this.game.f) {
        this.isPunching = true;
        this.opponent.checkHit();
    } else if (this.game.g) {
        if (this.name === "DrChinn") {
            this.isThrowing = true;
        }
        this.isKicking = true;
        this.opponent.checkHit();
    } else if (this.game.q) {
        if (!this.isHoldingBlock) {
            this.isBlocking = true;
        }
        if (this.BlockAnimate.isDone() && this.game.q) {
            this.isHoldingBlock = true;
            this.BlockAnimate.elapsedTime = 0;
            this.isBlocking = false;
        }
    }  else if (this.game.e) {
        this.isEmoting = true;
    } else if (this.game.d) {
        if(this.x < this.canvasWidth-370) {//keeps jon from walking off the right of the screen. Could someone add a correct width statement of Nick?
            this.walkingRight = true;
            this.x += 15;
        }
    } else if (this.game.a) {
        if(this.x>0) {//keeps jon from walking out the left of the screen
            this.walkingLeft = true;
            this.x += -15;
        }
    } else if (!this.game.d || !this.game.a) {
        this.walkingRight = false;
        this.walkingLeft = false;
    }
    if (!this.game.q && this.isHoldingBlock) {
        this.isHoldingBlock = false;
    }

    if (!this.game.s && this.isHoldingCrouch) {
        this.isHoldingCrouch = false;
    }
};

Character.prototype.updatePlayerTwo = function(){
    if (this.game.up && !this.isJumping && !this.isFalling) {
        this.isJumping = true;
    } else if (this.game.down) {
        if (!this.isHoldingCrouch) {
            this.isCrouching = true;
        }
        if (this.CrouchAnimate.isDone() && this.game.down) {
            this.isHoldingCrouch = true;
            this.CrouchAnimate.elapsedTime = 0;
            this.isCrouching = false;
        }
    } else if (this.game.comma) {
        if (!this.isHoldingBlock) {
            this.isBlocking = true;
        }
        if (this.BlockAnimate.isDone() && this.game.comma) {
            this.isHoldingBlock = true;
            this.BlockAnimate.elapsedTime = 0;
            this.isBlocking = false;
        }
    } else if (this.game.period) {
        this.isPunching = true;
        this.opponent.checkHit();
    } else if (this.game.fSlash) {
        if (this.name === "DrChinn") {
            this.isThrowing = true;
        }
        this.isKicking = true;
        this.opponent.checkHit();
    } else if (this.game.rShift) {
        this.isEmoting = true;
    } else if (this.game.right) {
        if(this.x < this.canvasWidth-370) {
            this.walkingRight = true;
            this.x += 15;
        }
    } else if (this.game.left) {
        if(this.x>0) {
            this.walkingLeft = true;
            this.x += -15;
        }
    } else if (!this.game.left || !this.game.right) {
        this.walkingRight = false;
        this.walkingLeft = false;
    }

    if (!this.game.comma && this.isHoldingBlock) {
        this.isHoldingBlock = false;
    }
    if (!this.game.down && this.isHoldingCrouch) {
        this.isHoldingCrouch = false;
    }
};

Character.prototype.playPunch = function(){

    if(this.name === "Jon"){
        var snd = this.assets.getAsset("./sound/JonSound/JonPunch.mp3");
        snd.play();
    }else if(this.name === "Nick"){
        var snd = this.assets.getAsset("./sound/NickSound/NickPunch.mp3");
        snd.play();
    }else if(this.name === "Chris"){
        var snd = this.assets.getAsset("./sound/ChrisSound/ChrisPunch.mp3");
        snd.play();
    }else if (this.name === "Matt"){
        var snd = this.assets.getAsset("./sound/MattSound/MattPunch.mp3");
        snd.play();
    }

}

Character.prototype.playVictory = function(){


    if(this.name === "Jon"){
        var snd = this.assets.getAsset("./sound/JonSound/JonVictory.mp3");
        snd.play();
    }else if(this.name === "Nick"){
        var snd = this.assets.getAsset("./sound/NickSound/NickVictory.mp3");
        snd.play();
    }else if(this.name === "Chris"){
        var snd = this.assets.getAsset("./sound/ChrisSound/ChrisVictory.mp3");
        snd.play();
    }else if (this.name === "Matt"){
        var snd = this.assets.getAsset("./sound/MattSound/MattVictory.mp3");
        snd.play();
    }

}


Character.prototype.playJump = function(){

    if(this.name === "Jon"){
        var snd = this.assets.getAsset("./sound/JonSound/JonJumping.mp3");
        snd.play();
    }else if(this.name === "Nick"){
        var snd = this.assets.getAsset("./sound/NickSound/NickJumping.mp3");
        snd.play();
    }else if(this.name === "Chris"){
        var snd = this.assets.getAsset("./sound/ChrisSound/ChrisJumping.mp3");
        snd.play();
    }else if (this.name === "Matt"){
        var snd = this.assets.getAsset("./sound/MattSound/MattJumping.mp3");
        snd.play();
    }


}

Character.prototype.playKick = function(){

    if(this.name === "Jon"){
        var snd = this.assets.getAsset("./sound/JonSound/JonKick.mp3");
        snd.play();
    }else if(this.name === "Nick"){
        var snd = this.assets.getAsset("./sound/NickSound/NickKick.mp3");
        snd.play();
    }else if(this.name === "Chris"){
        var snd = this.assets.getAsset("./sound/ChrisSound/ChrisKick.mp3");
        snd.play();
    }else if (this.name === "Matt"){
        var snd = this.assets.getAsset("./sound/MattSound/MattKick.mp3");
        snd.play();
    }


}


Character.prototype.playGettingPunched = function(){

    if(this.name === "Jon"){
        var snd = this.assets.getAsset("./sound/JonSound/JonGettingPunched.mp3");
        snd.play();
    }else if(this.name === "Nick"){
        var snd = this.assets.getAsset("./sound/NickSound/NickGettingPunched.mp3");
        snd.play();
    }else if(this.name === "Chris"){
        var snd = this.assets.getAsset("./sound/ChrisSound/ChrisGettingPunched.mp3");
        snd.play();
    }else if (this.name === "Matt"){
        var snd = this.assets.getAsset("./sound/MattSound/MattPunched.mp3");
        snd.play();
    }


}
Character.prototype.playGettingPunched = function(){

    if(this.name === "Jon"){
        var snd = this.assets.getAsset("./sound/JonSound/JonGettingKicked.mp3");
        snd.play();
    }else if(this.name === "Nick"){
        var snd = this.assets.getAsset("./sound/NickSound/NickGettingKicked.mp3");
        snd.play();
    }else if(this.name === "Chris"){
        var snd = this.assets.getAsset("./sound/ChrisSound/ChrisGettingKicked.mp3");
        snd.play();
    }else if (this.name === "Matt"){
        var snd = this.assets.getAsset("./sound/MattSound/MattGettingKicked.mp3");
        snd.play();
    }


}

Character.prototype.checkHit = function(){

    this.diff = Math.max(this.x,this.opponent.x)-Math.min(this.x,this.opponent.x);
    if(this.diff <= this.delta){
        if(this.isMyOpponentReallyHittingMe()){
            if(!this.amIhittable()){
                //chek if I'm close enough to be hit
                this.health -= this.damage;
                this.HealthBar.setHealth(this.health);


                if(this.health<=0){
                    this.game.endGame();
                }
            }
        }
    }
}

Character.prototype.isMyOpponentReallyHittingMe = function(){

    if(this.opponent.isBlocking)
        return false;
    else if(this.opponent.isCrouching)
        return false;
    else if(this.opponent.isHoldingBlock)
        return false;
    else if(this.opponent.isHoldingCrouch)
        return false;
    else if(this.opponent.isJumping)
        return false;
    else if(this.opponent.isFalling)
        return false;
    else
        return true;


}

Character.prototype.amIhittable = function(){

    if(this.isBlocking)
        return true;
    else if(this.isCrouching)
        return true;
    else if(this.isHoldingBlock)
        return true;
    else if(this.isHoldingCrouch)
        return true;
    else if(this.isJumping)
        return true;
    else if(this.isFalling)
        return true;
   else
    return false;


}