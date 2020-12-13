class Player {
    constructor(pos_x, pos_y, dir_x=1, dir_y=0, sprite) {
        this.pos = createVector(pos_x, pos_y);
        this.dir = createVector(dir_x, dir_y);
        this.dir.normalize();
        this.sprite = sprite;
    }

    static createPlayer(pos_x, pos_y, sprite) {
        return new Player(pos_x, pos_y, 1, 0, sprite);
    }

    allowControl(follow_mouse, objects) {
        this.moveForwardsBackwards();

        if (follow_mouse) {
            this.lookAtMouse();
            this.moveLeftRight();
        } else {
            this.lookLeftRight();
        }
        
        this.laserControl(objects);
    }

    moveForwardsBackwards(speed=50) {
        let normalized_speed = map(speed, 0, 100, 0.1, 10)
        let displacement;
        // 87, 83 are 'W' and 'S' keys respectively.
        if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
            displacement = this.dir.copy().mult(normalized_speed);
        } else if ((keyIsDown(DOWN_ARROW) || keyIsDown(83))) {
            displacement = this.dir.copy().mult(-1 * normalized_speed);
        }

        if (displacement) {
            this.moveTo(createVector(this.pos.x + displacement.x, this.pos.y + displacement.y))
        }
    }

    moveLeftRight(speed=50) {
        let normalized_speed = map(speed, 0, 100, 0.1, 10)
        let displacement;
        // 65, 68 are 'A' and 'D' keys respectively.
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            displacement = this.dir.copy().rotate(radians(-90)).mult(normalized_speed);
        } else if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68))) {
            displacement = this.dir.copy().rotate(radians(90)).mult(normalized_speed);
        }

        if (displacement) {
            this.moveTo(createVector(this.pos.x + displacement.x, this.pos.y + displacement.y))
        }
    }

    lookAtMouse() {
        this.lookAt(createVector(mouseX, mouseY));
    }

    lookLeftRight(speed=10) {
        let new_dir;
        // 65, 68 are 'A' and 'D' keys respectively.
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            new_dir = this.dir.copy().rotate(radians(-speed));
        } else if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68))) {
            new_dir = this.dir.copy().rotate(radians(speed));
        }

        if (new_dir) {
            let new_look_at_pt = createVector(new_dir.x + this.pos.x, new_dir.y + this.pos.y)
            this.lookAt(new_look_at_pt)
        }
    }

    laserControl(objects) {
        // 32 is 'SPACE' key.
        if (keyIsDown(32) || mouseIsPressed) {
            let laser = Ray.createPlayerRay(player);
            laser.cast(objects);
        }

        // function keyPressed(player) {
        //     if (keyCode == 32) {
        //         let laser = Ray.createPlayerRay(player);
        //         laser.cast(objects);
        //     }
        // }
        // keyPressed(this);
    }

    cast(objects) {
        for (let ray of this.rays) {
            ray.cast(objects);
        }
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