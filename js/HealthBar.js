/**
 * Created by httpnick on 2/6/15.
 */

function HealthBar(game, x, y, maxHealth, height, maxWidth, name,assets,chara) {
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.maxHealth = maxHealth;
    this.height = height;
    this.maxWidth = maxWidth; //500
    this.health = this.maxHealth;
    this.name = name;
    this.assets = assets;
    this.chara = chara;
}
HealthBar.prototype.setHealth = function(health) {
        this.health = health;
};


HealthBar.prototype.draw = function() {

    if(this.name === "Matt"){
        var img = this.assets.getAsset("./img/logo/mattlogo.png");
    }
    else if(this.name === "Jon"){
        var img = this.assets.getAsset("./img/logo/jonlogo.png");
    }
    else if(this.name === "Nick"){
        var img = this.assets.getAsset("./img/logo/nicklogo.png");
    }else if(this.name === "Chris"){
        var img = this.assets.getAsset("./img/logo/chrislogo.png");
    }
    else if(this.name === "DrChinn"){
        var img = this.assets.getAsset("./img/logo/drchinnlogo.png");
    }else{
        var img = this.assets.getAsset("./img/logo/drtolentinologo.png");
    }

    if(this.chara.playerNumber === 1){
        this.ctx.drawImage(img,(this.x)+25,20 );
    }else{
        var canvas = document.getElementById('gameCanvas');
        var newWidth = canvas.width;
        this.ctx.drawImage(img,(newWidth-img.width)-110,20);

    }

    if(this.chara.hitCounter>=3 && this.chara.hitCounter <16){
        var img = this.assets.getAsset("./img/combo/"+this.chara.hitCounter+".png");
        var myX = this.chara.x;
        var myY = this.chara.y;
        var count = this.chara.hitCounter;
        //(max - min +1) + min
        var x = Math.floor(Math.random() * (((myX+15)+count*5) - myX + 1)) + myX;
        var y = Math.floor(Math.random() * (((myY-50)-count*5) - (myY-35) + 1)) + myY-50;

        this.ctx.drawImage(img,x,y);
    }if(this.chara.hitCounter >=16){
        var img = this.assets.getAsset("./img/combo/health.png");
        var myX = this.chara.x;
        var myY = this.chara.y;
        var x = Math.floor(Math.random() * ((myX-50) - (myX-100) + 1)) + myX-100;
        var y = Math.floor(Math.random() * (myY-50 - (myY-35) + 1)) + myY-50;
        this.ctx.drawImage(img,x,y);
    }


    if (this.health > 0) {
        this.ctx.beginPath();
        var width = this.maxWidth * this.health / this.maxHealth;

        if(this.chara.playerNumber === 1) {

            this.ctx.fillStyle = "black";
            this.ctx.fillRect(this.y + 10, this.x - 90, this.height + 20, this.maxWidth + 20);


            if (this.health > 75) {
                this.ctx.fillStyle = "green";
                this.ctx.rect(this.y + 20, this.x - 80, this.height, width);
                this.ctx.fill();
                this.ctx.closePath();
            }
            if (this.health >= 35 && this.health < 75) {
                this.ctx.fillStyle = "red";
                this.ctx.rect(this.y + 20, this.x - 80, this.height, width);
                this.ctx.fill();
                this.ctx.closePath();
            } else if (this.health < 35) {
                this.ctx.fillStyle = "blue";
                this.ctx.rect(this.y + 20, this.x - 80, this.height, width);
                this.ctx.fill();
                this.ctx.closePath();
            }
        }else{

            var canvas = document.getElementById('gameCanvas');
            var newWidth = canvas.width;
            var height = canvas.height;

            this.ctx.fillStyle = "black";
            this.ctx.fillRect(newWidth-100, 10, this.height + 20, this.maxWidth + 20);


            if (this.health > 75) {
                this.ctx.fillStyle = "green";
                this.ctx.rect(newWidth-90, 20, this.height, width);
                this.ctx.fill();
                this.ctx.closePath();
            }
            if (this.health >= 35 && this.health < 75) {
                this.ctx.fillStyle = "red";
                this.ctx.rect(newWidth-90, 20, this.height, width);
                this.ctx.fill();
                this.ctx.closePath();
            } else if (this.health < 35) {
                this.ctx.fillStyle = "blue";
                this.ctx.rect(newWidth-90, 20, this.height, width);
                this.ctx.fill();
                this.ctx.closePath();
            }

        }

    }
}
