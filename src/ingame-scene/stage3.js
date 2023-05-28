import { BoxCollider } from "../engine/data-structure/collider.js";
import Block from "../ingame-block/block(gray).js";
import Thorn from "../ingame-block/thorn.js";
import JumpBlock from "../ingame-block/jumpblock.js";
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
import Ball from "../ingame-block/ball.js";
import star from "../ingame-block/star.js";
export default class Stage3 extends GameObject  {
  constructor() {
    super();
    //setAssetFolderPath는 한 번만 실행해도 됩니다.
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.

    this.ball = new Ball(315, 335);
    this.addChild(this.ball);

    this.block = new Block(285, 435)
    this.addChild(this.block);

    this.block = new Block(315, 435)
    this.addChild(this.block);

    this.block = new Block(345, 435)
    this.addChild(this.block);

    this.block = new Block(375, 435)
    this.addChild(this.block);

    this.jumpblock = new JumpBlock(405, 435)
    this.addChild(this.jumpblock);

    this.block = new Block(435, 435)
    this.addChild(this.block);

    this.block = new Block(435, 405)
    this.addChild(this.block);

    this.block = new Block(435, 375)
    this.addChild(this.block);

    this.block = new Block(435, 345)
    this.addChild(this.block);

    this.block = new Block(465, 435)
    this.addChild(this.block);

    this.jumpblock = new JumpBlock(495, 435)
    this.addChild(this.jumpblock);

    this.thorn = new Thorn(525, 435)
    this.addChild(this.thorn);

    this.thorn = new Thorn(555, 435)
    this.addChild(this.thorn);

    this.jumpblock = new JumpBlock(555, 375)
    this.addChild(this.jumpblock);

    this.thorn = new Thorn(585, 405)
    this.addChild(this.thorn);

    this.thorn = new Thorn(615, 405)
    this.addChild(this.thorn);

    this.jumpblock = new JumpBlock(645, 345)
    this.addChild(this.jumpblock);

    this.thorn = new Thorn(675, 375)
    this.addChild(this.thorn);

    this.thorn = new Thorn(705, 375)
    this.addChild(this.thorn);

    this.thorn = new Thorn(735, 375)
    this.addChild(this.thorn);

    this.block = new Block(735, 285)
    this.addChild(this.block);

    this.block = new Block(765, 285)
    this.addChild(this.block);
    
    this.block = new Block(795, 285)
    this.addChild(this.block);

    this.star = new star(765, 255)
    this.addChild(this.star);
    
  }
  update(deltaTime) {
    super.update(deltaTime);
  }
}
