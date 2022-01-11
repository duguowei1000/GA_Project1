const canvas_back = document.getElementById('canvas_back');
const ctx_back = canvas_back.getContext('2d')

canvas_back.height = window.innerHeight
canvas_back.width = window.innerWidth

const backgroundImg = new Image();
//backgroundImg.src = "./assets/PokeGoldDemo-SilentHills.png";

const imgPerson = new Image();
imgPerson.src = "./assets/person.png";

const imgZombie = new Image();
imgZombie.src = "./assets/zombies.png";

const directionInput = new DirectionInput();
////

const x = canvas_back.width / 2
console.log(x)
const y = canvas_back.height / 2
console.log(y)

//Distance between 2 objects (hypothenuse)
function distHyp(objectOne,objectTwo) {
  return Math.hypot(objectOne.x - objectTwo.x, objectOne.y - objectTwo.y)
} 

const player_ = new Player(x, y)
let coinReward = new GameCoins(x,y)
const coinS = []
const zombieS = []
//const zom = new Zombies(300, 300)
console.log('working gamestate')
let number = 0;
let startGameLoop =  function () {

  //let GameLoop = function ()  {
    if (number < 500) {
      //clear canvas  
      ctx_back.clearRect(0, 0, canvas_back.width, canvas_back.height)

      //Draw background  
      //ctx_back.drawImage(backgroundImg, 0, 0, 550, 700);
      ctx_back.drawImage(backgroundImg, 0, 0, 550, 700);

      //Draw Objects
      
      player_.update(directionInput.direction)
      player_.draw()
      //player_.updatePosition(directionInput.direction)
      coinReward.update()

      zombieS.forEach((zom) => {
        zom.update()
        //Distance betw zombie and player
        const dist = distHyp(player_,zom)
        if (dist - zom.radius - player_.radius < 2) {
          console.log('contacted')
          //alert('game end!')
        }
        //zom.drawImg() 
      })

      //Coin reward
      const distCoinPlayer = distHyp(player_,coinReward)
      console.log(distCoinPlayer)
      if (distCoinPlayer - coinReward.radius - player_.radius < 20) {
        console.log('coinTaken')
        
        console.log(coinS)
        coinReward.coinTaken()
        //alert('game end!')
      }

      directionInput.initKeys()
      console.log(`Direction is :${directionInput.direction}`)
      //Add new zombies after X steps
      if (number % 20 === 0) {
        zombieS.push(new Zombies(x, y))
      }
      //console.log(number);
      number++
    }
  //}
  // initiate Loop function
  setTimeout(() => {
    requestAnimationFrame(startGameLoop)},100)

}
startGameLoop()


