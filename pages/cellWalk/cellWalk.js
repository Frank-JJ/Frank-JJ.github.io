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

function Cell(column, row, cellSize, wallColor) {
  this.column = column;
  this.row = row;
  this.cellSize = cellSize;
  this.wallColor = wallColor
  this.x = function () {
    return this.column * CELLSIZE;
  }
  this.y = function () {
    return this.row * CELLSIZE;
  }
  this.walls = [true,true,true,true];
  this.show = function () {
    if (this.walls[0]) {
      line(this.x(), this.y(), this.x() + this.cellSize, this.y(), this.color);
    }
    if (this.walls[1]) {
      line(this.x() + this.cellSize, this.y(), this.x() + this.cellSize, this.y() + this.cellSize, this.color);
    }
    if (this.walls[2]) {
      line(this.x() + this.cellSize, this.y() + this.cellSize, this.x(), this.y() + this.cellSize, this.color);
    }
    if (this.walls[3]) {
      line(this.x(), this.y() + this.cellSize, this.x(), this.y(), this.color);
    }
  }
}

function Entity(cell, size, color, hp) {
  this.column = cell.column;
  this.row = cell.row;
  this.size = size;
  this.color = color;
  this.hp = hp;
  this.x = function () {
    return this.column * CELLSIZE;
  }
  this.y = function () {
    return this.row * CELLSIZE;
  }
  this.show = function () {
    rect(this.x() + 1, this.y() + 1, this.size - 2, this.size - 2, this.color);
  }
}

var CELLSIZE = 40,
columns = Math.floor(canvas.width / CELLSIZE),
rows = Math.floor(canvas.height / CELLSIZE),
grid = [],
WALLCOLOR = "black",
listener = new window.keypress.Listener(),
FRAMERATE = 60,
PC;

function generateGrid() {
  for (var r = 0; r < rows; r++) {
    grid.push([]);
    for (var c = 0; c < columns; c++) {
      grid[r].push(new Cell(c, r, CELLSIZE, WALLCOLOR));
    }
  }
}

function show() {
  rect(0, 0, canvas.width, canvas.height, "white");
  for (var r = 0; r < grid.length; r++) {
    for (var c = 0; c < grid[r].length; c++) {
      grid[r][c].show();
    }
  }
  PC.show();
}


function setup() {
  generateGrid();
  PC = new Entity(grid[Math.ceil(rows / 2) - 1][Math.ceil(columns / 2) - 1], CELLSIZE, "red", 10);
  show();
  listener.simple_combo("up", function () {
    console.log("up");
    if (PC.row > 0) {
      PC.row -= 1;
    }
  });
  listener.simple_combo("right", function functionName() {
    console.log("right");
    if (PC.column < columns - 1) {
      PC.column += 1;
    }
  });
  listener.simple_combo("down", function functionName() {
    console.log("down");
    if (PC.row < rows - 1) {
      PC.row += 1;
    }
  });
  listener.simple_combo("left", function functionName() {
    console.log("left");
    if (PC.column > 0) {
      PC.column -= 1;
    }
  });
}

function run() {
  show();
}

setup();
setInterval(function () {
  run();
}, 1000 / FRAMERATE);
