/**
 * Created by httpnick on 1/28/15.
 */
function Chris(game, spritesheet, playerNumber) {
    this.spritesheet = spritesheet;
    this.animate = null;
    this.opponent = null;
    this.chrisWalkAnimate = null;
    this.chrisPunchAnimate = null;
    this.chrisKickAnimate = null;
    this.chrisJumpAnimate = null;
    this.chrisFallAnimate = null;
    this.chrisBlockAnimate = null;
    this.chrisBlockHold = null;
    this.chrisCrouchAnimate = null;
    this.chrisCrouchHoldAnimate = null;
    this.chrisEmoteAnimate = null;
    this.playerNumber = playerNumber;
    if (this.playerNumber === 1) {
        this.x = 0;
    } else {
        this.x = 1000;
    }
    this.game = game;
    this.ctx = game.ctx;
    this.isBlocking = false;
    this.isHoldingBlock = false;
    this.isPunching = false;
    this.isKicking = false;
    this.walkingRight = false;
    this.walkingLeft = false;
    this.isJumping = false;
    this.isFalling = false;
    this.isCrouching = false;
    this.isHoldingCrouch = false;
    this.isEmoting;
    this.health = 100;
    this.y = this.game.floorY;
    this.loadAnims();
    var canvas = document.getElementById('gameCanvas');
    this.canvasWidth = canvas.width;
    this.chrisHealthBar = null;
    if (this.playerNumber === 1) {
        this.chrisHealthBar = new HealthBar(this.game, 1599, 0, this.health, 75, 500);
    } else {
        this.chrisHealthBar = new HealthBar(this.game, 100, 0, this.health, 75, 500);
    }
}
Chris.prototype.setOpponent = function(opponent) {
    this.opponent = opponent;
};
Chris.prototype.loadAnims = function() {
    if (this.playerNumber === 2) {
        this.animate = new Animate(this.spritesheet, 3370, 1000, 370, 500, 0.1, 3, true, true);
        this.chrisWalkAnimate = new Animate(this.spritesheet, 0, 3000, 370, 500, 0.1, 4, true, true);
        this.chrisPunchAnimate = new Animate(this.spritesheet, 1855, 2002, 368, 460, 0.08, 3, false, true);
        this.chrisKickAnimate = new Animate(this.spritesheet, 1800, 2500, 370, 500, 0.1, 3, false, true);
        this.chrisJumpAnimate = new Animate(this.spritesheet, 1800, 1500, 370, 500, 0.2, 3, false, true);
        this.chrisFallAnimate = new Animate(this.spritesheet, 1800, 1500, 370, 500, 0.2, 1, true, false);
        this.chrisBlockAnimate = new Animate(this.spritesheet, 1800, 0, 370, 500, 0.1, 3, false, true);
        this.chrisBlockHold = new Animate(this.spritesheet, 1800, 0, 370, 500, 0.1, 1, true, true);
        this.chrisCrouchAnimate = new Animate(this.spritesheet, 1800, 1000, 370, 500, .1, 3, false, true);
        this.chrisHoldCrouchAnimate = new Animate(this.spritesheet, 1800, 1000, 370, 500, .1, 1, true, true);
        this.chrisEmoteAnimate = new Animate(this.spritesheet, 0, 3500, 370, 435, 0.1, 4, false, true);
    } else {
        this.animate = new Animate(this.spritesheet, 3370, 0, 370, 500, 0.1, 3, true, false);
        this.chrisWalkAnimate = new Animate(this.spritesheet, 3000, 2000, 370, 500, 0.1, 4, true, false);
        this.chrisPunchAnimate = new Animate(this.spritesheet, 20, 2002, 370, 500, 0.08, 3, false, false);
        this.chrisKickAnimate = new Animate(this.spritesheet, 20, 2500, 370, 500, 0.1, 3, false, false);
        this.chrisJumpAnimate = new Animate(this.spritesheet, 0, 1500, 370, 500, 0.2, 3, false, false);
        this.chrisFallAnimate = new Animate(this.spritesheet, 740, 1500, 370, 500, 0.2, 1, true, false);
        this.chrisBlockAnimate = new Animate(this.spritesheet, 0, 0, 370, 500, 0.1, 3, false, false);
        this.chrisBlockHold = new Animate(this.spritesheet, 740, 0, 370, 500, 0.1, 1, true, false);
        this.chrisCrouchAnimate = new Animate(this.spritesheet, 0, 1000, 370, 500, .1, 3, false, false);
        this.chrisHoldCrouchAnimate = new Animate(this.spritesheet, 740, 1000, 370, 500, .1, 1, true, false);
        this.chrisEmoteAnimate = new Animate(this.spritesheet, 3000, 2500, 370, 437, 0.1, 4, false, false);
    }
}
Chris.prototype.draw = function() {
    this.chrisHealthBar.draw();
    if(this.isJumping){
        this.chrisJumpAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else if (this.isFalling) {
        this.chrisFallAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else if (this.isCrouching) {
        this.chrisCrouchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        if (this.chrisCrouchAnimate.isDone()) {
            this.isCrouching = false;
        }
    } else if (this.isHoldingCrouch) {
        this.chrisHoldCrouchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }else if (this.isEmoting) {
        this.chrisEmoteAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        if (this.chrisEmoteAnimate.isDone()) {
            this.isEmoting = false;
            this.chrisEmoteAnimate.elapsedTime = 0;
        }
    } else if (this.isPunching) {
        this.chrisPunchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        // checks to see if the punch loop is over, if so set punching to be false.
        if (this.chrisPunchAnimate.isDone()) {
            this.health -= 5;
            this.chrisHealthBar.setHealth(this.health);
            this.chrisPunchAnimate.elapsedTime = 0;
            this.isPunching = false;
        }
    } else if (this.isBlocking) {
        this.chrisBlockAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        if (this.chrisBlockAnimate.isDone()) {
            this.isBlocking = false;
        }
    } else if (this.isHoldingBlock) {
        this.chrisBlockHold.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }else if(this.isKicking) {
        this.chrisKickAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        // checks to see if the kick loop is over, if so set kicking to be false.
        if (this.chrisKickAnimate.isDone()) {
            this.health -= 5;
            this.chrisHealthBar.setHealth(this.health);
            this.chrisKickAnimate.elapsedTime = 0;
            this.isKicking = false;
        }
    }else if (this.walkingRight || this.walkingLeft) {
        // walk animation (to the right)
        this.chrisWalkAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else {
        // default standing animation
        this.animate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
}
/* checks if certain buttons are pushed and sets booleans to true accordingly. */
Chris.prototype.update = function() {
    if (this.playerNumber === 1) {
        this.updatePlayerOne();
    } else {
        this.updatePlayerTwo();
    }

    if (this.isJumping) {
        this.y -= 10;
        if (this.chrisJumpAnimate.isDone()) {
            this.chrisJumpAnimate.elapsedTime = 0;
            this.isJumping = false;
            this.isFalling = true;
        }
    } if (this.isFalling) {
        if (this.y >= this.game.floorY) {
            this.isFalling = false;
        } else {
            this.y += 10;
        }
    }
};

Chris.prototype.updatePlayerOne = function() {
    if (this.game.w && !this.isJumping && !this.isFalling) {
        this.isJumping = true;
    } else if (this.game.s) {
        if (!this.isHoldingCrouch) {
            this.isCrouching = true;
        }
        if (this.chrisCrouchAnimate.isDone() && this.game.s) {
            this.isHoldingCrouch = true;
            this.chrisCrouchAnimate.elapsedTime = 0;
            this.isCrouching = false;
        }
    } else if (this.game.q) {
        if (!this.isHoldingBlock) {
            this.isBlocking = true;
        }
        if (this.chrisBlockAnimate.isDone() && this.game.q) {
            this.isHoldingBlock = true;
            this.chrisBlockAnimate.elapsedTime = 0;
            this.isBlocking = false;
        }
    } else if (this.game.e) {
        this.isEmoting = true;
    }else if (this.game.f) {
        this.isPunching = true;
    } else if (this.game.g) {
        this.isKicking = true;
    } else if (this.game.d) {
        if(this.x < this.canvasWidth-370) {
            this.walkingRight = true;
            this.x += 15;
        }
    } else if (this.game.a) {
        if(this.x>0) {
            this.walkingLeft = true;
            this.x += -15;
        }
    } else if (!this.game.d || !this.game.a) {
        this.walkingRight = false;
        this.walkingLeft = false;
    }
    if (!this.game.q && this.isHoldingBlock) {
        this.isHoldingBlock = false;
    }

    if (!this.game.s && this.isHoldingCrouch) {
        this.isHoldingCrouch = false;
    }
};

Chris.prototype.updatePlayerTwo = function(){
    if (this.game.up && !this.isJumping && !this.isFalling) {
        this.isJumping = true;
    }  else if (this.game.down) {
        if (!this.isHoldingCrouch) {
            this.isCrouching = true;
        }
        if (this.chrisCrouchAnimate.isDone() && this.game.down) {
            this.isHoldingCrouch = true;
            this.chrisCrouchAnimate.elapsedTime = 0;
            this.isCrouching = false;
        }
    } else if (this.game.comma) {
        if (!this.isHoldingBlock) {
            this.isBlocking = true;
        }
        if (this.nickBlockAnimate.isDone() && this.game.comma) {
            this.isHoldingBlock = true;
            this.nickBlockAnimate.elapsedTime = 0;
            this.isBlocking = false;
        }
    } else if (this.game.rShift) {
        this.isEmoting = true;
    }  else if (this.game.period) {
        this.isPunching = true;
    } else if (this.game.fSlash) {
        this.isKicking = true;
    } else if (this.game.right) {
        if(this.x < this.canvasWidth-370) {
            this.walkingRight = true;
            this.x += 15;
        }
    } else if (this.game.left) {
        if(this.x>0) {
            this.walkingLeft = true;
            this.x += -15;
        }
    } else if (!this.game.left || !this.game.right) {
        this.walkingRight = false;
        this.walkingLeft = false;
    }
    if (!this.game.comma && this.isHoldingBlock) {
        this.isHoldingBlock = false;
    }
    if (!this.game.down && this.isHoldingCrouch) {
        this.isHoldingCrouch = false;
    }
};