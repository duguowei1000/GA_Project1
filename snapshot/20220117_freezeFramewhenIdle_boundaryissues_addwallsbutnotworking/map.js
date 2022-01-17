class Map {
    constructor() {
      this.walls = {};
    }
  
    isSpaceTaken(currentX, currentY, direction) {
      const {x,y} = utils.nextPosition(currentX, currentY, direction);
      return this.walls[`${x},${y}`] || false;  //check if the wall is true at x and y
    }
  
    addWall(y) {
      this.walls[`${x},${y}`] = true;
    
    }
    // removeWall(x,y) {
    //   delete this.walls[`${x},${y}`]
    // }
    // moveWall(wasX, wasY, direction) {
    //   this.removeWall(wasX, wasY);
    //   const {x,y} = utils.nextPosition(wasX, wasY, direction);
    //   this.addWall(x,y);
    // }
  
  }

  const utils = {
    withGrid(n) {
      return n * 16;
    },
    asGridCoord(x,y) {
      return `${x*16},${y*16}`
    },
    nextPosition(initialX, initialY, direction) {
      let x = initialX;
      let y = initialY;
      const size = 16;
      if (direction === "left") { 
        x -= size;
      } else if (direction === "right") {
        x += size;
      } else if (direction === "up") {
        y -= size;
      } else if (direction === "down") {
        y += size;
      }
      return {x,y};
    }
    
  }

