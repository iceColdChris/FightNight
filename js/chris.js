/**
 * Created by httpnick on 1/28/15.
 */
function Chris(game, spritesheet, playerNumber) {
    this.spritesheet = spritesheet;
    this.animate = null;
    this.chrisWalkAnimate = null;
    this.chrisPunchAnimate = null;
    this.chrisKickAnimate = null;
    this.chrisJumpAnimate = null;
    this.chrisFallAnimate = null;
    this.chrisBlockAnimate = null;
    this.chrisBlockHold = null;
    this.playerNumber = playerNumber;
    this.game = game;
    this.ctx = game.ctx;
    this.isBlocking = false;
    this.isHoldingBlock = false;
    this.isPunching = false;
    this.isKicking = false;
    this.walkingRight = false;
    this.walkingLeft = false;
    this.isJumping = false;
    this.isFalling = false;
    this.health = 100;
    this.x = 1000;
    this.y = this.game.floorY;
    this.loadAnims();
    this.chrisHealthBar = new HealthBar(this.game, 100, 0, this.health, 75, 500);
}
Chris.prototype.loadAnims = function() {
    if (this.playerNumber === 1) {
        console.log("Chris doesn't have player 1 animations.")
    } else {
        this.animate = new Animate(this.spritesheet, 3370, 1000, 370, 500, 0.1, 3, true, true);
        this.chrisWalkAnimate = new Animate(this.spritesheet, 0, 3000, 370, 500, 0.1, 4, true, true);
        this.chrisPunchAnimate = new Animate(this.spritesheet, 1855, 2002, 368, 460, 0.08, 3, false, true);
        this.chrisKickAnimate = new Animate(this.spritesheet, 1800, 2500, 370, 500, 0.1, 3, false, true);
        this.chrisJumpAnimate = new Animate(this.spritesheet, 1800, 1500, 370, 500, 0.2, 3, false, true);
        this.chrisFallAnimate = new Animate(this.spritesheet, 1800, 1500, 370, 500, 0.2, 1, true, false);
        this.chrisBlockAnimate = new Animate(this.spritesheet, 1800, 0, 370, 500, 0.1, 3, false, true);
        this.chrisBlockHold = new Animate(this.spritesheet, 1800, 0, 370, 500, 0.1, 1, true, false);
    }
}
Chris.prototype.draw = function() {
    this.chrisHealthBar.draw();
    if(this.isJumping){
        this.chrisJumpAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else if (this.isFalling) {
        this.chrisFallAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else if (this.isPunching) {
        this.chrisPunchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        // checks to see if the punch loop is over, if so set punching to be false.
        if (this.chrisPunchAnimate.isDone()) {
            this.health -= 5;
            this.chrisHealthBar.setHealth(this.health);
            this.chrisPunchAnimate.elapsedTime = 0;
            this.isPunching = false;
        }
    } else if (this.isBlocking) {
        this.chrisBlockAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        if (this.chrisBlockAnimate.isDone()) {
            this.isBlocking = false;
        }
    } else if (this.isHoldingBlock) {
        this.chrisBlockHold.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }else if(this.isKicking) {
        this.chrisKickAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        // checks to see if the kick loop is over, if so set kicking to be false.
        if (this.chrisKickAnimate.isDone()) {
            this.health -= 5;
            this.chrisHealthBar.setHealth(this.health);
            this.chrisKickAnimate.elapsedTime = 0;
            this.isKicking = false;
        }
    }else if (this.walkingRight || this.walkingLeft) {
        // walk animation (to the right)
        this.chrisWalkAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else {
        // default standing animation
        this.animate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
}
/* checks if certain buttons are pushed and sets booleans to true accordingly. */
Chris.prototype.update = function() {
    var canvas = document.getElementById('gameCanvas');
    var canvasWidth = canvas.width;

    if (this.game.up && !this.isJumping && !this.isFalling) {
        this.isJumping = true;
    } else if (this.game.comma) {
        if (!this.isHoldingBlock) {
            this.isBlocking = true;
        }
        if (this.chrisBlockAnimate.isDone() && this.game.comma) {
            this.isHoldingBlock = true;
            this.chrisBlockAnimate.elapsedTime = 0;
            this.isBlocking = false;
        }
    } else if (this.game.period) {
        this.isPunching = true;
    } else if (this.game.fSlash) {
        this.isKicking = true;
    } else if (this.game.right) {
        if(this.x < canvasWidth-370) {
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

    if (this.isJumping) {
        this.y -= 10;
        if (this.chrisJumpAnimate.isDone()) {
            this.chrisJumpAnimate.elapsedTime = 0;
            this.isJumping = false;
            this.isFalling = true;
        }
    } if (this.isFalling) {
        if (this.y >= this.game.floorY) {
            this.isFalling = false;
        } else {
            this.y += 10;
        }
    } if (!this.game.comma && this.isHoldingBlock) {
        this.isHoldingBlock = false;
    }
}