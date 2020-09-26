

var galaxy = document.getElementById("galaxy");
var ctx = galaxy.getContext("2d");
// galaxy.setAttribute('width', '1400');
// galaxy.setAttribute('height', '800');
// ctx.width = galaxy.width;
// ctx.height = galaxy.height;
let gameHeight= getComputedStyle(galaxy)['height'];
let gameWidth= getComputedStyle(galaxy)['width'];
galaxy.setAttribute('height', gameHeight);
galaxy.setAttribute('width', gameWidth);


 //CREATE SPACEGUYS
var spaceCowboy;
var spaceBugs;
var hoardeOfAlienBugs = []

function SpaceCreatures(x,y,color,width,height) {
    this.x = x
    this.y=y
    this.color = color
    this.width = width
    this.height= height
    this.alive = true
    this.render = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
};

function makeHoarde (howMany) {
  
  for (let i=0;i<howMany-1; i++) {
    let bugWidth = 80;
    let bugMargin = 10;
    var startingXpos = bugMargin+((bugWidth+bugMargin)*i)
    var startingYpos= bugMargin;
    var alienBug = new SpaceCreatures(startingXpos, startingYpos, "rgb(67, 51, 157)", bugWidth, 20); 
    hoardeOfAlienBugs.push(alienBug)
    
    }  
  };
  makeHoarde(5);
// What needs to happen at every frame? 
//1.display score(number of aliens destroyed)
//2. has the win condition been met?
//3. has the lose condition been met?
//4.render the remaining aliens down left or right one increment from the last position
//5. display how many aliens have been eliminated in the running scoreboard
//6.render hero 
//7.has a bullet been deployed (spacebar key:32) ? if yes, 7b.render hero bullet 7c. check collison

function gameLoop(){
  //Clear my shadow
  ctx.clearRect(0,0,galaxy.width,galaxy.height);
//TO-DO; add a function for passive movement of your spaceBugs
  
  for (i=0;i<hoardeOfAlienBugs.length; i++){
    hoardeOfAlienBugs[i].render()
  }
  //spaceBugs.render(); 
  //console.log('Hi cowboy!')
  spaceCowboy.render();
  statusboard.textContent = `X: ${spaceCowboy.x} Y: ${spaceCowboy.y}`;
  galaxy.addEventListener("click", function (e) {
    livesboard.innerText = `X:${e.offsetX} Y: ${e.offsetY}`;
  })
};

function moonWalk(e) {
  let stepSize= 50;
  let boundary = parseInt(gameWidth)
  if (e.keyCode === 39) {
    if(spaceCowboy.x+stepSize < boundary) {
      //MOVE RIGHT one step size if x + stepSize is less than gameWidth
      spaceCowboy.x += stepSize
    } else if (spaceCowboy.x+stepSize >= boundary && (spaceCowboy.x+spaceCowboy.width) <= boundary) {
      //MOVE RIGHT for the remaining size if x + stepSize is more than gameWidth but x is still inside gameWidth
      spaceCowboy.x += boundary-(spaceCowboy.x+spaceCowboy.width)
    }
  } else if (e.keyCode === 37) {
    if(spaceCowboy.x-stepSize>=0){
      //MOVE LEFT one stepSize if x - stepSize > 0
      spaceCowboy.x -= stepSize
    } else if (spaceCowboy.x-stepSize <0 && (spaceCowboy.x >= 0)) {
      //MOVE LEFT for the remaining size if x - stepSize will be negative but x is still greater than or equal to 0
      spaceCowboy.x -= spaceCowboy.x
    }
  }

};

document.addEventListener('DOMContentLoaded', 
function() {
    spaceCowboy= new SpaceCreatures(parseInt(gameWidth)/2,parseInt(gameHeight)-30,'rgb(230, 92, 177)',20,20);
    spaceBugs = new SpaceCreatures(10,10,'rgb(31, 121, 97)',40,80);
    document.addEventListener('keydown',moonWalk);
    //SETTING A TIMER FOR 60 FRAMES PER SECOND
    var runGame = setInterval(gameLoop, 60);
  }
);