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
    this.ctx.drawImage(this.background, 0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.rect((this.surfaceWidth / 4) - 50, 0, 1250, 75);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.font="50px Times Roman";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("Select your fighter by pressing the corresponding number!", (this.surfaceWidth / 4) ,50 );
    var counter = 1;
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 3; j++) {
            this.ctx.beginPath();
            this.ctx.fillStyle = "black";
            this.ctx.rect(((j * (this.surfaceWidth / 3)) + (this.surfaceWidth / 3) / 2) - 25,
                ((i * (this.surfaceHeight / 2)) + (this.surfaceHeight / 2) / 2) - 220,
                75,
                75);
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.fillStyle = "red";
            this.ctx.fillText(counter.toString(),
                (j * (this.surfaceWidth / 3)) + (this.surfaceWidth / 3) / 2,
                ((i * (this.surfaceHeight / 2)) + (this.surfaceHeight / 2) / 2) - 170);
            counter += 1;
        }
    }
    this.ctx.restore();

};


CharacterSelect.prototype.addCharacter = function(character){
    this.characters.push(character);
};

CharacterSelect.prototype.addSelectImage = function(selectImage) {
    this.background = selectImage;
}