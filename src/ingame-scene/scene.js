import { BoxCollider } from "../engine/data-structure/collider.js";
import JumpBlock from "../ingame-block/jumpblock.js";
import Thorn from "../ingame-block/thorn.js";
import Block from "../ingame-block/block(gray).js";
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
import disappear_block from "../ingame-block/disappear_block.js";
import star from "../ingame-block/star.js";
import MoveleftBlock from "../ingame-block/moveleftblock.js";
import MoverightBlock from "../ingame-block/moverightblock.js";
import dashitem from "../ingame-block/dashitem.js";
import jumpitem from "../ingame-block/jumpitem.js";
import wall from "../ingame-block/wall.js";
import movingblcok from "../ingame-block/movingblock.js"
export default class Scene extends GameObject  {
  constructor() {
    super();
    //setAssetFolderPath는 한 번만 실행해도 됩니다.
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.

    this.ball = new Ball(500, 200);
    this.addChild(this.ball);

    this.block = new Block(100, 400)
    this.addChild(this.block);

    this.block = new Block(130, 400)
    this.addChild(this.block);

    this.dashitem = new dashitem(160, 300)
    this.addChild(this.dashitem);

    this.block = new Block(160, 400)
    this.addChild(this.block);

    this.disappear_block = new disappear_block(190, 400);
    this.addChild(this.disappear_block);

    this.block = new Block(220, 420)
    this.addChild(this.block);

    this.moverightblock = new MoverightBlock(250,410)
    this.addChild(this.moverightblock);

    this.block = new Block(250, 440)
    this.addChild(this.block);

    this.block = new Block(280, 440)
    this.addChild(this.block);

    this.block = new Block(310, 440)
    this.addChild(this.block);

    this.block = new Block(340, 440)
    this.addChild(this.block);

    this.thorn = new Thorn(370,440)
    this.addChild(this.thorn);

    this.block = new Block(400, 440)
    this.addChild(this.block);

    this.block = new Block(430, 420)
    this.addChild(this.block);

    this.block = new Block(460, 400)
    this.addChild(this.block);

    this.block = new Block(490, 400)
    this.addChild(this.block);

    this.jumpitem = new jumpitem(490, 350)
    this.addChild(this.jumpitem);

    this.block = new Block(520, 400)
    this.addChild(this.block);

    this.star = new star(570, 300)
    this.addChild(this.star);

    this.jumpblock = new JumpBlock(570,400)
    this.addChild(this.jumpblock);

    this.moveleftblock = new MoveleftBlock(620, 300)
    this.addChild(this.moveleftblock);

    this.wall = new wall(650,400);
    this.addChild(this.wall);

    this.wall = new wall(900,400);
    this.addChild(this.wall);

    this.movingblcok = new movingblcok(700,400)
    this.addChild(this.movingblcok);
  }
  update(deltaTime) {
    super.update(deltaTime);
  }
}
