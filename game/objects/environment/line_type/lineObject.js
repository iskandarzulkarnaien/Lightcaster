class LineObject extends BaseObject {
    constructor(startPointX, startPointY, endPointX, endPointY) {
        super();
        this.startPoint = createVector(startPointX, startPointY);
        this.endPoint = createVector(endPointX, endPointY);
        
        let startToEndDir = p5.Vector.sub(this.endPoint, this.startPoint);
        startToEndDir.normalize();
        this.normal = createVector(-startToEndDir.y, startToEndDir.x);
    }

    findHit(ray, epsilon) {
        // Modified from: https://github.com/CodingTrain/website/blob/main/CodingChallenges/CC_145_Ray_Casting/P5/ray.js
        const x1 = this.startPoint.x;
        const y1 = this.startPoint.y;
        const x2 = this.endPoint.x;
        const y2 = this.endPoint.y;
    
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
            const intersectionPoint = createVector();
            intersectionPoint.x = x1 + t * (x2 - x1);
            intersectionPoint.y = y1 + t * (y2 - y1);
            return intersectionPoint;
        } else {
            return;
        }
    }

    show() {
        push();
            stroke(255);
            strokeWeight(3);
            line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
        pop();
    }
}