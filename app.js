var galaxy = document.getElementById("galaxy");
var ctx = galaxy.getContext("2d");
let gameHeight= getComputedStyle(galaxy)['height'];
let gameWidth= getComputedStyle(galaxy)['width'];
galaxy.setAttribute('height', gameHeight);
galaxy.setAttribute('width', gameWidth);


 //CREATE SPACEGUYS
var spaceCowboy;
var cowboyImage =document.getElementById('cowboy-2');
var laserGun = [];
let laserImage = document.getElementById('laser');
var hoardeOfAlienBugs = [];
var deadAliens = [];
var currentLevel = 0;
var score = 0;
var lives =3
var thisMany;

var levels = [
    {   level: 'ONE',
        bugWidth: 80,
        bugSideMargin: 20,
        bugTopMargin: 10,
        bugHeight: 80,
        bugImage : document.getElementById('awkward-alien'),
        bugSpeed: 1,
        laserSpeed: 10,
        levelWin: false,
        rounds: 1,
        roundDelay: 4000
    },
    {   level: 'TWO',
        bugWidth: 60,
        bugSideMargin: 80,
        bugTopMargin: 10,
        bugHeight: 60,
        bugImage : document.getElementById('pink-alien'),
        bugSpeed: 2,
        laserSpeed: 15,
        levelWin: false,
        rounds: 2,
        roundDelay: 3000
    },
    {   level: 'THREE',
        bugWidth: 45,
        bugSideMargin: 50,
        bugTopMargin: 50,
        bugHeight: 50,
        bugImage : document.getElementById('green-alien'),
        bugSpeed: 2,
        laserSpeed: 30,
        levelWin: false,
        rounds: 4,
        roundDelay: 2000
    },
    {   level: 'FOUR',
        bugWidth: 40,
        bugSideMargin: 100,
        bugTopMargin: 10,
        bugHeight: 30,
        bugImage : document.getElementById('ufo'),
        bugSpeed: 5,
        laserSpeed: 50,
        levelWin: false,
        rounds: 5,
        roundDelay: 1000
    }
];


