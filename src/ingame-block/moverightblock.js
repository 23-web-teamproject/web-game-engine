import { Vector, Sprite, GameObject, Rect } from "/src/engine/module.js";

export default class MoverightBlock extends GameObject {
  /**
   * 밟으면 더 높이 뛰어오르는 블록입니다.
   *
   * @param {number} x - x좌표
   * @param {number} y - y좌표
   */
  constructor(x, y) {
    super();

    this.addChild(new Rect({
      name: "right_smallbox",
      width: 26,
      height: 1,
      transform: {
        position: new Vector(x, y - 15),
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 0,
        isStatic: true,
        isTrigger: true,
      },
    }));

    this.addChild(new Sprite({
      imagePath: "/src/ingame-block/moverightblock.png",
      isPhysicsEnable: true,
      transform: {
        position: new Vector(x, y),
      },
      rigidbody: {
        bounciness: 0,
        isStatic: true,
      },
    }));
  }
}
    
