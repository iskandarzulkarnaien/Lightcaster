class UnreflectiveGlass extends LineObject {
    constructor(start_x, start_y, end_x, end_y) {
        super(start_x, start_y, end_x, end_y);
        super.addOpticalProperty('transparent')
    }

    show() {
        push();
            stroke(255, 200);
            strokeWeight(3);
            line(this.start_point.x, this.start_point.y, this.end_point.x, this.end_point.y);
        pop();
        push();
            stroke(0);
            strokeWeight(1.5);
            line(this.start_point.x, this.start_point.y, this.end_point.x, this.end_point.y);
        pop();
    }
}