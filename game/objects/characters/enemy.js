class Enemy extends BaseCharacter {
    constructor(posX, posY, dirX=1, dirY=0, sprite, health=10) {
        super(posX, posY, dirX, dirY, sprite, health)
    }

    static createEnemy(posX, posY, sprite) {
        return new Enemy(posX, posY, 1, 0, sprite);
    }
}