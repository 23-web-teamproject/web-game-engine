import Color from "/src/engine/data-structure/color.js";
import Vector from "/src/engine/data-structure/vector.js";
import Transform from "/src/engine/data-structure/transform.js";
import Matrix from "/src/engine/data-structure/matrix.js";
import RigidBody from "/src/engine/data-structure/rigidbody.js";
import { BoxCollider } from "/src/engine/data-structure/collider.js";
import SceneManager from "/src/engine/core/scene-manager.js";
import RenderManager from "/src/engine/core/render-manager.js";

export default class GameObject {
  /*
   * 하위 클래스에서 몇 가지 정보를 얻기 위해서 meta 인자를 받는다.
   */
  constructor() {
    /*
     * canvas에 이 객체를 렌더링할 때 사용할 context다.
     */
    this.context2d = RenderManager.getRenderCanvas().getContext("2d");

    /*
     * 이 객체의 좌표, 크기, 각도 등을 담고 있다.
     */
    this.transform = new Transform();
    this.transform.setPivotPositionToCenter();

    this.isPhysicsEnable = true;
    this.rigidbody = new RigidBody();
    this.collider = new BoxCollider(0, 0);

    /*
     * 렌더링에 사용될 색상값을 담고 있다.
     */
    this.color = new Color(0, 0, 0, 1);

    /*
     * 객체의 자식들을 저장할 테이블이다.
     */
    this.childTable = new Object();
    /*
     * 객체의 부모를 기억한다.
     * 부모의 matrix를 이용해 자신을 렌더링하기 때문에 기억해야 한다.
     */
    this.parent = undefined;

    /*
     * 부모 matrix를 행렬곱한 결과를 담아 렌더링에 사용할 때 필요하다.
     */
    this.matrix = new Matrix();
  }

  /*
   * GameObject 내에서는 단순히 이 오브젝트에 등록된
   * 하위 GameObject들의 update를 실행시킨다.
   */
  update(deltaTime) {
    this.calculateMatrix();

    for (const child of Object.values(this.childTable)) {
      child.update(deltaTime);
    }
  }

  updatePhysics(deltaTime) {
    this.addVelocity(this.getAcceleration().multiply(deltaTime));
    this.addPos(
      this.getVelocity().x * deltaTime,
      this.getVelocity().y * deltaTime
    );
  }

  /*
   * 이 GameObject의 하위 GameObject들의 render를 실행시킨다.
   * 부모의 matrix를 가져와 자신의 matrix와 행렬곱을 수행한다.
   * 그 결과를 이용해 렌더링에 사용하고,
   * 연결된 자식들의 렌더링을 수행하는데에 사용한다.
   */
  render() {
    this.beforeDraw();
    this.setTransform();
    this.draw();

    for (const child of Object.values(this.childTable)) {
      child.render();
    }

    this.afterDraw();
  }

  /*
   * 현재 객체의 matrix를 계산할 때,
   * 만약 부모 객체가 존재하면 부모의 matrix와 자신의 matrix를 곱하고,
   * 부모 객체가 없다면 자신의 matrix만을 사용한다.
   */
  calculateMatrix() {
    if (this.isParentGameObjectExist()) {
      this.multiplyParentMatrix();
    } else {
      this.convertTransformToMatrix();
    }
  }

  /*
   * 객체의 부모가 존재하는지 확인한다.
   */
  isParentGameObjectExist() {
    return this.parent !== undefined;
  }

  /*
   * 자신의 transform을 matrix로 변환한 것과 부모의 matrix를 행렬곱한다.
   */
  multiplyParentMatrix() {
    const parentMatrix = this.parent.getMatrix();
    this.matrix = parentMatrix.multiply(this.transform.toMatrix());
  }

  /*
   * 자신의  transform을 matrix로 변환한다.
   */
  convertTransformToMatrix() {
    this.matrix = this.transform.toMatrix();
  }

  /*
   * 계산된 matrix를 context2d에 적용한다.
   */
  setTransform() {
    this.context2d.setTransform(
      this.matrix.a,
      this.matrix.b,
      this.matrix.c,
      this.matrix.d,
      this.matrix.x,
      this.matrix.y
    );
  }

