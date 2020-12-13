class Enemy extends BaseCharacter {
    constructor(posX, posY, dirX=1, dirY=0, sprite, health=10) {
        super(posX, posY, dirX, dirY, sprite, health)
    }

    static createEnemy(posX, posY, sprite) {
        return new Enemy(posX, posY, 1, 0, sprite);
    }

    executeBehaviour(player) {
        if (!this.checkHealthStatus()) {
            return;
        }
        super.executeBehaviour();
        this.executeAllActions(player);
    }

    executeAllActions(player) {
        this.idleAction();
        this.huntPlayerAction(player);
    }

    idleAction() {

    }

    huntPlayerAction(player) {
        if (this.actionTick < 120) {
            return;
        }
        // let isPlayerFound = this.findPlayer(player);
        // if (isPlayerFound) {
        //     this.fireAt(player.pos);
        // }
        this.fireAt(player.pos);
        super.resetActionTick();
    }

    findPlayer(player) {

    }

    fireAt(point) {
        this.lookAt(point);
        let laser = Ray.createEnemyRay(this);
        laser.cast(objects);
    }
}