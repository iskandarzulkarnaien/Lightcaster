CANVAS_WIDTH = 800;
CANVAS_HEIGHT = 800;

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
    background(0);

    objects = createObjects();
    drawAllObjects(objects);

    light_sources = createLightSources();
    castAllLightSources(light_sources, objects);
}

// Make objects in here, then push them into the array
function createObjects() {
    objects = [];

    let mirror = new Mirror(CANVAS_WIDTH / 2 + 50, CANVAS_HEIGHT / 2 + 100,
        CANVAS_WIDTH / 2 + 50, CANVAS_HEIGHT / 2 - 100);
    objects.push(mirror);

    let boundary_top = new LineSegment(0, 0, CANVAS_WIDTH, 0);
    objects.push(boundary_top);
    
    let boundary_right = new LineSegment(CANVAS_WIDTH, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    objects.push(boundary_right);

    let boundary_bottom = new LineSegment(0, CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT);
    objects.push(boundary_bottom);

    let boundary_left = new LineSegment(0, 0, 0, CANVAS_HEIGHT);
    objects.push(boundary_left);

    return objects;
}

function drawAllObjects(objects) {
    for (let object of objects) {
        object.show();
    }
}

function createLightSources() {
    light_sources = [];

    // let ray = new Ray(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 1, 0);
    // // ray.moveTo(mouseX, mouseY);
    // light_sources.push(ray);

    let candle = new LightSource(CANVAS_WIDTH / 2 - 100, CANVAS_HEIGHT / 2 - 100, 1, -1, 30, 1);
    // candle.show();
    light_sources.push(candle);

    return light_sources;
}

function castAllLightSources(sources, objects) {
    for (let source of sources) {
        source.cast(objects);
    }
}