const canvas_back = document.getElementById('canvas_back');
const canvas_front = document.getElementById('canvas_front');
const ctx_back = canvas_back.getContext('2d')
const ctx_front = canvas_front.getContext('2d')

canvas_back.height = window.innerHeight
canvas_back.width = window.innerWidth
canvas_front.height = window.innerHeight
canvas_front.width = window.innerWidth


const backgroundImg = new Image();
backgroundImg.onload = function () {
   ctx_back.drawImage(backgroundImg,0,0,550,700); //wait till img loaded
}
backgroundImg.src = "./assets/PokeGoldDemo-SilentHills.png";



//create a Class for game Objects
class Player{
  constructor(x,y,radius){
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color='green'
    // this.canvas = this.document.getElementById('#canvas');
    // this.ctx = this.canvas.getContext('2d')
  }

    draw(){
      ctx_front.beginPath()
        const x = this.x ; // x coordinate
        const y = this.y ; // y coordinate
        const radius = this.radius; // Arc radius
        const startAngle = Math.PI *0; // Starting point on circle //0 is at right horizontal
        const endAngle = Math.PI *2; // End point on circle
        const counterclockwise = false; 
        ctx_front.arc(x, y, radius, startAngle, endAngle, counterclockwise);
        ctx_front.stroke()
    }
    drawImg(){
      const x = this.x ; // x coordinate
      const y = this.y ; // y coordinate
      const img = new Image();
      img.onload = function () {
      ctx_front.drawImage(img,x ,y ,30,40 ); //wait till img loaded
          }
      img.src = "./assets/person.png";
  
    }
    update() {
      this.drawImg()
      }
  }
  
const x = canvas_front.width /2 
console.log(x)
const y = canvas_front.height/2
console.log(y)  
const player_ = new Player(x,y,50)
player_.draw()
player_.drawImg()
console.log(player_.x)
console.log(player_)




class Zombies{
  constructor(x,y,radius){
    let randomX = Math.floor(Math.random()*canvas_front.width)  
    let randomY = Math.floor(Math.random()*canvas_front.height)
    this.x=randomX;
    this.y=randomY;
    this.radius=radius;
    this.velocity_y=((player_.y-this.y)/80);
    this.velocity_x=((player_.x-this.x)/80);
    this.color='green'
  }

  update(){
    this.drawImg()   //update image location
    console.log(this.velocity)
    this.y = this.y + this.velocity_y
    this.x = this.x + this.velocity_x
    
  }
  drawImg(){
    const x = this.x; // x coordinate
    const y = this.y; // y coordinate
    // const img = new Image();
    // img.onload = function () {
    // ctx_front.drawImage(img,x ,y ,50,50); //wait till img loaded //50,50 for size
    //     }
    // img.src = "./assets/zombies.png";

    ctx_front.beginPath()
  // const x = this.x ; // x coordinate
  // const y = this.y ; // y coordinate

    const radius = 10; // Arc radius
    const startAngle = Math.PI *0; // Starting point on circle //0 is at right horizontal
    const endAngle = Math.PI *1.75; // End point on circle
    const counterclockwise = false; 
    console.log(x)
    console.log(y)
    ctx_front.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    ctx_front.fillStyle = this.color;
    ctx_front.fill()

    }

  explode(){
    
  }
  }

// const zombie_ = new Zombies(80,80,50)
// const zombie_2 = new Zombies(400,400,50)

const zombieS = [ ]

let number = 0;
let animate = function () {

  const backgroundImg = new Image();
  backgroundImg.onload = function () {
  ctx_back.drawImage(backgroundImg,0,0,550,700); //wait till img loaded
}
    if (number <100){
		requestAnimationFrame(animate);
    ctx_front.clearRect(0,0,canvas_front.width,canvas_front.height)
    player_.update()
    zombieS.forEach((zom)=> {
      zom.update()
      //zom.drawImg() 
    })
    console.log(number);
    }

    if(number%20===0){
      zombieS.push(new Zombies(x,y))
    }
    number ++
	};
animate()




// function trajectory_(o, a) {
//   return Math.atan2(o, a) //* 180 / Math.PI;
// }

// console.log(trajectory_(player_.y, player_.x))