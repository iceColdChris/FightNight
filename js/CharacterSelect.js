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
        }
    }

    var background = new Image();
    background.src = ("./charSelection/charSelection.jpg");// we need to get this from asset manager
    this.ctx.drawImage(background,(this.surfaceWidth / 4),(this.surfaceHeight / 4));

    background.addEventListener('click',getCords,true); //add mouse listener to img - not working for some reason

    this.ctx.font="50px Times Roman";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Press Enter to Start the game!", (this.surfaceWidth / 4)+400 ,100 );
    this.ctx.restore();

};

function getCords(event){
    console.log("here");
}

CharacterSelect.prototype.addCharacter = function(character){
    this.characters.push(character);
};