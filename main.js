/**
 * Created by httpnick on 1/27/15.
 * DO YOU SEE THIS CHRIS!?!?!?
 */
function Animate(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameDuration = frameDuration;
    this.frames = frames;
    this.totalTime = frameDuration * this.frames;
    this.elapsedTime = this.frameDuration * this.frames;
    this.loop = loop;
    this.reverse = reverse;
}
Animate.prototype.drawFrame = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = (frame % this.frames);
    ctx.drawImage(this.spriteSheet,
        (xindex * this.frameWidth) + this.startX,
        this.startY,
        this.frameWidth / 2, this.frameHeight / 2,
        x, y, this.frameWidth, this.frameHeight);
}
Animate.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}
Animate.prototype.isDone = function() {
    return (this.elapsedTime >= this.totalTime);
}
function Nick(game, spritesheet) {
    this.animate = new Animate(spritesheet, 0, 0, 370, 500, 0.1, 1, true, false);
    this.nickPunchAnimate = new Animate(spritesheet, 370, 0, 370, 500, 0.1, 3, false, false);
    this.nickKickAnimate = new Animate(spritesheet, 0, 495, 370, 500, 0.1, 4, false, false);
    this.x = 0;
    this.y = 0;
    this.game = game;
    this.ctx = game.ctx;
    this.removeFromWorld = false;
    this.direction = 0;
    this.isMoving = false;
    this.isPunching = false;
    this.isKicking = false;
}
Nick.prototype.draw = function() {
    if (this.isPunching) {
        this.nickPunchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        if (this.nickPunchAnimate.isDone()) {
            this.nickPunchAnimate.elapsedTime = 0;
            this.isPunching = false;
        }
    } else if(this.isKicking) {
        this.nickKickAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        if (this.nickKickAnimate.isDone()) {
            this.nickKickAnimate.elapsedTime = 0;
            this.isKicking = false;
        }
    } else {
        this.animate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
}
Nick.prototype.update = function() {
    if (this.game.f) {
        this.isPunching = true;
    } else if (this.game.g) {
        this.isKicking = true;
    }
    if (this.isMoving) {
        this.x += this.direction;
    }
}

var assets = new Assets();
var gameEngine = new GameEngine();

assets.queueDownload("./img/nick.png");
assets.downloadAll(function() {
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    gameEngine.init(ctx);
    gameEngine.start();
    gameEngine.addEntity(new Nick(gameEngine, assets.getAsset("./img/nick.png")));
    console.log("DONE!");
})
