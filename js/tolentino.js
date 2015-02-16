/**
 * Created by httpnick on 2/16/15.
 */
function DrTolentino(game, spritesheet, playerNumber,assets,name) {
    Character.call(this, game, spritesheet, playerNumber, assets,name);
    this.loadAnims();
}

DrTolentino.prototype = Object.create(Character.prototype); // See note below

DrTolentino.prototype.constructor = DrTolentino;

DrTolentino.prototype.loadAnims = function() {
    if (this.playerNumber === 1) {
        this.animate = new Animate(this.spritesheet, 1900, 2000, 370, 500, 0.1, 3, true, true);
        this.PunchAnimate = new Animate(this.spritesheet, 1500, 1000, 370, 500, 0.05, 4, false, true);
        this.KickAnimate = new Animate(this.spritesheet, 3000, 1500, 370, 500, 0.1, 4, false, true);
        this.WalkAnimate = new Animate(this.spritesheet, 3000, 0, 370, 500, 0.1, 4, true, true);
        this.BlockAnimate = new Animate(this.spritesheet, 0, 10, 370, 500, 0.1, 3, false, true);
        this.HoldBlock = new Animate(this.spritesheet, 740, 10, 370, 500, 0.1, 1, true, true);
        this.JumpAnimate = new Animate(this.spritesheet,0, 1500, 370, 500, .2, 3, false, true);
        this.FallAnimate = new Animate(this.spritesheet, 740, 1500, 370, 500, .2, 1, true, true);
        this.CrouchAnimate = new Animate(this.spritesheet, 0, 1000, 370, 500, .1, 3, false, true);
        this.HoldCrouchAnimate = new Animate(this.spritesheet, 740, 1000, 370, 500, .1, 1, true, true);
        this.EmoteAnimate = new Animate(this.spritesheet, 3000, 500, 370, 500, 0.1, 4, false, true);
    } else {
        this.animate = new Animate(this.spritesheet, 1900, 2000, 370, 500, 0.1, 3, true, false);
        this.PunchAnimate = new Animate(this.spritesheet, 0, 3000, 370, 500, 0.05, 4, false, true);
        this.KickAnimate = new Animate(this.spritesheet, 0, 3500, 370, 500, 0.1, 4, false, true);
        this.WalkAnimate = new Animate(this.spritesheet, 3000, 1000, 370, 500, 0.1, 4, true, true);
        this.BlockAnimate = new Animate(this.spritesheet, 1900, 10, 370, 500, 0.1, 3, false, true);
        this.HoldBlock = new Animate(this.spritesheet, 1900, 10, 370, 500, 0.1, 1, true, true);
        this.JumpAnimate = new Animate(this.spritesheet, 1900, 1500, 370, 500, .2, 3, false, true);
        this.FallAnimate = new Animate(this.spritesheet, 1900, 1500, 370, 500, .2, 1, true, true);
        this.CrouchAnimate = new Animate(this.spritesheet, 1900, 1000, 370, 500, .1, 3, false, true);
        this.HoldCrouchAnimate = new Animate(this.spritesheet, 1900, 1000, 370, 500, .1, 1, true, true);
        this.EmoteAnimate = new Animate(this.spritesheet, 3000, 1500, 370, 500, 0.1, 4, false, true);
    }
};