class Enemy extends BaseCharacter {
    constructor(pos_x, pos_y, dir_x=1, dir_y=0, sprite, health=10) {
        super(pos_x, pos_y, dir_x, dir_y, sprite, health)
    }

    static createEnemy(pos_x, pos_y, sprite) {
        return new Enemy(pos_x, pos_y, 1, 0, sprite);
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
        let new_dir = createVector(point.x - this.pos.x, point.y - this.pos.y);
        new_dir.normalize();
        this.dir = new_dir;
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