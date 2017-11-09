//Fetch the canvas and it's context for use
var canvas = document.getElementById("canvas"),
canvasContext = canvas.getContext("2d");

//General Functions
//Function for creating a rectangle, via x- and y-coordinate, and width, height and color
function frect(x, y, w, h, c) {//w = width; h = height; c = color
  canvasContext.fillStyle = c; //c has to be defined with "" or '', else the function won't work
  canvasContext.fillRect(x, y, w, h);
}

function srect(x, y, w, h, c) {//w = width; h = height; c = color
  canvasContext.strokeStyle = c;
  canvasContext.strokeRect(x, y, w, h);
}

function line(x0,y0,x1,y1,c) {//c = color
  canvasContext.strokeStyle = c;
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

//Specific Functions
function newRoom() {
  let
  w = floor(random(MIN_SIZE, MAX_SIZE)),//width
  h = floor(random(MIN_SIZE, MAX_SIZE)),//height
  x = floor(random(0 + DISTANCE_BETWEEN_ROOMS, canvas.width - w - DISTANCE_BETWEEN_ROOMS)),//top left x-coordinate
  y = floor(random(0 + DISTANCE_BETWEEN_ROOMS, canvas.height - h - DISTANCE_BETWEEN_ROOMS)),//top left y-coordinate
  c = ROOMCOLOR,//color
  ws = WALLSIZE,//width/size/thickness of walls
  wc = WALLCOLOR;//wallcolor
  // console.log("Generated new room; x: " + x + " y: " + y + " w: " + w + " h: " + h + " c: " + c + " ws: " + ws + " wc: " + wc);
  return new Room(x, y, w, h, c, ws, wc);
}

function sameRoom(room) {
  if (rooms.length > 0) {
    for (var i = 0; i < rooms.length; i++) {
      if (room.x - DISTANCE_BETWEEN_ROOMS <= rooms[i].x + rooms[i].w &&
        room.x + room.w >= rooms[i].x - DISTANCE_BETWEEN_ROOMS &&
        room.y - DISTANCE_BETWEEN_ROOMS <= rooms[i].y + rooms[i].h &&
        room.y + room.h >= rooms[i].y - DISTANCE_BETWEEN_ROOMS) {
          return true;
      }
    }
    return false;
  }else {
    return false;
  }
}

function show() {
  frect(0, 0, canvas.width, canvas.height, BACKGROUND);
  for (var i = 0; i < rooms.length; i++) {
    rooms[i].show();
  }
}

//Objects
function Room(x, y, w, h, c, ws, wc) {//w = width; h = height; c = color; ws = wallsize
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = c;
  this.ws = ws;
  this.wc = wc
  this.show = function () {
    frect(this.x, this.y, this.w, this.h, this.wc);
    frect(this.x + this.ws, this.y + this.ws, this.w - this.ws * 2, this.h - this.ws * 2, this.c);
  }
}

//Global Variables
var
BACKGROUND = "white",
ATTEMPTS = 100,
attempts = 0,
MAX_SIZE = 100,
MIN_SIZE = 20,
WALLCOLOR = "black",
ROOMCOLOR = "grey",
rooms = [],
WALLSIZE = 1,
TILESIZE = 5,
DISTANCE_BETWEEN_ROOMS = TILESIZE * 3 + WALLSIZE,
live = false,
FRAMERATE = 60;

//Actual Program
if (live) {
  setInterval(function () {
    if (attempts < ATTEMPTS) {
      let room = newRoom();
      if (sameRoom(room)) {
        attempts++;
        // console.log("Collsion Detected!" + " Adding attempt. Total attempts: " + attempts);
      }else {
        rooms.push(room);
      }
    }
    show();
  }, 1000 / FRAMERATE);
}else {
  while (attempts < ATTEMPTS) {
    let room = newRoom();
    if (sameRoom(room)) {
      attempts++;
      // console.log("Collsion Detected!" + " Adding attempt. Total attempts: " + attempts);
    }else {
      rooms.push(room);
    }
  }
  show();
}
