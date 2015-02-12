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
};

function CharacterSelectHandler(event) {
    var selection = event.keyCode
    if (selection >= 49 && selection <= 54) {

        if(currentSelectionNumber ===1){
            var playerOneSelectAudio = assets.getAsset("./sound/misc/PlayerOne.mp3");
            playerOneSelectAudio.play();}

        if(currentSelectionNumber ===2){
            var playerOneSelectAudio = assets.getAsset("./sound/misc/PlayerTwo.mp3");
            playerOneSelectAudio.play();}

        if (selection === 49) {
            characters.push(new Nick(gameEngine, assets.getAsset("./img/nick.png"), currentSelectionNumber,assets,"Nick"));
        } else if (selection === 50) {
            characters.push(new Jon(gameEngine, assets.getAsset("./img/jon.png"), currentSelectionNumber,assets,"Jon"));
        } else if (selection === 51) {
            characters.push(new Chris(gameEngine, assets.getAsset("./img/chris.png"), currentSelectionNumber, assets,"Chris"));
        } else if (selection === 52) {
            console.log("Matt chosen")
        } else if (selection === 53) {
            console.log("Chinn Chosen")
        } else if (selection === 54) {
            console.log("Tolentino chosen");
        }
        event.preventDefault();
        if (selection === 49 || selection === 50 || selection === 51) {
            currentSelectionNumber += 1;
            if (currentSelectionNumber > 2)
            {
                //Stop Theme Music Here
                mainTheme.pause();
                var bellRinging = assets.getAsset("./sound/bell.mp3");
                gameEngine.addBackground(assets.getAsset("./backgrounds/level01.jpg"));
                gameEngine.start(bellRinging);
                gameEngine.addEntity(characters[0]);
                gameEngine.addEntity(characters[1]);
                document.getElementById("gameCanvas").removeEventListener("keydown", CharacterSelectHandler, false);
                var level01Music = assets.getAsset("./ost/level01music.mp3");
                level01Music.play();
            }
        }
    }
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
    } else if (keyPressed === "E")  {
        gameEngine.e = true;
    } else if (keyPressed === "S") {
        gameEngine.s = true;
    } else if (event.keyCode === 38) {
        gameEngine.up = true;
    }else if (event.keyCode === 16) {
        gameEngine.rShift = true;
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
    } else if (keyPressed === "E") {
        gameEngine.e = false;
    } else if (keyPressed === "S") {
        gameEngine.s = false;
    } else if (event.keyCode === 16) {
        gameEngine.rShift = false;
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
var characters = [];
var currentSelectionNumber = 1;
var mainTheme = new Audio("./ost/maintheme.mp3")

assets.queueDownload("./img/nick.png");
assets.queueDownload("./img/chris.png");
assets.queueDownload("./img/jon.png");
assets.queueDownload("./backgrounds/level01.jpg");
assets.queueDownload("./charSelection/charSelection.jpg");

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
assets.queueDownload("./ost/level01music.mp3");
assets.queueDownload("./sound/bell.mp3");


assets.downloadAll(function() {
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    gameEngine.init(ctx);
    canvas.addEventListener("keydown",keyDownHandler, false);
    canvas.addEventListener("keyup",keyUpHandler, false);
    mainTheme.play();
    cSelect.init(ctx);
    cSelect.addSelectImage(assets.getAsset("./charSelection/charSelection.jpg"));
    cSelect.display();
    canvas.addEventListener("keydown", CharacterSelectHandler, false);




});
