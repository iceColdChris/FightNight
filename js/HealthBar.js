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

    this.ctx.drawImage(img,(this.x)+175,85 );

    if(this.chara.hitCounter>=3){
       var img = this.assets.getAsset("./img/combo/"+this.chara.hitCounter+".png");
        var myX = this.chara.x;
        var myY = this.chara.y;
        var x = Math.floor(Math.random() * (myX+15 - myX + 1)) + myX;
        var y = Math.floor(Math.random() * (myY-50 - (myY-35) + 1)) + myY-50;

        this.ctx.drawImage(img,x,y);
    }


    if (this.health > 0) {
        this.ctx.beginPath();
        var width = this.maxWidth * this.health / this.maxHealth;


        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.x-5, this.y, this.maxWidth+10, this.height+5);


        if(this.health > 75){
            this.ctx.fillStyle = "green";
            this.ctx.rect(this.x, this.y, width, this.height);
            this.ctx.fill();
            this.ctx.closePath();
        }if(this.health >=35 && this.health < 75){
            this.ctx.fillStyle = "red";
            this.ctx.rect(this.x, this.y, width, this.height);
            this.ctx.fill();
            this.ctx.closePath();
        }else if(this.health < 35) {
            this.ctx.fillStyle = "blue";
            this.ctx.rect(this.x, this.y, width, this.height);
            this.ctx.fill();
            this.ctx.closePath();
        }

    }
}
