/*

- Copy your game project code into this file
- for the p5.Sound library look here https://p5js.org/reference/#/libraries/p5.sound
- for finding cool sounds perhaps look here
https://freesound.org/


*/



var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees_x;
var collectable;
var clouds;
var mountains;
var canyon;
var canyonMud;

var game_score;
var flagpole;
var lives;

var jumpSound;

var enemies;
var flagIMG;
var dogeCoin
var enemy

let resetEventListener = (e) => {
    if (e.code == 'Space') {
        reset()
    }
}
function reset() {
    floorPos_y = height * 3 / 4;
    lives = 3;

    window.removeEventListener('keypress', resetEventListener)
    startGame()


}

function preload() {
    soundFormats('mp3', 'wav');

    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);

    flagIMG = loadImage('assets/pk.jpeg');
    dogeCoin = loadImage('assets/dogegif.gif');
    enemy = loadImage('assets/enemy.gif');


}


function setup() {
    createCanvas(windowWidth, windowHeight);
    reset()

}

function draw() {

    background(100, 155, 255);

    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height / 4);

    //---------------------------------------------------------------
    // Background scrolling.
    //---------------------------------------------------------------
    push();
    translate(scrollPos, 0);

    // -------------------------------------------
    // Draw clouds.
    // -------------------------------------------

    drawClouds()

    // -------------------------------------------
    // Draw mountains.
    // -------------------------------------------

    drawMountains()

    // -------------------------------------------
    // Draw trees.
    // -------------------------------------------

    drawTrees()


    // -------------------------------------------
    // Draw collectable items
    // -------------------------------------------


    for (var i = 0; i < collectable.length; i++) {
        if (!collectable[i].isFound) {

            drawCollectable(collectable[i]);
            checkCollectable(collectable[i]);

        }
    }


    // -------------------------------------------
    // Draw canyons.
    // -------------------------------------------

    for (var i = 0; i < canyon.length; i++) {

        drawCanyon(canyon[i]);
        checkCanyon(canyon[i]);

    }


    for (var i = 0; i < canyonMud.length; i++) {

        fill(153, 76, 0)

        rect(canyonMud[i].x_pos, canyonMud[i].y_pos + 100, canyonMud[i].width, canyonMud[i].height);

    }

    // -------------------------------------------
    // Draw Flagpole
    // -------------------------------------------

    renderFlagpole();


    // check if the player dies

    checkPlayerDie();

    pop()



    // -------------------------------------------
    // Draw game character.
    // -------------------------------------------

    drawGameChar();

    // -------------------------------------------
    // Draw the score 
    // -------------------------------------------

    fill(255);
    noStroke();
    textSize(15);
    text("SCORE:" + game_score, 40, 140);

    // displays how many lives the player has

    for (var i = 0; i < lives; i++) {
        fill(255);
        noStroke();
        text("REMAINING LIVES: " + lives, 40, 120);
    }

    if (lives < 1) {

        fill(255);
        textSize(15);
        text("GAME OVER. PRESS SPACE TO CONTINUE", 475, 180);
        window.addEventListener('keypress', resetEventListener)
        return;
    }

    if (flagpole?.isReached == true) {

        fill(255);
        noStroke();
        textSize(15);
        text("LEVEL COMPLETE. PRESS SPACE TO CONTINUE", 400, 180);
        window.addEventListener('keypress', resetEventListener)
        return;
    }

    // -------------------------------------------
    // code for falling down the canyon 
    // -------------------------------------------

    if (isPlummeting == true) {

        gameChar_y += 60;

    }


    // --------------------------------------------------------------
    // Logic to make the game character move or the background scroll.
    // --------------------------------------------------------------

    if (isLeft) {

        if (gameChar_x > width * 0.2) {
            gameChar_x -= 5;
        }

        else {
            scrollPos += 5;
        }

    }


    if (isRight) {

        if (gameChar_x < width * 0.8) {
            gameChar_x += 5;

        }

        else {
            scrollPos -= 5;
        }

    }

    //---------------------------------------------------------------
    // Logic to make the game character rise and fall.
    //---------------------------------------------------------------

    if (isPlummeting) {
        gameChar_y -= 3;
    }

    if (isFalling) {
        gameChar_y += 3;
        isPlummeting = false;
    }

    if (gameChar_y == floorPos_y) {
        isFalling = false;
    }

    if (gameChar_y < (floorPos_y - 200)) {
        isFalling = true;
    }

    if (flagpole?.isReached == false) {

        checkFlagpole();

    }

    //---------------------------------------------------
    // Check contact with Enemy
    //---------------------------------------------------

    for (var i = 0; i < enemies.length; i++) {
        translate(scrollPos, -30)
        enemies[i].draw();

        var isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y);
        // //console.log("enemyNUmber", i, "isContact", isContact)

        if (isContact) {

            lives -= 1

        }

        if (isContact) {

            if (lives > 0) {

                startGame();
                break;

            }

        }
    }

    pop();


    // --------------------------------------------------------
    // Update real position of gameChar for collision detection.
    // --------------------------------------------------------

    gameChar_world_x = gameChar_x - scrollPos;

}



