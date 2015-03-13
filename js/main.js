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
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}
Animate.prototype.drawFrame = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }

    var frame = Math.abs(this.reverse ? this.frames - this.currentFrame() - 1: this.currentFrame());
    var xindex = Math.abs((frame % this.frames));

    ctx.drawImage(this.spriteSheet,
        (xindex * this.frameWidth) + this.startX,
        this.startY,
        this.frameWidth,
        this.frameHeight,
        x, y,
        this.frameWidth,
        this.frameHeight);
};

Animate.prototype.drawBook = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame() + 1;
    var x_param, y_param, w, h;
    if (frame  === 1) {
        x_param = 0;
        y_param = 0;
        w = 400;
        h = 500;
    } else if (frame === 2) {
        x_param = 835;
        y_param = 0;
        w = 500;
        h = 400;
    }else if (frame === 3) {
        x_param = 420;
        y_param = 0;
        w = 400;
        h = 500;
    } else if (frame === 4) {
        x_param = 835;
        y_param = 420;
        w = 500;
        h = 400;
    }
    ctx.drawImage(this.spriteSheet,
        x_param,
        y_param,
        w,
        h,
        x, y,
        w*0.13,
        h*0.13);
};
Animate.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
};
Animate.prototype.isDone = function() {
// multiplied totalTime by 0.9 here to fix the flickering animations. No problems so far.
    return (this.elapsedTime >= this.totalTime*0.9);
};
function loadCharacters() {
    if (localStorage.getItem("playerOne") === "Nick") {
        characters.push(new Nick(gameEngine, assets.getAsset("./img/nick.png"), 1, assets, "Nick"));
    } else if (localStorage.getItem("playerOne") === "Chris") {
        characters.push(new Chris(gameEngine, assets.getAsset("./img/chris.png"), 1, assets, "Chris"));
    } else if (localStorage.getItem("playerOne") === "Jon") {
        characters.push(new Jon(gameEngine, assets.getAsset("./img/jon.png"), 1, assets, "Jon"));
    } else if (localStorage.getItem("playerOne") === "DrTolentino") {
        characters.push(new DrTolentino(gameEngine, assets.getAsset("./img/tolentino.png"), 1, assets, "DrTolentino"));
    } else if (localStorage.getItem("playerOne") === "DrChinn") {
        characters.push(new DrChinn(gameEngine, assets.getAsset("./img/chinn.png"), 1, assets, "DrChinn"));
    } else if (localStorage.getItem("playerOne") === "Matt") {
        characters.push(new Matt(gameEngine, assets.getAsset("./img/matt.png"), 1, assets, "Matt"));
    }

    if (localStorage.getItem("playerTwo") === "Nick") {
        characters.push(new Nick(gameEngine, assets.getAsset("./img/nick.png"), 2, assets, "Nick"));
    } else if (localStorage.getItem("playerTwo") === "Chris") {
        characters.push(new Chris(gameEngine, assets.getAsset("./img/chris.png"), 2, assets, "Chris"));
    } else if (localStorage.getItem("playerTwo") === "Jon") {
        characters.push(new Jon(gameEngine, assets.getAsset("./img/jon.png"), 2, assets, "Jon"));
    } else if (localStorage.getItem("playerTwo") === "DrTolentino") {
        characters.push(new DrTolentino(gameEngine, assets.getAsset("./img/tolentino.png"), 2, assets, "DrTolentino"));
    } else if (localStorage.getItem("playerTwo") === "DrChinn") {
        characters.push(new DrChinn(gameEngine, assets.getAsset("./img/chinn.png"), 2, assets, "DrChinn"));
    }else if (localStorage.getItem("playerTwo") === "Matt") {
        characters.push(new Matt(gameEngine, assets.getAsset("./img/matt.png"), 2, assets, "Matt"));
    }

    characters[0].setOpponent(characters[1]);
    characters[1].setOpponent(characters[0]);
}

