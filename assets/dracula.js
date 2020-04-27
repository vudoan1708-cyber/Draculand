class Dracula {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.size = 50;
        this.x_stage1 = 200;
        this.y_aim = this.y;
    }

    show() {
        push();
            translate(this.x, this.y);
            imageMode(CENTER);
            fill(0, 50);
            
            if (keyDown) {
                rotate(180);
                image(draculaImg, 0, 0, this.size, this.size);
            } else if (keyLeft) {
                rotate(-90); // counter clockwise
                image(draculaImg, 0, 0, this.size, this.size);
            } else if (keyRight) {
                rotate(90); // clockwise
                image(draculaImg, 0, 0, this.size, this.size);
            } else {
                image(draculaImg, 0, 0, this.size, this.size);
            }    
        pop();
    }

    show_stage1() {
        push();
            translate(this.x_stage1, this.y);
            imageMode(CENTER);
            fill(0);
            
            if (keyDown) {
                rotate(180);
                image(draculaImg, 0, 0, this.size, this.size);
            } else image(draculaImg, 0, 0, this.size, this.size);
        pop();
    }

    showAdrenaline() {
        push();
            fill(255, 150, 0);
            rect(this.x - this.size / 2, this.y, 50, 50);
        pop();
    }

    healthBar_stage1() {
        mappingSize = map(healthBar, 0, 500, 0, height);
        push();
            noFill();
            stroke(0);
            strokeWeight(3);
            rect(0, 0, 100, height);
            fill(121, 55, 232, 200);
            noStroke();
            rect(0, 0, 100, mappingSize);

            translate(50,  height / 2);
            rotate(90);
            textSize(20);
            strokeWeight(2);
            stroke(0);
            fill(255, 0, 0);
            text(int(healthBar) + " / 500", 0, 0);
        pop();
    }

    constraint_stage1() {
        if (attackToAim) {
            this.x_stage1 = constrain(this.x_stage1, this.size / 2 + 200, width - this.size / 2 + 20);
            
        } else this.x_stage1 = constrain(this.x_stage1, this.size / 2 + 200, width / 2 - this.size / 2);       
        this.y = constrain(this.y, this.size / 2, height - this.size / 2);
    }

    canvasConstraint(walls) {
        // add up this.size / 2 because rectMode is CENTER
        if (rightCnvLimit) {
            this.x = constrain(this.x, walls.x + walls.w + this.size / 2, width - this.size / 2);
        } else if (leftCnvLimit) {
            this.x = constrain(this.x, this.size / 2, walls.x - this.size / 2);
        } else if (centreCnvLimit_hor) {
            this.x = constrain(this.x, walls.h + this.size / 2, width - walls.h - this.size / 2);  
        } else this.x = constrain(this.x, this.size / 2, width - this.size / 2);
        
        if (centreCnvLimit_vert) {
            this.y = constrain(this.y, walls.y + walls.h + this.size / 2, height - walls.h - this.size / 2);
        } else if (topCnvLimit) {
            this.y = constrain(this.y, this.size / 2, height / 2 - this.size / 2);
        } else if (bottomCnvLimit) {
            this.y = constrain(this.y, height / 2 + walls.w + this.size / 2, height - this.size / 2);  
        } else this.y = constrain(this.y, this.size / 2, height - this.size / 2);
    }
    controlUp_Down(dir) {
        this.y_aim = this.y += dir * this.size / 10;

    }

    controlLeft_Right(dir) {
        if (stage == 0) {
            this.x += dir * this.size / 10;
        } else if (stage == 1) {
            this.x_stage1 += dir * this.size / 10;
        }
    }

    healthBar() {
        // mappingSize = map(healthBar, 0, 300, 0, this.size / 3);
        push();
            
            translate(this.x, this.y);
            rectMode(CENTER);
            stroke(0, 200);
            strokeWeight(2);
            fill(51, 200);
            if (keyDown) {
                rotate(180);
            } else if (keyLeft) {
                rotate(-90); // counter clockwise
            } else if (keyRight) {
                rotate(90); // clockwise
            }
            rect(-20, 20, this.size / 6, this.size / 6);
            rect(-10, 20, this.size / 6, this.size / 6);
            rect(0, 20, this.size / 6, this.size / 6);
            rect(10, 20, this.size / 6, this.size / 6);
            rect(20, 20, this.size / 6, this.size / 6);

            noStroke();
            fill(121, 55, 232, 200);            
            if (healthBar > 0 && healthBar <= 100) {
                rect(-20, 20, this.size / 6, this.size / 6);
            } else if (healthBar > 100 && healthBar <= 200) {
                rect(-20, 20, this.size / 6, this.size / 6);
                rect(-10, 20, this.size / 6, this.size / 6);
            } else if (healthBar > 200 && healthBar <= 300) {
                rect(-20, 20, this.size / 6, this.size / 6);
                rect(-10, 20, this.size / 6, this.size / 6);
                rect(0, 20, this.size / 6, this.size / 6);
            } else if (healthBar > 300 && healthBar <= 400) {
                rect(-20, 20, this.size / 6, this.size / 6);
                rect(-10, 20, this.size / 6, this.size / 6);
                rect(0, 20, this.size / 6, this.size / 6);
                rect(10, 20, this.size / 6, this.size / 6);
            } else if (healthBar > 400 && healthBar <= 500) {
                rect(-20, 20, this.size / 6, this.size / 6);
                rect(-10, 20, this.size / 6, this.size / 6);
                rect(0, 20, this.size / 6, this.size / 6);
                rect(10, 20, this.size / 6, this.size / 6);
                rect(20, 20, this.size / 6, this.size / 6);
            }
            strokeWeight(2);
            stroke(0);
            fill(255, 0, 0);
            textSize(20);
            text(int(healthBar), 0, 0);
        pop();
    }

    aim() {
        if (aiming) {
            push();
                noFill();
                stroke(255);
                strokeWeight(4);
                ellipseMode(CENTER);
                ellipse(width - this.size / 2, this.y_aim, this.size, this.size);
                line(width - this.size + 15, this.y_aim, width - 15, this.y_aim);
                line(width - this.size / 2, this.y_aim  - this.size / 2 + 15, width - this.size / 2, this.y_aim + this.size / 2 - 15);
            pop();    
        }    
    }

    flash() {
        // this.x_stage1 = width - this.size / 2;
        this.x_stage1 += 90;
    }

    attack(humans) {
        let d = dist(this.x_stage1, this.y_aim, humans.x_stage1, humans.y);
        if (d < (this.size + humans.size) / 2) {
            return true;
        } else return false;
        // if (this.x_stage1 + this.size / 2 > humans.x_stage1 - humans.size / 2 && this.x_stage1 - this.size / 2 < humans.x_stage1 + humans.size / 2) {
        //     if (this.y + this.size / 2 > humans.y - humans.size / 2 && this.y - this.size / 2 < humans.y + humans.size / 2) {
        //         return true;
        //     }
        // } return false;
    }
}