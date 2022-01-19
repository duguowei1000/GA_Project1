function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx_back.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx_back.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function drawSpriteZom(img, dX, dY, dW, dH) {
  ctx_back.drawImage(img, dX, dY, dW, dH);
}

function drawSpriteCoins(img, dX, dY, dW, dH) {
  ctx_back.drawImage(img, dX, dY, dW, dH);
}

/////////////////////////////////////////////////// PLAYER ///////////////////////////////////////////////////////

const imagesX = {}
imagesX.player = new Image();
imagesX.player.src = './assets/people/npc3.png'//'./assets/AdventurerSpriteSheetv1.1.png' //'./assets/cuphead.png'


// player object

class Player {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = 15  //need this to get coin
    this.color = 'green'

    this.playerWidth = '32';       //per sprite width px based on sheet
    this.playerHeight = '32';     //per sprite height px based on sheet
    this.playerWidthExt = 72;         //stretch the player size
    this.playerHeightExt = 72;        //stretch the player size
    this.playerFrameX = 3;            //which sprite in sprite sheet
    this.playerFrameY = 0;            //which sprite in sprite sheet
    this.faceAnimation = []           //contains facing of player

    this.cachedFrameX =0
    this.cachedFrameY =0

    //if(this.x <= canvas_back.width && this.x > 0)
    this.directionUpdate_X_axis_RightEdge = {
      "up": ['y', -10, 'back'],
      "down": ['y', 10, 'front'],
      "left": ['x', -10, 'left'],
      //"right": ['x', 10, 'right'],
      "idle": ['x', 0, 'idle'],

    }
    this.directionUpdate_X_axis_LeftEdge = {
      "up": ['y', -10, 'back'],
      "down": ['y', 10, 'front'],
      "right": ['x', 10, 'right'],
      "idle": ['x', 0, 'idle'],

    }
    //if(this.y <= canvas_back.width && this.y > 0)
    this.directionUpdate_Y_axis_Top = {
      //"up": ['y', -10, 'back'],
      "down": ['y', 10, 'front'],
      "left": ['x', -10, 'left'],
      "right": ['x', 10, 'right'],
      "idle": ['x', 0, 'idle'],
    }
    this.directionUpdate_Y_axis_Btm = {
      "up": ['y', -10, 'back'],
      //"down": ['y', 10, 'front'],
      "left": ['x', -10, 'left'],
      "right": ['x', 10, 'right'],
      "idle": ['x', 0, 'idle'],

    }
    this.directionUpdate = {
      "up": ['y', -10, 'back'],
      "down": ['y', 10, 'front'],
      "left": ['x', -10, 'left'],
      "right": ['x', 10, 'right'],
      "idle": ['x', 0, 'idle'],

    }
  }

  updatePosition(inputKeys) {
    // console.log(this.directionUpdate[inputKeys])
// start here boundary 

    if (this.x < canvas_back.width && this.x > 0 && this.y < canvas_back.height && this.y >0) { //within the edges
      const [axisProperty, changePixel, face] = this.directionUpdate[inputKeys || "idle"] // [key] : value pair //undefined if no or condition
      this[axisProperty] += changePixel //this.x += changePixel
      this.faceAnimation = face
    }
    else if (this.x < (leftEdge)) {  //player beyond left edge
      this.x = leftEdge
      const [axisProperty, changePixel, face] = this.directionUpdate_X_axis_LeftEdge[inputKeys || "idle"] // [key] : value pair //undefined if no or condition
      this[axisProperty] += changePixel //this.x += changePixel
      this.faceAnimation = face
    } else if (this.x > (rightEdge)) { //player beyond right edge
      this.x = rightEdge - 10
      const [axisProperty, changePixel, face] = this.directionUpdate_X_axis_RightEdge[inputKeys || "idle"] // [key] : value pair //undefined if no or condition
      this[axisProperty] += changePixel //this.x += changePixel
      this.faceAnimation = face
    }else if (this.y < topEdge ) { //player beyond right edge
      this.y = topEdge
      const [axisProperty, changePixel, face] = this.directionUpdate_Y_axis_Top[inputKeys || "idle"] // [key] : value pair //undefined if no or condition
      this[axisProperty] += changePixel //this.x += changePixel
      this.faceAnimation = face
    }else if (this.y >btmEdge){
      this.y = btmEdge - 10
      const [axisProperty, changePixel, face] = this.directionUpdate_Y_axis_Btm[inputKeys || "idle"] // [key] : value pair //undefined if no or condition
      this[axisProperty] += changePixel //this.x += changePixel
      this.faceAnimation = face

    }

  }
  drawImg() {
    this.playerAnimateLoop(this.faceAnimation)

  }
  update(inputKeys) {
    
    //freeze animation when undefined (grab previous frame) //Else play the frame
    //console.log(`>>>typeof ${typeof(inputKeys)}`)
    if (typeof(inputKeys) === 'undefined'){
      console.log(`>>>>>>+1`)
      this.drawUndefinedFrame()
    }else{
      this.updatePosition(inputKeys)
      this.drawImg()
    }
  }

  playerAnimateLoop(facing) {
    console.log(facing)

    const x = this.x - 35; // x coordinate offset -35
    const y = this.y - 50; // y coordinate offset -50

    switch (facing) {

      case 'front':             //front facing
        this.playerFrameY = 0;
        break
      case 'right':
        this.playerFrameY = 1; //right facing
        break
      case 'back':
        this.playerFrameY = 2; //back facing
        break
      case 'left':
        this.playerFrameY = 3; //left facing
        break
    }
    console.log(this.playerFrameY)

    if (this.playerFrameX < 3) {
      this.playerFrameX++;            //loop throgh x-axis sprite
    } else this.playerFrameX = 0;

    //cache last frame for "undefined"
    this.cachedFrameY = this.playerFrameY
    this.cachedFrameX = this.playerFrameX
    //this.isCached = true

    //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    drawSprite(imagesX.player, this.playerWidth * this.playerFrameX, this.playerHeight * this.playerFrameY, this.playerWidth, this.playerHeight, x, y, this.playerWidthExt, this.playerHeightExt);
  }

  drawUndefinedFrame(){
    const x = this.x - 35; // x coordinate offset -35
    const y = this.y - 50; // y coordinate offset -50
    drawSprite(imagesX.player, this.playerWidth * this.cachedFrameX, this.playerHeight * this.cachedFrameY, this.playerWidth, this.playerHeight, x, y, this.playerWidthExt, this.playerHeightExt);
  }

  draw() {
    ctx_back.beginPath()
    const x = this.x; // x coordinate
    const y = this.y; // y coordinate
    const radius = this.radius; // Arc radius
    const startAngle = Math.PI * 0; // Starting point on circle //0 is at right horizontal
    const endAngle = Math.PI * 2; // End point on circle
    const counterclockwise = false;

    //ctx_back.lineWidt
    ctx_back.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    ctx_back.fill();
    //ctx_back.stroke()
  }
}
/////////////////////////////////////////////////// ZOMBIES ///////////////////////////////////////////////////////
let imagesZom = [];
let imagesZomL = [];
//imagesZom.length =10;
//console.log(imagesZom.length)

