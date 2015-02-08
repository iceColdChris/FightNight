/**
 * Created by httpnick on 1/27/15.
 * DO YOU SEE THIS CHRIS!?!?!?
 *
 *
 * I See it nick!!
 * I'm really doing it guys - Matt
 * Testing my commits - Jon
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
    var frame = this.reverse ? this.frames - this.currentFrame() - 1: this.currentFrame();
    var xindex = (frame % this.frames);
    ctx.drawImage(this.spriteSheet,
        (xindex * this.frameWidth) + this.startX,
        this.startY,
        this.frameWidth,
        this.frameHeight,
        x, y,
        this.frameWidth,
        this.frameHeight);
}
Animate.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}
Animate.prototype.isDone = function() {
    // multiplied totalTime by 0.9 here to fix the flickering animations. No problems so far.
    return (this.elapsedTime >= this.totalTime*0.9);
}

function CharacterSelectHandler(event) {
    if(event.keyCode === 13) {
        gameEngine.addBackground(assets.getAsset("./backgrounds/level01.jpg"));
        gameEngine.start();
        /*gameEngine.addEntity(new Nick(gameEngine,
            assets.getAsset("./img/nick.png"), 1)); */
        gameEngine.addEntity(new Jon(gameEngine,
            assets.getAsset("./img/jon.png"), 1));
        gameEngine.addEntity(new Chris(gameEngine,
            assets.getAsset("./img/chris.png"), 2));
        document.getElementById("gameCanvas").removeEventListener("keydown", CharacterSelectHandler, false);
    }
    event.preventDefault();
}

function keyDownHandler(event) {
    var keyPressed = String.fromCharCode(event.keyCode);
    if (keyPressed == "D") {
        gameEngine.d = true;
    }else if (keyPressed === "A") {
        gameEngine.a = true;
    }else if (keyPressed === "W"){
        gameEngine.w = true;
    }else if(event.keyCode === 81) {
        gameEngine.q = true;
    }else if (keyPressed === "F") {
        gameEngine.f = true;
    } else if (keyPressed === "G") {
        gameEngine.g = true;
    } else if (event.keyCode === 38) {
      gameEngine.up = true;
    } else if (event.keyCode === 39) {
        gameEngine.right = true;
    } else if (event.keyCode === 37) {
        gameEngine.left = true;
    } else if (event.keyCode === 40) {
        gameEngine.down = true;
    }  else if (event.keyCode === 188) {
        gameEngine.comma = true;
    } else if (event.keyCode === 190) {
        gameEngine.period = true;
    } else if (event.keyCode === 191) {
        gameEngine.fSlash = true;
    }
    event.preventDefault();
}


function keyUpHandler(event) {
    var keyPressed = String.fromCharCode(event.keyCode);
    if (keyPressed === "D") {
        gameEngine.d = false;
    }else if(keyPressed === "W"){
        gameEngine.w = false;
    }else if (keyPressed === "A") {
        gameEngine.a = false;
    } else if (keyPressed === "F") {
        gameEngine.f = false;
    } else if (keyPressed === "G") {
        gameEngine.g = false;
    } else if (keyPressed === "Q") {
      gameEngine.q = false;
    } else if (event.keyCode === 38) {
        gameEngine.up = false;
    }  else if (event.keyCode === 39) {
        gameEngine.right = false;
    } else if (event.keyCode === 37) {
        gameEngine.left = false;
    } else if (event.keyCode === 40) {
        gameEngine.down = false;
    }  else if (event.keyCode === 188) {
        gameEngine.comma = false;
    } else if (event.keyCode === 190) {
        gameEngine.period = false;
    } else if (event.keyCode === 191) {
        gameEngine.fSlash = false;
    }
    event.preventDefault();
}

var assets = new Assets();
var gameEngine = new GameEngine();
var cSelect = new CharacterSelect();
assets.queueDownload("./img/nick.png");
assets.queueDownload("./img/chris.png");
assets.queueDownload("./img/jon.png");
assets.queueDownload("./backgrounds/level01.jpg");
//assets.queueDownload("./sounds/bell.mp3");

assets.downloadAll(function() {
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    gameEngine.init(ctx);
    canvas.addEventListener("keydown",keyDownHandler, false);
    canvas.addEventListener("keyup",keyUpHandler, false);
    cSelect.init(ctx);
    cSelect.addCharacter(assets.getAsset("./img/nick.png"));
    cSelect.addCharacter(assets.getAsset("./img/chris.png"));
    cSelect.display();
    canvas.addEventListener("keydown", CharacterSelectHandler, false);
});
