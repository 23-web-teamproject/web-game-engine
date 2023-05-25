import { Vector, Sprite } from "/src/engine/module.js";

export default class MoverightBlock extends Sprite {
  /**
   * 밟으면 더 높이 뛰어오르는 블록입니다.
   *
   * @param {number} x - x좌표
   * @param {number} y - y좌표
   */
  constructor(x, y) {
    super({
      name: "moverightblock",
      imagePath: "/src/ingame-block/moverightblock.png",
      transform: {
        position: new Vector(x, y),
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 0,
        isStatic: true,
      },
    });
    const smallBox = new Sprite({
      name: "right_smallbox",
      imagePath: "",
      transform: {
        position: new Vector(x, y - 15),
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounciness: 0,
        isStatic: true,
      },
      dimensions: {
        width: 30,
        height: 1,
      },
    });
  }
}
    
