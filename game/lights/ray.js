class Ray {
    EPSILON = 10e-6; // To avoid epsilon problem
    MAXIMUM_REFLECT_LEVEL = 7;

    SHOW_RAY_POS = false;
    RAY_POS_SIZE = 8;

    constructor(posX, posY, dirX, dirY, drawFunction=null) {
        this.pos = createVector(posX, posY);
        this.dir = createVector(dirX, dirY);
        this.dir.normalize();

        if (!drawFunction) {
            this.drawFunction = (ray, hitLocation)=> {
                push();
                    stroke(255, 100);
                    line(ray.pos.x, ray.pos.y, hitLocation.x, hitLocation.y);
                pop();
            };
        } else {
            this.drawFunction = drawFunction;
        }
    }

    // Possible Candidates for sub-classing
    static createDefaultRay(pos, dir) {
        const drawFunction = (ray, hitLocation)=> {
            push();
                stroke(255, 100);
                line(ray.pos.x, ray.pos.y, hitLocation.x, hitLocation.y);
            pop();
        };
        return new Ray(pos.x, pos.y, dir.x, dir.y, drawFunction)
    }

    static createPlayerRay(player) {
        const drawFunction = (ray, hitLocation) => {
            push();
                stroke('red');
                strokeWeight(3)
                line(ray.pos.x, ray.pos.y, hitLocation.x, hitLocation.y);
            pop();
        };
        return new Ray(player.pos.x, player.pos.y, player.dir.x, player.dir.y, drawFunction)
    }

    static createEnemyRay(enemy) {
        const drawFunction = (ray, hitLocation) => {
            push();
                stroke('green');
                strokeWeight(2)
                line(ray.pos.x, ray.pos.y, hitLocation.x, hitLocation.y);
            pop();
        };
        return new Ray(enemy.pos.x, enemy.pos.y, enemy.dir.x, enemy.dir.y, drawFunction)
    }

    static createCustomRay(pos, dir, drawFunction) {
        return new Ray(pos.x, pos.y, dir.x, dir.y, drawFunction)
    }

    static copy(ray) {
        return new Ray(ray.pos.x, ray.pos.y, ray.dir.x, ray.dir.y, ray.drawFunction)
    }

    cast(objects, reflectLevel=this.MAXIMUM_REFLECT_LEVEL) {
        let nearestHit = null;
        let hitObject = null;
        let hitDistance = Infinity;
        for (let object of objects) {
            const hitPoint = object.findHit(this, this.EPSILON);
            if (hitPoint) {
                const distance = p5.Vector.dist(this.pos, hitPoint);
                if (distance < hitDistance) {
                    nearestHit = hitPoint;
                    hitObject = object;
                    hitDistance = distance;
                }
            }
        }
        if (nearestHit) {
            this.drawRay(nearestHit);
            hitObject.receiveHit();

            if (hitObject.opticalProperties.includes('reflective') && reflectLevel > 0) {
                this.handleReflective(nearestHit, hitObject, reflectLevel);
            }

            if (hitObject.opticalProperties.includes('transparent')) {
                this.handleTransparent(nearestHit);
            }

            if (hitObject.opticalProperties.includes('translucent')) {
                this.handleTranslucent(nearestHit);
            }
        }
    }

    handleReflective(nearestHit, hitObject, reflectLevel) {
        let reflectedDir = this.dir.copy().reflect(hitObject.normal)

        let reflectedRay = Ray.copy(this);
        reflectedRay.moveTo(nearestHit);
        reflectedRay.changeDir(reflectedDir)
        reflectedRay.cast(objects, reflectLevel - 1)
    }

    handleTransparent(nearestHit) {
        let penetratingRay = Ray.copy(this);
        penetratingRay.moveTo(nearestHit);
        penetratingRay.cast(objects);
    }

    handleTranslucent(nearestHit) {
        // TODO: Perform some attenuation of ray brightness
        // let penetratingRay = new Ray(nearestHit.x, nearestHit.y, this.dir.x, this.dir.y);
        // penetratingRay.cast(objects)
    }

    drawRay(hitLocation) {
        this.drawFunction(this, hitLocation);
    }

    moveTo(point) {
        this.pos = point;
    }

    lookAt(point) {
        let newDir = createVector(point.x - this.pos.x, point.y - this.pos.y);
        newDir.normalize();
        this.dir = newDir;
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