//push images in //Right facing
//let k = 1
for (let k = 1; k <= 10; k++) {
  console.log(imagesZom.length)
  imagesZom[k] = new Image();
  imagesZom[k].onload = () => {
    isLoaded = true;
    console.log(isLoaded)
  }
  imagesZom[k].src = `./assets/zombie_male/Walk (${k.toString()}).png`
  //console.log(i)
  console.log(imagesZom[k].src)
}
//left facing
//let g = 1
for (let g = 1; g <= 10; g++) {
  console.log(imagesZomL.length)
  imagesZomL[g] = new Image();
  imagesZomL[g].onload = () => {
    isLoaded = true;
    console.log(isLoaded)
  }
  imagesZomL[g].src = `./assets/zombie_male_left/Walk (${g.toString()}).png`
  //console.log(i)
  console.log(imagesZomL[g].src)
}

let j = 1 //for zombieLoop
let p = 1 //for zombieLoop

function randomInner(min, max) { // min and max included 
  return Math.floor(Math.random() * max) + min
}

class Zombies {
  constructor(x, y, radius = 10) {
    this.radius = radius;
    let randomX = Math.floor(Math.random() * (canvas_back.width - 300)) + 200
    let randomY = Math.floor(Math.random() * (canvas_back.height - 200)) + 100
    //let randomX = randomInner(500, canvas_back.width - 500)//Math.floor(Math.random() * canvas_back.width)
    //let randomY = randomInner(500, canvas_back.height - 500)//Math.floor(Math.random() * canvas_back.height)
    this.x = randomX//randomInner(200, canvas_back.width - 300) //randomX;
    this.y = randomY//randomInner(200, canvas_back.height - 300)//randomY;

    this.velocity_y = ((player_.y - this.y) / 100);
    this.velocity_x = ((player_.x - this.x) / 100);
    this.color = 'green'
    this.zomWidthExt = 72;   //72
    this.zomHeightExt = 72;
    this.speed = 3
  }