function keyDownHandler(event) {
    if (event.repeat != true) {
        var keyPressed = event.keyCode;
        if (keyPressed === 68) {
            gameEngine.d = true;
        } else if (keyPressed === 65) {
            gameEngine.a = true;
        } else if (keyPressed === 87) {
            gameEngine.w = true;
        } else if (event.keyCode === 81) {
            gameEngine.q = true;
        } else if (keyPressed === 70) {
            gameEngine.f = true;
        } else if (keyPressed === 71) {
            gameEngine.g = true;
        } else if (keyPressed === 69) {
            gameEngine.e = true;
        } else if (keyPressed === 83) {
            gameEngine.s = true;
        } else if (event.keyCode === 38) {
            gameEngine.up = true;
        } else if (event.keyCode === 16) {
            gameEngine.rShift = true;
        } else if (event.keyCode === 39) {
            gameEngine.right = true;
        } else if (event.keyCode === 37) {
            gameEngine.left = true;
        } else if (event.keyCode === 40) {
            gameEngine.down = true;
        } else if (event.keyCode === 188) {
            gameEngine.comma = true;
        } else if (event.keyCode === 190) {
            gameEngine.period = true;
        } else if (event.keyCode === 191) {
            gameEngine.fSlash = true;
        }
    }
    event.preventDefault();
}
function keyUpHandler(event) {
    var keyPressed = String.fromCharCode(event.keyCode);
    if (keyPressed === "D") {
        gameEngine.d = false;
    }/*else if(keyPressed === "W"){
     gameEngine.w = false;
     }*/else if (keyPressed === "A") {
        gameEngine.a = false;
    } /*else if (keyPressed === "F") {
     gameEngine.f = false;
     } else if (keyPressed === "G") {
     gameEngine.g = false;
     } */else if (keyPressed === "Q") {
        gameEngine.q = false;
    } /*else if (keyPressed === "E") {
     gameEngine.e = false;
     } */else if (keyPressed === "S") {
        gameEngine.s = false;
    } /*else if (event.keyCode === 16) {
     gameEngine.rShift = false;
     } else if (event.keyCode === 38) {
     gameEngine.up = false;
     } */else if (event.keyCode === 39) {
        gameEngine.right = false;
    } else if (event.keyCode === 37) {
        gameEngine.left = false;
    } else if (event.keyCode === 40) {
        gameEngine.down = false;
    } else if (event.keyCode === 188) {
        gameEngine.comma = false;
    }/* else if (event.keyCode === 190) {
     gameEngine.period = false;
     } else if (event.keyCode === 191) {
     gameEngine.fSlash = false;
     }*/
    event.preventDefault();
}

var assets = new Assets();
var gameEngine = new GameEngine();
//var cSelect = new CharacterSelect();
var characters = [];
//var currentSelectionNumber = 1;
console.log(localStorage.getItem("playerOne"));
var playeronepic = localStorage.getItem("playerOne");
var playertwopic = localStorage.getItem("playerTwo");
if (playeronepic === 'Nick' || playertwopic === 'Nick') {
    assets.queueDownload("./img/nick.png");
} if (playeronepic === 'Chris' || playertwopic === 'Chris') {
    assets.queueDownload("./img/chris.png");
} if (playeronepic === 'Jon' || playertwopic === 'Jon') {
    assets.queueDownload("./img/jon.png");
} if (playeronepic === 'Matt' || playertwopic === 'Matt') {
    assets.queueDownload("./img/matt.png");
} if (playeronepic === 'DrTolentino' || playertwopic === 'DrTolentino') {
    assets.queueDownload("./img/tolentino.png");
} if (playeronepic === 'DrChinn' || playertwopic === 'DrChinn') {
    assets.queueDownload("./img/chinn.png");
}

var levelNumber = Math.round(Math.random() * (4 - 1) + 1);

if(levelNumber === 1){
    assets.queueDownload("./backgrounds/level01.jpg");

}if(levelNumber === 2){
    assets.queueDownload("./backgrounds/level02.jpg");

}if(levelNumber === 3){
    assets.queueDownload("./backgrounds/level03.jpg");

}if(levelNumber === 4){
    assets.queueDownload("./backgrounds/level04.jpg");

}
assets.queueDownload("./img/logo/mattlogo.png");
assets.queueDownload("./img/logo/jonlogo.png");
assets.queueDownload("./img/logo/chrislogo.png");
assets.queueDownload("./img/logo/nicklogo.png");
assets.queueDownload("./img/logo/drchinnlogo.png");
assets.queueDownload("./img/logo/drtolentinologo.png");

