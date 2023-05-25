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

export default class Ball extends Rect {
  /**
   * 플레이어가 조종할 공입니다.
   * 생성자 인자로 공이 스폰될 위치를 지정합니다.
   *
   * @param {number} x - x좌표
   * @param {number} y - y좌표
   */
  constructor(x, y) {
    super({
      width: 15,
      height: 15,
      color: new Color(255, 255, 0, 1),
      transform: {
        position: new Vector(x, y),
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1,
        isGravity: true,
      },
    });
    // 화면에 보여질 원 그림
    this.addChild(
      new Circle({
        radius: 10,
        color: new Color(255, 255, 0, 1),
        strokeColor: new Color(0, 0, 0, 1),
        strokeWidth: 1.5,
      })
    );

    /**
     * 공의 상태를 나타내는 변수
     * -1이면 왼쪽으로 등속운동하는 중
     * 1이면 오른쪽으로 등속운동하는 중
     */
    this.a = 0;
  }

  update(deltaTime) {
    super.update(deltaTime);
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
    if (this.a == 1) {
      this.rigidbody.isGravity = false;
      this.addPosition(new Vector(5, 0));
    }
    if (this.a == -1) {
      this.rigidbody.isGravity = false;
      this.addPosition(new Vector(-5, 0));
    }
    if (
      (this.getPosition().y >= RenderManager.renderCanvasHeight ||
        this.getPosition().x < 0 ||
        this.getPosition().x >= RenderManager.renderCanvasWidth) &&
      this.particleEffect === undefined
    ) {
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
    if (other.rigidbody.isTrigger) {
      return;
    }
    if (other.getName() == "jumpblock") {
      this.a = 0;
      this.rigidbody.isGravity = true;
      this.transform.velocity.y = -50;
    } else if (other.getName() == "thorn") {
      this.a = 0;
      this.rigidbody.isGravity = true;
      SceneManager.loadScene(Stage1);
    } else if (other.getName() == "moverightblock") {
      this.a = 1;
      this.rigidbody.isGravity = false;
      this.transform.position.x = other.getPosition().x + 25;
      this.transform.position.y = other.getPosition().y;
    } else if (other.getName() == "moveleftblock") {
      this.a = -1;
      this.rigidbody.isGravity = false;
      this.transform.position.x = other.getPosition().x - 25;
      this.transform.position.y = other.getPosition().y;
    } else {
      this.a = 0;
      this.rigidbody.isGravity = true;
      this.transform.velocity.y = -30;
    }
  }
}
