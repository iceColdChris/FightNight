/**
 * Created by Matthew Moore on 2/16/15.
 */
function Matt(game, spritesheet, playerNumber,assets,name) {
    Character.call(this, game, spritesheet, playerNumber, assets,name);
    this.loadAnims();
}

Matt.prototype = Object.create(Character.prototype);

Matt.prototype.constructor = Matt;

Matt.prototype.loadAnims = function() {
    if (this.playerNumber === 1) {
        //spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse)
        this.animate = new Animate(this.spritesheet, 3000, 10, 370, 470, 0.1, 3, true, false);
        this.PunchAnimate = new Animate(this.spritesheet, 0, 1995, 370, 480, 0.05, 4, false, false);
        this.KickAnimate = new Animate(this.spritesheet, 0, 2480, 370, 500, 0.1, 4, false, false);
        this.WalkAnimate = new Animate(this.spritesheet, 3000, 2000, 370, 470, 0.1, 4, true, false);
        this.BlockAnimate = new Animate(this.spritesheet, 0, 0, 370, 500, 0.01, 3, false, false);
        this.HoldBlock = new Animate(this.spritesheet, 708, 0, 370, 500, 0.1, 1, true, false);
        this.JumpAnimate = new Animate(this.spritesheet,0, 1498, 370, 490, .2, 3, false, false);
        this.FallAnimate = new Animate(this.spritesheet, 740, 1485, 370, 490, .2, 1, true, false);
        this.EmoteAnimate = new Animate(this.spritesheet, 3000, 2480, 365, 470, 0.1, 4, false, false);
        this.CrouchAnimate = new Animate(this.spritesheet, 0, 1000, 370, 485, 0.05, 3, false, false);
        this.HoldCrouchAnimate = new Animate(this.spritesheet, 740, 1000, 370, 485, 0.2, 1, true, false);
        this.gettingHitAnimate = new Animate(this.spritesheet, 0, 500, 370, 500, 0.05, 3, false, false);

    } else {
        this.animate = new Animate(this.spritesheet, 3336, 1000, 370, 480, 0.1, 2, true, true);
        this.PunchAnimate = new Animate(this.spritesheet, 1500, 1995, 370, 480, 0.05, 4, false, true);
        this.KickAnimate = new Animate(this.spritesheet, 1520, 2480, 370, 500, 0.1, 4, false, true);
        this.WalkAnimate = new Animate(this.spritesheet, 11, 2960, 370, 500, 0.1, 4, true, true);
        this.BlockAnimate = new Animate(this.spritesheet, 1800, 10, 370, 500, 0.1, 3, false, true);
        this.HoldBlock = new Animate(this.spritesheet, 2540, 10, 370, 500, 0.1, 1, true, true);
        this.JumpAnimate = new Animate(this.spritesheet, 1800, 1485, 370, 490, .2, 3, false, true);
        this.FallAnimate = new Animate(this.spritesheet, 2540, 1485, 370, 490, .2, 1, true, true);
        this.EmoteAnimate = new Animate(this.spritesheet, 11, 3449, 370, 490, 0.1, 4, false, true);
        this.CrouchAnimate = new Animate(this.spritesheet, 1800, 1000, 370, 485, 0.1, 3, false, true);
        this.HoldCrouchAnimate = new Animate(this.spritesheet, 1800, 1000, 370, 485, 0.2, 1, true, true);
        this.gettingHitAnimate = new Animate(this.spritesheet, 1800, 500, 370, 500, 0.05, 3, false, true);
    }
};
