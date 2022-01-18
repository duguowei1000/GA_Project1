const canvas_back = document.getElementById('canvas_back');
const ctx_back = canvas_back.getContext('2d')

canvas_back.height = window.innerHeight
canvas_back.width = window.innerWidth

const startImg = new Image();
startImg.src = "./assets/halloweenwallpaper.png";

const backgroundImg = new Image();
backgroundImg.src = "./assets/pokesilenthills.png";

const imgPerson = new Image();
imgPerson.src = "./assets/person.png";

const imgZombie = new Image();
imgZombie.src = "./assets/zombies.png";

const directionInput = new DirectionInput();

const counter = document.querySelector('#counter')
const scoreEl = document.querySelector('#scoreEL')
const startGamebtn = document.querySelector('#startGameBtn')
const backFirstpgbtn = document.querySelector('#backFirstpgbtn')
const btnscreen = document.querySelector("#btnscreen")
const bigscoreEl = document.querySelector("#bigscoreEl")

const avatar_screen = document.querySelector("#avatar_screen")
const firstPlayerSelect = document.querySelector("#firstPlayerSelect")
const secondPlayerSelect = document.querySelector("#secondPlayerSelect")
const avatar_startGame = document.querySelector("#avatar_startGame")
// avatar_screen.style.display = 'flex'
////Setting of FPS (GameSpeed)
const FPS = 30;
let prevTick = 0;
////////////////////////////

const x = canvas_back.width / 2
console.log(x)
const y = canvas_back.height / 2
console.log(y)

console.log(`canvaswidth ${canvas_back.width}`)
console.log(`canvasheight ${canvas_back.height}`)

//Distance between 2 objects (hypothenuse)
function distHyp(objectOne, objectTwo) {
  return Math.hypot(objectOne.x - objectTwo.x, objectOne.y - objectTwo.y)
}

let animationID_firstPage //animate firstpage

btnscreen.style.display = 'none'

let player_ = new Player(x, y)
let coinReward = new GameCoins(x, y)
let coinS = []
let zombieS = []
//const zom = new Zombies(300, 300)
console.log('working gamestate')
let score = 0
let number = 0;
let animationID //animate frame


//initialise new game
function init() {
  player_ = new Player(x, y)
  coinReward = new GameCoins(x, y)
  coinS = []
  zombieS = []
  score = 0
  number = 0;
}

counter.style.display = 'none'
//////////////////// start page /////////////////////////////
let firstPageLoop = function () {

  //DOM
  counter.style.display = 'none'
  avatar_screen.style.display = 'flex'
  
  animationID_firstPage = requestAnimationFrame(firstPageLoop)  //for killing the frame next time
  ctx_back.drawImage(startImg, 0, 0, canvas_back.width, canvas_back.height);
  
}


//////////////////////////// start Game loop //////////////////////////////////
const leftEdge = player_.radius//10
const rightEdge = canvas_back.width - player_.radius//1480

const topEdge = player_.radius//0
const btmEdge = canvas_back.height - player_.radius//896

let startGameLoop = function () {

  //DOM
  avatar_screen.style.display = 'none'
  

  if (number < 200) {
    // initiate Loop function
    animationID = requestAnimationFrame(startGameLoop)

    //fillRect()
    // ctx_back.fillStyle = 'red';
    // ctx_back.fillRect(20, 20, 300, 400);
    // ctx_back.fillStyle = 'green';
    // ctx_back.fillRect(200, 20, 150, 100);

    // clamp to fixed framerate
    let now = Math.round(FPS * Date.now() / 1000);  //Higher FPS magnifies this number faster
    if (now === prevTick) return;  //prematurely repeat loop if time is rounded to same
    prevTick = now;               //else update the tick

    //clear canvas  
    ctx_back.clearRect(0, 0, canvas_back.width, canvas_back.height)

    //Draw background  
    //ctx_back.drawImage(backgroundImg, 0, 0, 550, 700);

    ctx_back.drawImage(backgroundImg, 0, 0, canvas_back.width, canvas_back.height);

    //Draw Objects

    player_.update(directionInput.direction)
    //player_.draw()
    //player_.updatePosition(directionInput.direction)
    coinReward.update()

    console.log(player_.x)
    console.log(player_.y)




    zombieS.forEach((zom) => {
      zom.update()
      //Distance betw zombie and player
      const dist = distHyp(player_, zom)
      if (dist - zom.radius - player_.radius < 2) {

        cancelAnimationFrame(animationID)
        btnscreen.style.display = 'flex'
        bigscoreEl.innerText = score       //Update End score
      }
      //zom.draw() //draw black circle
      //zom.drawImg() 
    })

    //Coin reward
    const distCoinPlayer = distHyp(player_, coinReward)
    // console.log(distCoinPlayer)
    if (distCoinPlayer - coinReward.radius - player_.radius < 20) {
      console.log('coinTaken')

      console.log(coinS)
      coinReward.coinTaken()
      score += 100

    }
    scoreEl.innerText = score

    directionInput.initKeys()
    console.log(`Direction is :${directionInput.direction}`)
    //Add new zombies after X steps
    if (number % 20 === 0) {
      zombieS.push(new Zombies(x, y))
    }
    //console.log(number);
    number++
    //}

    //this method breaks the cancelAnimationFrame
    // setTimeout(() => {
    //   animationID = requestAnimationFrame(startGameLoop)},100)
    // console.log(animationID)
    // console.log(`canvas width ${canvas_back.width}`)
    // console.log(`canvas height ${canvas_back.height}`)


  }

}

let gameScene = 1;

function chooseScene(gameScene){
switch (gameScene) {

  case 1: firstPageLoop()
    console.log(">>>>firstpage")
    break
  case 2:
  cancelAnimationFrame(animationID_firstPage) //cancel first page loop
  startGameLoop()
  counter.style.display = 'block'
  break
}
}
chooseScene(gameScene)
// setTimeout(() => { chooseScene(2)},4000)
 //setTimeout(() => { chooseScene(2)},2000)

//startGameLoop
//Show end game prompt
startGamebtn.addEventListener("click", () => {
  init()
  console.log('go')
  btnscreen.style.display = "none"
  
  startGameLoop()
})

avatar_startGame.addEventListener("click", () => {
  //btnscreen.style.display = "none"
  chooseScene(2)
})

backFirstpgbtn.addEventListener("click", () => {
  init()
  btnscreen.style.display = "none"
  chooseScene(1)  //back to home page
})

firstPlayerSelect.addEventListener("click", () => {
  //Player animation frames from Sprite
imagesX.player.src = './assets/people/npc3.png'//'./assets/AdventurerSpriteSheetv1.1.png' //'./assets/cuphead.png'
})

secondPlayerSelect.addEventListener("click", () => {
  //Player animation frames from Sprite
imagesX.player.src = './assets/people/npc1.png'//'./assets/AdventurerSpriteSheetv1.1.png' //'./assets/cuphead.png'

})
