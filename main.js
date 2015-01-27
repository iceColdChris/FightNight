/**
 * Created by httpnick on 1/27/15.
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
        this.frameWidth, this.frameHeight,
        x, y, this.frameWidth, this.frameHeight);
}
Animate.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}
Animate.prototype.isDone = function() {
    return (this.elapsedTime >= this.totalTime);
}
function Nick(game, spritesheet) {
    this.animate = new Animate(spritesheet, 0, 0, 370, 500, 0.1, 4, true, false);
    this.x = 0;
    this.y = 0;
    this.game = game;
    this.ctx = game.ctx;
    this.removeFromWorld = false;
    this.direction = 0;
    this.isMoving = false;
}
Nick.prototype.draw = function() {
    this.animate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}
Nick.prototype.update = function() {
    if (this.isMoving) {
        this.x += this.direction;
    }
}

var assets = new Assets();
var gameEngine = new GameEngine();

document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);

assets.queueDownload("./img/nick.jpg");
assets.downloadAll(function() {
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    gameEngine.init(ctx);
    gameEngine.start();
    gameEngine.addEntity(new Nick(gameEngine, assets.getAsset("./img/nick.jpg")));
    console.log("DONE!");
})
