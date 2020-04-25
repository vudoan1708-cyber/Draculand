class Sunlight {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.r = random(50, 100);
    }

    show() {
        mappingAlpha = map(lightCounter, 0, 10, 0, 255);
        push();
        fill(255, mappingAlpha);
        noStroke();
        ellipseMode(CENTER);
        ellipse(this.x, this.y, this.r * 2);
        textSize(20);
        text(mappingAlpha, this.x, this.y);
        pop();
    }

    hit(dracula) {
        let d = dist(this.x, this.y, dracula.x, dracula.y);
        if (d < this.r + (dracula.size / 2)) {
            return true;
        } else return false;
    }
}