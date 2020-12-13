// Objects requiring pre-loading
let background_img;
let player_sprite;
let enemy_sprites;

// Other Objects
let objects;
let light_sources;
let player;
let follow_mouse;

// Game Related Data
let game_tick = 0;

// Main Functions Section
function preload() {
    const NUM_ENEMIES = 9;

    background_img = preload_background();

    player_sprite = preload_player();
    player_sprite.loadPixels();

    enemy_sprites = preload_enemies(NUM_ENEMIES);
    for (let enemy_sprite of enemy_sprites) {
        enemy_sprite.loadPixels();
    }
}

function setup() {
    // Scaling Constants
    const CANVAS_LENGTH = displayWidth < displayHeight ? displayWidth : displayHeight;
    const BACKGROUND_ANIMATION_SPEED = 750; // In milliseconds
    const TARGET_FRAMERATE = 60;

    const PLAYER_SIZE = Math.floor(CANVAS_LENGTH * 0.025);
    const ENEMY_SIZE = Math.floor(CANVAS_LENGTH * 0.030);

    // Locks the framerate to the target framerate, game ticks are based on number of elapsed frames
    frameRate(TARGET_FRAMERATE);

    createCanvas(CANVAS_LENGTH * 3/4, CANVAS_LENGTH * 3/4);

    background_img.delay(BACKGROUND_ANIMATION_SPEED);

    objects = createObjects();
    light_sources = createStationaryLightSources();

    // Place these into their own functions
    player_sprite.resize(0, PLAYER_SIZE);
    player = Player.createPlayer(width/2, height/2, player_sprite);
    objects.push(player);

    let bounding_offset = 100;
    for (let enemySprite of enemyShipSprites) {
        let x = random(bounding_offset, width - bounding_offset);
        let y = random(bounding_offset, height - bounding_offset);

        enemySprite.resize(0, ENEMY_SIZE);
        enemy = Enemy.createEnemy(x, y, enemySprite);
        objects.push(enemy);
    }
}

function draw() {
    game_tick++;
    if (game_tick % 60 == 0) {
        console.log(`${game_tick / 60} seconds have elapsed`);
        console.log(`current framerate is: ${frameRate()}`);
    }

    display_background();

    drawAllObjects(objects);
    // castAllStationaryLightSources(light_sources, objects);

    player.allowControl(follow_mouse, objects);
    player.show();
}

// Helper Functions Section

// Preload Function
function preload_background(background_id=null) {
    if (!background_id) {
        background_id = Math.floor(random(1, 10));
    }
    return loadImage(`assets/animated_backgrounds/space${background_id}_4-frames.gif`);
}

function preload_player(ship_id=2) {
    if (!ship_id) {
        ship_id = Math.floor(random(1, 7));
    }
    return loadImage(`assets/models/player/Ship${ship_id}.png`);
}

function preload_enemies(numEnemies, enemyShipId=null) {
    enemyShipSprites = [];
    if (!enemyShipId) {
        enemyShipId = Math.floor(random(1, 7));
    }
    for (let i = 0; i < numEnemies; i++) {
        enemyShipSprites.push(loadImage(`assets/models/player/Ship${enemyShipId}.png`));
    }
    return enemyShipSprites;
}

// Display Functions
function display_background() {
    background(background_img)
}

function drawAllObjects(objects) {
    for (let object of objects) {
        object.show();
    }
}

// Environment Creation Functions
// Make objects in here, then push them into the array
function createObjects() {
    objects = [];

    // Bounding Box of Canvas
    let boundary_top = new Boundary(0, 0, width, 0);
    objects.push(boundary_top);
    
    let boundary_right = new Boundary(width, 0, width, height);
    objects.push(boundary_right);

    let boundary_bottom = new Boundary(0, height, width, height);
    objects.push(boundary_bottom);

    let boundary_left = new Boundary(0, 0, 0, height);
    objects.push(boundary_left);

    // Other Surfaces

    for (let i = 0; i < 9; i++) {
        let bounding_offset = 50;
        let x1= random(bounding_offset, width - bounding_offset);
        let y1 = random(bounding_offset, height - bounding_offset);
        let x2 = random(bounding_offset, width - bounding_offset);
        let y2 = random(bounding_offset, height - bounding_offset);
        
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

// Light Related Functions
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