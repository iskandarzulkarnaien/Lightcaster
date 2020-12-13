class Player extends BaseCharacter {
    constructor(posX, posY, dirX=1, dirY=0, sprite, health=10) {
        super(posX, posY, dirX, dirY, sprite, health)
    }

    static createPlayer(posX, posY, sprite) {
        return new Player(posX, posY, 1, 0, sprite);
    }

    allowControl(followMouse, objects) {
        this.moveForwardsBackwards();

        if (followMouse) {
            this.lookAtMouse();
            this.moveLeftRight();
        } else {
            this.lookLeftRight();
        }
        
        this.laserControl(objects);
    }

    moveForwardsBackwards(speed=50) {
        let normalizedSpeed = map(speed, 0, 100, 0.1, 10)
        let displacement;
        // 87, 83 are 'W' and 'S' keys respectively.
        if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
            displacement = this.dir.copy().mult(normalizedSpeed);
        } else if ((keyIsDown(DOWN_ARROW) || keyIsDown(83))) {
            displacement = this.dir.copy().mult(-1 * normalizedSpeed);
        }

        if (displacement) {
            this.moveTo(createVector(this.pos.x + displacement.x, this.pos.y + displacement.y))
        }
    }

    moveLeftRight(speed=50) {
        let normalizedSpeed = map(speed, 0, 100, 0.1, 10)
        let displacement;
        // 65, 68 are 'A' and 'D' keys respectively.
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            displacement = this.dir.copy().rotate(radians(-90)).mult(normalizedSpeed);
        } else if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68))) {
            displacement = this.dir.copy().rotate(radians(90)).mult(normalizedSpeed);
        }

        if (displacement) {
            this.moveTo(createVector(this.pos.x + displacement.x, this.pos.y + displacement.y))
        }
    }

    lookAtMouse() {
        this.lookAt(createVector(mouseX, mouseY));
    }

    lookLeftRight(speed=10) {
        let newDir;
        // 65, 68 are 'A' and 'D' keys respectively.
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            newDir = this.dir.copy().rotate(radians(-speed));
        } else if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68))) {
            newDir = this.dir.copy().rotate(radians(speed));
        }

        if (newDir) {
            let newLookAtPt = createVector(newDir.x + this.pos.x, newDir.y + this.pos.y)
            this.lookAt(newLookAtPt)
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