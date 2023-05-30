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
import jumpitem from "../ingame-block/jumpitem.js";
import movingblock from "../ingame-block/movingblock.js";
import movingblock2 from "../ingame-block/movingblock2.js";
import movingblock3 from "../ingame-block/movingblock3.js";
import wall from "../ingame-block/wall.js";
export default class Stage6 extends GameObject  {
  constructor() {
    super();
    //setAssetFolderPath는 한 번만 실행해도 됩니다.
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.

    this.jumpblock = new JumpBlock(385, 495)
    this.addChild(this.jumpblock);

    for(let i = 475; i<=535; i+=30)
    {
      this.block = new Block(i, 495)
      this.addChild(this.block);
    }

    this.wall = new wall(565, 495)
    this.addChild(this.wall);

    this.movingblock3 = new movingblock3(700,495)
    this.addChild(this.movingblock3);

    for(let i = 565; i<=895; i+=30)
    {
      this.thorn = new Thorn(i, 525)
      this.addChild(this.thorn);
    }

    this.wall = new wall(895, 495)
    this.addChild(this.wall);

    this.moveleftblock = new MoveleftBlock(895, 465)
    this.addChild(this.moveleftblock);

    this.jumpblock = new JumpBlock(445, 375)
    this.addChild(this.jumpblock);

    for(let i = 505; i<=805; i+=30)
    {
      this.block = new Block(i, 375)
      this.addChild(this.block);
    }
    
    for(let i = 345; i>=225; i-=30)
    {
      this.block = new Block(505, i)
      this.addChild(this.block);
    }

    for(let i = 345; i>=225; i-=30)
    {
      this.block = new Block(805, i)
      this.addChild(this.block);
    }

    this.thorn = new Thorn(535, 345)
    this.addChild(this.thorn);

    this.star = new star(565, 345)
    this.addChild(this.star);

    for(let i = 595; i<=775; i+=30)
    {
      this.thorn = new Thorn(i, 345)
      this.addChild(this.thorn);
    }

    this.wall = new wall(535, 315)
    this.addChild(this.wall);

    this.wall = new wall(775, 315)
    this.addChild(this.wall);

    this.movingblock2 = new movingblock2(715, 315)
    this.addChild(this.movingblock2);
    
    for(let i = 535; i<=685; i+=30)
    {
      this.thorn = new Thorn(i, 225)
      this.addChild(this.thorn);
    }

    this.thorn = new Thorn(745, 225)
    this.addChild(this.thorn);

    this.thorn = new Thorn(775, 225)
    this.addChild(this.thorn);

    this.wall = new wall(505, 195)
    this.addChild(this.wall);

    this.wall = new wall(805, 195)
    this.addChild(this.wall);

    this.movingblock3 = new movingblock3(535, 195)
    this.addChild(this.movingblock3);

    this.jumpitem = new jumpitem(445, 285)
    this.addChild(this.jumpitem);

    this.ball = new Ball(505, 400)
    this.addChild(this.ball);

    this.disappear_block = new disappear_block(595, 465)
    this.addChild(this.disappear_block);

    this.disappear_block = new disappear_block(625, 465)
    this.addChild(this.disappear_block);

    this.disappear_block = new disappear_block(745, 465)
    this.addChild(this.disappear_block);

    this.disappear_block = new disappear_block(775, 465)
    this.addChild(this.disappear_block);

  }
  update(deltaTime) {
    super.update(deltaTime);
  }
}
