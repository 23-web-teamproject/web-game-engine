import {
  Circle,
  Rect,
  Vector,
  Color,
  InputManager,
  ParticleEffect,
  RenderManager,
  SceneManager,
} from "/src/engine/module.js";

import { clamp } from "../engine/utils.js";
import { BoxCollider } from "../engine/data-structure/collider.js";

export default class Ball extends Circle {
  /**
   * 플레이어가 조종할 공입니다.
   * 생성자 인자로 공이 스폰될 위치를 지정합니다.
   *
   * @param {number} x - x좌표
   * @param {number} y - y좌표
   */
  constructor(x, y) {
    super({
      radius: 10,
      color: new Color(255, 255, 0, 1),
      strokeColor: new Color(0, 0, 0, 1),
      strokeWidth: 1.5,
      transform: {
        position: new Vector(x, y),
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1,
        isGravity: true,
      },
    });
    this.collider = new BoxCollider({
      width: 15,
      height: 15,
    });
    this.getBoundary = () => {
      return this.collider.getBoundary().elementMultiply(this.getWorldScale());
    };

    /**
     * 공의 상태를 나타내는 변수
     * -1이면 왼쪽으로 등속운동하는 중
     * 1이면 오른쪽으로 등속운동하는 중
     */
    this.a = 0;
    /**
     * 키가 연속으로 눌리는 경우를 확인하기 위한 기준값
     */
    this.dashTimeThreshold = 250;
    /**
     * 지금 키를 누른 시간
     */
    this.currentKeyPressedTime = 0;
    /**
     * 이전에 키를 누른 시간
     */
    this.previousKeyPressedTime = 0;
    /**
     * 이전에 누른 키
     */
    this.previousPressedKey = "";
    /**
     * 지금 누른 키
     */
    this.currentPressedKey = "";
    /**
     * 아이템 확인 변수
     * 0이면 평상시
     * 1이면 대쉬아이템
     * -1이면 점프아이템
     */
    this.itemType = 0;
  }

  update(deltaTime) {
    super.update(deltaTime);
    this.moveBall();
    this.useDashItemIfPlayerUseDash();
    this.moveBallIfBallCollidedMoveBlock();
    this.createDeadEffectIfBallOutOfScreen();
  }

  /**
   * 공의 이동을 처리한다.
   */
  moveBall() {
    if (InputManager.isKeyPressed("ArrowLeft")) {
      this.a = 0;
      this.rigidbody.isGravity = true;
      this.addPosition(new Vector(-2, 0));
    }
    if (InputManager.isKeyPressed("ArrowRight")) {
      this.a = 0;
      this.rigidbody.isGravity = true;
      this.addPosition(new Vector(2, 0));
    }
  }

  /**
   * 플레이어가 연타했다면 대쉬 아이템을 사용한다.
   */
  useDashItemIfPlayerUseDash() {
    const isArrowLeftKeyDown = InputManager.isKeyDown("ArrowLeft");
    const isArrowRightKeyDown = InputManager.isKeyDown("ArrowRight");

    if (isArrowLeftKeyDown || isArrowRightKeyDown) {
      this.previousKeyPressedTime = this.currentKeyPressedTime;
      this.currentKeyPressedTime = Date.now();
      this.previousPressedKey = this.currentPressedKey;

      if (isArrowLeftKeyDown) {
        this.currentPressedKey = "ArrowLeft";
      }
      if (isArrowRightKeyDown) {
        this.currentPressedKey = "ArrowRight";
      }

      const deltaTime =
        this.currentKeyPressedTime - this.previousKeyPressedTime;

      if (
        deltaTime < this.dashTimeThreshold &&
        this.previousPressedKey == this.currentPressedKey &&
        this.hasItem()
      ) {
        this.useItem();
      }
    }
  }

  /**
   * 아이템을 갖고 있다면 true를 반환한다.
   *
   * @returns {boolean}
   */
  hasItem() {
    return this.itemType !== 0;
  }

  /**
   * 갖고 있는 아이템을 사용한다.
   * 아이템의 종류에 따라 다르게 사용한다.
   */
  useItem() {
    if (this.itemType === 1) {
      if (
        this.previousPressedKey === "ArrowLeft" &&
        this.currentPressedKey === "ArrowLeft"
      ) {
        this.addVelocity(new Vector(-30, 0));
        this.color = new Color(0, 0, 0, 1);
        this.removeItem();
      }
      if (
        this.previousPressedKey === "ArrowRight" &&
        this.currentPressedKey === "ArrowRight"
      ) {
        this.addVelocity(new Vector(30, 0));
        this.color = new Color(0, 0, 0, 1);
        this.removeItem();
      }
    } else if (this.itemType === -1) {
      if (
        this.previousPressedKey === "ArrowLeft" &&
        this.currentPressedKey === "ArrowLeft"
      ) {
        this.setVelocity(new Vector(-3, -40));
        this.color = new Color(150, 75, 0, 1);
        this.removeItem();
      }
      if (
        this.previousPressedKey === "ArrowRight" &&
        this.currentPressedKey === "ArrowRight"
      ) {
        this.setVelocity(new Vector(3, -40));
        this.color = new Color(150, 75, 0, 1);
        this.removeItem();
      }
    }
  }

