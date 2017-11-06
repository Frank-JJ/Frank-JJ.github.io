//Fetch the canvas and it's context for use
var canvas = document.getElementById("canvas"),
canvasContext = canvas.getContext("2d");

//Function for creating a rectangle, via x- and y-coordinate, and width, height and color
function rect(x,y,width,height,color) {
  canvasContext.fillStyle = color; //"color" has to be defined with "" or '', else the function won't work
  canvasContext.fillRect(x,y,width,height);
}

function line(x0,y0,x1,y1,color) {
  canvasContext.strokeStyle = color;
  canvasContext.beginPath();
  canvasContext.moveTo(x0,y0);
  canvasContext.lineTo(x1,y1);
  canvasContext.stroke();
}

// rect(0,0,canvas.width,canvas.height,"#272727");

function Index(c,r) {
  if (c >= 0 && c < cols && r >= 0 && r < rows) {
    return c + r * cols;
  }
}

function Cell(c, r) {
  this.fl = false;
  this.c = c;//Cells column
  this.r = r;//Cell row
  this.visited = false;
  this.color = "#272727";
  this.walls = [true, true, true, true];
  this.fl = false;
  this.before;
  this.current = false;

  //Draw the four walls, in the order Top-Right-Bottom-Left
  this.show = function() {
    if (this.current || this.fl) {
      this.color = "#bfbfbf";
    }else if (this.visited) {
      this.color = "#4d4d4d";
    }
    var x = this.c * CELLSIZE,
    y = this.r * CELLSIZE,
    wallColor = WALLCOLOR;
    rect(x,y,CELLSIZE,CELLSIZE,this.color);
    if (this.walls[0]) {
      line(x,y,x+CELLSIZE,y,wallColor);//Top
    }
    if (this.walls[1]) {
      line(x+CELLSIZE,y,x+CELLSIZE,y+CELLSIZE,wallColor);//Right
    }
    if (this.walls[2]) {
      line(x,y+CELLSIZE,x+CELLSIZE,y+CELLSIZE,wallColor);//Bottom
    }
    if (this.walls[3]) {
      line(x,y,x,y+CELLSIZE,wallColor);//Left
    }
  }

  this.checkNeighbors = function() {
    var neighbors = [[],[]];
    var index = Index(this.c, this.r);
    // console.log(index);
    // console.log(grid[index]);
    var top = grid[Index(this.c, this.r - 1)],
    right = grid[Index(this.c + 1, this.r)],
    bottom = grid[Index(this.c, this.r + 1)],
    left = grid[Index(this.c - 1, this.r)];

    if (top && !top.visited) {
      neighbors[0].push(top);
      neighbors[1].push(0);
      // console.log("top not visited");
    }
    if (right && !right.visited) {
      neighbors[0].push(right);
      neighbors[1].push(1);
      // console.log("right not visited");
    }
    if (bottom && !bottom.visited) {
      neighbors[0].push(bottom);
      neighbors[1].push(2);
      // console.log("bottom not visited");
    }
    if (left && !left.visited) {
      neighbors[0].push(left);
      neighbors[1].push(3);
      // console.log("left not visited");
    }
    // console.log(neighbors);
    if (neighbors[0].length > 0) {
      // console.log("neighbors are available");
      var r = Math.floor(Math.random() * neighbors[0].length);
      return [neighbors[0][r],neighbors[1][r]];
    }else {
      return [undefined,undefined];
    }
  }
}

var CELLSIZE = canvas.width/10,
cols = Math.floor(canvas.width / CELLSIZE),
rows = Math.floor(canvas.height / CELLSIZE),
grid = [],
WALLCOLOR = "#acacac",
current,
FRAMERATE = 60,
done = false;

function createCells() {
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      grid.push(new Cell(c, r));
    }
  }
  // console.log(grid);
}

function show() {
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
}

function setup() {
  current = grid[Math.floor(Math.random()*(grid.length-1))];
  current.fl = true;
  current.current = true;
  // console.log(current);
}

function run() {
  done = true
  for (var i = 0; i < grid.length; i++) {
    if (!grid[i].visited) {
      done = false;
    }
  }
  if (done) {
    clearInterval(interval);
  }else {
    current.visited = true;
    show();
    var [next,r] = current.checkNeighbors();
    // console.log([next,r]);
    // console.log(neighbor);
    if (next) {
      current.walls[r] = false;
      next.walls[(r+2)%4] = false;
      next.before = current;
      current.current = false;
      next.current = true;
      current = next;
    }else if (current.before) {
      next = current.before;
      current.current = false;
      next.current = true;
      current = next;
    }else {
      done = true;
      console.log("done");
    }
  }
}

createCells();
show();
setup();
function live(live) {
  if (live) {
    var interval = setInterval(function () {
    }, 1000/FRAMERATE);
  }else {
    while (!done) {
      run();
    }
  }
}
live(false)
