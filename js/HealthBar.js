/**
 * Created by httpnick on 2/6/15.
 */

function HealthBar(game, x, y, maxHealth, height, maxWidth, name,assets) {
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.maxHealth = maxHealth;
    this.height = height;
    this.maxWidth = maxWidth; //500
    this.health = this.maxHealth;
    this.name = name;
    this.assets = assets;
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


    if (this.health > 0) {
        this.ctx.beginPath();
        var width = this.maxWidth * this.health / this.maxHealth;
        this.ctx.rect(this.x, this.y, width, this.height);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();
    }
}
