// const imagesX = {}

// imagesX.player = new Image();
// imagesX.player.src = './assets/AdventurerSpriteSheetv1.1.png'
// ctx_back.drawImage(imagesX, 0, 0 , 100,100);
// console.log(images)

const canvas_back = document.getElementById('canvas_back');
const ctx_back = canvas_back.getContext('2d')

canvas_back.height = window.innerHeight
canvas_back.width = window.innerWidth

const imgPerson = new Image();
imgPerson.src = "./assets/person.png";

//const imagesZom = [ ];
//imagesZom.length = 10;

//push images in
// let i = 0
// for (let i = 0; i <= 10; i++) {
//     imagesZom[i] = new Image();
    
//     imagesZom[i].src = `./assets/zombie_male/Walk (${i.toString()}).png`
//     //console.log(i)
//     console.log(imagesZom[i].src)
// }


//const zomWidth = '60';  //per sprite width px based on sheet
//const zomHeight = '120';     //per sprite height px based on sheet
const zomWidthExt = 124;
const zomHeightExt = 124;
//let zomFrameX = 3;            //which sprite in sprite sheet
//let zomFrameY = 0;            //which sprite in sprite sheet
// let zomX = 100;                  //position in canvas
// let zomY = 100;                  //posittion in canvas
// const zomSpeed = 6;

//let j = 1
//let frameCounter = 0


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
function drawSpriteZom(img, dX, dY, dW, dH) {
    ctx_back.drawImage(img, dX, dY, dW, dH);
}
////
console.log('working spriteanimations')
const player_ = new Player(300, 300)
const zom1 = new Zombies (700,700)
const zom2 = new Zombies (400,400)
const zom3 = new Zombies (400,400)


let number = 0
let frameCounter = 0
let startGameLoop = function () {
    //let GameLoop = function ()  {
    if (number < 100) {
        // animateZombie()
        frameCounter++
        
        //if (frameCounter % 1 === 0){
        ctx_back.clearRect(0, 0, canvas_back.width, canvas_back.height)
        //    }
        player_.update()
        
        zom1.update()
        zom2.update()
        zom3.update()
        

    }
    console.log(number);

    number++
    //set timeout causes flickering
    setTimeout(() => {
    requestAnimationFrame(startGameLoop)},300)
}
startGameLoop()