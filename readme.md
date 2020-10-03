 
# Space Invaders: 

### App Demo: https://ktalens.github.io/project-1_SpaceInvaders/

---

## Concept:
The user plays as the spaceman, battling incoming hoardes of aliens by shooting them with his/her laser. The user wins when they defeat all the aliens in the given level before any alien reaches the bottom of the screen. Shooting an alien with the laser will stop the alien's advancement towards the bottom of the screen, but if any alien reaches the bottom, the user loses one out of their 3 lives. If the user loses, he/she can play on at the current level until they eexpend all their lives- otherwise the user must start from level 1 again. If the user wins, he/she is able to advance to the next level. There are 4 levels built in, each one has increasingly difficult alien size, speed, quantities, and increasing speed of the user's lasergun to let them keep up with the increasing difficulty of the aliens. 

## Technologies Used:

* HTML
* CSS
* JavaScript 

##### Credits:

    Unsplash.com
    unDraw.co
    Slideshow Repo

## Approach:

#### Overview
This project uses canvas to animate the gameboard and utilize the left and right arrow keys to allow the user to navigate, and the spacebar to shoot the obstacles. The game logic is based on a user playing against the computer. The computer generates objects that start on the opposite end of the gameboard and advance towards the user's fixed position on other end of the gameboard. The user eliminates each of the computers objects when the object he/she projects an object that will collide with the computer's objects (which causes the computer's object to stop advancing at the point of collision), and defeats the computer when there are no computer objects advancing. In gameplay, this looks like the computer's objects disappear from the board, since collision will halt the object's movement and also sets the object's heigh and width to 0. The user loses against the computer if any of the computer's objects advance far enough to reach the same plane on the y-axis as the user. The computer's levels include increasing object speed to give the user less time, decreasing in size to give the user a smaller target, increasing in space between each object to add difficulty when the user is aiming, and (if I get this to work) increased volume of obstacles generated, by adding in multiple rows at specific intervals of the level.

 The function checkLose will detect if the user or computer has won the level, and will display a message on the gameboard that the user has either won and may proceed to the next level, or has lost and must try again. 


 All gameplay elements are generated on the canvas by using the same object class of SpaceCreature to create the user's gamepiece, the computer's advancing objects, and the user's bullet. The images for each item are first set into the HTML and hidden with a display of "none", then drawn into the gameboard when the render() function is invoked for each item. 

 The level and mission sections give the user a heads up on the difficulty of the current level, and the scoring was just another added feature that counts the number of collisons that occur during gameplay. Ideally, it would be set to increase by higher increments based on the difficulty of each level. The "Lives" indicator was a stretch goal that I initially didn't get to a functional state, but the idea was to allow the user to re-attempt a level if he/she was defeated by the computer without having to restart from the very first level each time. If the user exceeds 3 losses to the computer, the user has to start at the first level again. 

There's a starting screen that will display instructions upon loading the page, and requires the user to view the page and click "got it" before starting gameplay so that the user understands the gaming controls. There is also a pause screen that stops the gameplay and the movement of the computer's objects so that the user can get some releif without having to lose the game.
 



#### Stretch goals

* Having the user's live be more dynamic by basing it off of the accumulated score and taking a number of points away from the score each time an alien gets past the user would allow for more flexibility for the user to stay alive and for a longer, more competitive flow of gameplay. The progress could then just be measured by how many levels the user is able to reach, instead of requiring 100% of the aliens to be killed each round.
* Having levels auto-generate increasing difficulty using set increments rather than having level values hard-coded into the game 
* Adding sound-effects of the laser-shooting events, the collisions, and other little events  would make it a lot more fun.

## Challenges:

* The major challenges were figuring out the separation of the functions inside constantly refreshing game-loop, because some pieces would replicate unintentionally, and which functions needed to stay inside and regenerate on each frame. Examples of this are having the score increase by too high of an amount if the function that counted score were kept inside the game-loop. 
* Another challenge was figuring out the timer of when each new row of aliens would generate.
* One other big challenge was working out the flow of the level progression, and being able to factor in the amount of lives left, giving the user 2nd or 3rd chances to beat a level (if there are lives left) without having to replay all the previous levels again, and getting the running tally of 
aliens kills required to reset each time a new level is presented so that win & lose logic would work correctly instead of counting an accumulation of all the past level-wins or level-deaths. 



<!-- explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc. -->

 