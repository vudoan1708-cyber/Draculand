class Walls {
    constructor() {
        this.x = width / 2;
        this.y = 0;
        this.w = 20;
        this.h = 150;
    }

    show() {
        push();
            fill(0);
            rect(this.x, this.y, this.w, this.h);
            rect(this.x, height, this.w, -this.h);
            rect(0, height / 2, this.h, this.w);
            rect(width, height / 2, -this.h, this.w);
        pop();
    }

    // add up this.size / 2 because of rectMode(CENTER)
    blockX_UPright(dracula) {
        if (dracula.x > this.x + this.w - 20 && dracula.x + dracula.size / 2 < width) {
            if (dracula.y > this.y - 20 && dracula.y < this.y + this.h + dracula.size / 2) {
                return true;
            } return false;
        } 
    }

    blockX_UPleft(dracula) {
        if (dracula.x > dracula.size / 2 - 20 && dracula.x + dracula.size / 2 < this.x + 20) {
            if (dracula.y > this.y - 20 && dracula.y < this.y + this.h + dracula.size / 2) {
                return true;
            } return false;
        } 
    }

    blockX_DOWNright(dracula) {
        if (dracula.x > this.x + this.w - 20 && dracula.x + dracula.size / 2 < width) {
            if (dracula.y + dracula.size / 2 > height - this.h && dracula.y + dracula.size / 2 < height + 20) {
                return true;
            } return false;
        }
    }

    blockX_DOWNleft(dracula) {
        if (dracula.x > dracula.size / 2 - 20 && dracula.x + dracula.size / 2 < this.x + 20) {
            if (dracula.y + dracula.size / 2 > height - this.h && dracula.y + dracula.size / 2 < height + 20) {
                return true;
            } else return false;
        }
    }

    // block front on vertical direction
    blockFront(dracula) {
        if (dracula.x - dracula.size / 2 > this.x && dracula.x - dracula.size / 2 < this.x + this.w || // check if left hand side of the dracula is in the boundaries
             dracula.x + dracula.size / 2 > this.x && dracula.x + dracula.size / 2 < this.x + this.w || // check if the right hand side is in the boundaries
             this.x > dracula.x - dracula.size / 2 && this.x + this.w < dracula.x + dracula.size / 2) { // check if the wall is in front of the dracula
            if (dracula.y - dracula.size / 2 > this.y - 20 && dracula.y - dracula.size / 2 < this.y + this.h + 20 || // check top boundaries
                dracula.y + dracula.size / 2 > height - this.h - 20 && dracula.y + dracula.size / 2 < height) { // check bottom boundaries
                return true;
            } return false;
        }
    }

    // block front on horizontal direction
    // NOTE: when being rotated, axis isn't changed because it is global, not local/object tranformation (always relative to the origin of the canvas)
    blockFront2(dracula) {
        if (dracula.y - dracula.size / 2 > height / 2 && dracula.y - dracula.size / 2 < height / 2 + this.w ||
             dracula.y + dracula.size / 2 > height / 2 && dracula.y + dracula.size / 2 < height / 2 + this.w + 20 ||
             height / 2 > dracula.y - dracula.size / 2 && height / 2 + this.w < dracula.y + dracula.size / 2) {
            if (dracula.x - dracula.size / 2 > 0 && dracula.x - dracula.size / 2 < this.h + 20 ||
                dracula.x + dracula.size / 2 > width - this.h - 20 && dracula.x + dracula.size / 2 < width) {
                return true;
            } return false;
        }
    }

    block_LEFTup(dracula) {
        if (dracula.x > dracula.size / 2 - 20 && dracula.x - dracula.size / 2 < this.h) {
            if (dracula.y > dracula.size / 2 - 20 && dracula.y + dracula.size / 2 < height / 2 + 20) {
                return true;
            }
        } return false;
    }

    block_LEFTdown(dracula) {
        if (dracula.x > dracula.size / 2 - 20 && dracula.x - dracula.size / 2 < this.h) {
            if (dracula.y > height / 2 + this.w + dracula.size / 2 - 20 && dracula.y < height - dracula.size / 2) {
                return true;
            }
        } return false;
    }

    block_RIGHTup(dracula) {
        if (dracula.x + dracula.size / 2 > width - this.h && dracula.x + dracula.size / 2 < width + 20) {
            if (dracula.y > dracula.size / 2 - 20 && dracula.y + dracula.size / 2 < height / 2 + 20) {
                return true;
            }
        } return false;
    }

    block_RIGHTdown(dracula) {
        if (dracula.x + dracula.size / 2 > width - this.h && dracula.x + dracula.size / 2 < width + 20) {
            if (dracula.y - dracula.size / 2 > height / 2 + this.w - 20 && dracula.y + dracula.size / 2 < height) {
                return true;
            }
        } return false;
    }
}

class Garlic {
    constructor() {
        this.size = 40;
        this.x = random(this.size, width - this.size);
        this.y = random(this.size, height - this.size);
    }

    show() {
        push();
            rectMode(CENTER);
            fill(210, 100, 100);
            rect(this.x, this.y, this.size, this.size);
        pop();
    }

    poison(dracula) {
        let d = dist(this.x, this.y, dracula.x, dracula.y);
        let d_stage1 = dist(this.x, this.y, dracula.x_stage1, dracula.y);
        if (stage == 0) {
            if (d < (this.size + dracula.size)  / 2) {
                return true;
            } else return false;
        } else if (stage == 1) {
            if (d_stage1 < (this.size + dracula.size)  / 2) {
                return true;
            } else return false;
        }
    }
}