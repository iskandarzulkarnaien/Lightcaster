class Mirror extends LineSegment {
    constructor(start_x, start_y, end_x, end_y) {
        super(start_x, start_y, end_x, end_y);
        this.reflective = true;
    }
}