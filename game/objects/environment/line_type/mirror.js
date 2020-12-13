class Mirror extends LineObject {
    constructor(startPointX, startPointY, endPointX, endPointY) {
        super(startPointX, startPointY, endPointX, endPointY);
        super.addOpticalProperty('reflective');
    }

    show() {
        push();
            stroke('yellow');
            strokeWeight(3);
            line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
        pop();
        push();
            stroke(100);
            strokeWeight(0.5);
            line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
        pop();
    }
}