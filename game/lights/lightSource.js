class LightSource {
    constructor(posX, posY, dirX, dirY, fov, intensity, shape=null) {
        this.pos = createVector(posX, posY);
        this.dir = createVector(dirX, dirY);
        this.dir.normalize();
        this.fov = fov;
        this.intensity = intensity; // TODO: Change number of rays based on intensity
        if (!shape) {
            this.shape = () => ellipse(this.pos.x, this.pos.y, 8);
        } else {
            this.shape = shape;
        }
        this.generateRays();
    }

    moveTo(point) {
        this.pos = point;
        this.generateRays();
    }

    lookAt(point) {
        let newDir = createVector(point.x - this.pos.x, point.y - this.pos.y);
        newDir.normalize();
        this.dir = newDir;
        this.generateRays();
    }

    updateFov(angle) {
        this.fov = angle;
        this.generateRays();
    }

    cast(objects) {
        for (let ray of this.rays) {
            ray.cast(objects);
        }
    }

    generateRays() {
        this.rays = [];
        for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
            let rayDir = p5.Vector.fromAngle(radians(a) - this.dir.angleBetween(createVector(1, 0)));
            this.rays.push(new Ray(this.pos.x, this.pos.y, rayDir.x, rayDir.y));        
        }
    }

    show() {
        this.shape();
    }
}