const canvas_back = document.getElementById('canvas_back');
const ctx_back = canvas_back.getContext('2d')

canvas_back.height = window.innerHeight
canvas_back.width = window.innerWidth

const backgroundImg = new Image();
backgroundImg.src = "./assets/PokeGoldDemo-SilentHills.png";

const imgPerson = new Image();
imgPerson.src = "./assets/person.png";

const imgZombie = new Image();
imgZombie.src = "./assets/zombies.png";

///Sprite
//person
const imagesX = {}

imagesX.player = new Image();
imagesX.player.src = './assets/people/npc3.png'//'./assets/AdventurerSpriteSheetv1.1.png' //'./assets/cuphead.png'

const playerWidth = '32';  //per sprite width px based on sheet
const playerHeight = '32';     //per sprite height px based on sheet
const playerWidthExt = 72;
const playerHeightExt = 72;
let playerFrameX = 3;            //which sprite in sprite sheet
let playerFrameY = 0;            //which sprite in sprite sheet
let playerX = 20;                  //position in canvas
let playerY = 20;                  //posittion in canvas
const playerSpeed = 6; 

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
  ctx_back.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animatePerson(){
  drawSprite(imagesX.player, playerWidth * playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight, playerX, playerY, playerWidthExt, playerHeightExt);
//walking loop
  if (playerFrameX <3){
    playerFrameX++;
  }else playerFrameX = 0;

if (playerX < canvas_back.width + playerWidthExt) {
  playerX += playerSpeed
}else playerX = 0 + playerWidthExt
}
////

const x = canvas_back.width / 2
console.log(x)
const y = canvas_back.height / 2
console.log(y)

const player_ = new Player(x, y, 50)

const zombieS = []
//const zom = new Zombies(300, 300)
console.log('working gamestate')
let number = 0;
let startGameLoop =  function () {

  //let GameLoop = function ()  {
    if (number < 100) {
      //clear canvas  
      ctx_back.clearRect(0, 0, canvas_back.width, canvas_back.height)

      //Draw background  
      ctx_back.drawImage(backgroundImg, 0, 0, 550, 700);

      //Draw Objects
      player_.update()

      zombieS.forEach((zom) => {
        zom.update()
        //Distance betw zombie and player
        const dist = Math.hypot(player_.x - zom.x, player_.y - zom.y)
        if (dist - zom.radius - player_.radius < 2) {
          alert('game end!')
        }
        //zom.drawImg() 
      })

      //Add new zombies after X steps
      if (number % 20 === 0) {
        zombieS.push(new Zombies(x, y))
      }
      console.log(number);
      number++
    }
  //}
  // initiate Loop function
  setTimeout(() => {
    requestAnimationFrame(startGameLoop)},200)

}
startGameLoop()


