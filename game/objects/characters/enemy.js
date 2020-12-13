class Enemy extends BaseCharacter {
    constructor(pos_x, pos_y, dir_x=1, dir_y=0, sprite, health=10) {
        super(pos_x, pos_y, dir_x, dir_y, sprite, health)
    }

    static createEnemy(pos_x, pos_y, sprite) {
        return new Enemy(pos_x, pos_y, 1, 0, sprite);
    }
}