
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')
canvas.height = window.innerHeight
canvas.width = window.innerWidth


const backgroundImg = new Image();
backgroundImg.onload = function () {
   ctx.drawImage(backgroundImg,0,0,550,700); //wait till img loaded
}
backgroundImg.src = "./assets/PokeGoldDemo-SilentHills.png";



//create a Class for game Objects
class Player{
  constructor(x,y,radius){
    this.x=x;
    this.y=y;
    this.radius=radius;
    // this.canvas = this.document.getElementById('#canvas');
    // this.ctx = this.canvas.getContext('2d')
  }

    draw(){
      ctx.beginPath()
        const x = this.x ; // x coordinate
        const y = this.y ; // y coordinate
        const radius = this.radius; // Arc radius
        const startAngle = Math.PI *0; // Starting point on circle //0 is at right horizontal
        const endAngle = Math.PI *2; // End point on circle
        const counterclockwise = false; 
        ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
        ctx.stroke()
    }
    drawImg(){
      const x = this.x ; // x coordinate
      const y = this.y ; // y coordinate
      const img = new Image();
      img.onload = function () {
      ctx.drawImage(img,x ,y ,30,40 ); //wait till img loaded
          }
      img.src = "./assets/person.png";
      }
  }
  
const x = canvas.width /2 
console.log(x)
const y = canvas.height/2
console.log(y)  
const player_ = new Player(x,y,50)
//player_.draw()
player_.drawImg()
console.log(player_.x)
console.log(player_)

class Zombies{
  constructor(x,y,radius){
    this.x=x;
    this.y=y;
    this.radius=radius;
  }
    drawImg(){
      const x = this.x ; // x coordinate
      const y = this.y ; // y coordinate
      const img = new Image();
      img.onload = function () {
      ctx.drawImage(img,x ,y ,50,50); //wait till img loaded
          }
      img.src = "./assets/zombies.png";
      }
  }

const zombie_ = new Zombies(80,80,50)
zombie_.drawImg()

// setTimeout(() =>{
//   player_.drawImg()
// },1000)




