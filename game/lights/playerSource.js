class PlayerSource extends LightSource {
    constructor(pos_x, pos_y, dir_x=1, dir_y=0, fov=30, intensity=null, sprite=null) {
        super(pos_x, pos_y, dir_x, dir_y, fov, intensity, sprite);
    }

    static createPlayer(pos_x, pos_y, sprite) {
        return new PlayerSource(pos_x, pos_y, 1, 0, 30, null, sprite);
    }

    allowControl(follow_mouse) {
        this.moveForwardsBackwards();

        if (follow_mouse) {
            this.lookAtMouse();
            this.moveLeftRight();
        } else {
            this.lookLeftRight();
        }
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
            super.lookAt(new_look_at_pt)
        }
    }

    moveTo(point) {
        let x = point.x;
        x = x < 0 ? 0 : x;
        x = x > width ? width : x;

        let y = point.y
        y = y < 0 ? 0 : y;
        y = y > height ? height : y;

        super.moveTo(createVector(x, y));
    }

    // Use slider for this?
    updateFov() {
        // let fov = get_fov_from_player
        // super.updateFov(get_fov_from_player)
    }

    show() {
        push();
            translate(this.pos.x, this.pos.y);
            rotate(-this.dir.angleBetween(createVector(1, 0)));
            translate(-this.shape.width/2, -this.shape.height/2);
            translate(-this.pos.x, -this.pos.y);
            image(this.shape, this.pos.x, this.pos.y);
        pop();
    }
}