class LightSource {
    constructor(pos_x, pos_y, dir_x, dir_y, fov, intensity, shape=null) {
        this.pos = createVector(pos_x, pos_y);
        this.dir = createVector(dir_x, dir_y);
        this.dir.normalize();
        this.fov = fov;
        this.intensity = intensity;
        if (!shape) {
            this.shape = () => ellipse(this.pos.x, this.pos.y, 8);
        } else {
            this.shape = shape;
        }
        this.generateRays();
    }

    moveTo(x, y) {
        this.pos.set(x, y);
        this.generateRays();
    }

    lookAt(x, y) {
        let new_dir = createVector(x - this.pos.x, y - this.pos.y);
        new_dir.normalize();
        this.dir = new_dir;
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
            let ray_dir = p5.Vector.fromAngle(radians(a) - this.dir.angleBetween(createVector(1, 0)));
            this.rays.push(new Ray(this.pos.x, this.pos.y, ray_dir.x, ray_dir.y));        
        }
    }

    show() {
        this.shape();
    }
}