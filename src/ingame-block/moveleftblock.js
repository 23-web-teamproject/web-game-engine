import { Vector, Sprite } from "/src/engine/module.js";

export default class MoveleftBlock extends Sprite {
  /**
   * 밟으면 더 높이 뛰어오르는 블록입니다.
   *
   * @param {number} x - x좌표
   * @param {number} y - y좌표
   */
  constructor(x, y) {
    super({
      name: "moveleftblock",
      imagePath: "/src/ingame-block/moveleftblock.png",
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