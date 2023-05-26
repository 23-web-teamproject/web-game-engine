import { Vector, Sprite, GameObject, Rect } from "/src/engine/module.js";

export default class Block extends GameObject {
  /**
   * 기본 블록입니다.
   *
   * @param {number} x - x좌표
   * @param {number} y - y좌표
   */
  constructor(x, y) {
    super();
    this.addChild(new Rect({
      name: "jumpTrigger",
      width: 30,
      height: 4,
      transform: {
        position: new Vector(x, y - 13),
      },
      isPhysicsEnable: true,
      rigidbody: {
        isStatic: true,
      },
    }));

    // 블록 이미지
    this.addChild(new Sprite({
      imagePath: "/src/ingame-block/block(gray).png",
      isPhysicsEnable: true,
      transform: {
        position: new Vector(x, y),
      },
      rigidbody: {
        isStatic: true,
      },
    }))
  }
}