  /*
   * 렌더링 전에 색상값을 갱신한다거나 다른 작업이 미리 처리되어야 하는 경우
   * 이 함수를 오버라이드해서 사용하면 된다.
   *
   * 이 객체에서는 기본적으로 색상값을 적용시키기 위해 globalAlpha값을 조절한다.
   * context2d.save()를 통해 현재 설정값을 저장해두었으므로,
   * 마음대로 변경 후 context2d.restore()로 되돌리게 된다.
   * 따라서 현재 설정값이 자식들의 렌더링에 사용된다.
   */
  beforeDraw() {
    this.context2d.save();
    this.context2d.globalAlpha *= this.color.a;
  }

  /*
   * 이 함수는 GameObject를 상속받은 객체마다 다르게 동작한다.
   * GameObject 자체는 렌더링할 대상이 없지만 스프라이트나 도형, 텍스트 등
   * GmaeObject를 상속받은 객체들은 명확히 렌더링할 대상이 존재한다.
   * 그 때 이 함수안에서 어떻게 렌더링할건지 정의를 해 놓으면 된다.
   * super.render()를 먼저 호출하고 대상을 렌더링할 경우
   * 이미 렌더링된 자식 오브젝트를 덮어씌워 렌더링할 수 있으므로
   * 렌더링만큼은 draw 함수 내에서만 정의를 하는게 좋다.
   */
  draw() {}

  /*
   * 일반적으로 beforeDraw()에서 전처리했던 것을 원래대로 돌리는 작업을 한다.
   * beforeDraw()를 오버라이드했다면 이 함수도 오버라이드하여
   * 수정된 context2d를 원래대로 돌려놓아야 한다.
   */
  afterDraw() {
    this.context2d.restore();
  }

  /*
   * 인자로 받은 객체와 이 객체 사이에 부모-자식 관계를 만든다.
   * 만약 이 객체의 부모가 이미 있다면, 그 부모의 자식 테이블에서 이 객체를
   * 제거하고, 새로운 부모의 자식 테이블에 이 객체를 추가한다.
   */
  setParent(parent) {
    // 이 객체의 부모 객체가 있다면
    // 부모 객체로부터 자식 객체를 제거한다.
    if (this.parent !== undefined) {
      const childName = this.parent.getChildNameByChildGameObj(this);
      delete this.parent.childTable[childName];
    }

    this.parent = parent;
    this.parent.addChild(this);
  }

  /*
   * 이 객체의 부모와 이 객체 사이의 관계를 끊는다.
   * 이 객체는 부모로부터 떨어져 나오게 되는데,
   * 이 때 씬 객체를 새로운 부모로 설정한다.
   */
  removeParent() {
    // 만약 이 객체의 부모가 있어야지만 부모 객체로부터 떨어져 나올 수 있다.
    if (this.parent !== undefined) {
      // 부모 객체에게 자식을 삭제하라는 명령으로
      // 자식 객체의 부모를 삭제하는 것과
      // 부모 객체의 자식 목록에서 자식 객체를 삭제하라는 것을 해결할 수 있다.
      this.parent.removeChild(this);
    }
  }

  /*
   * 인자로 전달받은 객체가 자식 테이블에 존재한다면,
   * 그 객체를 자식 테이블에서 제거하고,
   * 씬 객체의 자식 테이블에 추가한다.
   */
  removeChild(child) {
    const childName = this.getChildNameByChildGameObj(child);
    const isChildExist = this.childTable[childName];
    if (isChildExist) {
      delete this.childTable[childName];

      // 자식 객체의 부모를 씬 객체로 변경한다.
      SceneManager.getCurrentScene().addChild(child);
    }
  }

  /*
   * 자식 목록에 객체를 추가한다.
   * 일반적으로 자식 객체에 대한 key를 무조건 갖고 있어야 한다.
   * key를 따로 지정해주지 않았으므로 겹치지 않도록
   * 현재 시간에 해시 함수를 적용해 얻은 값을 key로 사용한다.
   * TODO
   * 해시 함수를 사용하면 충돌될 경우를 따로 처리해야한다.
   */
  addChild(child) {
    const childName = this.getChildNameByChildGameObj(child);
    // 만약 이미 있는 자식 객체라면 추가하지 않음.
    if (childName === undefined) {
      // 인자로 전달받은 객체를 자식 목록에 추가한다.

      const djb2 = (string) => {
        const TABLE_SIZE = 100000009;
        let hash = 5381,
          i = 0;
        while (i < string.length) {
          hash = ((hash << 5) + hash + string.charCodeAt(i++)) % TABLE_SIZE;
        }
        return hash;
      };

      const hash = djb2(new Date().getTime().toString());

      this.createChild(hash, child);
    }
  }

