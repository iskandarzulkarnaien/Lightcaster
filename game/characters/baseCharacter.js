class BaseCharacter extends BaseObject {
    constructor(pos_x, pos_y, dir_x, dir_y, sprite, health) {
        super();
        this.pos = createVector(pos_x, pos_y);
        this.dir = createVector(dir_x, dir_y);
        this.dir.normalize();
        this.sprite = sprite;
        this.health = health;
    }

    receiveHit() {
        // TODO: Implement this with proper animations
        this.sprite.filter(INVERT);
    }

    findHit(ray, epsilon) {
        // TODO: Reimplement with Bounding Box
        // Approximates the ship as a line that starts from the tip to tail (It does not rotate with the ship)
        let tail = createVector(this.pos.x - this.sprite.width/2, this.pos.y);
        let tip = createVector(this.pos.x + this.sprite.width/2, this.pos.y);

        let line = new LineObject(tail.x, tail.y, tip.x, tip.y);
        let intersection_point = line.findHit(ray, epsilon);

        if (intersection_point) {
            this.receiveHit();
            return intersection_point;
        } else {
            return;
        }
    }
}