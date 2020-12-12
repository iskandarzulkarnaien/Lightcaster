class Ray {
    SHOW_RAY_POS = false
    RAY_POS_SIZE = 8

    constructor(pos_x, pos_y, dir_x, dir_y) {
        this.pos = createVector(pos_x, pos_y);
        this.dir = createVector(dir_x, dir_y);
        this.dir.normalize();
    }

    moveTo(x, y) {
        this.pos = createVector(x, y);
    }

    lookAt(x, y) {
        new_dir = createVector(x - this.pos.x, y - this.pos.y);
        new_dir.normalize();
        this.dir = new_dir;
    }

    cast(objects) {
        let nearest_hit = null;
        let hit_object = null;
        let hit_distance = Infinity;
        for (let object of objects) {
            const hit_point = object.findHit(this);
            if (hit_point) {
                const distance = p5.Vector.dist(this.pos, hit_point);
                if (distance < hit_distance) {
                    nearest_hit = hit_point;
                    hit_object = object;
                    hit_distance = distance;
                }
            }
        }
        if (nearest_hit) {
            stroke(255, 100);
            line(this.pos.x, this.pos.y, nearest_hit.x, nearest_hit.y);
            if (hit_object.reflective) {
                let reflected_dir = this.dir.reflect(hit_object.normal)
                let reflected_ray = new Ray(nearest_hit.x, nearest_hit.y, reflected_dir.x, reflected_dir.y)
                reflected_ray.cast(objects)
            }

        }
    }

    show() {
        if (this.SHOW_RAY_POS) {
            fill(255);
            ellipse(this.pos.x, this.pos.y, this.RAY_POS_SIZE);
        }
    }
}