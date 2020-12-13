class Ray {
    EPSILON = 10e-6; // To avoid epsilon problem
    MAXIMUM_REFLECT_LEVEL = 7;

    SHOW_RAY_POS = false;
    RAY_POS_SIZE = 8;

    constructor(pos_x, pos_y, dir_x, dir_y, draw_function=null) {
        this.pos = createVector(pos_x, pos_y);
        this.dir = createVector(dir_x, dir_y);
        this.dir.normalize();

        if (!draw_function) {
            this.draw_function = (ray, hit_location)=> {
                push();
                    stroke(255, 100);
                    line(ray.pos.x, ray.pos.y, hit_location.x, hit_location.y);
                pop();
            };
        } else {
            this.draw_function = draw_function
        }
    }

    // Possible Candidates for sub-classing
    static createDefaultRay(pos, dir) {
        const draw_function = (ray, hit_location)=> {
            push();
                stroke(255, 100);
                line(ray.pos.x, ray.pos.y, hit_location.x, hit_location.y);
            pop();
        };
        return new Ray(pos.x, pos.y, dir.x, dir.y, draw_function)
    }

    static createPlayerRay(player) {
        const draw_function = (ray, hit_location) => {
            push();
                stroke('red');
                strokeWeight(3)
                line(ray.pos.x, ray.pos.y, hit_location.x, hit_location.y);
            pop();
        };
        return new Ray(player.pos.x, player.pos.y, player.dir.x, player.dir.y, draw_function)
    }

    static createCustomRay(pos, dir, draw_function) {
        return new Ray(pos.x, pos.y, dir.x, dir.y, draw_function)
    }

    static copy(ray) {
        return new Ray(ray.pos.x, ray.pos.y, ray.dir.x, ray.dir.y, ray.draw_function)
    }

    cast(objects, reflect_level=this.MAXIMUM_REFLECT_LEVEL) {
        let nearest_hit = null;
        let hit_object = null;
        let hit_distance = Infinity;
        for (let object of objects) {
            const hit_point = object.findHit(this, this.EPSILON);
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
            this.drawRay(nearest_hit);
            hit_object.receiveHit();

            if (hit_object.optical_properties.includes('reflective') && reflect_level > 0) {
                this.handleReflective(nearest_hit, hit_object, reflect_level);
            }

            if (hit_object.optical_properties.includes('transparent')) {
                this.handleTransparent(nearest_hit);
            }

            if (hit_object.optical_properties.includes('translucent')) {
                this.handleTranslucent(nearest_hit);
            }
        }
    }

    handleReflective(nearest_hit, hit_object, reflect_level) {
        let reflected_dir = this.dir.copy().reflect(hit_object.normal)

        let reflected_ray = Ray.copy(this);
        reflected_ray.moveTo(nearest_hit);
        reflected_ray.changeDir(reflected_dir)
        reflected_ray.cast(objects, reflect_level - 1)
    }

    handleTransparent(nearest_hit) {
        let penetrating_ray = Ray.copy(this);
        penetrating_ray.moveTo(nearest_hit);
        penetrating_ray.cast(objects);
    }

    handleTranslucent(nearest_hit) {
        // TODO: Perform some attenuation of ray brightness
        // let penetrating_ray = new Ray(nearest_hit.x, nearest_hit.y, this.dir.x, this.dir.y);
        // penetrating_ray.cast(objects)
    }

    drawRay(hit_location) {
        this.draw_function(this, hit_location);
    }

    moveTo(point) {
        this.pos = point;
    }

    lookAt(point) {
        let new_dir = createVector(point.x - this.pos.x, point.y - this.pos.y);
        new_dir.normalize();
        this.dir = new_dir;
    }

    changeDir(direction) {
        this.dir = direction;
    }

    show() {
        if (this.SHOW_RAY_POS) {
            fill(255);
            ellipse(this.pos.x, this.pos.y, this.RAY_POS_SIZE);
        }
    }
}