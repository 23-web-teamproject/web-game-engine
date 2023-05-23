import { Vector, Sprite } from "/src/engine/module.js";

export default class Block extends Sprite {
  /**
   * 기본 블록입니다.
   *
   * @param {number} x - x좌표
   * @param {number} y - y좌표
   */
  constructor(x, y) {
    super({
      name: "block",
      imagePath: "/src/ingame-block/block(gray).png",
      transform: {
        position: new Vector(x, y),
      },
      isPhysicsEnable: true,
      rigidbody: {
        isStatic: true,
      },
    });
  }
}