if (flagpole?.isReached) {
    fill(255, 0, 0);
    textSize(35);
    text("Level complete. Press space to continue.", width / 4, height / 4);

}


// -------------------------------------------
// Key control functions
// -------------------------------------------

function keyPressed()

// ------------------------------------------------------------------------------
// if statements to control the animation of the character when keys are pressed.
// ----------------------------------------------------------------------------- 

{

    // //console.log("keyPressed: " + key);
    // //console.log("keyPressed: " + keyCode);

    if (keyCode == 37) {

        // //console.log("left arrow")
        isLeft = true;

    }

    if (keyCode == 39) {

        // //console.log("right arrow")
        isRight = true;

    }

    if (keyCode == '32')

    // when keycode 32 `space-bar' is pressed, and if the game character is at floor position, then jumping is true and the game character position goes to gameChar_y - 100 

    {

        if (gameChar_y == floorPos_y) {

            isFalling = true;

            gameChar_y = gameChar_y - 180;
            jumpSound.play();

        }


    }

    // //console.log("keyPressed: " + key);
    // //console.log("keyPressed: " + keyCode);


}

function keyReleased() {

    // ------------------------------------------------------------------------------
    // if statements to control the animation of the character when keys are released.
    // ------------------------------------------------------------------------------

    // //console.log("keyReleased: " + key);
    // //console.log("keyReleased: " + keyCode);

    if (keyCode == 37) {

        //console.log("left arrow")
        isLeft = false;

    }

    if (keyCode == 39) {

        //console.log("right arrow")
        isRight = false;

    }

    else if (keyCode == 32) {

        //console.log("space-bar")
        isPlummeting = false;


    }

    // ------------------------------------------------------------------------------
    // if statements to check Flagpole 
    // ------------------------------------------------------------------------------

    if (flagpole?.isReached == false) {

        checkFlagpole();

    }

}


// ------------------------------------------------
// Game character render function
// ------------------------------------------------

// ------------------------------------------------
// Function to draw the game character.
// ------------------------------------------------

function drawGameChar() {

    if (isLeft && isFalling) {

        // ----------------------------------------------
        // Jumping-left code
        // ----------------------------------------------
        walking(gameChar_x, gameChar_y - 60, true, true)


    }

    else if (isRight && isFalling) {

        // ----------------------------------------------------
        // Jumping-right code
        // ----------------------------------------------------


        walking(gameChar_x, gameChar_y - 60, true,)



    }

    else if (isLeft) {

        // ---------------------------------------------------------
        // add your walking left code
        // ---------------------------------------------------------
        // (x, y, characterFace, isJumping = false, isLeft ) 
        walking(gameChar_x, gameChar_y - 60, false, true)


    }
    else if (isRight) {

        walking(gameChar_x, gameChar_y - 60, false,)

    }

    else if (isFalling || isPlummeting) {

        // ----------------------------------------------------
        // Jumping facing forwards code
        // ----------------------------------------------------

        frontFacing(gameChar_x, gameChar_y - 60, true)



    }
    else {

        // ----------------------------------------------------
        // Character standing front facing code
        // ----------------------------------------------------   
        frontFacing(gameChar_x, gameChar_y - 60)



    }
}


// -------------------------------------------
// Background render functions
// -------------------------------------------


// -------------------------------------------
// Function to draw cloud objects.
// -------------------------------------------

function drawClouds() {

    for (var i = 0; i < clouds.length; i++) {

        fill(255, 255, 255);
        ellipse(clouds[i].x_pos + 225, clouds[i].y_pos + 50, clouds[i].width, clouds[i].height);

        fill(255, 255, 255);
        ellipse(clouds[i].x_pos + 225 + 25, clouds[i].y_pos + 50, clouds[i].width, clouds[i].height - 10);

        fill(255, 255, 255);
        ellipse(clouds[i].x_pos + 225 - 25, clouds[i].y_pos + 50, clouds[i].width, clouds[i].height - 10);

    }
}


// --------------------------------------------------
// Function to draw mountains objects.
// --------------------------------------------------

