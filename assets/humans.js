class Humans {
    constructor() {
        this.size = 50;
        this.x = random(width - this.size);
        this.x_stage1 = width - this.size / 2;
        if (random(1) < 0.5) { // to create variation of movement
            this.dirChanged = true;
            this.y_locationChanged = true;
        } else {
            this.dirChanged = false;
            this.y_locationChanged = false;
        }

        if (this.y_locationChanged) { // to prevent a collision between humans and dracula right at the start
            this.y = random(height / 2 + this.size, height - this.size);
        } else this.y = random(this.size, height / 2 - this.size);
        if (this.dirChanged) { // if true, 
            this.delta = 1; // go to to one direction
        } else this.delta = -1; // else go to the opposite direction
    }

    show() {
        if (stage == 1) {
            push();
                fill(0, 0, 255);
                rectMode(CENTER);
                rect(this.x_stage1, this.y, this.size, this.size);
            pop();
        } else if (stage == 0) {
            push();
                fill(0, 0, 255);
                rectMode(CENTER);
                rect(this.x, this.y, this.size, this.size);
            pop();
        }
    }

    showHealthBar() {
        mappingSize = map(human_healthBar, 0, 100, width - this.size, width);
        push();
            // noFill();
            // stroke(0);
            // strokeWeight(2);
            // rect(width - this.size, this.y, width, this.size / 4);
            fill(210, 100, 100);
            textSize(20);
            // noStroke();
            // rect(width - this.size, this.y, mappingSize, this.size / 4);
            text(human_healthBar, this.x_stage1, this.y);
        pop();
    }

    move() {
        if (stage == 0) {
            this.x = this.x - this.delta;
            if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > width) {
                this.delta *= -1; // to reverse direction of movements on x axis
            }
        } else if (stage == 1) {
            this.y = this.y - this.delta;
            if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > height) {
                this.delta *= -1; // to reverse direction of movements on y axis
            }
        }
    }

    meet(dracula) {
        let d = dist(this.x, this.y, dracula.x, dracula.y);
        if (d < (this.size + dracula.size) / 2) {
            return true;
        } else return false;
    }
    
}