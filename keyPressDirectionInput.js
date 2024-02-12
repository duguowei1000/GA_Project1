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
    get direction() {
      console.log(this.heldDirections[0])
      return this.heldDirections[0] 
    }

    initKeys() {
      //touch
      document.addEventListener('touchstart', (e) => {
        // const mousePos = {
        //   x: e.clientX - canvas_back.offsetLeft,
        //   y: e.clientY - canvas_back.offsetTop
        // };
        let x = e.targetTouches[0].pageX//clientX - canvas_back.offsetLeft
        let y = e.targetTouches[0].pageY//- canvas_back.offsetTop//clientY - canvas_back.offsetTop
        // console.log("midXaxis",midXaxis)
        // console.log("midYaxis",midYaxis)
        // console.log("x",x,"y",y)

    // ctx_back.fillStyle ='red'
    // ctx_back.beginPath()
    // ctx_back.arc(x,y,5,0,Math.PI*2)
    // ctx_back.fill()
    // ctx_back.stroke()
        
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
      document.addEventListener('touchend', (e) => {
        this.heldDirections= []
        console.log(this.heldDirections[0])
        console.log("ending", e)
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
  