function drawMountains() {

    for (var i = 0; i < mountains.length; i++) {

        fill(140, 140, 140);

        beginShape();

        vertex(mountains[i].x_pos + 525, mountains[i].y_pos + 432);
        vertex(mountains[i].x_pos + 555, mountains[i].y_pos + 250);
        vertex(mountains[i].x_pos + 580, mountains[i].y_pos + 260);
        vertex(mountains[i].x_pos + 600, mountains[i].y_pos + 200);
        vertex(mountains[i].x_pos + 610, mountains[i].y_pos + 180);
        vertex(mountains[i].x_pos + 620, mountains[i].y_pos + 200);
        vertex(mountains[i].x_pos + 650, mountains[i].y_pos + 140);
        vertex(mountains[i].x_pos + 700, mountains[i].y_pos + 300);
        vertex(mountains[i].x_pos + 710, mountains[i].y_pos + 280);
        vertex(mountains[i].x_pos + 730, mountains[i].y_pos + 432);

        endShape();

        fill(160, 160, 160);

        beginShape();

        vertex(mountains[i].x_pos + 525, mountains[i].y_pos + 432);
        vertex(mountains[i].x_pos + 550 + 5, mountains[i].y_pos + 250 + 10);
        vertex(mountains[i].x_pos + 580 + 5, mountains[i].y_pos + 260 + 10);
        vertex(mountains[i].x_pos + 600 + 5, mountains[i].y_pos + 200 + 10);
        vertex(mountains[i].x_pos + 610 + 5, mountains[i].y_pos + 180 + 10);
        vertex(mountains[i].x_pos + 620 + 5, mountains[i].y_pos + 200 + 10);
        vertex(mountains[i].x_pos + 650 + 5, mountains[i].y_pos + 140 + 10);
        vertex(mountains[i].x_pos + 700 + 5, mountains[i].y_pos + 300 + 10);
        vertex(mountains[i].x_pos + 710 + 5, mountains[i].y_pos + 280 + 10);
        vertex(mountains[i].x_pos + 730, mountains[i].y_pos + 432);

        endShape();

        fill(192, 192, 192);

        beginShape();

        vertex(mountains[i].x_pos + 525, mountains[i].y_pos + 432);
        vertex(mountains[i].x_pos + 550 + 5, mountains[i].y_pos + 250 + 20);
        vertex(mountains[i].x_pos + 580 + 5, mountains[i].y_pos + 260 + 20);
        vertex(mountains[i].x_pos + 600 + 5, mountains[i].y_pos + 200 + 20);
        vertex(mountains[i].x_pos + 610 + 5, mountains[i].y_pos + 180 + 20);
        vertex(mountains[i].x_pos + 620 + 5, mountains[i].y_pos + 200 + 20);
        vertex(mountains[i].x_pos + 650 + 5, mountains[i].y_pos + 140 + 20);
        vertex(mountains[i].x_pos + 700 + 5, mountains[i].y_pos + 300 + 20);
        vertex(mountains[i].x_pos + 710 + 5, mountains[i].y_pos + 280 + 20);
        vertex(mountains[i].x_pos + 730, mountains[i].y_pos + 432);

        endShape();

        fill(128, 128, 128);
        beginShape();

        vertex(mountains[i].x_pos + 525, mountains[i].y_pos + 432);
        vertex(mountains[i].x_pos + 550 + 5, mountains[i].y_pos + 250 + 70);
        vertex(mountains[i].x_pos + 580 + 5, mountains[i].y_pos + 260 + 70);
        vertex(mountains[i].x_pos + 600 + 5, mountains[i].y_pos + 200 + 70);
        vertex(mountains[i].x_pos + 610 + 5, mountains[i].y_pos + 180 + 70);
        vertex(mountains[i].x_pos + 620 + 5, mountains[i].y_pos + 200 + 70);
        vertex(mountains[i].x_pos + 650 + 5, mountains[i].y_pos + 140 + 70);
        vertex(mountains[i].x_pos + 700 + 5, mountains[i].y_pos + 300 + 70);
        vertex(mountains[i].x_pos + 710 + 5, mountains[i].y_pos + 280 + 70);
        vertex(mountains[i].x_pos + 730, mountains[i].y_pos + 432);

        endShape();

    }

}


// -------------------------------------------
// Function to draw trees objects.
// -------------------------------------------


