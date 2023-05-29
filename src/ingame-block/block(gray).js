import { Vector, Sprite, GameObject, Rect } from "/src/engine/module.js";

export default class Block extends Sprite {
  /**
   * 기본 블록입니다.
   *
   * @param {number} x - x좌표
   * @param {number} y - y좌표
   */
  constructor(x, y) {
    super({
      name: "block(gray)",
      imagePath: "/src/ingame-block/block(gray).png",
      isPhysicsEnable: true,
      transform: {
        position: new Vector(x, y),
      },
      rigidbody: {
        isStatic: true,
      },
    });

    const trigger = new Rect({
      name: "jumpTrigger",
      width: 30,
      height: 4,
      transform: {
        position: new Vector(0, -13),
      },
      isPhysicsEnable: true,
      rigidbody: {
        isTrigger: true,
      },
    });

    this.addChild(trigger);
    trigger.hide();
  }
}
