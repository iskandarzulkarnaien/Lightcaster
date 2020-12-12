class LineObject extends BaseObject {
    constructor(start_x, start_y, end_x, end_y) {
        super();
        this.start_point = createVector(start_x, start_y);
        this.end_point = createVector(end_x, end_y);
        
        let start_to_end_dir = p5.Vector.sub(this.end_point, this.start_point);
        start_to_end_dir.normalize();
        this.normal = createVector(-start_to_end_dir.y, start_to_end_dir.x);
    }

    findHit(ray, epsilon) {
        // Modified from: https://github.com/CodingTrain/website/blob/main/CodingChallenges/CC_145_Ray_Casting/P5/ray.js
        const x1 = this.start_point.x;
        const y1 = this.start_point.y;
        const x2 = this.end_point.x;
        const y2 = this.end_point.y;
    
        const x3 = ray.pos.x;
        const y3 = ray.pos.y;
        const x4 = ray.pos.x + ray.dir.x;
        const y4 = ray.pos.y + ray.dir.y;
    
        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (denominator == 0) {
            return;
        }
    
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;
        if (t > 0 && t < 1 && u > epsilon) {
            const intersection_point = createVector();
            intersection_point.x = x1 + t * (x2 - x1);
            intersection_point.y = y1 + t * (y2 - y1);
            return intersection_point;
        } else {
            return;
        }
    }

    show() {
        push();
            stroke(255);
            line(this.start_point.x, this.start_point.y, this.end_point.x, this.end_point.y);
        pop();
    }
}