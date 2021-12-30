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



let imagesZom = [];
//imagesZom.length =10;
//console.log(imagesZom.length)

//push images in
let k = 1
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

let j = 1 //for zombieLoop



function drawSpriteZom(img, dX, dY, dW, dH) {
  ctx_back.drawImage(img, dX, dY, dW, dH);
}


class Zombies {
  constructor(x, y, radius) {
    let randomX = Math.floor(Math.random() * canvas_back.width)
    let randomY = Math.floor(Math.random() * canvas_back.height)
    this.x = randomX;
    this.y = randomY;
    this.radius = 10;
    this.velocity_y = ((player_.y - this.y) / 100);
    this.velocity_x = ((player_.x - this.x) / 100);
    this.color = 'green'
    this.zomWidthExt = 124;
    this.zomHeightExt = 124;
  }

  update() {
    this.drawImg()   //update image location
    console.log(this.velocity)
    this.y = this.y + this.velocity_y
    this.x = this.x + this.velocity_x

  }
  
  drawImg() {
    let zomX = this.x; // x coordinate
    let zomY = this.y; // y coordinate

    this.zombieAnimateLoop(zomX,zomY)
    
    }

  zombieAnimateLoop(zomX,zomY){
    
      if (j < 11) { 
        console.log(j)
        drawSpriteZom(imagesZom[j], zomX, zomY, this.zomWidthExt, this.zomHeightExt);
        console.log(imagesZom[j])
        j++
       } else {
         j = 1
         drawSpriteZom(imagesZom[j], zomX, zomY, this.zomWidthExt, this.zomHeightExt);
      }

    }
    //ctx_back.drawImage(imgZombie, x, y, 50, 50); //wait till img loaded //50,50 for size

}


// //let zomFrameX = 3;            //which sprite in sprite sheet
// //let zomFrameY = 0;            //which sprite in sprite sheet
// let zomX = 100;                  //position in canvas
// let zomY = 100;                  //posittion in canvas
// const zomSpeed = 6;

// let j = 1
// let frameCounter = 0
// function animateZombie() {
//     if (j > 10) { j = 1 } else {
        
//         //set frame speed
//         frameCounter++
//         if (frameCounter % 5 === 0){
//         console.log(j)
//         drawSpriteZom(imagesZom[j], zomX, zomY, zomWidthExt, zomHeightExt);
//         console.log(imagesZom[j])
//         }
//     }
//     j++
// }






// const zombie_ = new Zombies(80,80,50)
// const zombie_2 = new Zombies(400,400,50)



// function trajectory_(o, a) {
//   return Math.atan2(o, a) //* 180 / Math.PI;
// }

// console.log(trajectory_(player_.y, player_.x))

console.log('working Objects')