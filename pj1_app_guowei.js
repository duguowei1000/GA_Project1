const canvas_back = document.getElementById('canvas_back');
//const canvas_front = document.getElementById('canvas_front');
const ctx_back = canvas_back.getContext('2d')
//const ctx_front = canvas_front.getContext('2d')

canvas_back.height = window.innerHeight
canvas_back.width = window.innerWidth
//canvas_front.height = window.innerHeight
//canvas_front.width = window.innerWidth

const backgroundImg = new Image();
backgroundImg.src = "./assets/PokeGoldDemo-SilentHills.png";

const imgPerson = new Image();
imgPerson.src = "./assets/person.png";

const imgZombie = new Image();
imgZombie.src = "./assets/zombies.png";


//create a Class for game Objects
class Player {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.color = 'green'
  }

  draw() {
    ctx_back.beginPath()
    const x = this.x; // x coordinate
    const y = this.y; // y coordinate
    const radius = this.radius; // Arc radius
    const startAngle = Math.PI * 0; // Starting point on circle //0 is at right horizontal
    const endAngle = Math.PI * 2; // End point on circle
    const counterclockwise = false;
    ctx_back.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    ctx_back.stroke()
  }
  drawImg() {
    const x = this.x; // x coordinate
    const y = this.y; // y coordinate
    ctx_back.drawImage(imgPerson, x, y, 30, 40); //wait till img loaded


  }
  update() {
    this.drawImg()
  }
}

const x = canvas_back.width / 2
console.log(x)
const y = canvas_back.height / 2
console.log(y)
const player_ = new Player(x, y, 50)
player_.draw()
player_.drawImg()
console.log(player_.x)
console.log(player_)


class Zombies {
  constructor(x, y, radius) {
    let randomX = Math.floor(Math.random() * canvas_back.width)
    let randomY = Math.floor(Math.random() * canvas_back.height)
    this.x = randomX;
    this.y = randomY;
    this.radius = 10;
    this.velocity_y = ((player_.y - this.y) / 80);
    this.velocity_x = ((player_.x - this.x) / 80);
    this.color = 'green'
  }

  update() {
    this.drawImg()   //update image location
    console.log(this.velocity)
    this.y = this.y + this.velocity_y
    this.x = this.x + this.velocity_x

  }
  drawImg() {
    const x = this.x; // x coordinate
    const y = this.y; // y coordinate

    ctx_back.drawImage(imgZombie, x, y, 50, 50); //wait till img loaded //50,50 for size

    // ctx_back.beginPath()
    // const radius = 10; // Arc radius
    // const startAngle = Math.PI * 0; // Starting point on circle //0 is at right horizontal
    // const endAngle = Math.PI * 1.75; // End point on circle
    // const counterclockwise = false;
    // console.log(x)
    // console.log(y)
    // ctx_back.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    // ctx_back.fillStyle = this.color;
    // ctx_back.fill()

  }

  // explode(){

  // }
}

// const zombie_ = new Zombies(80,80,50)
// const zombie_2 = new Zombies(400,400,50)

const zombieS = []

let number = 0;
function startGameLoop() {

  function step() {
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
        if (dist - zom.radius - player_.radius < 5) {
          //alert('game end!')
        }
        //zom.drawImg() 
      })

      //Add new zombies after X steps
      if (number % 10 === 0) {
        zombieS.push(new Zombies(x, y))
      }
      console.log(number);

      //repeat loop
      requestAnimationFrame(() => {
        step();
      })
      number++
    }
  }
  // initiate Loop function
  step();
}
startGameLoop()



// function trajectory_(o, a) {
//   return Math.atan2(o, a) //* 180 / Math.PI;
// }

// console.log(trajectory_(player_.y, player_.x))