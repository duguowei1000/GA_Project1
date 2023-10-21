const ALBYTOKEN = process.env.ALBYNODE
const canvas_back = document.getElementById('canvas_back');
const ctx_back = canvas_back.getContext('2d')

const canvas_start = document.getElementById('canvas_start');
const ctx_start = canvas_start.getContext('2d')

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

////Setting of FPS (GameSpeed)
const FPS = 20;
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
const startPlayer1 = {}
startPlayer1.img = new Image();
const startPlayer2 = {}
startPlayer2.img = new Image();
const playerWidth = '32';       //per sprite width px based on sheet
const playerHeight = '32';     //per sprite height px based on sheet
const playerWidthExt = 84;         //stretch the player size
const playerHeightExt = 84;        //stretch the player size
let FrameX = 3;            //which sprite in sprite sheet
let FrameY = 0;            //which sprite in sprite sheet

counter.style.display = 'none'
//////////////////// start page /////////////////////////////
let player1EventTriggered = false
let player2EventTriggered = false


let firstPageLoop = function () {

  //DOM
  counter.style.display = 'none'
  avatar_screen.style.display = 'flex'

  animationID_firstPage = requestAnimationFrame(firstPageLoop)  //for killing the frame next time
  startPlayer1.img.src = './assets/people/npc3.png'
  startPlayer2.img.src = './assets/people/npc1.png'
  if (!player1EventTriggered) {
    ctx_start.drawImage(startPlayer1.img, playerWidth * FrameX, playerHeight * FrameY, playerWidth, playerHeight, 40, 0, playerWidthExt, playerHeightExt)
  }
  if (!player2EventTriggered) {
    ctx_start.drawImage(startPlayer2.img, playerWidth * FrameX, playerHeight * FrameY, playerWidth, playerHeight, 190, 0, playerWidthExt, playerHeightExt)
  }
  ctx_back.drawImage(startImg, 0, 0, canvas_back.width, canvas_back.height);



}

//////////////////////////// start Game loop //////////////////////////////////
const leftEdge = player_.radius//10
const rightEdge = canvas_back.width - player_.radius//1480

const topEdge = player_.radius//0
const btmEdge = canvas_back.height - player_.radius//896

let startGameLoop = function () {

  avatar_screen.style.display = 'none'

  //if (number < 200) {
  // initiate Loop function
  animationID = requestAnimationFrame(startGameLoop)

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
    // console.log('coinTaken')
    // console.log(coinS)
    coinReward.coinTaken()
    score += 100

  }
  scoreEl.innerText = score  //update score

  directionInput.initKeys()  //Keypress
  // console.log(`Direction is :${directionInput.direction}`)
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

  //}

}

let gameScene = 1;  //initialise 1st page

