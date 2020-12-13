class Player extends BaseCharacter {
    constructor(pos_x, pos_y, dir_x=1, dir_y=0, sprite, health=10) {
        super(pos_x, pos_y, dir_x, dir_y, sprite, health)
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
}