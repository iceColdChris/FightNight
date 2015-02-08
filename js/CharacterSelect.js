/**
 * Created by httpnick on 2/6/15.
 */

function CharacterSelect() {
    this.ctx = null;
    this.surfaceHeight = null;
    this.surfaceWidth = null;
    this.colors = ["purple", "blue", "white", "green", "orange", "yellow"];
    this.characters = [];
}

CharacterSelect.prototype.init = function(ctx){
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;

};


CharacterSelect.prototype.display = function() {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
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
            this.ctx.drawImage(this.characters[j],
                0,
                0,
                370,
                500,
                i * (this.surfaceWidth / 6), j * (this.surfaceHeight / 2),
                370,
                500);

        }
    }
    this.ctx.font="50px Times Roman";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("Press Enter to Start the game!", (this.surfaceWidth / 2) - 300, (this.surfaceHeight / 2) - 30);
    this.ctx.restore();
};

CharacterSelect.prototype.addCharacter = function(character){
    this.characters.push(character);
};


