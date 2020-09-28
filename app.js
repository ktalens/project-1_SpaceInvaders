// CURRENT BUG-BUGS: space bar causes the hoarde to render again at the top, even though the makehoarde isnt explicitly being called in the spacebar event listener. if you console.log or click before hitting shoot, it will stop the problem, and if you pause then resume, it will stop the problem, but hitting start (or any time another hoard needs to be made, then it will cause the problem to happen again.)

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
var laserGun = [];
var hoardeOfAlienBugs = [];
var levels = [
    {   level: 'ONE',
        bugWidth: 80,
        bugSideMargin: 20,
        bugTopMargin: 10,
        bugHeight: 60,
        bugColor: "rgb(3, 173, 211)",
        //quantity:20,
        speed: .3
    },
    {   level: 'TWO',
        bugWidth: 60,
        bugSideMargin: 80,
        bugTopMargin: 10,
        bugHeight: 40,
        bugColor: "rgb(67, 51, 157)",
        //quantity:20,
        speed: .5
    },
    {   level: 'THREE',
        bugWidth: 30,
        bugSideMargin: 50,
        bugTopMargin: 50,
        bugHeight: 30,
        bugColor: "rgb(4, 213, 168)",
        //quantity:20,
        speed: 1
    },
    {   level: 'FOUR',
        bugWidth: 15,
        bugSideMargin: 100,
        bugTopMargin: 150,
        bugHeight: 30,
        bugColor: "rgb(211, 180, 3)",
        //quantity:20,
        speed: 1
    }
];
var currentLevel = 0;
var score = 0;
var lives = 2;

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

function makeHoarde (howMany,level) {
    for (let i=0;i<howMany; i++) {
        let width = levels[level].bugWidth;
        let height = levels[level].bugHeight;
        let margin = levels[level].bugSideMargin;
        let color = levels[level].bugColor;
        let startingXpos = margin+((width+margin)*i)
        let startingYpos= levels[level].bugTopMargin;
        var alienBug = new SpaceCreatures(startingXpos, startingYpos, color, width, height); 
        hoardeOfAlienBugs.push(alienBug)
    }  
  };

var thisMany =  Math.floor(parseInt(gameWidth)/(levels[currentLevel].bugWidth+levels[currentLevel].bugSideMargin))

const chargeOnward =() => {
    speed=levels[currentLevel].speed;
    ctx.clearRect(0,0,galaxy.width,galaxy.height);
    for (i=0;i<hoardeOfAlienBugs.length; i++){
        hoardeOfAlienBugs[i].render();
        if (hoardeOfAlienBugs[i].alive === true) {
            hoardeOfAlienBugs[i].y +=speed;
        }
    }
};

function pewpew (e) {
    e.preventDefault();
    switch (e.keyCode) {
        case (32):
            var plasmaBeam= new SpaceCreatures(spaceCowboy.x+7,spaceCowboy.y-17,'rgb(137, 250, 24)',5,12);
            laserGun.push(plasmaBeam);
    } 
};
const plasmaBeamSpeed = () => {
    for (i=0;i<laserGun.length;i++) {
        laserGun[i].render();
        laserGun[i].y -= 10;
        if (laserGun[i].y <0) {
            laserGun.shift();
        }
        console.log(i,'('+laserGun[i].x+','+laserGun[i].y+')')
    }
};

function detectHit () {
    if (laserGun.length > 0) {
        for (i=0; i<laserGun.length; i++) {
            for (j=0; j<hoardeOfAlienBugs.length; j++) {
                if (laserGun[i].y <= hoardeOfAlienBugs[j].y+hoardeOfAlienBugs[j].height 
                    && laserGun[i].y >= hoardeOfAlienBugs[j].y
                    && laserGun[i].x >= hoardeOfAlienBugs[j].x
                    && laserGun[i].x+5 <= hoardeOfAlienBugs[j].x+hoardeOfAlienBugs[j].width) {
                        hoardeOfAlienBugs[j].alive=false;
                        hoardeOfAlienBugs[j].color='rgb(0, 0, 0)';
                    }
            }
            
        }
    }
};
//detectHit();


// What needs to happen at every frame? 
//1.display score(number of aliens destroyed)
//2. has the win condition been met?
//3. has the lose condition been met?
//4.render the remaining aliens down left or right one increment from the last position
//5. display how many aliens have been eliminated in the running scoreboard
//6.render hero 
//7.has a bullet been deployed (spacebar key:32) ? if yes, 7b.render hero bullet 7c. check collison

function gameLoop(){
    ctx.clearRect(0,0,galaxy.width,galaxy.height);
    chargeOnward();
    plasmaBeamSpeed();
    spaceCowboy.render();
    statusboard.textContent = `X: ${spaceCowboy.x} Y: ${spaceCowboy.y}`;
  level.textContent = levels[currentLevel].level;
  galaxy.addEventListener("click", function (e) {
    livesboard.innerText = `X:${e.offsetX} Y: ${e.offsetY}`;
  });
  detectHit()
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
    document.addEventListener('keydown',moonWalk);
    document.addEventListener('keydown',pewpew);
    //SETTING A TIMER FOR 60 FRAMES PER SECOND
    var runGame = setInterval(gameLoop, 60);

    start.addEventListener('click',function () {
    makeHoarde(thisMany,currentLevel);
    });

    levelUp.addEventListener('click', function () {currentLevel+=1});
    pause.addEventListener('click',function () {
        clearInterval(runGame);
        pauseScreen.style.display = "inline-flex";    
    } );
    resume.addEventListener('click',function () {
        pauseScreen.style.display = "none";
        runGame = setInterval(gameLoop, 60)})

  }
);