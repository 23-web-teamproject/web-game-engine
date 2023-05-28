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

export default class disappear_block extends GameObject {
  constructor(x,y) {
    super();
    //setAssetFolderPath는 한 번만 실행해도 됩니다.
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
  
    
    this.rect = new Rect({
    name: "jumpTrigger",
    width: 26,
    height: 1,
    transform: {
      position: new Vector(x, y - 14.5),
    },
    isPhysicsEnable: true,
    rigidbody: {
      isStatic: true,
    },
  });
  this.sprite = new Sprite({
    imagePath: "onceblock.png",
    transform: {
      position: new Vector(x, y),
    },
    isPhysicsEnable: true,
    rigidbody: {
      isStatic: true,
    },
  });
  this.rect.onCollision = (other) => {
    this.rect.destroy();
    this.sprite.destroy();
  }
  this.addChild(this.rect);
  this.addChild(this.sprite);
  }
}
