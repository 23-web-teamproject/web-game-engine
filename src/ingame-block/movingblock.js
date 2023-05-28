import { GameObject, Rect, Vector, Sprite } from "/src/engine/module.js";
import Path from "/src/engine/utils/path.js";

export default class movingblcok extends GameObject {
  constructor(x, y) {
    super();
    //setAssetFolderPath는 한 번만 실행해도 됩니다.
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.

    this.rect = new Rect({
      name: "jumpTrigger",
      width: 30,
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
      imagePath: "movingblock.png",
      transform: {
        position: new Vector(x, y),
      },
      isPhysicsEnable: true,
      rigidbody: {
        isStatic: true,
      },
    });
    this.addChild(this.sprite);

    this.isTriggered = false;

    // 엔진 내에서 한 프레임에 Trigger가 여러번 호출되므로
    // 당장은 최초 호출 시에만 처리할 수 있도록 함.
    this.sprite.onCollision = (other) => {
      if (other.getName() === "wall" && this.isTriggered === false) {
        this.isTriggered = true;

        //트리거 블록과 이 블록간의 충돌된 영역을 구함.
        const xSize = other.getSize().x + this.sprite.getSize().x;
        const distance = Math.abs(
          other.getPosition().x - this.sprite.getPosition().x
        );
        this.xDiff = xSize - distance;
      }
    };

    this.direction = 1;
  }

  update(deltaTime) {
    super.update(deltaTime);
    this.changeDirectionIfBlockTriggerWithWall();
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

  /**
   * 만약 트리거 블록과 충돌한 상태라면 direction을 전환한다.
   * 이 때 다음 프레임에서 충돌된 상태를 피하기 위해
   * 트리거 블록으로부터 이 블록을 떨어뜨려 놓는다.
   */
  changeDirectionIfBlockTriggerWithWall() {
    if (this.isTriggered) {
      this.direction *= -1;
      this.sprite.matrix.x += this.xDiff * this.direction;
      this.isTriggered = false;
      console.log("asfd")
    }
  }
}
