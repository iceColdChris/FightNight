/**
 * Created by httpnick on 1/28/15.
 */
function Nick(game, spritesheet) {
    this.animate = new Animate(spritesheet, 0, 2000, 370, 500, 0.1, 3, true, false);
    this.nickPunchAnimate = new Animate(spritesheet, 3040, 2000, 370, 500, 0.1, 4, false, false);
    this.nickKickAnimate = new Animate(spritesheet, 3040, 2500, 370, 500, 0.1, 4, false, false);
    this.nickWalkAnimate = new Animate(spritesheet, 3000, 0, 370, 500, 0.1, 4, true, false, false);
    this.x = 0;
    this.y = 500;
    this.game = game;
    this.ctx = game.ctx;
    this.removeFromWorld = false;
    this.direction = 0;
    this.isMoving = false;
    this.isPunching = false;
    this.isKicking = false;
    this.walkingRight = false;
    this.walkingLeft = false;
}
Nick.prototype.draw = function() {
    if (this.isPunching) {
        this.nickPunchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        // checks to see if the punch loop is over, if so set punching to be false.
        if (this.nickPunchAnimate.isDone()) {
            this.nickPunchAnimate.elapsedTime = 0;
            this.isPunching = false;
        }
    } else if(this.isKicking) {
        this.nickKickAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        // checks to see if the kick loop is over, if so set kicking to be false.
        if (this.nickKickAnimate.isDone()) {
            this.nickKickAnimate.elapsedTime = 0;
            this.isKicking = false;
        }
    } else if (this.walkingRight || this.walkingLeft) {
        // walk animation (to the right)
        this.nickWalkAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else {
        // default standing animation
        this.animate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
}
    /* checks if certain buttons are pushed and sets booleans to true accordingly. */
Nick.prototype.update = function() {
    if (this.game.f) {
        this.isPunching = true;
    } else if (this.game.g) {
        this.isKicking = true;
    } else if (this.game.d) {
        this.walkingRight = true;
        this.x += 15;
    } else if (this.game.a) {
        this.walkingLeft = true;
        this.x += -15;
    } else if (!this.game.d || !this.game.a) {
        this.walkingRight = false;
        this.walkingLeft = false;
    } if (this.isMoving) {
            this.x += this.direction;
    }
}