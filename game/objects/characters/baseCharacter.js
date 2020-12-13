class BaseCharacter extends BaseObject {
    constructor(posX, posY, dirX, dirY, sprite, health) {
        super();
        this.pos = createVector(posX, posY);
        this.dir = createVector(dirX, dirY);
        this.dir.normalize();
        this.sprite = sprite;
        this.health = health;
        this.actionTick = 0;
    }

    executeBehaviour() {
        if (!this.checkHealthStatus()) {
            return;
        }
        this.actionTick += 1;
    }
    
    checkHealthStatus() {
        if (this.health <= 0) {
            return false;
        }
        return true;
    } 

    executeDeath() {
        // Have this trigger animations
        this.sprite.filter(GRAY);
    }

    receiveHit() {
        if (!this.checkHealthStatus()) {
            return;
        }
        // TODO: Implement this with proper animations
        this.sprite.filter(INVERT);
        this.health -= 1;
        if (this.checkHealthStatus()) {
            this.executeDeath();
        }
    }

    findHit(ray, epsilon) {
        if (!this.checkHealthStatus()) {
            return;
        }
        // TODO: Re-implement with Bounding Box
        // Approximates the ship as a line that starts from the tip to tail (It does not rotate with the ship)
        let tail = createVector(this.pos.x - this.sprite.width/2, this.pos.y);
        let tip = createVector(this.pos.x + this.sprite.width/2, this.pos.y);

        let line = new LineObject(tail.x, tail.y, tip.x, tip.y);
        return line.findHit(ray, epsilon);
    }

    resetActionTick() {
        this.actionTick = 0;
    }

    moveTo(point) {
        let x = point.x;
        x = x < 0 ? 0 : x;
        x = x > width ? width : x;

        let y = point.y
        y = y < 0 ? 0 : y;
        y = y > height ? height : y;

        this.pos = createVector(x, y);
    }

    lookAt(point) {
        let newDir = createVector(point.x - this.pos.x, point.y - this.pos.y);
        newDir.normalize();
        this.dir = newDir;
    }

    show() {
        push();
            translate(this.pos.x, this.pos.y);
            rotate(-this.dir.angleBetween(createVector(1, 0)));
            translate(-this.sprite.width/2, -this.sprite.height/2);
            translate(-this.pos.x, -this.pos.y);
            image(this.sprite, this.pos.x, this.pos.y);
        pop();
    }
}