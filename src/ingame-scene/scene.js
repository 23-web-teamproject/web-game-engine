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

export default class Stage1 extends GameObject {
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

    this.block = new Block(160, 400)
    this.addChild(this.block);

    this.block = new Block(190, 400)
    this.addChild(this.block);

    this.block = new Block(220, 420)
    this.addChild(this.block);

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

    this.block = new Block(520, 400)
    this.addChild(this.block);

    this.star = new Sprite({
      imagePath: "star.png",
      transform: {
        position: new Vector(520, 360),
      },
      isPhysicsEnable: true,
      rigidbody: {
        isTrigger: true,
      },
    });
    this.addChild(this.star);
    this.star.onCollision = (other) => {
      this.star.destroy();
    };
    this.jumpblock = new JumpBlock(570,400
    )
    this.addChild(this.jumpblock);
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (InputManager.isKeyPressed("ArrowLeft")) {
      this.circle.addPosition(new Vector(-2, 0));
    }
    if (InputManager.isKeyPressed("ArrowRight")) {
      this.circle.addPosition(new Vector(2, 0));
    }
    if (
      this.circle.getPosition().y >= 768 &&
      this.particleEffect === undefined
    ) {
      this.particleEffect = new ParticleEffect({
        isEnable: true,
        isScaleFade: false,
        isAlphaFade: true,
        countPerSecond: 15,
        direction: 45,
        duration: 1,
        diffuseness: 15,
        speed: 120,
        lifeTime: 10,
        transform: {
          position: this.circle.getPosition(),
        },
      });
      this.addChild(this.particleEffect);
      this.particleEffect.run();
      SceneManager.loadScene(Stage1);
    }
  }
}
