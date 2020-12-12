let objects;
let light_sources;

function setup() {
    canvas_length = displayWidth < displayHeight ? displayWidth : displayHeight
    createCanvas(canvas_length * 3/4, canvas_length * 3/4);
    objects = createObjects();
    light_sources = createStationaryLightSources();
}

function draw() {
    background(0);

    drawAllObjects(objects);
    castAllStationaryLightSources(light_sources, objects);
}

// Make objects in here, then push them into the array
function createObjects() {
    objects = [];

    // Bounding Box of Canvas
    let boundary_top = new LineObject(0, 0, width, 0);
    objects.push(boundary_top);
    
    let boundary_right = new LineObject(width, 0, width, height);
    objects.push(boundary_right);

    let boundary_bottom = new LineObject(0, height, width, height);
    objects.push(boundary_bottom);

    let boundary_left = new LineObject(0, 0, 0, height);
    objects.push(boundary_left);

    // Other Surfaces

    for (let i = 0; i < 9; i++) {
        let x1= random(width);
        let y1 = random(height);
        let x2 = random(width);
        let y2 = random(height);
        
        let random_line = random([
            (x1, y1, x2, y2) => new LineObject(x1, y1, x2, y2),
            (x1, y1, x2, y2) => new Mirror(x1, y1, x2, y2),
            (x1, y1, x2, y2) => new UnreflectiveGlass(x1, y1, x2, y2)
        ])(x1, y1, x2, y2);
        objects.push(random_line);
    }

    // let glass = new UnreflectiveGlass(width / 2, height / 2 + 50,
    //     width / 2 + 50, height / 2 - 100);
    // objects.push(glass);

    // let mirror = new Mirror(width / 2 + 50, height / 2 + 100,
    //     width / 2 + 50, height / 2 - 100);
    // objects.push(mirror);

    return objects;
}

function drawAllObjects(objects) {
    for (let object of objects) {
        object.show();
    }
}

function createStationaryLightSources() {
    light_sources = [];

    // let ray = new Ray(width / 2, height / 2, 1, 0);
    // // ray.moveTo(mouseX, mouseY);
    // light_sources.push(ray);

    // let torch = new LightSource(width / 2 - 100, height / 2 - 100, 1, 1, 30, 1);
    let torch = new LightSource(0, 0, 1, 1, 30, 1);
    light_sources.push(torch);

    return light_sources;
}

function castAllStationaryLightSources(sources, objects) {
    for (let source of sources) {
        source.cast(objects);
    }
}