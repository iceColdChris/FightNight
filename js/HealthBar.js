/**
 * Created by httpnick on 2/6/15.
 */

function HealthBar(game, x, y, maxHealth, height, maxWidth, name) {
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.maxHealth = maxHealth;
    this.height = height;
    this.maxWidth = maxWidth;
    this.health = this.maxHealth;
    this.name = name;
}
HealthBar.prototype.setHealth = function(health) {
        this.health = health;
};

HealthBar.prototype.draw = function() {
    this.ctx.font = "100px Arial";
    this.ctx.fillStyle = "blue";
    this.ctx.fillText(this.name, this.x + 120, this.y + 150);
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.maxWidth, this.height);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
    this.ctx.closePath();
    if (this.health > 0) {
    this.ctx.beginPath();
    var width = this.maxWidth * this.health / this.maxHealth;
    this.ctx.rect(this.x, this.y, width, this.height);
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.closePath();
}
}