  speedMultiplier() {
    let dist_ = Math.hypot(player_.x - this.x, player_.y - this.y) //dist bet player and zombie
    let multiplier = this.speed / dist_ //distance is varying , speed is constant

    return multiplier

  }
  update() {
    this.y = this.y + this.speedMultiplier() * (player_.y - this.y)  //chasing player in y-axis
    this.x = this.x + this.speedMultiplier() * (player_.x - this.x)  //chasing player in x-axis
    this.zombieAnimateLoop()   //update image location


  }
  draw() {
    ctx_back.beginPath()
    const x = this.x; // x coordinate
    const y = this.y; // y coordinate
    // console.log(this.x)
    // console.log(this.y)

    const radius = this.radius; // Arc radius
    const startAngle = Math.PI * 0; // Starting point on circle //0 is at right horizontal
    const endAngle = Math.PI * 2; // End point on circle
    const counterclockwise = false;

    //ctx_back.lineWidt
    ctx_back.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    ctx_back.fill();
    //ctx_back.stroke()
  }
  zombieAnimateLoop() {
    let zomX = this.x - 35; // x coordinate : offset-35
    let zomY = this.y - 50; // y coordinate : offset-50

    if (player_.x - this.x > 0) {
      if (j < 11) {
        //console.log(j)
        drawSpriteZom(imagesZom[j], zomX, zomY, this.zomWidthExt, this.zomHeightExt);
        //console.log(imagesZom[j])
        j++
      } else {
        j = 1
        drawSpriteZom(imagesZom[j], zomX, zomY, this.zomWidthExt, this.zomHeightExt);
      }
    } else {
      if (p < 11) {
        //console.log(p)
        drawSpriteZom(imagesZomL[p], zomX, zomY, this.zomWidthExt, this.zomHeightExt);
        //console.log(imagesZomL[p])
        p++
      } else {
        p = 1
        drawSpriteZom(imagesZomL[p], zomX, zomY, this.zomWidthExt, this.zomHeightExt);
      }

    }

  }
  //ctx_back.drawImage(imgZombie, x, y, 50, 50); //wait till img loaded //50,50 for size

}

/////////////////////////////////////////////////// GameCoins ///////////////////////////////////////////////////////

let imagesCoin = [];
//push images for coin
let l = 1
for (let l = 1; l <= 30; l++) {
  console.log(imagesCoin.length)
  imagesCoin[l] = new Image();
  imagesCoin[l].onload = () => {
    isLoaded = true;
    console.log(isLoaded)
  }
  imagesCoin[l].src = `./assets/gameCoins/Gold/Gold_${l.toString()}.png`
  //console.log(i)
  console.log(imagesCoin[l].src)
}

let frameCoins

class GameCoins { //extends Zombies{
  constructor(x, y) {
    this.radius = 6
    this.x = Math.floor(Math.random() * (canvas_back.width - this.radius)) + this.radius
    this.y = Math.floor(Math.random() * (canvas_back.height - this.radius)) + this.radius
    this.coinWidthExt = 28;   //72
    this.coinHeightExt = 28;
  }

  update() {
    this.coinAnimateLoop()
  }

  coinAnimateLoop() {
    if (frameCoins < 30) {
      drawSpriteCoins(imagesCoin[frameCoins], this.x, this.y, this.coinWidthExt, this.coinHeightExt);
      frameCoins++
    } else {
      frameCoins = 1
      drawSpriteCoins(imagesCoin[frameCoins], this.x, this.y, this.coinWidthExt, this.coinHeightExt)
    }
  }

  coinTaken() {
    //add one point
    coinS.pop()                       //destroy the coin
    coinReward = new GameCoins(x, y)  //Create new coin

  }
}

console.log('working Objects')



