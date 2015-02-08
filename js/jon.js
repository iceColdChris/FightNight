/**
 * Created by httpnick on 2/07/15.
 */


function Jon(game, spritesheet, playerNumber) {
    this.spritesheet = spritesheet;
    this.animate = null;
    this.jonPunchAnimate = null;
    this.jonKickAnimate = null;
    this.jonWalkAnimate = null;
    this.jonBlockAnimate = null;
    this.jonHoldBlock = null;
    this.jonJumpAnimate = null;
    this.jonFallAnimate = null;
    this.game = game;
    this.ctx = game.ctx;
    this.x = 0;
    this.y = this.game.floorY;
    this.health = 100;
    this.playerNumber = playerNumber;
    this.isPunching = false;
    this.isKicking = false;
    this.walkingRight = false;
    this.walkingLeft = false;
    this.isBlocking = false;
    this.isHoldingBlock = false;
    this.isJumping = false;
    this.isFalling = false;
    this.loadAnims();
    this.jonHealthBar = new HealthBar(this.game, 1599, 0, this.health, 75, 500);
}

Jon.prototype.loadAnims = function() {
    if (this.playerNumber === 1) {
        this.animate = new Animate(this.spritesheet, 3000, 2000, 370, 500, 0.1, 2, true, false);
        this.jonPunchAnimate = new Animate(this.spritesheet, 0, 1995, 370, 480, 0.05, 4, false, false);
        this.jonKickAnimate = new Animate(this.spritesheet, 0, 2480, 370, 500, 0.1, 4, false, false);
        this.jonWalkAnimate = new Animate(this.spritesheet, 3000, 0, 370, 500, 0.1, 4, true, false);
        this.jonBlockAnimate = new Animate(this.spritesheet, 0, 10, 370, 500, 0.1, 3, false, false);
        this.jonHoldBlock = new Animate(this.spritesheet, 740, 10, 370, 500, 0.1, 1, true, false);
        this.jonJumpAnimate = new Animate(this.spritesheet,0, 1485, 370, 490, .2, 3, false, false);
        this.jonFallAnimate = new Animate(this.spritesheet, 740, 1485, 370, 490, .2, 1, true, false);
    } else {
        console.log("Jon doesn't have player2 animations yet.")
    }
}
Jon.prototype.draw = function() {
    this.jonHealthBar.draw();
    if(this.isJumping){
        this.jonJumpAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else if (this.isFalling) {
        this.jonFallAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else if (this.isPunching) {

        var superPunch = Math.floor(Math.random()*11);
        if(superPunch === 0){ // CHECK OUT THE SUPER PUNCH YO
            this.jonPunchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
            //I Plan on testing/adding a superpunch special effect here later
        }
        else{
            this.jonPunchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        }
        // checks to see if the punch loop is over, if so set punching to be false.
        if (this.jonPunchAnimate.isDone()) {
            this.health -= 5;
            this.jonHealthBar.setHealth(this.health);
            this.jonPunchAnimate.elapsedTime = 0;
            this.isPunching = false;
        }
    } else if(this.isKicking) {
        this.jonKickAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        // checks to see if the kick loop is over, if so set kicking to be false.
        if (this.jonKickAnimate.isDone()) {
            this.health -= 5;
            this.jonHealthBar.setHealth(this.health);
            this.jonKickAnimate.elapsedTime = 0;
            this.isKicking = false;
        }
    } else if(this.isBlocking) {
        this.jonBlockAnimate.drawFrame(this.game.clockTick,this.ctx,this.x,this.y);
        if (this.jonBlockAnimate.isDone()) {
            this.isBlocking = false;
        }
    } else if (this.isHoldingBlock) {
        this.jonHoldBlock.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }else if (this.walkingRight || this.walkingLeft) {
        // walk animation (to the right)
        this.jonWalkAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else {
        // default standing animation
        this.animate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
};
/* checks if certain buttons are pushed and sets booleans to true accordingly. */
Jon.prototype.update = function() {
    var canvas = document.getElementById('gameCanvas');
    var canvasWidth = canvas.width;

    if (this.game.f) {
        this.isPunching = true;
    } else if (this.game.g) {
        this.isKicking = true;
    } else if (this.game.q) {
        if (!this.isHoldingBlock) {
            this.isBlocking = true;
        }
        if (this.jonBlockAnimate.isDone() && this.game.q) {
            this.isHoldingBlock = true;
            this.jonBlockAnimate.elapsedTime = 0;
            this.isBlocking = false;
        }
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
        if (this.jonJumpAnimate.isDone()) {
            this.jonJumpAnimate.elapsedTime = 0;
            this.isJumping = false;
            this.isFalling = true;
        }
    } if (this.isFalling) {
        if (this.y >= this.game.floorY) {
            this.isFalling = false;
        } else {
            this.y += 10;
        }
    } if (!this.game.q && this.isHoldingBlock) {
        this.isHoldingBlock = false;
    }

};