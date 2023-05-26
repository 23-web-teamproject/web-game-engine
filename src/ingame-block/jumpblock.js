import { Vector, Sprite, Rect, GameObject } from "/src/engine/module.js";

export default class JumpBlock extends GameObject {
  /**
   * 밟으면 더 높이 뛰어오르는 블록입니다.
   *
   * @param {number} x - x좌표
   * @param {number} y - y좌표
   */
  constructor(x, y) {
    super();

    this.addChild(new Rect({
      name: "jumpblock",
      width: 26,
      height: 1,
      transform: {
        position: new Vector(x, y - 15),
      },
      isPhysicsEnable: true,
      rigidbody: {
        isStatic: true,
        isTrigger: true,
      },
    }));

    this.addChild(new Sprite({
      name: "jumpblockimg",
      imagePath: "/src/ingame-block/jumpblock.png",
      isPhysicsEnable: true,
      transform: {
        position: new Vector(x, y),
      },
      rigidbody: {
        isStatic: true,
      },
    }));
  }
}
