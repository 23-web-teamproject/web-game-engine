import { GameObject, Circle, Rect, Vector, Color, InputManager, ParticleEffect, SceneManager, Sprite } from "/src/engine/module.js";
import Path from "/src/engine/utils/path.js";
export default class TutorialScene4 extends GameObject {
  constructor() {
    super();
    this.circle = new Circle({
      radius: 10,
      color: new Color(255, 255, 0, 1),
      strokeColor: new Color(0, 0, 0, 1),
      strokeWidth: 1.5,
      transform: {
        position: new Vector(100, 250)
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1,
        isGravity: true
      }
    });
    this.circle.onCollision = (other) => {
      if(this.circle.getVelocity().y > -30||this.circle.getVelocity().y < -30){
        this.circle.transform.velocity.y = -30;
      }
    }
    this.addChild(this.circle);

    this.rect = new Rect({
      width: 30,
      height: 30,
      strokeWidth: 15, // strokeColor나 strokeWidth 속성을 설정하면 자동으로 윤곽선이 렌더링된다.
      strokeColor: new Color(0, 0, 0, 1),
      color: new Color(128, 128, 128, 1),
      transform: {
        position: new Vector(100, 400)
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1, isStatic: true
      }
    });
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    // Path.setAssetFolderPath("/src/tutorial/6-sprite/"); // import.meta.url 대신 직접 절대경로로 지정할 수 있습니다.
    this.sprite = new Sprite({
      imagePath: "ground1.png",
      transform: {
        position: new Vector(100,400)
      }
    });
    this.addChild(this.rect);
    this.addChild(this.sprite);
    this.rect = new Rect({
      width: 30,
      height: 30,
      strokeWidth: 15, // strokeColor나 strokeWidth 속성을 설정하면 자동으로 윤곽선이 렌더링된다.
      strokeColor: new Color(0, 0, 0, 1),
      color: new Color(128, 128, 128, 1),
      transform: {
        position: new Vector(130, 400)
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1, isStatic: true
      }
    });
    this.addChild(this.rect);
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    // Path.setAssetFolderPath("/src/tutorial/6-sprite/"); // import.meta.url 대신 직접 절대경로로 지정할 수 있습니다.
    this.sprite = new Sprite({
      imagePath: "ground1.png",
      transform: {
        position: new Vector(130,400)
      }
    });
    this.addChild(this.sprite);

    this.rect = new Rect({
      width: 30,
      height: 30,
      strokeWidth: 15, // strokeColor나 strokeWidth 속성을 설정하면 자동으로 윤곽선이 렌더링된다.
      strokeColor: new Color(0, 0, 0, 1),
      color: new Color(128, 128, 128, 1),
      transform: {
        position: new Vector(160, 400)
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1, isStatic: true
      }
    });
    this.addChild(this.rect);
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    // Path.setAssetFolderPath("/src/tutorial/6-sprite/"); // import.meta.url 대신 직접 절대경로로 지정할 수 있습니다.
    this.sprite = new Sprite({
      imagePath: "ground1.png",
      transform: {
        position: new Vector(160,400)
      }
    });
    this.addChild(this.sprite);

    this.rect = new Rect({
      width: 30,
      height: 30,
      strokeWidth: 15, // strokeColor나 strokeWidth 속성을 설정하면 자동으로 윤곽선이 렌더링된다.
      strokeColor: new Color(0, 0, 0, 1),
      color: new Color(128, 128, 128, 1),
      transform: {
        position: new Vector(190, 400)
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1, isStatic: true
      }
    });
    this.addChild(this.rect);
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    // Path.setAssetFolderPath("/src/tutorial/6-sprite/"); // import.meta.url 대신 직접 절대경로로 지정할 수 있습니다.
    this.sprite = new Sprite({
      imagePath: "ground1.png",
      transform: {
        position: new Vector(190,400)
      }
    });
    this.addChild(this.sprite);

    this.rect = new Rect({
      width: 30,
      height: 30,
      strokeWidth: 15, // strokeColor나 strokeWidth 속성을 설정하면 자동으로 윤곽선이 렌더링된다.
      strokeColor: new Color(0, 0, 0, 1),
      color: new Color(128, 128, 128, 1),
      transform: {
        position: new Vector(220, 420)
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1, isStatic: true
      }
    });
    this.addChild(this.rect);
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    // Path.setAssetFolderPath("/src/tutorial/6-sprite/"); // import.meta.url 대신 직접 절대경로로 지정할 수 있습니다.
    this.sprite = new Sprite({
      imagePath: "ground1.png",
      transform: {
        position: new Vector(220,420)
      }
    });
    this.addChild(this.sprite);

    this.rect = new Rect({
      width: 30,
      height: 30,
      strokeWidth: 15, // strokeColor나 strokeWidth 속성을 설정하면 자동으로 윤곽선이 렌더링된다.
      strokeColor: new Color(0, 0, 0, 1),
      color: new Color(128, 128, 128, 1),
      transform: {
        position: new Vector(250, 440)
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1, isStatic: true
      }
    });
    this.addChild(this.rect);
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    // Path.setAssetFolderPath("/src/tutorial/6-sprite/"); // import.meta.url 대신 직접 절대경로로 지정할 수 있습니다.
    this.sprite = new Sprite({
      imagePath: "ground1.png",
      transform: {
        position: new Vector(250,440)
      }
    });
    this.addChild(this.sprite);

    this.rect = new Rect({
      width: 30,
      height: 30,
      strokeWidth: 15, // strokeColor나 strokeWidth 속성을 설정하면 자동으로 윤곽선이 렌더링된다.
      strokeColor: new Color(0, 0, 0, 1),
      color: new Color(128, 128, 128, 1),
      transform: {
        position: new Vector(280, 440)
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1, isStatic: true
      }
    });
    this.addChild(this.rect);
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    // Path.setAssetFolderPath("/src/tutorial/6-sprite/"); // import.meta.url 대신 직접 절대경로로 지정할 수 있습니다.
    this.sprite = new Sprite({
      imagePath: "ground1.png",
      transform: {
        position: new Vector(280,440)
      }
    });
    this.addChild(this.sprite);

    this.rect = new Rect({
      width: 30,
      height: 30,
      strokeWidth: 15, // strokeColor나 strokeWidth 속성을 설정하면 자동으로 윤곽선이 렌더링된다.
      strokeColor: new Color(0, 0, 0, 1),
      color: new Color(128, 128, 128, 1),
      transform: {
        position: new Vector(310, 440)
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1, isStatic: true
      }
    });
    this.addChild(this.rect);
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    // Path.setAssetFolderPath("/src/tutorial/6-sprite/"); // import.meta.url 대신 직접 절대경로로 지정할 수 있습니다.
    this.sprite = new Sprite({
      imagePath: "ground1.png",
      transform: {
        position: new Vector(310,440)
      }
    });
    this.addChild(this.sprite);

    this.rect = new Rect({
      width: 30,
      height: 30,
      strokeWidth: 15, // strokeColor나 strokeWidth 속성을 설정하면 자동으로 윤곽선이 렌더링된다.
      strokeColor: new Color(0, 0, 0, 1),
      color: new Color(128, 128, 128, 1),
      transform: {
        position: new Vector(340, 440)
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1, isStatic: true
      }
    });
    this.addChild(this.rect);
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    // Path.setAssetFolderPath("/src/tutorial/6-sprite/"); // import.meta.url 대신 직접 절대경로로 지정할 수 있습니다.
    this.sprite = new Sprite({
      imagePath: "ground1.png",
      transform: {
        position: new Vector(340,440)
      }
    });
    this.addChild(this.sprite);

    this.rect = new Rect({
      width: 30,
      height: 30,
      strokeWidth: 15, // strokeColor나 strokeWidth 속성을 설정하면 자동으로 윤곽선이 렌더링된다.
      strokeColor: new Color(0, 0, 0, 1),
      color: new Color(128, 128, 128, 1),
      transform: {
        position: new Vector(370, 440)
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1, isStatic: true
      }
    });
    this.addChild(this.rect);
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    // Path.setAssetFolderPath("/src/tutorial/6-sprite/"); // import.meta.url 대신 직접 절대경로로 지정할 수 있습니다.
    this.sprite = new Sprite({
      imagePath: "ground1.png",
      transform: {
        position: new Vector(370,440)
      }
    });
    this.addChild(this.sprite);

    this.rect = new Rect({
      width: 30,
      height: 30,
      strokeWidth: 15, // strokeColor나 strokeWidth 속성을 설정하면 자동으로 윤곽선이 렌더링된다.
      strokeColor: new Color(0, 0, 0, 1),
      color: new Color(128, 128, 128, 1),
      transform: {
        position: new Vector(400, 440)
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1, isStatic: true
      }
    });
    this.addChild(this.rect);
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    // Path.setAssetFolderPath("/src/tutorial/6-sprite/"); // import.meta.url 대신 직접 절대경로로 지정할 수 있습니다.
    this.sprite = new Sprite({
      imagePath: "ground1.png",
      transform: {
        position: new Vector(400,440)
      }
    });
    this.addChild(this.sprite);

    this.rect = new Rect({
      width: 30,
      height: 30,
      strokeWidth: 15, // strokeColor나 strokeWidth 속성을 설정하면 자동으로 윤곽선이 렌더링된다.
      strokeColor: new Color(0, 0, 0, 1),
      color: new Color(128, 128, 128, 1),
      transform: {
        position: new Vector(430, 420)
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1, isStatic: true
      }
    });
    this.addChild(this.rect);
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    // Path.setAssetFolderPath("/src/tutorial/6-sprite/"); // import.meta.url 대신 직접 절대경로로 지정할 수 있습니다.
    this.sprite = new Sprite({
      imagePath: "ground1.png",
      transform: {
        position: new Vector(430,420)
      }
    });
    this.addChild(this.sprite);

    this.rect = new Rect({
      width: 30,
      height: 30,
      strokeWidth: 15, // strokeColor나 strokeWidth 속성을 설정하면 자동으로 윤곽선이 렌더링된다.
      strokeColor: new Color(0, 0, 0, 1),
      color: new Color(128, 128, 128, 1),
      transform: {
        position: new Vector(460, 400)
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1, isStatic: true
      }
    });
    this.addChild(this.rect);
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    // Path.setAssetFolderPath("/src/tutorial/6-sprite/"); // import.meta.url 대신 직접 절대경로로 지정할 수 있습니다.
    this.sprite = new Sprite({
      imagePath: "ground1.png",
      transform: {
        position: new Vector(460,400)
      }
    });
    this.addChild(this.sprite);

    this.rect = new Rect({
      width: 30,
      height: 30,
      strokeWidth: 15, // strokeColor나 strokeWidth 속성을 설정하면 자동으로 윤곽선이 렌더링된다.
      strokeColor: new Color(0, 0, 0, 1),
      color: new Color(128, 128, 128, 1),
      transform: {
        position: new Vector(490, 400)
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1, isStatic: true
      }
    });
    this.addChild(this.rect);
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    // Path.setAssetFolderPath("/src/tutorial/6-sprite/"); // import.meta.url 대신 직접 절대경로로 지정할 수 있습니다.
    this.sprite = new Sprite({
      imagePath: "ground1.png",
      transform: {
        position: new Vector(490,400)
      }
    });
    this.addChild(this.sprite);

    this.rect = new Rect({
      width: 30,
      height: 30,
      strokeWidth: 15, // strokeColor나 strokeWidth 속성을 설정하면 자동으로 윤곽선이 렌더링된다.
      strokeColor: new Color(0, 0, 0, 1),
      color: new Color(128, 128, 128, 1),
      transform: {
        position: new Vector(520, 400)
      },
      isPhysicsEnable: true,
      rigidbody: {
        bounceness: 1, isStatic: true,
      }
    });
    this.addChild(this.rect);
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    // Path.setAssetFolderPath("/src/tutorial/6-sprite/"); // import.meta.url 대신 직접 절대경로로 지정할 수 있습니다.
    this.sprite200 = new Sprite({
      imagePath: "ground1.png",
      transform: {
        position: new Vector(520,400)
      }
    });
    this.addChild(this.sprite);
    
    this.rect1 = new Rect({
      width: 5,
      height: 5,
      strokeWidth: 15, // strokeColor나 strokeWidth 속성을 설정하면 자동으로 윤곽선이 렌더링된다.
      strokeColor: new Color(255, 255, 255, 1),
      color: new Color(255, 255, 255, 1),
      transform: {
        position: new Vector(520, 360)
      },
      isPhysicsEnable: true,
    });
    this.addChild(this.rect1);
    Path.setAssetFolderPath(import.meta.url); // 이 코드가 없으면 상대경로로 불러올 수 없습니다.
    // Path.setAssetFolderPath("/src/tutorial/6-sprite/"); // import.meta.url 대신 직접 절대경로로 지정할 수 있습니다.
    this.sprite1 = new Sprite({
      imagePath: "star.png",
      transform: {
        position: new Vector(520,360)
      }
    });
    this.addChild(this.sprite1);
    this.rect1.onCollision = (circlerfgg) => {
      this.rect1.destroy();
      this.sprite1.destroy();
      this.circle.addVelocity(new Vector(0, -100));
    };
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (InputManager.isKeyPressed("ArrowLeft")) {
      this.circle.addPosition(new Vector(-2, 0));
    }
    if (InputManager.isKeyPressed("ArrowRight")) {
      this.circle.addPosition(new Vector(2, 0));
    }
    if (this.circle.getPosition().y >= 768 && this.particleEffect === undefined) {
      this.particleEffect = new ParticleEffect({
        isEnable: true,
        isScaleFade: false,
        isAlphaFade: true,
        countPerSecond: 15,
        direction: 45,
        diffuseness: 15,
        speed: 120,
        lifeTime: 10,
        transform: {
          position: this.circle.getPosition()
        }
      });
      this.addChild(this.particleEffect);
      this.particleEffect.run();
      SceneManager.loadScene(TutorialScene4);
    }
}
}
