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

function random(min, max) {
 return Math.random() * (max - min) + min;
}

function floor(n) {
  return Math.floor(n);
}

function ceil() {
  return Math.ciel(n);
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
      this.entity.show();
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
  // console.log(this);
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

function generateGrid(columns, rows) {
  for (var r = 0; r < rows; r++) {
    grid[r] = [];
    for (var c = 0; c < columns; c++) {
      grid[r][c] = new Cell(c, r, CELLSIZE, WALLCOLOR);
    }
  }
  // console.log(grid);
}

rect(0, 0, canvas.width, canvas.height, "white");
generateGrid(columns, rows);
for (var r = 0; r < grid.length; r++) {
  for (var c = 0; c < grid[r].length; c++) {
    grid[r][c].show();
  }
}

var
r = floor(random(1, rows)),
c = floor(random(1, columns));

grid[r][c].entity =  new Entity(grid[r][c], CELLSIZE, "red", 10);
// console.log(grid);

for (var r = 0; r < grid.length; r++) {
  for (var c = 0; c < grid[r].length; c++) {
    grid[r][c].show();
  }
}
