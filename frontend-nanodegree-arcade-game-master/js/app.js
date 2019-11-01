"use strict";
// Enemies our player must avoid
class Enemy {
  constructor(x,y,speed){
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.poseReset = -this.step;
  }
// Update the enemy's position, required method for game
  update = dt => {
    if(this.x < this.boundary){
      // You should multiply any movement by the dt parameter
      this.x += this.speed * dt;
    }else {
      this.x = this.poseReset;
    }
  }
// Draw the enemy on the screen, required method for game
  render = () => ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(){
        this.sprite = 'images/char-princess-girl.png';
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
  }

  update(){
    for(let enemy of allEnemies){
      if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2) ) {
                this.reset();
            }
    }

    if(this.y === 55){
      this.victory = true;
    }
  }

  // drew player on X and Y coordinates
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }


// for character's movement
  handleInput(input){
    switch (input) {
      case 'left':
        if(this.x > 0){
          this.x -= this.step;
        }
        break;
      case 'right':
      if(this.x < this.step * 4){
        this.x += this.step;
      }
        break;
      case 'up':
        if(this.y > this.jump){
          this.y -= this.jump;
        }
        break;
      case 'down':
        if(this.y < this.jump * 4){
            this.y += this.jump;
        }
        break;

    }
  }

  // setting the character to the starting point
  reset(){
    this.x = this.startX;
    this.y = this.startY;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const enemy1 = new Enemy(-101,0,200);
const enemy2 = new Enemy(-101,0,100);
const enemy3 = new Enemy(-101,83,300);
const enemy4 = new Enemy(-101,(83 * 2), 250);
const enemy5 = new Enemy(-101,(83 * 2),150);
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
