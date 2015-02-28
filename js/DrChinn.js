/**
 * Created by httpnick on 2/16/15.
 */
function DrChinn(game, spritesheet, playerNumber,assets,name) {
    Character.call(this, game, spritesheet, playerNumber, assets,name);
    this.loadAnims();
}

DrChinn.prototype = Object.create(Character.prototype); // See note below

DrChinn.prototype.constructor = DrChinn;

DrChinn.prototype.loadAnims = function() {
    if (this.playerNumber === 1) {
        this.animate = new Animate(this.spritesheet, 1850, 1000, 370, 500, 0.1, 3, true, true);
        this.PunchAnimate = new Animate(this.spritesheet, 1500, 0, 370, 500, 0.05, 4, false, true);
        this.KickAnimate = new Animate(this.spritesheet, 1500, 500, 370, 500, 0.1, 4, false, true);
        this.WalkAnimate = new Animate(this.spritesheet, 1500, 2000, 370, 500, 0.1, 4, true, true);
        this.BlockAnimate = new Animate(this.spritesheet, 1500, 2500, 370, 500, 0.1, 4, false, true);
        this.HoldBlock = new Animate(this.spritesheet, 1500, 2500, 370, 500, 0.1, 1, true, true);
        this.JumpAnimate = new Animate(this.spritesheet, 1500, 2000, 370, 500, .2, 4, false, true);
        this.FallAnimate = new Animate(this.spritesheet, 1500, 2000, 370, 500, .2, 1, true, true);
        this.CrouchAnimate = new Animate(this.spritesheet, 1500, 2500, 370, 500, .1, 4, false, true);
        this.HoldCrouchAnimate = new Animate(this.spritesheet, 1500, 2500, 370, 500, .1, 1, true, true);
        this.EmoteAnimate = new Animate(this.spritesheet, 1500, 2500, 370, 500, 0.1, 4, false, true);
    } else {
        this.animate = new Animate(this.spritesheet, 0, 1000, 370, 500, 0.1, 3, true, false);
        this.PunchAnimate = new Animate(this.spritesheet, 0, 0, 370, 500, 0.05, 4, false, false);
        this.KickAnimate = new Animate(this.spritesheet, 0, 500, 370, 500, 0.1, 4, false, false);
        this.WalkAnimate = new Animate(this.spritesheet, 0, 2000, 370, 500, 0.1, 4, true, false);
        this.BlockAnimate = new Animate(this.spritesheet, 0, 2000, 370, 500, 0.1, 4, false, false);
        this.HoldBlock = new Animate(this.spritesheet, 1110, 2000, 370, 500, 0.1, 1, true, false);
        this.JumpAnimate = new Animate(this.spritesheet, 0, 2000, 370, 500, .2, 4, false, false);
        this.FallAnimate = new Animate(this.spritesheet, 1110, 2000, 370, 500, .2, 1, true, false);
        this.CrouchAnimate = new Animate(this.spritesheet, 0, 2000, 370, 500, .1, 4, false, false);
        this.HoldCrouchAnimate = new Animate(this.spritesheet, 1110, 2000, 370, 500, .1, 1, true, false);
        this.EmoteAnimate = new Animate(this.spritesheet, 0, 2000, 370, 500, 0.1, 4, false, false);
    }
};

DrChinn.prototype.throwBook = function(){
    var start_x;
    if (this.playerNumber === 1) {
        start_x = this.x + 300;
    } else {
        start_x = this.x - 40;
    }
    gameEngine.addBook(new Book(this.game, assets.getAsset("./img/alg-book.png"), start_x, this.y + 100, this.playerNumber));
};

function Book(game, spritesheet, x, y, playerNumber) {
    this.game = game;
    this.ctx = game.ctx;
    this.playerNumber = playerNumber;
    this.x = x;
    this.y = y;
    this.spritesheet = spritesheet;
    this.animate = new Animate(spritesheet, 0, 0, 400, 500, 0.1, 4, true, false);
    this.removeFromWorld = false;
}
Book.prototype.draw = function() {
    this.animate.drawBook(this.game.clockTick, this.ctx, this.x, this.y);
};
Book.prototype.update = function() {
    if (this.isOffScreen()) {
        this.removeFromWorld = true;
    }
    if (this.playerNumber === 1) {
        this.x += 10;
    } else {
        this.x -= 10;
    }
};
Book.prototype.isOffScreen = function() {
    if (this.x >= this.game.surfaceWidth || this.x < 0) {
        return true;
    }
};


