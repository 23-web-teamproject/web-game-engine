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

export default class Stage1 extends GameObject {
  constructor() {
    super();
    //setAssetFolderPath는 한 번만 실행해도 됩니다.
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    this.rect = new Rect({
      width: 30,
      height: 30,
      isPhysicsEnable: true,
      transform: {
        position: new Vector(100,100),
      },
      rigidbody: {
        bounceness: 1,
        isGravity: true,
      }
    });
    this.addChild(this.rect);

    this.sprite = new Sprite({
      imagePath: "ground1.png",
      transform: {
        position: new Vector(100, 100),
      },
      isPhysicsEnable: true,
      rigidbody: {
        isStatic: true,
      },
    });
    this.addChild(this.sprite);

  }
}
