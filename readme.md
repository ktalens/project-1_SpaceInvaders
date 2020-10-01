 <!-- explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc. -->

 This project uses canvas to animate the gameboard and utilize the left and right arrow keys to allow the user to navigate, and the spacebar to shoot the obstacles. The game logic is based on a user playing against the computer. The computer generates objects that start on the opposite end of the gameboard and advance towards the user's fixed position on other end of the gameboard. The user eliminates each of the computers objects when the object he/she projects an object that will collide with the computer's objects (which causes the computer's object to stop advancing at the point of collision), and defeats the computer when there are no computer objects advancing. In gameplay, this looks like the computer's objects disappear from the board, since collision will halt the object's movement and also sets the object's heigh and width to 0. The user loses against the computer if any of the computer's objects advance far enough to reach the same plane on the y-axis as the user. The computer's levels include increasing object speed to give the user less time, decreasing in size to give the user a smaller target, increasing in space between each object to add difficulty when the user is aiming, and (if I get this to work) increased volume of obstacles generated, by adding in multiple rows at specific intervals of the level.

 The function checkLose will detect if the user or computer has won the level, and will display a message on the gameboard that the user has either won and may proceed to the next level, or has lost and must try again. 


 All gameplay elements are generated on the canvas by using the same object class of SpaceCreature to create the user's gamepiece, the computer's advancing objects, and the user's bullet. The images for each item are first set into the HTML and hidden with a display of "none", then drawn into the gameboard when the render() function is invoked for each item. 

 The level and mission sections give the user a heads up on the difficulty of the current level, and the scoring was just another added feature that counts the number of collisons that occur during gameplay. Ideally, it would be set to increase by higher increments based on the difficulty of each level. The "Lives" indicator was a stretch goal that I initially didn't get to a functional state, but the idea was to allow the user to re-attempt a level if he/she was defeated by the computer without having to restart from the very first level each time. If the user exceeds 3 losses to the computer, the user has to start at the first level again. 

There's a starting screen that will display instructions upon loading the page, and requires the user to view the page and click "got it" before starting gameplay so that the user understands the gaming controls. There is also a pause screen that stops the gameplay and the movement of the computer's objects so that the user can get some releif without having to lose the game.