assets.queueDownload("./img/combo/3.png");
assets.queueDownload("./img/combo/4.png");
assets.queueDownload("./img/combo/5.png");
assets.queueDownload("./img/combo/6.png");
assets.queueDownload("./img/combo/7.png");
assets.queueDownload("./img/combo/8.png");
assets.queueDownload("./img/combo/9.png");
assets.queueDownload("./img/combo/10.png");
assets.queueDownload("./img/combo/11.png");
assets.queueDownload("./img/combo/12.png");
assets.queueDownload("./img/combo/13.png");
assets.queueDownload("./img/combo/14.png");
assets.queueDownload("./img/combo/15.png");
assets.queueDownload("./img/combo/health.png");

/*Jon Sounds*/
assets.queueDownload("./sound/JonSound/JonPunch.mp3");
assets.queueDownload("./sound/JonSound/JonKick.mp3");
assets.queueDownload("./sound/JonSound/JonVictory.mp3");
assets.queueDownload("./sound/JonSound/JonJumping.mp3");
assets.queueDownload("./sound/JonSound/JonGettingKicked.mp3");
assets.queueDownload("./sound/JonSound/JonGettingPunched.mp3");
/*Matt Sounds */
assets.queueDownload("./sound/MattSound/MattPunch.mp3");
assets.queueDownload("./sound/MattSound/MattKick.mp3");
assets.queueDownload("./sound/MattSound/MattVictory.mp3");
assets.queueDownload("./sound/MattSound/MattJumping.mp3");
assets.queueDownload("./sound/MattSound/MattGettingKicked.mp3");
assets.queueDownload("./sound/MattSound/MattGettingPunched.mp3");
/*Nick Sounds */
assets.queueDownload("./sound/NickSound/NickPunch.mp3");
assets.queueDownload("./sound/NickSound/NickKick.mp3");
assets.queueDownload("./sound/NickSound/NickVictory.mp3");
assets.queueDownload("./sound/NickSound/NickJumping.mp3");
assets.queueDownload("./sound/NickSound/NickGettingKicked.mp3");
assets.queueDownload("./sound/NickSound/NickGettingPunched.mp3");
/*Chris Sounds */
assets.queueDownload("./sound/ChrisSound/ChrisPunch.mp3");
assets.queueDownload("./sound/ChrisSound/ChrisKick.mp3");
assets.queueDownload("./sound/ChrisSound/ChrisVictory.mp3");
assets.queueDownload("./sound/ChrisSound/ChrisJumping.mp3");
assets.queueDownload("./sound/ChrisSound/ChrisGettingKicked.mp3");
assets.queueDownload("./sound/ChrisSound/ChrisGettingPunched.mp3");

/*misc sounds */
assets.queueDownload("./sound/misc/PlayerOne.mp3");
assets.queueDownload("./sound/misc/PlayerTwo.mp3");
assets.queueDownload("./sound/bell.mp3");
assets.queueDownload("./sound/kick.mp3");
assets.queueDownload("./sound/kungfu.mp3");
assets.queueDownload("./sound/kungfu2.mp3");
assets.queueDownload("./sound/punch.mp3");
assets.queueDownload("./sound/slap.mp3");
assets.queueDownload("./sound/chocking.mp3");

/* victory sounds*/
assets.queueDownload("./sound/victory/DrChinn.mp3");
assets.queueDownload("./sound/victory/Chris.mp3");
assets.queueDownload("./sound/victory/DrTolentino.mp3");
assets.queueDownload("./sound/victory/FinishHim.mp3");
assets.queueDownload("./sound/victory/Jon.mp3");
assets.queueDownload("./sound/victory/Matt.mp3");
assets.queueDownload("./sound/victory/Nick.mp3");

assets.queueDownload("./sound/hs.mp3");
assets.queueDownload("./sound/denied.mp3");
assets.queueDownload("./sound/fb.mp3");
assets.queueDownload("./sound/dom.mp3");
assets.queueDownload("./sound/godlike.mp3");
assets.queueDownload("./sound/hb.mp3");

assets.downloadAll(function() {
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    gameEngine.init(ctx);
    canvas.addEventListener("keydown",keyDownHandler, false);
    canvas.addEventListener("keyup",keyUpHandler, false);
    loadCharacters();
    gameEngine.addBackground(assets.getAsset("./backgrounds/level0"+levelNumber+".jpg"));
    var bell = new Audio("./sound/bell.mp3");
    bell.play();
    gameEngine.assets = assets;
    gameEngine.start();
    gameEngine.addEntity(characters[0]);
    gameEngine.addEntity(characters[1]);
    var level01Music = new Audio("./ost/level01music.mp3");
    level01Music.volume=.1;
    gameEngine.levelMusic = level01Music;
    level01Music.play();
});
