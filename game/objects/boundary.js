class Boundary extends LineObject {
    constructor(start_x, start_y, end_x, end_y) {
        super(start_x, start_y, end_x, end_y);
    }

    show() {
        push();
            stroke(0);
            strokeWeight(10);
            line(this.start_point.x, this.start_point.y, this.end_point.x, this.end_point.y);
        pop();
    }
}