/**
 * Created by httpnick on 2/07/15.
 */


function Jon(game, spritesheet, playerNumber,assets) {
    Character.call(this, game, spritesheet, playerNumber, assets);
    this.loadAnims();
}

Jon.prototype = Object.create(Character.prototype); // See note below

Jon.prototype.constructor = Jon;

Jon.prototype.loadAnims = function() {
    if (this.playerNumber === 1) {
        this.animate = new Animate(this.spritesheet, 3000, 2000, 370, 500, 0.1, 2, true, false);
        this.PunchAnimate = new Animate(this.spritesheet, 0, 1995, 370, 480, 0.05, 4, false, false);
        this.KickAnimate = new Animate(this.spritesheet, 0, 2480, 370, 500, 0.1, 4, false, false);
        this.WalkAnimate = new Animate(this.spritesheet, 3000, 0, 370, 500, 0.1, 4, true, false);
        this.BlockAnimate = new Animate(this.spritesheet, 0, 10, 370, 500, 0.1, 3, false, false);
        this.HoldBlock = new Animate(this.spritesheet, 740, 10, 370, 500, 0.1, 1, true, false);
        this.JumpAnimate = new Animate(this.spritesheet,0, 1485, 370, 490, .2, 3, false, false);
        this.FallAnimate = new Animate(this.spritesheet, 740, 1485, 370, 490, .2, 1, true, false);
        this.EmoteAnimate = new Animate(this.spritesheet, 3000, 500, 370, 500, 0.1, 4, false, false);
        this.CrouchAnimate = new Animate(this.spritesheet, 0, 1000, 370, 485, 0.1, 3, false, false);
        this.HoldCrouchAnimate = new Animate(this.spritesheet, 740, 1000, 370, 485, 0.1, 1, true, false);

    } else {
        this.animate = new Animate(this.spritesheet, 740, 2980, 370, 500, 0.1, 2, true, true);
        this.PunchAnimate = new Animate(this.spritesheet, 1500, 1995, 370, 480, 0.05, 4, false, true);
        this.KickAnimate = new Animate(this.spritesheet, 1520, 2480, 370, 500, 0.1, 4, false, true);
        this.WalkAnimate = new Animate(this.spritesheet, 3000, 1000, 370, 500, 0.1, 4, true, true);
        this.BlockAnimate = new Animate(this.spritesheet, 1800, 10, 370, 500, 0.1, 3, false, true);
        this.HoldBlock = new Animate(this.spritesheet, 2540, 10, 370, 500, 0.1, 1, true, true);
        this.JumpAnimate = new Animate(this.spritesheet, 1800, 1485, 370, 490, .2, 3, false, true);
        this.FallAnimate = new Animate(this.spritesheet, 2540, 1485, 370, 490, .2, 1, true, true);
        this.EmoteAnimate = new Animate(this.spritesheet, 3000, 1485, 370, 490, 0.1, 4, false, true);
        this.CrouchAnimate = new Animate(this.spritesheet, 1800, 1000, 370, 485, 0.1, 3, false, true);
        this.HoldCrouchAnimate = new Animate(this.spritesheet, 1800, 1000, 370, 485, 0.1, 1, true, true);
    }
};
