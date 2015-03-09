/**
 * Created by httpnick on 1/15/15.
 * Code graciously taken (partially) from Seth Ladd and Chris Marriott.
 */
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
function GameEngine() {
    this.entities = [];
    this.books = [];
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.w = null;
    this.f = null;
    this.g = null;
    this.d = null;
    this.a = null;
    this.q = null;
    this.e = null;
    this.s = null;
    this.left = null;
    this.right = null;
    this.down = null;
    this.rShift = null;
    this.comma = null;
    this.up = null;
    this.period = null;
    this.fSlash = null;
    this.background = null;
    this.floorY = 650;
    this.isGoing = true;
    this.winnername = null;
    this.assets = null;
    this.levelMusic = null;
}
GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new Timer();
    //this.startInput();
    console.log('game initialized');
};
GameEngine.prototype.start = function() {
    console.log('starting game');
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
};
GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
};

GameEngine.prototype.addBook = function (book) {
    this.books.push(book);
};

GameEngine.prototype.addBackground = function (background) {
    console.log("added the background");
    this.background = background;
};
GameEngine.prototype.draw = function() {
    if(this.isGoing) {
        this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
        this.ctx.save();
        this.ctx.drawImage(this.background, 0, 0);
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw();
        }
        for (var i = 0; i < this.books.length; i++) {
            this.books[i].draw();
        }
        this.ctx.restore();
    } else {
        this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
        this.ctx.save();
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.surfaceWidth, this.surfaceHeight);
        this.ctx.font = "100px Arial";
        this.ctx.fillStyle = "purple";
        this.ctx.fillText(this.winnername + " WINS!!!!", (this.surfaceWidth/2) - 300, this.surfaceHeight/2);
        this.ctx.restore();
    }
};
GameEngine.prototype.update = function() {
    var entitiesCount = this.entities.length;
    var playerOneX = 0;
    var playerTwoX = 0;
    var damage = 15;

    for (var i = 0; i < entitiesCount; i++) {


        var entity = this.entities[i];
        entity.update();
    }
    for (var i = 0; i < this.books.length; i++) {
        this.books[i].update();
        for (var j = 0; j < entitiesCount; j++) {
            if(this.books[i].collide(this.entities[j])) {
                console.log("collision!");
                this.books.splice(i, 1);
            }
        }
    }
    for (var i = 0; i < this.books.length; i++) {
        playerOneX = this.entities[0].x;
        playerTwoX = this.entities[1].x;

        var leftOne = Math.min(playerOneX,playerOneX+200);
        var rightOne = Math.max(playerOneX,playerOneX+200);

        var booksX = this.books[i].x;


        var leftTwo = Math.min(playerTwoX,playerTwoX+220)
        var rightTwo = Math.max(playerTwoX,playerTwoX+220);


        if(booksX > (leftOne) && booksX < (rightOne)){

            if(!this.entities[0].isJumping )
                this.books.splice(i, 1);

            if(!this.entities[0].amIhittable()){
                this.entities[0].hitMeScotty(damage);

            }
        }
        if(booksX > leftTwo && booksX < (rightTwo)){

            if(!this.entities[1].isJumping )
                this.books.splice(i, 1);

            if(!this.entities[1].amIhittable()){
                this.entities[1].hitMeScotty(damage);


            }
        }
    }

};
GameEngine.prototype.loop = function() {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.e = false;
    this.w = false;
    this.f = false;
    this.g = false;
    this.rShift = false;
    this.up = false;
    this.period = false;
    this.fSlash = false;
};

GameEngine.prototype.endGame = function(winnername){
    this.winnername = winnername;
    this.isGoing = false;
    //./sound/victory/DrChinn.mp3
    var winner = assets.getAsset("./sound/victory/"+winnername+".mp3");
    this.levelMusic.volume = .05;
    console.log(this.winnername);
    winner.play();
    window.setTimeout(function(){window.location.replace("./selection.html")}, 5000);

};

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimeStamp = 0;
}
Timer.prototype.tick = function() {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;
    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
};