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

export default class JumpBlock extends GameObject {
  /**
   * 밟으면 더 높이 뛰어오르는 블록입니다.
   * 
   * @param {number} x - x좌표
   * @param {number} y - y좌표
   */
  constructor(x, y) {
    super();
    this.sprite = new Sprite({
      imagePath: "/src/ingame-block/jumpblock.png",
      transform: {
        position: new Vector(x, y),
      },
      isPhysicsEnable: true,
      rigidbody: {
        isStatic: true,
      },
    });
    
    this.sprite.onCollision = (other) => {
        this.circle.transform.velocity.y = -60;
    };

    this.addChild(this.sprite);
  }
}
