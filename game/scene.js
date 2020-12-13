// Objects requiring pre-loading
let backgroundSprite;
let playerSprite;
let enemySprites;

// Other Objects
let objects;
let lightSources;
let player;
let followMouse;

// Game Related Data
let gameTick = 0;

// Main Functions Section
function preload() {
    const NUM_ENEMIES = 9;

    backgroundSprite = preloadBackground();

    playerSprite = preloadPlayer();
    playerSprite.loadPixels();

    enemySprites = preloadEnemies(NUM_ENEMIES);
    for (let enemySprite of enemySprites) {
        enemySprite.loadPixels();
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

    backgroundSprite.delay(BACKGROUND_ANIMATION_SPEED);

    objects = createObjects();
    lightSources = createStationaryLightSources();

    // Place these into their own functions
    playerSprite.resize(0, PLAYER_SIZE);
    player = Player.createPlayer(width/2, height/2, playerSprite);
    objects.push(player);

    let boundingOffset = 100;
    for (let enemySprite of enemyShipSprites) {
        let x = random(boundingOffset, width - boundingOffset);
        let y = random(boundingOffset, height - boundingOffset);

        enemySprite.resize(0, ENEMY_SIZE);
        enemy = Enemy.createEnemy(x, y, enemySprite);
        objects.push(enemy);
    }
}

function draw() {
    gameTick++;
    if (gameTick % 60 == 0) {
        console.log(`${gameTick / 60} seconds have elapsed`);
        console.log(`current framerate is: ${frameRate()}`);
    }

    displayBackground();

    drawAllObjects(objects);
    // castAllStationaryLightSources(lightSources, objects);

    player.allowControl(followMouse, objects);
    player.show();
}

// Helper Functions Section

// Preload Function
function preloadBackground(backgroundType=null) {
    if (!backgroundType) {
        backgroundType = Math.floor(random(1, 10));
    }
    return loadImage(`assets/animated_backgrounds/space${backgroundType}_4-frames.gif`);
}

function preloadPlayer(shipType=2) {
    if (!shipType) {
        shipType = Math.floor(random(1, 7));
    }
    return loadImage(`assets/models/player/Ship${shipType}.png`);
}

function preloadEnemies(numEnemies, enemyShipId=null) {
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
function displayBackground() {
    background(backgroundSprite)
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
    let boundaryTop = new Boundary(0, 0, width, 0);
    objects.push(boundaryTop);
    
    let boundaryRight = new Boundary(width, 0, width, height);
    objects.push(boundaryRight);

    let boundaryBottom = new Boundary(0, height, width, height);
    objects.push(boundaryBottom);

    let boundaryLeft = new Boundary(0, 0, 0, height);
    objects.push(boundaryLeft);

    // Other Surfaces

    for (let i = 0; i < 9; i++) {
        let boundingOffset = 50;
        let x1= random(boundingOffset, width - boundingOffset);
        let y1 = random(boundingOffset, height - boundingOffset);
        let x2 = random(boundingOffset, width - boundingOffset);
        let y2 = random(boundingOffset, height - boundingOffset);
        
        let randomLine = random([
            (x1, y1, x2, y2) => new LineObject(x1, y1, x2, y2),
            (x1, y1, x2, y2) => new Mirror(x1, y1, x2, y2),
            (x1, y1, x2, y2) => new UnreflectiveGlass(x1, y1, x2, y2)
        ])(x1, y1, x2, y2);
        objects.push(randomLine);
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
    lightSources = [];

    // let ray = new Ray(width / 2, height / 2, 1, 0);
    // // ray.moveTo(mouseX, mouseY);
    // lightSources.push(ray);

    // let torch = new LightSource(width / 2 - 100, height / 2 - 100, 1, 1, 30, 1);
    let torch = new LightSource(0, 0, 1, 1, 30, 1);
    lightSources.push(torch);

    return lightSources;
}

function castAllStationaryLightSources(sources, objects) {
    for (let source of sources) {
        source.cast(objects);
    }
}