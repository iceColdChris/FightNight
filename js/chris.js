/**
 * Created by httpnick on 1/28/15.
 */
function Chris(game, spritesheet) {
    this.animate = new Animate(spritesheet, 3370, 1000, 370, 500, 0.1, 3, true, true);
    this.chrisWalkAnimate = new Animate(spritesheet, 0, 3000, 370, 500, 0.1, 4, true, true);
    this.chrisPunchAnimate = new Animate(spritesheet, 1855, 2002, 368, 460, 0.08, 3, false, true);
    this.chrisKickAnimate = new Animate(spritesheet, 1800, 2500, 370, 500, 0.1, 3, false, true);
    this.x = 1000;
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
Chris.prototype.draw = function() {

    if (this.isPunching) {
        this.chrisPunchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        // checks to see if the punch loop is over, if so set punching to be false.
        if (this.chrisPunchAnimate.isDone()) {
            this.chrisPunchAnimate.elapsedTime = 0;
            this.isPunching = false;
        }
    } else if(this.isKicking) {
        this.chrisKickAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        // checks to see if the kick loop is over, if so set kicking to be false.
        if (this.chrisKickAnimate.isDone()) {
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
    if (this.game.period) {
        this.isPunching = true;
    } else if (this.game.fSlash) {
        this.isKicking = true;
    } else if (this.game.right) {
        this.walkingRight = true;
        this.x += 15;
    } else if (this.game.left) {
        this.walkingLeft = true;
        this.x += -15;
    } else if (!this.game.left || !this.game.right) {
        this.walkingRight = false;
        this.walkingLeft = false;
    } if (this.isMoving) {
        this.x += this.direction;
    }
}