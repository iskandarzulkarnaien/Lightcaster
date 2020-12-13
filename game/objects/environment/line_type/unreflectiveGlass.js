class UnreflectiveGlass extends LineObject {
    constructor(startPointX, startPointY, endPointX, endPointY) {
        super(startPointX, startPointY, endPointX, endPointY);
        super.addOpticalProperty('transparent')
    }

    show() {
        push();
            stroke(255, 200);
            strokeWeight(3);
            line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
        pop();
        push();
            stroke(0);
            strokeWeight(1.5);
            line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
        pop();
    }
}