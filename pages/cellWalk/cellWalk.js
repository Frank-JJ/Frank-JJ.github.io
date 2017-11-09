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

function randomCell() {
  return grid[Math.ceil(Math.random() * rows) - 1][Math.ceil(Math.random() * columns) - 1];
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
  this.entity;
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
    if (this.entity != undefined) {
       console.log(this.column + " " + this.row + "have" + this.entity + " as entity");
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
  console.log(this);
}

var CELLSIZE = 40,
columns = Math.floor(canvas.width / CELLSIZE),
rows = Math.floor(canvas.height / CELLSIZE),
grid = [],
WALLCOLOR = "black",
listener = new window.keypress.Listener(),
FRAMERATE = 60,
PC,
Mob,
entities = [];

function generateGrid() {
  for (var r = 0; r < rows; r++) {
    grid.push([]);
    for (var c = 0; c < columns; c++) {
      grid[r].push(new Cell(c, r, CELLSIZE, WALLCOLOR));
    }
  }
  // console.log("Grid Generated");
}

function generatePC() {
  var PC_Cell = randomCell();
  PC = new Entity(PC_Cell, CELLSIZE, "green", 10);
  PC_Cell.entity = PC;
  entities.push(PC);
  console.log("PC Generated");
}

function generateMob() {
  var Mob_Cell = randomCell();
  if (Mob_Cell.column == PC.column && Mob_Cell.row == PC.row) {
    generateMob();
  }
  Mob = new Entity(Mob_Cell, CELLSIZE, "red", 10);
  Mob_Cell.entity = Mob;
  entities.push(Mob);
  console.log("Mob Generated in cell" + Mob_Cell);
}

function show() {
  rect(0, 0, canvas.width, canvas.height, "white");
  for (var r = 0; r < grid.length; r++) {
    for (var c = 0; c < grid[r].length; c++) {
      grid[r][c].show();
    }
  }
}


function setup() {
  generateGrid();
  generatePC();
  generateMob();
  show();
  listener.simple_combo("up", function () {
    console.log("up");
    if (PC.row > 0) {
      if (PC.row < Mob.row || PC.row > Mob.row + 1 || PC.column < Mob.column || PC.column > Mob.column) {
        PC.row -= 1;
      }
    }
  });
  listener.simple_combo("right", function functionName() {
    console.log("right");
    if (PC.column < columns - 1) {
      if (PC.row < Mob.row || PC.row > Mob.row || PC.column < Mob.column || PC.column > Mob.column) {
        PC.column += 1;
      }
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
// setInterval(function () {
//   run();
// }, 1000 / FRAMERATE);
