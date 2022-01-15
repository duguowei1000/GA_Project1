const canvas_back = document.getElementById('canvas_back');
const ctx_back = canvas_back.getContext('2d')

canvas_back.height = window.innerHeight
canvas_back.width = window.innerWidth

const backgroundImg = new Image();
backgroundImg.src = "./assets/pokesilenthills.png";

const imgPerson = new Image();
imgPerson.src = "./assets/person.png";

const imgZombie = new Image();
imgZombie.src = "./assets/zombies.png";

const directionInput = new DirectionInput();

const scoreEl = document.querySelector('#scoreEL')
const startGamebtn = document.querySelector('#startGameBtn')
const btnscreen = document.querySelector("#btnscreen")
const bigscoreEl = document.querySelector("#bigscoreEl")


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

let startGameLoop = function () {

  if (number <200){
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
  //ctx_back.drawImage(backgroundImg, 0, 0, 840, 780);

  //Draw Objects

  player_.update(directionInput.direction)
  //player_.draw()
  //player_.updatePosition(directionInput.direction)
  coinReward.update()



  zombieS.forEach((zom) => {
    zom.update()
    //Distance betw zombie and player
    const dist = distHyp(player_, zom)
    if (dist - zom.radius - player_.radius < 2) {

      //cancelAnimationFrame(animationID)
      //btnscreen.style.display = 'flex'
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
    zombieS.push(new Zombies(x,y))
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
startGameLoop()

//Show end game prompt
startGamebtn.addEventListener("click", () => {
  init()
  console.log('go')
  btnscreen.style.display = "none"
  startGameLoop()
})