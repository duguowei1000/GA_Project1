//create a keypress Class for game Objects

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
      document.addEventListener('mousedown', (e) => {

        // const mousePos = {
        //   x: e.clientX - canvas_back.offsetLeft,
        //   y: e.clientY - canvas_back.offsetTop
      
        // };
        let x = e.pageX//clientX - canvas_back.offsetLeft
        let y = e.pageY- canvas_back.offsetTop//clientY - canvas_back.offsetTop
        
        // console.log( 'canvas_back.height',canvas_back.height)
        // console.log( 'canvas_back.width',canvas_back.width)

        
        // console.log("midXaxis",midXaxis)
        // console.log("midYaxis",midYaxis)
        // console.log("x",x,"y",y)
        
        if( y >(midYaxis -50) && y < (midYaxis+50)){
          if(x<midXaxis){
            const dir = 'left'
            console.log('here',dir)
            if (dir && this.heldDirections.indexOf(dir) === -1) {
              this.heldDirections.unshift(dir);
              // console.log(this.heldDirections)
            }
          }else if(x>midXaxis){
            const dir = 'right'
            console.log('here',dir)
            if (dir && this.heldDirections.indexOf(dir) === -1) {
              this.heldDirections.unshift(dir);
              // console.log(this.heldDirections)
            }
          }

        }
        if( x >(midXaxis -50) && x < (midXaxis+50)){
          if(y<midYaxis){
            const dir = 'up'
            console.log('here',dir)
            if (dir && this.heldDirections.indexOf(dir) === -1) {
              this.heldDirections.unshift(dir);
              // console.log(this.heldDirections)
            }
          }else if(y>midYaxis){
            const dir = 'down'
            console.log('here',dir)
            if (dir && this.heldDirections.indexOf(dir) === -1) {
              this.heldDirections.unshift(dir);
              // console.log(this.heldDirections)
            }
          }

        }



      });
      document.addEventListener('mouseup', (e) => {
        this.heldDirections= []
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
  