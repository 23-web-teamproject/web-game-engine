import { GameObject, Rect, Vector, Sprite } from "/src/engine/module.js";
import Path from "/src/engine/utils/path.js";

export default class movingblock3 extends GameObject {
  constructor(x, y) {
    super();
    //setAssetFolderPath는 한 번만 실행해도 됩니다.
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.

    this.rect = new Rect({
      name: "jumpTrigger",
      width: 90,
      height: 4,
      transform: {
        position: new Vector(x, y - 13),
      },
      isPhysicsEnable: true,
      rigidbody: {
        isTrigger: true,
      },
    });
    this.addChild(this.rect);

    this.sprite = new Sprite({
      imagePath: "movingblock3.png",
      transform: {
        position: new Vector(x, y),
      },
      isPhysicsEnable: true,
      rigidbody: {
        isStatic: true,
      },
    });
    this.addChild(this.sprite);

    this.sprite.onCollision = (other) => {
      if (other.getName() === "wall") {
        //트리거 블록과 이 블록간의 충돌된 영역을 구함.
        const xSize =
          (other.getWorldSize().x + this.sprite.getWorldSize().x) / 2;
        const distance = Math.abs(
          this.sprite.getPosition().x - other.getPosition().x
        );
        const xDiff = xSize - distance;
        this.direction *= -1;
        this.sprite.addPosition(new Vector(this.direction * xDiff, 0));
      }
    };

    this.direction = 1;
  }

  update(deltaTime) {
    super.update(deltaTime);
    this.moveByDirection(deltaTime);
  }

  /**
   * direction에 따라서 블록을 움직인다.
   * 이 때 jumpTrigger도 따라서 움직인다.
   * @param {number} deltaTime
   */
  moveByDirection(deltaTime) {
    this.sprite.addPosition(new Vector(this.direction * 100 * deltaTime, 0));
    this.rect.setPosition(this.sprite.getPosition().minus(new Vector(0, 13)));
  }
}
