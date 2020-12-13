class BaseCharacter extends BaseObject {
    constructor(posX, posY, dirX, dirY, sprite, health) {
        super();
        this.pos = createVector(posX, posY);
        this.dir = createVector(dirX, dirY);
        this.dir.normalize();
        this.sprite = sprite;
        this.health = health;
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

    receiveHit() {
        // TODO: Implement this with proper animations
        this.sprite.filter(INVERT);
    }

    findHit(ray, epsilon) {
        // TODO: Re-implement with Bounding Box
        // Approximates the ship as a line that starts from the tip to tail (It does not rotate with the ship)
        let tail = createVector(this.pos.x - this.sprite.width/2, this.pos.y);
        let tip = createVector(this.pos.x + this.sprite.width/2, this.pos.y);

        let line = new LineObject(tail.x, tail.y, tip.x, tip.y);
        return line.findHit(ray, epsilon);
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