function chooseScene(gameScene) {
  switch (gameScene) {

    case 1: firstPageLoop()
      console.log(">>>>firstpage")
      console.log(ALBYTOKEN)
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

//startGameLoop
//Show end game prompt
//(GAMESCENE) start game button
startGamebtn.addEventListener("click", () => {
  init()                          //refresh game objects
  btnscreen.style.display = "none"

  startGameLoop()
})

//(GAME SCENE) back home button
backFirstpgbtn.addEventListener("click", () => {
  init()
  btnscreen.style.display = "none"
  chooseScene(1)  //back to home page
})


//Choose player avatar
firstPlayerSelect.addEventListener("click", () => {
  //Player animation frames from Sprite
  imagesX.player.src = './assets/people/npc3.png'// Male player
})

secondPlayerSelect.addEventListener("click", () => {
  //Player animation frames from Sprite
  imagesX.player.src = './assets/people/npc1.png'// Female player

})

//resolving animation
const FPS2 = 30;
let prevTick2 = 0;
let animationID_player2
let now2
///////
secondPlayerSelect.addEventListener("mouseover", () => {
  startPlayer2.img.src = './assets/people/npc1.png'
  //document.getElementById('secondPlayerSelect').innerHTML = '<img width="100" height="100" src="./assets/people/npc1.png">'
  let player2Loop = function () {
    // let now2 = Math.round(FPS2 * Date.now() / 1000);  //Higher FPS magnifies this number faster
    // if (now2 === prevTick2) return;  //prematurely repeat loop if time is rounded to same
    // prevTick2 = now2;               //else update the tick

    animationID_player2 = requestAnimationFrame(player2Loop)
    ctx_start.clearRect(0, 0, canvas_back.width, canvas_back.height)
    if (FrameX < 3) {
      FrameX++;            //loop throgh x-axis sprite
    } else FrameX = 0;
    FrameY = 0
    player2EventTriggered = true
    ctx_start.drawImage(startPlayer1.img, playerWidth * 0, playerHeight * 0, playerWidth, playerHeight, 40, 0, playerWidthExt, playerHeightExt)
    ctx_start.drawImage(startPlayer2.img, playerWidth * FrameX, playerHeight * FrameY, playerWidth, playerHeight, 190, 0, playerWidthExt, playerHeightExt)

  }
  player2Loop()

})

secondPlayerSelect.addEventListener("mouseleave", () => {
  startPlayer2.img.src = './assets/people/npc1.png'
  cancelAnimationFrame(animationID_player2) //cancel playerSelectRoute
  FrameX = 0
  FrameY = 0
  ctx_start.drawImage(startPlayer2.img, playerWidth * FrameX, playerHeight * FrameY, playerWidth, playerHeight, 190, 0, playerWidthExt, playerHeightExt)
  player2EventTriggered = false
})

firstPlayerSelect.addEventListener("mouseover", () => {
  let player1Loop = function () {
    // let now2 = Math.round(FPS2 * Date.now() / 1000);  //Higher FPS magnifies this number faster
    // if (now2 === prevTick2) return;  //prematurely repeat loop if time is rounded to same
    // prevTick2 = now2;               //else update the tick

    animationID_player1 = requestAnimationFrame(player1Loop)
    ctx_start.clearRect(0, 0, canvas_back.width, canvas_back.height)
    if (FrameX < 3) {
      FrameX++;            //loop through x-axis sprite
    } else FrameX = 0;
    FrameY = 0
    player1EventTriggered = true

    ctx_start.drawImage(startPlayer1.img, playerWidth * FrameX, playerHeight * FrameY, playerWidth, playerHeight, 40, 0, playerWidthExt, playerHeightExt)
    ctx_start.drawImage(startPlayer2.img, playerWidth * 0, playerHeight * 0, playerWidth, playerHeight, 190, 0, playerWidthExt, playerHeightExt)
  }
  player1Loop()

})

firstPlayerSelect.addEventListener("mouseleave", () => {
  // startPlayer1.img.src = './assets/people/npc3.png'
  cancelAnimationFrame(animationID_player1) //cancel playerSelectRoute
  FrameX = 0
  FrameY = 0
  ctx_start.drawImage(startPlayer1.img, playerWidth * FrameX, playerHeight * FrameY, playerWidth, playerHeight, 40, 0, playerWidthExt, playerHeightExt)
  player1EventTriggered = false
})

let toggleON = false
firstPlayerSelect.addEventListener("click", () => {
  toggleON = !toggleON
  // console.log(toggleON)

  if (toggleON === true) {
    firstPlayerSelect.style.border = "3px solid #76F96D"
    secondPlayerSelect.style.border = "none"
    avatar_startGame.style.visibility = "visible"
    console.log(">>>ToggleTrue")
  } else {
    firstPlayerSelect.style.border = "none"
    avatar_startGame.style.visibility = "hidden"

    console.log(">>>ToggleFalse")
  }

})

secondPlayerSelect.addEventListener("click", () => {
  toggleON = !toggleON
  // console.log(toggleON)

  if (toggleON === true) {
    secondPlayerSelect.style.border = "3px solid #FBED64"
    firstPlayerSelect.style.border = "none"
    avatar_startGame.style.visibility = "visible"
    console.log(">>>ToggleTrue")
  } else {
    secondPlayerSelect.style.border = "none"
    avatar_startGame.style.visibility = "hidden"

    console.log(">>>ToggleFalse")
  }

})

//(AVATAR PAGE)Start game button when clicked
avatar_startGame.addEventListener("click", () => {
  //reset 1st page///
  toggleON = false
  firstPlayerSelect.style.border = "none"
  secondPlayerSelect.style.border = "none"
  avatar_startGame.style.visibility = "hidden"
  // proceed to Game
  chooseScene(2)
})
