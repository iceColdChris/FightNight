/**
 * Created by httpnick on 1/28/15.
 */


function Nick(game, spritesheet, playerNumber) {
    this.spritesheet = spritesheet;
    this.animate = null;
    this.nickPunchAnimate = null;
    this.nickKickAnimate = null;
    this.nickWalkAnimate = null;
    this.nickBlockAnimate = null;
    this.nickHoldBlock = null;
    this.nickJumpAnimate = null;
    this.nickFallAnimate = null;
    this.nickCrouchAnimate = null;
    this.nickHoldCrouchAnimate = null;
    this.nickEmoteAnimate = null;
    this.game = game;
    this.ctx = game.ctx;
    this.y = this.game.floorY;
    this.health = 100;
    this.playerNumber = playerNumber;
    if (this.playerNumber === 1) {
        this.x = 0;
    } else {
        this.x = 1000;
    }
    this.isPunching = false;
    this.isKicking = false;
    this.isCrouching = false;
    this.isHoldingCrouch = false;
    this.walkingRight = false;
    this.walkingLeft = false;
    this.isBlocking = false;
    this.isHoldingBlock = false;
    this.isJumping = false;
    this.isFalling = false;
    this.loadAnims();
    this.canvas = document.getElementById('gameCanvas');
    this.canvasWidth = this.canvas.width;
    this.nickHealthBar = null;
    if (this.playerNumber === 1) {
        this.nickHealthBar = new HealthBar(this.game, 1599, 0, this.health, 75, 500);
    } else {
        this.nickHealthBar = new HealthBar(this.game, 100, 0, this.health, 75, 500);
    }
}

