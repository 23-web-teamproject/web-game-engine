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

export default class Block extends GameObject {
  /**
   * 기본블록입니다.
   * 
   * @param {number} x - x좌표
   * @param {number} y - y좌표
   */
  constructor(x, y) {
    super();
    //setAssetFolderPath는 한 번만 실행해도 됩니다.
    this.sprite = new Sprite({
      imagePath: "/src/ingame-block/block(gray).png",
      transform: {
        position: new Vector(x, y),
      },
      isPhysicsEnable: true,
      rigidbody: {
        isStatic: true,
      },
    });
    this.addChild(this.sprite);
  }
}