function SpaceCreatures(img,x,y,width,height) {
    this.img= img
    this.x = x
    this.y=y
    this.width = width
    this.height= height
    this.alive = true

    this.render = function () {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    
};

function makeHoarde (howMany,level) {
    for (let i=0;i<howMany; i++) {
        let width = levels[level].bugWidth;
        let height = levels[level].bugHeight;
        let margin = levels[level].bugSideMargin;
        let img = levels[level].bugImage;
        let startingXpos = margin+((width+margin)*i)
        let startingYpos= levels[level].bugTopMargin;
        var alienBug = new SpaceCreatures(img, startingXpos, startingYpos, width, height); 
        hoardeOfAlienBugs.push(alienBug)
    }  
  };



const chargeOnward =() => {
    let speed=levels[currentLevel].bugSpeed;
    ctx.clearRect(0,0,galaxy.width,galaxy.height);
    for (i=0;i<hoardeOfAlienBugs.length; i++){
        hoardeOfAlienBugs[i].render();
        if (hoardeOfAlienBugs[i].alive === true && hoardeOfAlienBugs[i].y<=parseInt(gameHeight)) {
            hoardeOfAlienBugs[i].y +=speed;
        }
    }
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

function pewpew (e) {
    e.preventDefault();
    
    switch (e.keyCode) {
        case (32):
            var plasmaBeam= new SpaceCreatures(laserImage,spaceCowboy.x+15,spaceCowboy.y-30,20,50);
            laserGun.push(plasmaBeam);
    } 
};
const plasmaBeamSpeed = () => {
    let beamSpeed = levels[currentLevel].laserSpeed
    for (i=0;i<laserGun.length;i++) {
        laserGun[i].render();
        laserGun[i].y -= beamSpeed;
        if (laserGun[i].y <0) {
            laserGun.shift();
        }
    }
};

function detectHit () {
    if (laserGun.length > 0) {
        for (i=0; i<laserGun.length; i++) {
            if (laserGun[i].width > 0){
            for (j=0; j<hoardeOfAlienBugs.length; j++) {
                if (laserGun[i].y <= hoardeOfAlienBugs[j].y+hoardeOfAlienBugs[j].height 
                    && laserGun[i].y >= hoardeOfAlienBugs[j].y
                    && laserGun[i].x+5 >= hoardeOfAlienBugs[j].x
                    && laserGun[i].x <= hoardeOfAlienBugs[j].x+hoardeOfAlienBugs[j].width) {
                        hoardeOfAlienBugs[j].alive=false;
                        hoardeOfAlienBugs[j].width = 0;
                        hoardeOfAlienBugs[j].height=0;
                        laserGun[i].height=0;
                        laserGun[i].width=0;
                    }
            }
        }
        }
    }
};


const countDead =() => {
    for (i=0; i<hoardeOfAlienBugs.length; i++) {
        if (hoardeOfAlienBugs[i].alive === false) {
            while (deadAliens.includes(i)==false) {
                deadAliens.push(i);
                score ++
            }
        }
    } return 
};

const checkLose = () => {
    for (i=0; i<hoardeOfAlienBugs.length; i++) {
        if (hoardeOfAlienBugs.length > 0 && deadAliens.length === hoardeOfAlienBugs.length) {
            ctx.strokeStyle = 'rgb(0, 238, 242)';
            ctx.lineWidth = 3;
            ctx.strokeText('VICTORY! PROCEED TO NEXT LEVEL',parseInt(gameWidth)/10,parseInt(gameHeight)/2);
            ctx.font = '300% Verdana';
            levels[currentLevel].levelWin = true;
            levelUp.style.opacity = 1;
            levelUp.disabled = false;
            
        } else if (hoardeOfAlienBugs.length > 0 && hoardeOfAlienBugs[i].y+hoardeOfAlienBugs[i].height >= parseInt(gameHeight)) {
            spaceCowboy.alive = false;
            ctx.strokeStyle = 'rgb(223, 32, 67)';
            ctx.lineWidth = 3;
            ctx.strokeText('MISSION FAILED! TRY AGAIN :(',parseInt(gameWidth)/6,parseInt(gameHeight)/2);
            ctx.font = '300% Verdana';
            levelUp.style.display='none';
            start.innerText= 'TRY AGAIN';
            start.style.display = 'inline';
        }
    }
    
        
    
};




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
    level.textContent = levels[currentLevel].level;
    document.getElementById('lives').innerText = lives;//.length;
    detectHit();
    document.getElementById('score').innerText = score;
    countDead();
    checkLose();
    document.getElementById('status').innerText = `Destroy the incoming hoarde of ${thisMany*levels[currentLevel].rounds} aliens`;
    if (lives === 0) {
        start.disabled = true;
        start.style.opacity = .4
    } 
};





document.addEventListener('DOMContentLoaded', 
function() {
    spaceCowboy= new SpaceCreatures(cowboyImage, parseInt(gameWidth)/2,parseInt(gameHeight)-70,60,60);
    thisMany=  Math.floor(parseInt(gameWidth)/(levels[currentLevel].bugWidth+levels[currentLevel].bugSideMargin))
    document.addEventListener('keydown',moonWalk);
    document.addEventListener('keydown',pewpew);
    //SETTING A TIMER FOR 60 FRAMES PER SECOND
    var runGame = setInterval(gameLoop, 60);
    gotIt.addEventListener('click', function () {
        startScreen.style.display = 'none'
    });
    start.addEventListener('click',function () {
        if (lives >= 0) {
            spaceCowboy.alive = true;
        hoardeOfAlienBugs.splice(score,(thisMany*levels[currentLevel].rounds));
        makeHoarde(thisMany,currentLevel);
        start.style.display = 'none';
        levelUp.style.display = 'inline';
        levelUp.disabled = true;
        lives -= 1
        } else if (lives = 0) {
            start.disabled = true
        }
        
    });
    levelUp.addEventListener('click', function () {
        if (currentLevel<= 2) {
            currentLevel+=1;
        }
        thisMany=  Math.floor(parseInt(gameWidth)/(levels[currentLevel].bugWidth+levels[currentLevel].bugSideMargin));
        var hoardesOnHoardes = setInterval(
            function () {
                makeHoarde(thisMany,currentLevel);
            },levels[currentLevel].roundDelay);
        setTimeout( function() { clearInterval(hoardesOnHoardes) }, levels[currentLevel].roundDelay*levels[currentLevel].rounds );
        levelUp.disabled = true;
        levelUp.style.opacity = .4;
        
    });
    
    pause.addEventListener('click',function () {
        clearInterval(runGame);
        pauseScreen.style.display = "inline-flex";    
    } );
    resume.addEventListener('click',function () {
        pauseScreen.style.display = "none";
        runGame = setInterval(gameLoop, 60)})

  }
);