Nick.prototype.loadAnims = function() {
    if (this.playerNumber === 1) {
        this.animate = new Animate(this.spritesheet, 0, 2000, 370, 500, 0.1, 3, true, false);
        this.nickPunchAnimate = new Animate(this.spritesheet, 3040, 2000, 370, 500, 0.05, 4, false, false);
        this.nickKickAnimate = new Animate(this.spritesheet, 3040, 2500, 370, 500, 0.1, 4, false, false);
        this.nickWalkAnimate = new Animate(this.spritesheet, 3000, 0, 370, 500, 0.1, 4, true, false);
        this.nickBlockAnimate = new Animate(this.spritesheet, 0, 10, 370, 500, 0.1, 3, false, false);
        this.nickHoldBlock = new Animate(this.spritesheet, 740, 10, 370, 500, 0.1, 1, true, false);
        this.nickJumpAnimate = new Animate(this.spritesheet,0, 1500, 370, 500, .2, 3, false, false);
        this.nickFallAnimate = new Animate(this.spritesheet, 740, 1500, 370, 500, .2, 1, true, false);
        this.nickCrouchAnimate = new Animate(this.spritesheet, 0, 1000, 370, 500, .1, 3, false, false);
        this.nickHoldCrouchAnimate = new Animate(this.spritesheet, 740, 1000, 370, 500, .1, 1, true, false);
        this.nickEmoteAnimate = new Animate(this.spritesheet, 3000, 500, 370, 500, 0.1, 4, false, false);
    } else {
        this.animate = new Animate(this.spritesheet, 1900, 2000, 370, 500, 0.1, 3, true, false);
        this.nickPunchAnimate = new Animate(this.spritesheet, 0, 3000, 370, 500, 0.05, 4, false, true);
        this.nickKickAnimate = new Animate(this.spritesheet, 0, 3500, 370, 500, 0.1, 4, false, true);
        this.nickWalkAnimate = new Animate(this.spritesheet, 3000, 1000, 370, 500, 0.1, 4, true, true);
        this.nickBlockAnimate = new Animate(this.spritesheet, 1900, 10, 370, 500, 0.1, 3, false, true);
        this.nickHoldBlock = new Animate(this.spritesheet, 1900, 10, 370, 500, 0.1, 1, true, true);
        this.nickJumpAnimate = new Animate(this.spritesheet, 1900, 1500, 370, 500, .2, 3, false, true);
        this.nickFallAnimate = new Animate(this.spritesheet, 1900, 1500, 370, 500, .2, 1, true, true);
        this.nickCrouchAnimate = new Animate(this.spritesheet, 1900, 1000, 370, 500, .1, 3, false, true);
        this.nickHoldCrouchAnimate = new Animate(this.spritesheet, 1900, 1000, 370, 500, .1, 1, true, true);
        this.nickEmoteAnimate = new Animate(this.spritesheet, 3000, 1500, 370, 500, 0.1, 4, false, true);
    }
}
Nick.prototype.draw = function() {
    this.nickHealthBar.draw();
    if (this.isJumping){
        this.nickJumpAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else if (this.isFalling) {
        this.nickFallAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else if (this.isCrouching) {
         this.nickCrouchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
         if (this.nickCrouchAnimate.isDone()) {
             this.isCrouching = false;
         }
     } else if (this.isHoldingCrouch) {
         this.nickHoldCrouchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
     } else if (this.isEmoting) {
       this.nickEmoteAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        if (this.nickEmoteAnimate.isDone()) {
            this.isEmoting = false;
            this.nickEmoteAnimate.elapsedTime = 0;
        }
     } else if (this.isPunching) {

        var superPunch = Math.floor(Math.random()*11);
        if(superPunch === 0){ // CHECK OUT THE SUPER PUNCH YO
         this.nickPunchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
         //I Plan on testing/adding a superpunch special effect here later
        }
        else{
        this.nickPunchAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        }
        // checks to see if the punch loop is over, if so set punching to be false.
        if (this.nickPunchAnimate.isDone()) {
            this.health -= 5;
            this.nickHealthBar.setHealth(this.health);
            this.nickPunchAnimate.elapsedTime = 0;
            this.isPunching = false;
        }
    } else if(this.isKicking) {
        this.nickKickAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        // checks to see if the kick loop is over, if so set kicking to be false.
        if (this.nickKickAnimate.isDone()) {
            this.health -= 5;
            this.nickHealthBar.setHealth(this.health);
            this.nickKickAnimate.elapsedTime = 0;
            this.isKicking = false;
        }
    } else if(this.isBlocking) {
        this.nickBlockAnimate.drawFrame(this.game.clockTick,this.ctx,this.x,this.y);
        if (this.nickBlockAnimate.isDone()) {
            this.isBlocking = false;
        }
    } else if (this.isHoldingBlock) {
        this.nickHoldBlock.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }else if (this.walkingRight || this.walkingLeft) {
        // walk animation (to the right)
        this.nickWalkAnimate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else {
        // default standing animation
        this.animate.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
};
    /* checks if certain buttons are pushed and sets booleans to true accordingly. */
Nick.prototype.update = function() {
    if (this.playerNumber === 1) {
        this.updatePlayerOne();
    } else {
        this.updatePlayerTwo();
    }
    if (this.isJumping) {
        this.y -= 10;
        if (this.nickJumpAnimate.isDone()) {
            this.nickJumpAnimate.elapsedTime = 0;
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
Nick.prototype.updatePlayerOne = function () {
    if (this.game.w && !this.isJumping && !this.isFalling) {
        this.isJumping = true;
    } else if (this.game.s) {
        if (!this.isHoldingCrouch) {
            this.isCrouching = true;
        }
        if (this.nickCrouchAnimate.isDone() && this.game.s) {
            this.isHoldingCrouch = true;
            this.nickCrouchAnimate.elapsedTime = 0;
            this.isCrouching = false;
        }
    }else if (this.game.q) {
        if (!this.isHoldingBlock) {
            this.isBlocking = true;
        }
        if (this.nickBlockAnimate.isDone() && this.game.q) {
            this.isHoldingBlock = true;
            this.nickBlockAnimate.elapsedTime = 0;
            this.isBlocking = false;
        }
    } else if (this.game.e) {
        this.isEmoting = true;
    } else if (this.game.f) {
        this.isPunching = true;
    } else if (this.game.g) {
        this.isKicking = true;
    } else if (this.game.d) {
        if(this.x < this.canvasWidth-370) {//keeps nick from walking off the right of the screen. Could someone add a correct width statement of Nick?
            this.walkingRight = true;
            this.x += 15;
        }
    } else if (this.game.a) {
        if(this.x>0) {//keeps nick from walking out the left of the screen
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

Nick.prototype.updatePlayerTwo = function(){
        if (this.game.up && !this.isJumping && !this.isFalling) {
            this.isJumping = true;
        } else if (this.game.down) {
            if (!this.isHoldingCrouch) {
                this.isCrouching = true;
            }
            if (this.nickCrouchAnimate.isDone() && this.game.down) {
                this.isHoldingCrouch = true;
                this.nickCrouchAnimate.elapsedTime = 0;
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
        } else if (this.game.period) {
            this.isPunching = true;
        } else if (this.game.fSlash) {
            this.isKicking = true;
        } else if (this.game.rShift) {
            this.isEmoting = true;
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
