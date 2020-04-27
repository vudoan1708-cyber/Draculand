let dracula;
let light = [];
let walls;
let bonus = [];
let humans = [];
let garlic = [];
let humansEnemy = [];

let keyUp = false;
let keyDown = false;
let keyLeft = false;
let keyRight = false;
let startCounter = false;
let eliminate = false;
let rightCnvLimit = false;
let leftCnvLimit = false;
let topCnvLimit = false;
let centreCnvLimit_hor = false;
let centreCnvLimit_vert = false;
let bottomCnvLimit = false;
let Bonus_counterStart = false;
let Transition_counterStart = false;
let startPoisoning = false;
let attackToAim = false;
let aiming = false;
let kill = false;
let special_attack = false;
let lose = true;
let instruction = true;

let stage = 0;
let adrenaline = 0;
let numHumans = 0;
let stageTransition = 0;
let poisionTime = 0;
let healthBar = 500;
let human_healthBar = 100;
let lightCounter = 0;
let bonusCounter = 0;
let timeAttack = 0;
let stage1_timer = 15;
let instruction_page = 0;
let mappingAlpha;
let mappingSize;

// images
let draculaImg,
    garlicImg;
let humansImg = [];
let blood_dropImg;

function preload() {
    draculaImg = loadImage('assets/img/clipart-coat-animated-17-original.png');
    garlicImg = loadImage('assets/img/garlic.png');
    for (let h = 0; h < 4; h++) {
        humansImg[h] = loadImage('assets/img/human' + h + '.png');
    }
    blood_dropImg = loadImage('assets/img/blood.png');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    angleMode(DEGREES);
    textFont("Georgia");
    textAlign(CENTER);
    dracula = new Dracula();
    walls = new Walls();
    numHumans = random(3, 6);
    for (let h = 0; h < numHumans; h++) {
        let human = random(humansImg);
        humans[h] = new Humans(human);
        // }
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function endGame() {
    if (lose) {
        push();
        fill(255, 100);
        noStroke();
        rectMode(CENTER);
        rect(width / 2, height / 2, 1000, 200);
        fill(0, 220);
        textSize(50);
        text("YOU LOST", width / 2, height / 2);
        pop();
        setTimeout(noLoop, 1000);
    } else {
        push();
        fill(255, 100);
        noStroke();
        rectMode(CENTER);
        rect(width / 2, height / 2, 1000, 200);
        fill(0, 220);
        textSize(50);
        text("YOU WON", width / 2, height / 2);
        pop();
        setTimeout(noLoop, 1000);
    }
}

function displayWalls() {
    walls.show();
    // top & bottom
    if (walls.blockX_UPright(dracula)) {
        rightCnvLimit = true;
    } else if (walls.blockX_DOWNright(dracula)) {
        rightCnvLimit = true;
    } else rightCnvLimit = false;


    if (walls.blockX_UPleft(dracula)) {
        leftCnvLimit = true;
    } else if (walls.blockX_DOWNleft(dracula)) {
        leftCnvLimit = true;
    } else leftCnvLimit = false;

    // front of the dracula
    if (walls.blockFront(dracula)) {
        centreCnvLimit_vert = true;
    } else centreCnvLimit_vert = false;
    if (walls.blockFront2(dracula)) {

        centreCnvLimit_hor = true;
    } else centreCnvLimit_hor = false;
    // left & right
    if (walls.block_LEFTup(dracula)) {
        topCnvLimit = true;
    } else if (walls.block_RIGHTup(dracula)) {
        topCnvLimit = true;
    } else topCnvLimit = false;

    if (walls.block_LEFTdown(dracula)) {
        bottomCnvLimit = true;
    } else if (walls.block_RIGHTdown(dracula)) {
        bottomCnvLimit = true;
    } else bottomCnvLimit = false;
}

function drawBonuses() {
    for (let b = 0; b < 50; b++) {
        if (random(1) < 0.00005) {
            bonus.push(new Bonuses());
            Bonus_counterStart = true;
        }
    }
}

function displayBonuses() {
    if (Bonus_counterStart) {
        if (frameCount % 60 == 0) {
            bonusCounter++;
        }
    }
    for (let b = bonus.length - 1; b >= 0; b--) {
        bonus[b].show();
        if (bonus[b].picked(dracula)) { // if it's picked
            bonus.splice(b, 1); // got spliced
            aiming = true;
            console.log("PICKED!!!");
        } else if (bonusCounter > 5) { // or after 5s after a bonus is spawned
            bonus.splice(b, 1); // got spliced
            bonusCounter = 0;
            Bonus_counterStart = false;
        }
    }
}

function drawSunLight() {
    if (frameCount % 60 == 0) {
        if (startCounter) {
            lightCounter++; // increase alpha
        } else {
            lightCounter--; // decrease alpha
            if (lightCounter <= 0) { // if light's alpha is equal 0 after subtraction
                eliminate = true;
            }
        }

        // console.log("Light Count: " + lightCounter);
    }
    if (lightCounter > 10) { // if light's alpha is larger than 10
        startCounter = false; // decrease alpha, switch on light counter eliminating
    }


    for (let i = 0; i < 100; i++) {
        if (random(1) < 0.00025) {
            light.push(new Sunlight()); // when an element is pushed in the array
            startCounter = true; // switch on counter, switch off light counter eliminating 
        }
    }
}

function displaySunlight() {
    // sun light
    for (let i = light.length - 1; i >= 0; i--) {
        light[i].show();
        // lights hit dracula
        // console.log(light.length);
        if (lightCounter > 3) {
            if (light[i].hit(dracula)) {
                healthBar -= 0.5;
            }
        }

        if (eliminate) { // right at start, this will be activated
            light.splice(i); // splice element, but will also delete nothing at first.
            console.log(light.length);
            eliminate = false;
        }
        if (light.length == 100) {
            lose = true;
            endGame();
        }
    }
}


function displayHumans() {
    if (stage == 0) {
        human_healthBar = 100;
        stageTransition = 0;
        Transition_counterStart = false;
        for (let h = humans.length - 1; h >= 0; h--) {
            humans[h].show();
            humans[h].move();
            if (humans[h].meet(dracula)) {
                Transition_counterStart = true;
                stage = 1; // stage transition
            }
            if (kill) {
                humans.splice(h, 1);
                kill = false;
            }
        }
    } else if (stage == 1) {
        humans[humans.length - 1].show();
        humans[humans.length - 1].move();
        humans[humans.length - 1].showHealthBar();
        if (human_healthBar < 1) {
            human_healthBar = 0;
            stage = 0;
            dracula.x = width / 2;
            dracula.y = height / 2;
            kill = true;
            keyDown = false;
            keyUp = false;
            keyLeft = false;
            keyRight = false;
        }
    }
    if (humans.length == 0) {
        lose = false;
        endGame();
    }
}

function drawDracula() {
    if (stage == 0) {
        dracula.show();
        dracula.canvasConstraint(walls);
        dracula.healthBar();
    } else if (stage == 1) {
        dracula.show_stage1();
        dracula.constraint_stage1();
        dracula.healthBar_stage1();
        dracula.aim();
        if (dracula.attack(humans[humans.length - 1])) {
            if (special_attack) {
                healthBar++;
            }
            human_healthBar--;
            console.log(human_healthBar);
        }
    }
}

function controlDracula() {
    if (keyUp) {
        dracula.controlUp_Down(-1);
    }
    if (keyDown) {
        dracula.controlUp_Down(1);
    }
    if (keyLeft) {
        dracula.controlLeft_Right(-1);
    }
    if (keyRight) {
        dracula.controlLeft_Right(1);
    }

    if (attackToAim) {
        dracula.flash();
        timeAttack++;
    }
    if (timeAttack > 20) {
        attackToAim = false;
        timeAttack = 0;
    }
}

function drawGarlic() {
    for (let g = 0; g < 50; g++) {
        if (random(1) < 0.00005) {
            garlic.push(new Garlic());
        }
    }
}

function displayGarlic() {
    if (startPoisoning) {
        poisionTime++;
    }
    if (poisionTime < 100 && poisionTime > 0) {
        healthBar -= 0.5;
    } else {
        startPoisoning = false;
        poisionTime = 0;
    }

    for (let g = garlic.length - 1; g >= 0; g--) {
        garlic[g].show();
        if (garlic[g].poison(dracula)) {
            garlic.splice(g, 1);
            startPoisoning = true;
        }
    }
}

function drawInstructions() {
    push();
        translate(width / 2, height / 2);
        fill(0);
        strokeWeight(2);
        stroke(255, 50);
        rectMode(CENTER);
        rect(0, 0, width / 2, height / 2);
        strokeWeight(2);
        stroke(255, 150);
        fill('#2F00EB');
        textSize(width / 40);
        text('Instructions', 0, -height / 5);
        if (instruction_page == 0) {
            fill(255);
            noStroke();
            textSize(width / 60);
            text('You are The Dracula who hunts humans when night falls', 0, -height / 10);
            fill(253, 255, 208, 100);
            text('REMEMBER', 0, -height / 25);
    
            text('Stay away from the lights or you will pay the price', 0, 15);
            text('Stay away from the garlics, they stink', 0, 60);
            text('If you encounter a human, try to kill them quickly,...', 0, 100);
            text('before the time runs out, and other humans will find you', 0, 140);
        } else {
            fill(255);
            noStroke();
            textSize(width / 80);
            text('How To Play', 0, -height / 8);
            text('Avoid The Circles That Represent Sun Lights', 0, -height / 15);
            text('Try To "Encounter" All The Humans To Win The Game', 0, -10);
            text('Collect Blood To Power Up Your Vision When "Encounter" A Human', 0, 30);
            text('When In A "Solo Stage" With A Human, You Will Fight With Time', 0, 60);
            text('You Will Either Lose By Loosing All The Blood When In A "Hunting Stage"', 0, 100);
            text('Or By Exceeding The Allowed Time When In A "Solo Stage" After Encountering A Human', 0, 140);
        }

        // next buttons
        
        

        // >
        if (instruction_page < 1) {
            if (mouseX > width / 2 + 50 - 20 && mouseX < width / 2 + 50 + 20) {
                if (mouseY > height / 2 + height / 4 - 20 && mouseY < height / 2 + height / 4 + 20) {
                    fill(225);
                    rect(50, height / 4, 40, 40);
                    fill(0);
                    textSize(43);
                    text('>', 50, height / 4 + 10);
                } else {
                    fill('#B098FF');
                    rect(50, height / 4, 40, 40);
                    fill(0);
                    textSize(40);
                    text('>', 50, height / 4 + 10);
                }
            } else {
                fill('#B098FF');
                rect(50, height / 4, 40, 40);
                fill(0);
                textSize(40);
                text('>', 50, height / 4 + 10);
            }
        }
        
        
        // <
        if (instruction_page > 0) {
            if (mouseX > width / 2 - 50 - 20 && mouseX < width / 2 - 50 + 20) {
                if (mouseY > height / 2 + height / 4 - 20 && mouseY < height / 2 + height / 4 + 20) {
                    fill(225);
                    rect(-50, height / 4, 40, 40);
                    fill(0);
                    textSize(43);
                    text('<', -50, height / 4 + 10);
                } else {
                    fill('#B098FF');
                    rect(-50, height / 4, 40, 40);
                    fill(0);
                    textSize(40);
                    text('<', -50, height / 4 + 10);
                }
            } else  {
                fill('#B098FF');
                rect(-50, height / 4, 40, 40);
                fill(0);
                textSize(40);
                text('<', -50, height / 4 + 10);
            }
        }

        // close btn
        const r = 50;
        let d = dist(mouseX, mouseY, width / 2 + width / 4, height / 2 -height / 4);
        if (d < r / 2) {
            push();
                fill(255);
                ellipse(width / 4, -height / 4, r);
                fill('#2F00EB');
                textSize(34);
                text('X', width / 4, -height / 4 + 15);
            pop();
        } else {
            push();
                fill(200);
                ellipse(width / 4, -height / 4, r);
                fill(20);
                textSize(30);
                text('X', width / 4, -height / 4 + 15);
            pop();
        }
    pop();
}

function mouseReleased() {
    const r = 50;
    let d = dist(mouseX, mouseY, width / 2 + width / 4, height / 2 -height / 4);
        if (d < r / 2) {
            instruction = false;
        }

    // >
    if (mouseX > width / 2 + 50 - 20 && mouseX < width / 2 + 50 + 20) {
        if (mouseY > height / 2 + height / 4 - 20 && mouseY < height / 2 + height / 4 + 20) {
            if (instruction_page < 1) {
                instruction_page++;
            }
        }
    } 
    
    // <
    if (mouseX > width / 2 - 50 - 20 && mouseX < width / 2 - 50 + 20) {
        if (mouseY > height / 2 + height / 4 - 20 && mouseY < height / 2 + height / 4 + 20) {
            if (instruction_page > 0) {
                instruction_page--;
            }
        }
    }
}

function draw() {
    background(51);
    if (stage == 0) {
        if (instruction) {
            drawInstructions();
        } else {
            stage1_timer = 15;
            // pick ups
            drawBonuses();
            displayBonuses();
    
            //garlic
            drawGarlic();
            displayGarlic();
    
            // sun lights
            drawSunLight();
            displaySunlight();
    
            displayHumans();
            // dracula
            drawDracula();
    
            displayWalls();
        }
        
    } else if (stage == 1) {
        if (Transition_counterStart) {
            if (stageTransition < 100) {
                stageTransition++;
            } else stageTransition = 100;
            mappingAlpha = map(stageTransition, 0, 100, 255, 0);
            background(51);
            background(0, mappingAlpha);
        }
        if (frameCount % 60 == 0) {
            stage1_timer--;
        }
        if (stage1_timer < 1) {
            stage1_timer = 0;
            lose = true;
            endGame();
        }

        drawGarlic();
        displayGarlic();
        displayHumans();
        drawDracula();
        push();
            fill(255, 200);
            textSize(45);
            text(stage1_timer, width / 2, 100);
        pop();
    }

    controlDracula();
    if (healthBar < 0.5) {
        healthBar = 0;
        lose = true;
        endGame();
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        keyDown = false;
        keyUp = true;
        keyLeft = false;
        keyRight = false;
    }
    if (keyCode === DOWN_ARROW) {
        keyDown = true;
        keyUp = false;
        keyLeft = false;
        keyRight = false;
    }
    if (keyCode === LEFT_ARROW) {
        keyDown = false;
        keyUp = false;
        keyLeft = true;
        keyRight = false;
    }
    if (keyCode === RIGHT_ARROW) {
        keyDown = false;
        keyUp = false;
        keyLeft = false;
        keyRight = true;
    }

    if (stage == 1) {
        if (key == " ") {
            attackToAim = true;
        }
    }
}