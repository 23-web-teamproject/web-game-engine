import { BoxCollider } from "../engine/data-structure/collider.js";
import {
  GameObject,
  Circle,
  Rect,
  Vector,
  Color,
  InputManager,
  ParticleEffect,
  SceneManager,
  Sprite,
} from "/src/engine/module.js";
import Path from "/src/engine/utils/path.js";

export default class Stage1 extends GameObject {
  constructor() {
    super();
    //setAssetFolderPath는 한 번만 실행해도 됩니다.
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    this.circle = new Circle({
      radius: 10,
      color: new Color(255, 255, 0, 1),
      strokeColor: new Color(0, 0, 0, 1),
      strokeWidth: 1.5,
      transform: {
        position: new Vector(500, 250),
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1,
        isGravity: true,
      },
    });
    this.circle.onCollision = (other) => {
      if (other.rigidbody.isTrigger) {
        return;
      }
      if (
        this.circle.getVelocity().y > -30 ||
        this.circle.getVelocity().y < -30
      ) {
        this.circle.transform.velocity.y = -30;
      }
    };
    this.addChild(this.circle);

  }
  update(deltaTime) {
    super.update(deltaTime);
    if (InputManager.isKeyPressed("ArrowLeft")) {
      this.circle.addPosition(new Vector(-2, 0));
    }
    if (InputManager.isKeyPressed("ArrowRight")) {
      this.circle.addPosition(new Vector(2, 0));
    }
    if (
      this.circle.getPosition().y >= 768 &&
      this.particleEffect === undefined
    ) {
      this.particleEffect = new ParticleEffect({
        isEnable: true,
        isScaleFade: false,
        isAlphaFade: true,
        countPerSecond: 15,
        direction: 45,
        duration: 1,
        diffuseness: 15,
        speed: 120,
        lifeTime: 10,
        transform: {
          position: this.circle.getPosition(),
        },
      });
      this.addChild(this.particleEffect);
      this.particleEffect.run();
      SceneManager.loadScene(Stage1);
    }
  }
}
