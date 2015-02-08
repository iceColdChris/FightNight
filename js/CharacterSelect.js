/**
 * Created by httpnick on 2/6/15.
 */

function CharacterSelect() {
    this.ctx = null;
    this.surfaceHeight = null;
    this.surfaceWidth = null;
    this.colors = ["purple", "blue", "white", "green", "orange", "yellow"];
    this.characters = [];
    this.background = null;
}

CharacterSelect.prototype.init = function(ctx){
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;

};


CharacterSelect.prototype.display = function() {



    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
/*
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 2; j ++) {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.colors[i];
            this.ctx.rect(i * (this.surfaceWidth / 6), j * (this.surfaceHeight / 2),
                this.surfaceWidth / 6, this.surfaceHeight / 2);
            this.ctx.fill();
            this.ctx.lineWidth = 7;
            this.ctx.strokeStyle = 'black';
            this.ctx.stroke();
            this.ctx.closePath();
        }
    } */

    this.ctx.drawImage(this.background, 0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.rect((this.surfaceWidth / 4) - 50, 0, 1250, 75);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.font="50px Times Roman";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("Click character for player 1 and then character for player 2", (this.surfaceWidth / 4) ,50 );
    this.ctx.restore();

};


CharacterSelect.prototype.addCharacter = function(character){
    this.characters.push(character);
};

CharacterSelect.prototype.addSelectImage = function(selectImage) {
    this.background = selectImage;
}