  /*
   * 인자로 주어진 childName을 key로 하고,
   * 객체의 자식 테이블에 gameObject를 자식 객체로 추가한다.
   */
  createChild(childName, gameObject) {
    if (childName in Object.keys(this.childTable) == false) {
      this.childTable[childName] = gameObject;
      gameObject.setParent(this);
    }
  }

  /*
   * 이 객체의 자식 테이블에 인자로 전달받은 객체가 자식으로 존재한다면
   * 그 객체의 key값(childName)을 반환한다.
   */
  getChildNameByChildGameObj(child) {
    return Object.keys(this.childTable).find(
      (key) => child === this.childTable[key]
    );
  }

  /*
   * 인자로 전달받은 childName을 key로 하여
   * 자식 테이블에 있는 자식 객체를 반환한다.
   */
  getChild(childName) {
    return this.childTable[childName];
  }

  /*
   * 이 객체의 좌표값을 특정값만큼 변경한다.
   */
  addPos(x, y) {
    this.transform.position.x += x;
    this.transform.position.y += y;
  }

  /*
   * 이 객체의 좌표값을 특정값으로 설정한다.
   */
  setPos(x, y) {
    this.transform.position.x = x;
    this.transform.position.y = y;
  }

  /*
   * 이 객체의 크기를 특정값만큼 변경한다.
   */
  addScale(x, y) {
    this.transform.scale.x += x;
    this.transform.scale.y += y;
  }

  /*
   * 이 객체의 크기를 특정값으로 설정한다.
   */
  setScale(x, y) {
    this.transform.scale.x = x;
    this.transform.scale.y = y;
  }

  /*
   * 이 객체의 각도를 특정값만큼 변경한다.
   */
  addRotation(degree) {
    this.transform.rotation += degree;
  }

  /*
   * 이 객체의 각도를 특정값으로 설정한다.
   */
  setRotation(degree) {
    this.transform.rotation = degree;
  }

  addVelocity(velocity) {
    this.rigidbody.velocity = this.rigidbody.velocity.add(velocity);
  }

  addAcceleration(acceleration) {
    this.rigidbody.acceleration = this.rigidbody.acceleration.add(acceleration);
  }

  /*
   * 이 객체의 좌표값을 반환한다.
   */
  getPos() {
    return this.transform.position;
  }

  /*
   * 이 객체의 화면상 좌표값을 반환한다.
   * Canvas에 이 객체를 렌더링할 때 사용하는 matrix에서
   * x, y값을 벡터로 만들어 반환한다.
   */
  getWorldPos() {
    return new Vector(this.matrix.x, this.matrix.y);
  }

  /*
   * 이 객체의 크기(스케일값)를 반환한다.
   * 크기(size)를 반환하는게 아니다!
   */
  getScale() {
    return this.transform.scale;
  }

  /*
   * 이 객체의 각도(degree)를 반환한다.
   */
  getRotation() {
    return this.transform.rotation;
  }

  getSize() {
    return this.transform.size;
  }

  /*
   * 이 객체의 matrix를 반환한다.
   */
  getMatrix() {
    return this.matrix;
  }

  getAcceleration() {
    return this.rigidbody.acceleration;
  }

  getVelocity() {
    return this.rigidbody.velocity;
  }

  getBounceness() {
    return this.rigidbody.bounceness;
  }

  getInverseMass() {
    return this.rigidbody.inverseMass;
  }

  getMass() {
    return this.rigidbody.mass;
  }

  /*
   * 이 객체를 씬으로부터 제거한다.
   * 이 객체의 자식 테이블에 있는 모든 객체들도 연달아 제거된다.
   */
  destroy() {
    /* JS에는 클래스를 삭제하는 예약어가 따로 없다.
     * 단지 어떤 변수를 아무도 참조하지 않을 때 가비지 컬렉터(GC)가
     * 자동으로 수집해 제거한다.
     *
     * 그러므로 이 GameObject를 제거하기 위해서는 이 GameObject를
     * 아무도 참조하지 않으면 된다.
     * 따라서 부모가 이 GameObject를 참조하지 않도록 removeParent를 호출하고,
     * 이 GameObject의 자식객체들도 연쇄적으로 삭제하면 된다.
     */
    if (this.parent !== undefined) {
      // 부모의 자식 목록에서 이 객체를 삭제한다.
      const childName = this.parent.getChildNameByChildGameObj(this);
      delete this.parent.childTable[childName];
    }

    // 이 객체를 참조하는 자식 객체들도 삭제한다.
    for (const child of Object.values(this.childTable)) {
      child.destroy();
    }
  }
}
