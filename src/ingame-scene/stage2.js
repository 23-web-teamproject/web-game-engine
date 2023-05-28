import { BoxCollider } from "../engine/data-structure/collider.js";
import Block from "../ingame-block/block(gray).js";
import Thorn from "../ingame-block/thorn.js";
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
export default class Stage2 extends GameObject  {
  constructor() {
    super();
    //setAssetFolderPath는 한 번만 실행해도 됩니다.
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.

    this.ball = new Ball(400, 170);
    this.addChild(this.ball);

    this.block = new Block(400, 270)
    this.addChild(this.block);

    this.block = new Block(430, 270)
    this.addChild(this.block);

    this.block = new Block(460, 270)
    this.addChild(this.block);

    this.block = new Block(490, 270)
    this.addChild(this.block);

    this.thorn = new Thorn(520, 330)
    this.addChild(this.thorn);

    this.block = new Block(550, 330)
    this.addChild(this.block);

    this.thorn = new Thorn(580, 330)
    this.addChild(this.thorn);

    this.block = new Block(610, 330)
    this.addChild(this.block);

    this.thorn = new Thorn(640, 390)
    this.addChild(this.thorn);

    this.block = new Block(670, 390)
    this.addChild(this.block);

    this.thorn = new Thorn(700, 390)
    this.addChild(this.thorn);

    this.block = new Block(730, 390)
    this.addChild(this.block);

    this.thorn = new Thorn(760, 450)
    this.addChild(this.thorn);

    this.block = new Block(790, 450)
    this.addChild(this.block);

    this.thorn = new Thorn(820, 450)
    this.addChild(this.thorn);

    this.block = new Block(850, 450)
    this.addChild(this.block);

    this.block = new Block(880, 450)
    this.addChild(this.block);

    this.star = new star(850, 420)
    this.addChild(this.star);
    

  }
  update(deltaTime) {
    super.update(deltaTime);
  }
}
