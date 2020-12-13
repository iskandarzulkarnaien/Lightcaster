class Boundary extends LineObject {
    constructor(startPointX, startPointY, endPointX, endPointY) {
        super(startPointX, startPointY, endPointX, endPointY);
    }

    show() {
        push();
            stroke(0);
            strokeWeight(10);
            line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
        pop();
    }
}