import { BoxCollider } from "../engine/data-structure/collider.js";
import Block from "../ingame-block/block(gray).js";
import JumpBlock from "../ingame-block/jumpblock.js";
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
import disappear_block from "../ingame-block/disappear_block.js";
import MoveleftBlock from "../ingame-block/moveleftblock.js";
import dashitem from "../ingame-block/dashitem.js";
import jumpitem from "../ingame-block/jumpitem.js";
export default class Stage5 extends GameObject  {
  constructor() {
    super();
    //setAssetFolderPath는 한 번만 실행해도 됩니다.
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.

    this.star = new star(385, 65)
    this.addChild(this.star);

    this.jumpblock = new JumpBlock(385, 165)
    this.addChild(this.jumpblock);

    this.block = new Block(445, 285)
    this.addChild(this.block);

    this.block = new Block(445, 255)
    this.addChild(this.block);

    for(let i = 475; i <= 535; i+=30)
    {
      this.block = new Block(i, 315)
      this.addChild(this.block);

      this.block = new Block(i, 465)
      this.addChild(this.block);
    }

    this.ball = new Ball(535, 365);
    this.addChild(this.ball);

    for(let i = 565; i <= 775; i+=30)
    {
      this.thorn = new Thorn(i, 465)
      this.addChild(this.thorn);
    }

    for(let i = 595; i <= 775; i+=60)
    {
      this.disappear_block = new disappear_block(i, 435)
      this.addChild(this.disappear_block);
    }

    this.jumpblock = new JumpBlock(745, 405)
    this.addChild(this.jumpblock);

    for(let i = 805; i <= 895; i+=30)
    {
      this.block = new Block(i, 465)
      this.addChild(this.block);
    }
    
    this.dashitem = new dashitem(835, 405)
    this.addChild(this.dashitem);
    
    this.jumpitem = new jumpitem(505, 255)
    this.addChild(this.jumpitem);

    this.disappear_block = new disappear_block(595, 315)
    this.addChild(this.disappear_block);

    for(let i = 595; i <= 715; i+=60)
    {
      this.disappear_block = new disappear_block(i, 195)
      this.addChild(this.disappear_block);
    }

    this.jumpblock = new JumpBlock(775, 225)
    this.addChild(this.jumpblock);

    this.moveleftblock = new MoveleftBlock(835, 135)
    this.addChild(this.moveleftblock);

  }
  update(deltaTime) {
    super.update(deltaTime);
  }
}