  /**
   * 아이템을 제거한다.
   * 제거하기 전에 그래픽 효과가 있는 아이템이었다면,
   * 원래대로 되돌린다.
   */
  removeItem() {
    if (this.itemType !== 0) {
      this.color = new Color(255, 255, 0, 1);
    }
    this.itemType = 0;
  }

  /**
   * 공이 moveBlock과 충돌했었다면 this.a가 -1이나 1이다.
   * 그 때에만 공을 움직이게 만든다.
   */
  moveBallIfBallCollidedMoveBlock() {
    if (this.a == 1) {
      this.rigidbody.isGravity = false;
      this.addPosition(new Vector(5, 0));
    }
    if (this.a == -1) {
      this.rigidbody.isGravity = false;
      this.addPosition(new Vector(-5, 0));
    }
  }

  /**
   * 공이 화면 밖으로 나갔다면 죽는 이펙트를 만든다.
   */
  createDeadEffectIfBallOutOfScreen() {
    if (
      (this.getPosition().y >= RenderManager.renderCanvasHeight ||
        this.getPosition().x < 0 ||
        this.getPosition().x >= RenderManager.renderCanvasWidth) &&
      this.particleEffect === undefined
    ) {
      this.createDeadEffect();
    }
  }

  /**
   * 공이 죽었을 때 나오는 이펙트다.
   */
  createDeadEffect() {
    this.hide();

    if (this.particleEffect === undefined) {
      this.particleEffect = new ParticleEffect({
        isEnable: true,
        isScaleFade: true,
        isAlphaFade: true,
        countPerSecond: 30,
        direction: 0,
        duration: 0.25,
        diffuseness: 180,
        speed: 100,
        lifeTime: 1,
        transform: {
          position: new Vector(
            clamp(this.getPosition().x, 0, RenderManager.renderCanvasWidth),
            clamp(this.getPosition().y, 0, RenderManager.renderCanvasHeight)
          ),
        },
      });
      this.addChild(this.particleEffect);
      // 이펙트의 부모를 제거하면 자동으로 이펙트의 부모가 씬 객체로 설정됨
      this.particleEffect.removeParent();
      this.particleEffect.run();
    }
  }

  /**
   * 공이 다른 객체와 충돌했을 때 실행될 이벤트 함수입니다.
   * 여기서 다른 블록과 충돌했을 때 일어날 이벤트를 각각 지정할 수 있습니다.
   *
   * @param {GameObject} other
   */
  onCollision(other) {
    if (other.getName() == "star") {
      return;
    }
    // 기본 블록 속에 있는 트리거와 충돌해야지만 위로 뛰어오르도록 한다.
    // 트리거는 블록 윗부분에만 달려있다.
    if (other.getName() == "jumpTrigger") {
      this.a = 0;
      this.rigidbody.isGravity = true;
      this.transform.velocity.y = -30;
    }
    if (other.getName() == "jumpblock") {
      this.a = 0;
      this.rigidbody.isGravity = true;
      this.transform.velocity.y = -50;
    } else if (other.getName() == "thorn") {
      this.a = 0;
      this.rigidbody.isGravity = true;
      this.createDeadEffect();
      // SceneManager.loadScene(Stage1);
    } else if (other.getName() == "right_smallbox") {
      this.a = 1;
      this.rigidbody.isGravity = false;
      this.setPosition(other.getPosition().add(new Vector(35, 15)));
      this.setVelocity(Vector.zero);
    } else if (other.getName() == "left_smallbox") {
      this.a = -1;
      this.rigidbody.isGravity = false;
      this.setPosition(other.getPosition().add(new Vector(-35, 15)));
      this.setVelocity(Vector.zero);
    } else if (other.getName() == "dashitem") {
      this.itemType = 1;
      this.color = new Color(0, 0, 0, 1);
    } else if (other.getName() == "jumpitem") {
      this.itemType = -1;
      this.color = new Color(150, 75, 0, 1);
    } else {
      this.a = 0;
      this.rigidbody.isGravity = true;
    }
  }
}