function drawTrees() {

    for (var i = 0; i < trees_x.length; i++) {
        let treeX = trees_x[i]

        noStroke();
        let size = 100
        fill(120, 100, 40);

        rect(treeX + 5, floorPos_y - 150, 55, 150)
        fill(42, 126, 25)
        //ellipse(x, y, w, [h])
        ellipse(treeX + 35, 240, size, size)
        ellipse(treeX + 100, 270, size, size)
        ellipse(treeX + 110, 240, size, size)
        ellipse(treeX + 100, 190, size, size)
        ellipse(treeX + 50, 160, size, size)
        ellipse(treeX - 10, 170, size, size)
        ellipse(treeX - 40, 200, size, size)
        ellipse(treeX - 50, 220, size, size)
        ellipse(treeX - 40, 280, size, size)

    }

}


// ----------------------------------
// Canyon render and check functions
// ---------------------------------

// -------------------------------------------
// Function to draw canyon objects.
// -------------------------------------------

function drawCanyon(t_canyon) {

    fill(100, 155, 255);

    rect(t_canyon.x_pos, t_canyon.y_pos, t_canyon.width, t_canyon.height);

}


// -------------------------------------------
// Function to check character is over a canyon.
// -------------------------------------------

function checkCanyon(t_canyon) {

    if (gameChar_world_x > (t_canyon.x_pos + 5)) {
        if (gameChar_world_x < (t_canyon.x_pos + 40)) {
            if (gameChar_y == floorPos_y) {
                isPlummeting = true
            }
        }
    }


}


// -------------------------------------------
// Collectable items render and check functions
// -------------------------------------------

// -------------------------------------------
// Function to draw collectable objects.
// -------------------------------------------


function drawCollectable(t_collectable) {

    // fill(255, 255, 0);

    // fill(255, 190, 0);
    // ellipse(t_collectable.x_pos, t_collectable.y_pos + 47, t_collectable.size);
    // strokeWeight(2);


    // fill(255, 300, 0)
    // stroke(0)
    // ellipse(t_collectable.x_pos, t_collectable.y_pos + 47, t_collectable.size - 10);
    // strokeWeight(1);

    // fill(0, 0, 0)
    // text('$', t_collectable.x_pos - 6, t_collectable.y_pos + 54);
    // textSize(t_collectable.size - 21);
    // noStroke();

    image(dogeCoin, t_collectable.x_pos, t_collectable.y_pos + 20, 50, 50)

}


// ------------------------------------------------  
// Function to check character has collected an item.
// ------------------------------------------------

function checkCollectable(t_collectable) {
    if (dist(gameChar_world_x, gameChar_y - 40, t_collectable.x_pos, t_collectable.y_pos) < 50) {
        t_collectable.isFound = true;
        game_score += 10;
    }

}

// ------------------------------------------------  
// Function to render the Flagpole 
// ------------------------------------------------

function renderFlagpole() {

    push();

    // Pole for the flag
    strokeWeight(5);
    stroke(50);
    line(flagpole.x_pos, floorPos_y - 2, flagpole.x_pos, floorPos_y - 310);

    if (flagpole?.isReached) {
        image(flagIMG, flagpole.x_pos + 2.5, floorPos_y - 300, 130, 90)

    }

    else {

        image(flagIMG, flagpole.x_pos + 2.5, floorPos_y - 90, 130, 90)

    }


    pop();


}

// Function to check if flagpole reached

function checkFlagpole() {

    var d = abs(gameChar_world_x - flagpole.x_pos);

    if (d < 15) {
        flagpole.isReached = true;
    }


}

// ----------------------------------
// Check if the character dies and reduce life by 1 
// ----------------------------------

function checkPlayerDie() {

    if (gameChar_y > height && lives != 0) {

        lives -= 1;
        startGame();
    }

}

function Enemy(x, y, range) {

    this.x = x;
    this.y = y;
    this.range = range;

    this.currentX = x;
    this.inc = 1;

    this.update = function () {

        this.currentX += this.inc;

        if (this.currentX >= this.x + this.range) {

            this.inc = -1;

        }

        else if (this.currentX < this.x) {

            this.inc = 1;

        }

    }

    this.draw = function () {

        this.update();
        // draw bomb
        image(enemy, this.currentX - 40, this.y - 70, 100, 100)


        //wobble the bomb
        this.currentX += random(-2, 1);
        this.y += random(-1, 1);

    }


    this.checkContact = function (gc_x, gc_y) {

        var d = dist(gc_x, gc_y, this.currentX, this.y)
        //console.log("d", d, gc_x, gc_y, this.currentX, this.y)
        if (d < 70) {

            return true;

        }

        return false;

    }

}


