class Bonuses {
    constructor() {
        this.size = 50;
        this.x = random(this.size, width - this.size);
        this.y = random(this.size, height - this.size);
    }

    show() {
        push();
            fill(0, 255, 0, 100);
            rectMode(CENTER);
            rect(this.x, this.y, this.size, this.size);
        pop();
    }

    picked(dracula) {
        let d = dist(this.x, this.y , dracula.x, dracula.y); // left
        if (d < (this.size + dracula.size) / 2) {
            return true;
        } else return false;
    }
}