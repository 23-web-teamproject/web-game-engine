import { Vector, Sprite } from "/src/engine/module.js";

export default class jumpitem extends Sprite {
  /**
   * 밟으면 더 높이 뛰어오르는 블록입니다.
   *
   * @param {number} x - x좌표
   * @param {number} y - y좌표
   */
  constructor(x, y) {
    super({
      name: "jumpitem",
      imagePath: "/src/ingame-block/jumpitem.png",
      transform: {
        position: new Vector(x, y),
      },
      isPhysicsEnable: true,
      rigidbody: {
        isTrigger : true
      },
    });
  }

  onCollision(other) {
    this.destroy();
    // 공이랑 닿을 때 공에 있는 변수값 수정해야함

  }
}