function startGame() {

    gameChar_x = width / 2;
    gameChar_y = floorPos_y;

    //---------------------------------------------------------------
    // Variable to control the background scrolling.
    //---------------------------------------------------------------

    scrollPos = 0;

    //-------------------------------------------------------------------------------------------------------
    // Variable to store the real position of the gameChar in the game world. Needed for collision detection.
    //-------------------------------------------------------------------------------------------------------

    gameChar_world_x = gameChar_x - scrollPos;

    //------------------------------------------------------------------
    // Boolean variables to control the movement of the game character.
    //------------------------------------------------------------------


    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    isFound = false;

    //---------------------------------------------------------------
    // Initialisation of Arrays and Object Arrays for scenery objects
    //---------------------------------------------------------------


    trees_x = [-400, 140, 450, 1000, 1300, 1900, 2200, 2500];

    clouds = [{ x_pos: 40, y_pos: 20, size: 1, width: 70, height: 60 },
    { x_pos: 210, y_pos: 40, size: 1.5, width: 70, height: 60 },
    { x_pos: 400, y_pos: 20, size: 1, width: 70, height: 60 },
    { x_pos: 1000, y_pos: 20, size: 1, width: 70, height: 60 },
    { x_pos: 1250, y_pos: 40, size: 1.5, width: 70, height: 60 },
    { x_pos: 1500, y_pos: 20, size: 1, width: 70, height: 60 },
    { x_pos: -210, y_pos: 20, size: 1, width: 70, height: 60 },
    { x_pos: -400, y_pos: 40, size: 1.5, width: 70, height: 60 },
    { x_pos: -1000, y_pos: 20, size: 1, width: 70, height: 60 },
    { x_pos: 2000, y_pos: 20, size: 1, width: 70, height: 60 },
    { x_pos: 2250, y_pos: 40, size: 1.5, width: 70, height: 60 },
    { x_pos: 2500, y_pos: 20, size: 1, width: 70, height: 60 }];

    mountains = [{ x_pos: -380, y_pos: 0, width: 100 },
    { x_pos: -210, y_pos: 0, width: 100 },
    { x_pos: 500, y_pos: 0, width: 100 },
    { x_pos: 1000, y_pos: 0, width: 100 },
    { x_pos: 1170, y_pos: 0, width: 100 },
    { x_pos: -1000, y_pos: 0, width: 100 },
    { x_pos: -1100, y_pos: 0, width: 100 },
    { x_pos: 200, y_pos: 0, width: 100 },
    { x_pos: 1500, y_pos: 0, width: 100 },
    { x_pos: 2200, y_pos: 0, width: 100 }];


    collectable = [{ x_pos: 4000, y_pos: floorPos_y - 70, size: 45, isFound: false },
    { x_pos: 850, y_pos: floorPos_y - 70, size: 45, isFound: false },
    { x_pos: 900, y_pos: floorPos_y - 70, size: 45, isFound: false },
    { x_pos: 1800, y_pos: floorPos_y - 70, size: 45, isFound: false },
    { x_pos: 1850, y_pos: floorPos_y - 70, size: 45, isFound: false },
    { x_pos: 1900, y_pos: floorPos_y - 70, size: 45, isFound: false },
    { x_pos: 2400, y_pos: floorPos_y - 70, size: 45, isFound: false },
    { x_pos: 2450, y_pos: floorPos_y - 70, size: 45, isFound: false },
    { x_pos: 2500, y_pos: floorPos_y - 70, size: 45, isFound: false },
    { x_pos: 3000, y_pos: floorPos_y - 70, size: 45, isFound: false },
    { x_pos: 3100, y_pos: floorPos_y - 70, size: 45, isFound: false },
    { x_pos: -240, y_pos: floorPos_y - 70, size: 45, isFound: false },
    { x_pos: -190, y_pos: floorPos_y - 70, size: 45, isFound: false }];

    canyon = [{ x_pos: 600, y_pos: 432, width: 50, height: 145 },
    { x_pos: 1400, y_pos: 432, width: 50, height: 145 },
    { x_pos: 0, y_pos: 432, width: 50, height: 145 },
    { x_pos: 2300, y_pos: 432, width: 50, height: 145 }]


    canyonMud = [{ x_pos: 600, y_pos: 432, width: 50, height: 50 },
    { x_pos: 1400, y_pos: 432, width: 50, height: 50 },
    { x_pos: 0, y_pos: 432, width: 50, height: 50 },
    { x_pos: 2300, y_pos: 432, width: 50, height: 50 }]

    flagpole = { isReached: false, x_pos: 2650 };


    game_score = 0;
    let enemy1 = new Enemy(700, floorPos_y, 100)
    enemies = [enemy1];

}

//-----------------------------------------------
//-----------------------------------------------

