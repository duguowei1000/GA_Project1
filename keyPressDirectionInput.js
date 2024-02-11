//create a keypress Class for game Objects
function simulateKeyPress(key) {
  const event = new KeyboardEvent('keydown', { key });
  document.dispatchEvent(event);//text
  console.log('simulating')
} 

class DirectionInput {
    constructor() {
      this.heldDirections = [];
      this.map = {
        "ArrowUp": "up",
        "KeyW": "up",
        "ArrowDown": "down",
        "KeyS": "down",
        "ArrowLeft": "left",
        "KeyA": "left",
        "ArrowRight": "right",
        "KeyD": "right",
      }
    }

    keypress(){
      simulateKeyPress('ArrowUp')
    }
  
    get direction() {
      console.log(this.heldDirections[0])
      return this.heldDirections[0] 
    }

    initKeys() {

      // if (touch){

      // }
      document.addEventListener('click', (e) => {

        const mousePos = {
          x: e.clientX - canvas_back.offsetLeft,
          y: e.clientY - canvas_back.offsetTop
      
        };
        let x = e.clientX - canvas_back.offsetLeft
        let y = e.clientY - canvas_back.offsetTop
        
        console.log("x",x,"y",y)
        if(x<200){
          const dir = 'left'
          console.log('here',dir)
          if (dir && this.heldDirections.indexOf(dir) === -1) {
            this.heldDirections.unshift(dir);
            // console.log(this.heldDirections)
          }
        }
        if(x>200){
          const dir = 'right'
          console.log('here',dir)
          if (dir && this.heldDirections.indexOf(dir) === -1) {
            this.heldDirections.unshift(dir);
            // console.log(this.heldDirections)
          }
        }


      });


      document.addEventListener("keydown", e => {
        //console.log(e.code);
        const dir = this.map[e.code]
        if (dir && this.heldDirections.indexOf(dir) === -1) {
          this.heldDirections.unshift(dir);
          // console.log(this.heldDirections)
        }
      });
      document.addEventListener("keyup", e => {
        const dir = this.map[e.code];
        const index = this.heldDirections.indexOf(dir);
        if (index > -1) {
          this.heldDirections.splice(index, 1);
          console.log(this.heldDirections)
        }
      })
  
    }
  }
  