import { Vector, Sprite, GameObject, Rect } from "/src/engine/module.js";

export default class wall extends Sprite {
  /**
   * 기본 블록입니다.
   *
   * @param {number} x - x좌표
   * @param {number} y - y좌표
   */
  constructor(x, y) {
    super({
      name: "wall",
      imagePath: "/src/ingame-block/wall.png",
      isPhysicsEnable: true,
      transform: {
        position: new Vector(x, y),
      },
      rigidbody: {
        isTrigger: true,
      },
    });
  }
}
