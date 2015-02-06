/**
 * Created by httpnick on 1/28/15.
 */


function Nick(game, spritesheet) {
    this.animate = new Animate(spritesheet, 0, 2000, 370, 500, 0.1, 3, true, false);
    this.nickPunchAnimate = new Animate(spritesheet, 3040, 2000, 370, 500, 0.05, 4, false, false);
    this.nickKickAnimate = new Animate(spritesheet, 3040, 2500, 370, 500, 0.1, 4, false, false);
    this.nickWalkAnimate = new Animate(spritesheet, 3000, 0, 370, 500, 0.1, 4, true, false);
    this.nickBlockAnimate = new Animate(spritesheet, 0, 0, 370, 500, 0.1, 3, false, false);
    this.nickJumpAnimate = new Animate(spritesheet,0, 1500, 370, 500, .2, 3, false, false);
    // Jump animation in reverse = fall animation?
    this.nickFallAnimate = new Animate(spritesheet,0, 1500, 370, 500, .2 , 3, false, true);
    this.x = 0;
    this.y = 500;
    this.game = game;
    this.ctx = game.ctx;
    this.removeFromWorld = false;
    this.health = 100;
    this.playerNumber = 1;
    this.direction = 0;
    this.isMoving = false;
    this.isPunching = false;
    this.isKicking = false;
    this.walkingRight = false;
    this.walkingLeft = false;
    this.isBlocking = false;
    this.isJumping = false;
    this.isFalling = false;
    this.nickHealthBar = new HealthBar(this.game, 100, 0, this.health, 75, 500);
}
Nick.prototype.draw = function() {
    this.nickHealthBar.draw();
    if (this.isPunching) {

        var superPunch = Math.floor(Math.random()*11);
        if(superPunch === 0){ // CHECK OUT THE SUPER PUNCH YO
         this.nickPunchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
         //I Plan on testing/adding a superpunch special effect here later
        }
        else{
        this.nickPunchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        }
        // checks to see if the punch loop is over, if so set punching to be false.
        if (this.nickPunchAnimate.isDone()) {
            this.health -= 5;
            this.nickHealthBar.setHealth(this.health);
            this.nickPunchAnimate.elapsedTime = 0;
            this.isPunching = false;
        }
    }else if(this.isJumping){
        this.nickJumpAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
       if (this.nickJumpAnimate.isDone()) {
           this.nickJumpAnimate.elapsedTime = 0;
           this.isJumping = false;
           this.isFalling = true;
       }
    } else if (this.isFalling) {
        this.nickFallAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        if (this.nickFallAnimate.isDone()) {
            this.nickFallAnimate.elapsedTime = 0;
            this.isFalling = false;
        }
    } else if(this.isKicking) {
        this.nickKickAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        // checks to see if the kick loop is over, if so set kicking to be false.
        if (this.nickKickAnimate.isDone()) {
            this.nickKickAnimate.elapsedTime = 0;
            this.isKicking = false;
        }
    } else if(this.isBlocking) {
        console.log("gets here");
        this.nickBlockAnimate.drawFrame(this.game.clockTick,this.ctx,this.x,this.y);
        this.nickBlockAnimate.drawFrame(this.game.clockTick, this.ctx,this.x,this.y);
        if (this.nickBlockAnimate.isDone()) {
            this.nickBlockAnimate.elapsedTime = 0;
            this.isBlocking = false;
        }
    } else if (this.walkingRight || this.walkingLeft) {
        // walk animation (to the right)
        this.nickWalkAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else {
        // default standing animation
        this.animate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
};
    /* checks if certain buttons are pushed and sets booleans to true accordingly. */
Nick.prototype.update = function() {
    var canvas = document.getElementById('gameCanvas');
    var canvasWidth = canvas.width;

    if (this.game.f) {
        this.isPunching = true;
    } else if (this.game.g) {
        this.isKicking = true;
    } else if (this.game.q) {
        this.isBlocking = true;
    } else if (this.game.w && !this.isJumping && !this.isFalling) {
        this.isJumping = true;
    } else if (this.game.d) {
        if(this.x < canvasWidth-370) {//keeps nick from walking off the right of the screen. Could someone add a correct width statement of Nick?
            this.walkingRight = true;
            this.x += 15;
        }
    } else if (this.game.a) {
        if(this.x>0) {//keeps nick from walking out the left of the screen
            this.walkingLeft = true;
            this.x += -15;
        }
    } else if (!this.game.d || !this.game.a) {
        this.walkingRight = false;
        this.walkingLeft = false;
    }

    if (this.isJumping) {
        this.y -= 10;
    } if (this.isFalling) {
        this.y += 10;
    }

};