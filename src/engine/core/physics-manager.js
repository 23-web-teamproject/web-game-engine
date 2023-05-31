import Manifold from "/src/engine/data-structure/manifold.js";
import Vector from "/src/engine/data-structure/vector.js";

import CollisionResolverFactory from "/src/engine/core/collision-resolver-factory.js";

import { Sort } from "/src/engine/utils.js";

/**
 * 씬 객체에 물리효과를 적용하는 책임은 PhysicsManager이 맡는다.
 * 물리효과를 적용할 객체들에게만 물리효과를 적용한다.
 *
 * 참고한 사이트
 * https://github.com/tutsplus/ImpulseEngine/
 * https://github.com/Kareus/SP2C/
 * https://kareus.tistory.com/15
 */
class PhysicsManager {
  /**
   * 물리효과가 적용될 객체들
   *
   * @property {array}
   * @static
   */
  static physicsEnableGameObjectList = null;

  static collisionPairList = null;

  static manifoldList = null;

  static triggerManifoldList = null;

  constructor() {}

  /**
   * 씬 객체 내에 존재하는 객체들중
   * 물리효과가 켜진 객체들에게 물리효과를 계산해 적용한다.
   *
   * @param {GameObject} scene - 현재 씬
   * @param {number} deltaTime - 이전 프레임과 현재 프레임의 시간차
   * @static
   */
  static update(scene, deltaTime) {
    PhysicsManager.clearStaticLists();
    PhysicsManager.collectPhysicsEnabledGameObject(scene);
    PhysicsManager.computeAABBOfPhysicsEnabledGameObject();
    PhysicsManager.sortPhysicsEnabledGameObjectList();
    PhysicsManager.createCollisionPairList();
    PhysicsManager.resolveCollision();
    PhysicsManager.integrateForce(deltaTime);
    PhysicsManager.applyImpulse();
    PhysicsManager.integrateVelocity(deltaTime);
    PhysicsManager.runPositionalCorrection();
    PhysicsManager.callOnCollisionForAllTriggeredObject();
  }

  /**
   * 물리효과가 켜진 객체를 수집해둔 리스트를 초기화한다.
   * 다음 루프에 다시 물리 효과를 적용하기 위해
   * 항상 물리 연산이 끝난 다음에는 초기화를 해야한다.
   * @static
   */
  static clearStaticLists() {
    PhysicsManager.physicsEnableGameObjectList = new Array();
    PhysicsManager.collisionPairList = new Array();
    PhysicsManager.manifoldList = new Array();
    PhysicsManager.triggerManifoldList = new Array();
  }

  /**
   * 씬 객체 내에 존재하는 모든 객체들중
   * 물리효과를 받는 객체들만 모아 리스트에 담는다.
   * 모든 객체를 조사해야하기 때문에 재귀호출하여 탐색한다.
   *
   * @static
   * @param {GameObject} scene - 현재 씬
   */
  static collectPhysicsEnabledGameObject(scene) {
    scene.childList.forEach((child) => {
      if (child.isActive) {
        if (child.isPhysicsEnable) {
          PhysicsManager.physicsEnableGameObjectList.push(child);
        }

        if (child.childList.length > 0) {
          PhysicsManager.collectPhysicsEnabledGameObject(child);
        }
      }
    });
  }

  /**
   * 수집한 객체들의 AABB를 미리 구해 반복되는 연산을 줄인다.
   * @static
   */
  static computeAABBOfPhysicsEnabledGameObject() {
    PhysicsManager.physicsEnableGameObjectList.forEach((obj) => {
      obj.getAABB();
    });
  }

  /**
   * 수집한 객체들을 AABB로 나타냈을 때
   * min.x를 기준으로 오름차순 정렬한다.
   * @static
   */
  static sortPhysicsEnabledGameObjectList() {
    const sorter = new Sort(
      PhysicsManager.physicsEnableGameObjectList,
      (objA, objB) => {
        return objA.collider.aabb.min.x < objB.collider.aabb.min.x;
      }
    );

    sorter.run();
  }

  /**
   * 정렬한 배열을 순회하여 절대로 충돌이 일어나지 않을 객체는 건너뛰고,
   * 남은 객체들을 Pair로 묶어 후보 리스트를 생성한다.(Sweep and prune)
   * @static
   */
  static createCollisionPairList() {
    const list = Array();

    PhysicsManager.physicsEnableGameObjectList.forEach((objA) => {
      /**
       * 탐색했던 객체들을 대상으로 Pair를 생성할 수 있는지 확인한다.
       * 이 때 객체 배열은 오름차순으로 정렬되어 있다.
       * 임시 리스트에 추가된 객체들과 현재 객체가 충돌 가능한지 확인한다.
       * 만약 임시 리스트에 추가된 객체(A)가 현재 객체(B)와 충돌 불가능이라면
       * 앞으로 탐색할 객체(C...)들도 A와는 절대 충돌하지 않으므로
       * 임시 리스트에서 제거한다.
       */
      for (let i = 0; i < list.length; i++) {
        /**
         * list에는 현재 객체보다 max.x가 더 작은 객체들이 있다.
         * 현재 객체와 충돌가능한 상태인지 확인하고,
         * 그렇지 않다면 검사하지 않은 객체들과는
         * 절대 충돌하지 않으므로 제거한다.
         */
        const objAAABB = objA.collider.aabb;
        const objBAABB = list.at(i).collider.aabb;
        if (objAAABB.min.x > objBAABB.max.x) {
          list.splice(i, 1);
          i--;
        } else {
          /**
           * 단순하게 AABB로만 검사한다.
           * 구체적인 충돌체크는 manifold를 생성할 때 한다.
           */
          if (
            !(
              objAAABB.min.x > objBAABB.max.x ||
              objAAABB.max.x < objBAABB.min.x ||
              objAAABB.min.y > objBAABB.max.y ||
              objAAABB.max.y < objBAABB.min.y
            )
          ) {
            PhysicsManager.collisionPairList.push([objA, list.at(i)]);
          }
        }
      }

      list.push(objA);
    });
  }

  /**
   * 충돌할 가능성이 있는 객체들끼리 충돌체크를 수행하고,
   * 만약 정말로 충돌했다면 manifold를 생성해 물리효과를 연산한다.
   * 만약 Trigger에 충돌했다면 단순히 onCollision만 호출하도록 한다.
   * @static
   */
  static resolveCollision() {
    PhysicsManager.collisionPairList.forEach((pair) => {
      const objA = pair[0];
      const objB = pair[1];
      /**
       * 서로 isStatic이면 건너뛴다.
       */
      if (objA.rigidbody.isStatic && objB.rigidbody.isStatic) {
        return;
      }
      /**
       * 서로 isTrigger라면 건너뛴다.
       */
      if (objA.rigidbody.isTrigger && objB.rigidbody.isTrigger) {
        return;
      }
      /**
       * 두 객체의 레이어가 충돌체크를 하지 않는 레이어라면 건너뛴다.
       */
      if (
        objA.getLayer().canPhysicsInteractLayerWith(objB.getLayer()) === false
      ) {
        return;
      }

      let collisionResolver = CollisionResolverFactory.create(objA);

      if (collisionResolver.isCollideWith(objB)) {
        /**
         * 만약 객체가 트리거와 충돌한 상태라면
         * 물리량 연산을 하지 않고
         * 그저 onCollision만 호출하도록 한다.
         */
        if (objA.rigidbody.isTrigger || objB.rigidbody.isTrigger) {
          PhysicsManager.triggerManifoldList.push([objA, objB]);
          return;
        }
        const manifold = collisionResolver.resolveCollision(objB);
        if (manifold !== undefined) {
          PhysicsManager.manifoldList.push(manifold);
        }
      }
    });
  }

  /**
   * 충돌한 모든 객체에 대해서 각 객체의 가속도를 적분하여
   * 속도에 누적한다.
   * @static
   */
  static integrateForce(deltaTime) {
    PhysicsManager.physicsEnableGameObjectList.forEach((obj) => {
      obj.integrateForce(deltaTime);
    });
  }

  /**
   * 충돌한 모든 객체의 충격량을 계산하여 각 객체의
   * 속도 벡터를 변화시킨다.
   * @static
   */
  static applyImpulse() {
    PhysicsManager.manifoldList.forEach((manifold) => {
      if (
        manifold.objA.rigidbody.isTrigger === false &&
        manifold.objB.rigidbody.isTrigger === false
      ) {
        PhysicsManager.applyImpulseToCollidedObjects(
          manifold.objA,
          manifold.objB,
          manifold.normal
        );
      }
      manifold.objA.onCollision(manifold.objB);
      manifold.objB.onCollision(manifold.objA);
    });
  }

  /**
   * 서로 충돌한 두 객체에게 충격량을 적용한다.
   * @static
   * @param {GameObject} objA - 서로 충돌한 객체1
   * @param {GameObject} objB - 서로 충돌한 객체2
   * @param {Vector} normal - 반작용 방향
   */
  static applyImpulseToCollidedObjects(objA, objB, normal) {
    const diff = objB.getVelocity().minus(objA.getVelocity());
    const dot = diff.dot(normal);

    // 두 객체의 속도(velocity:벡터)의 내적값이 양수라면
    // 두 객체가 서로 다른 방향으로 이동하고 있는 것이 아니라는 말이므로
    // 충돌체크를 하지 않는다.
    if (dot > 0) {
      return;
    }

    // 유니티에서는 탄성값을 적용할 때 avg, min, max 중 하나를 적용한다.
    // 여기서는 일단 min으로 적용한다.
    const e = Math.min(objA.getBounceness(), objB.getBounceness());

    // 충격량을 구하는 방정식을 통해 충격량을 계산한다.
    // 저도 잘 몰라요.
    let j = -(1 + e) * dot;
    j /= objA.getInverseMass() + objB.getInverseMass();
    const impulse = normal.multiply(j);

    objA.addVelocity(impulse.multiply(-objA.getInverseMass()));
    objB.addVelocity(impulse.multiply(objB.getInverseMass()));

    PhysicsManager.applyFrictionToCollidedObjects(objA, objB, normal, j);
  }

  /**
   * 충돌한 모든 객체에 대해 각 객체의 정지 마찰 계수와
   * 운동 마찰 계수를 통해 마찰력을 적용한다.
   * @static
   * @param {GameObject} objA - 서로 충돌한 객체1
   * @param {GameObject} objB - 서로 충돌한 객체2
   * @param {Vector} normal - 반작용 방향
   * @param {number} j - 충격량
   */
  static applyFrictionToCollidedObjects(objA, objB, normal, j) {
    // 충격이 전달된 후의 속도로 계산을 진행한다.
    // 두 객체의 속도 벡터의 차로 마찰이 작용할 방향을 찾는다.
    const relativeVelocity = objB.getVelocity().minus(objA.getVelocity());

    // relativeVelocity를 n에 정사영하여 normal방향 성분을 얻고,
    // 그 성분값을 다시 relativeVelocity에 빼서 normal에
    // 수직인 벡터를 구한다.
    let tangent = relativeVelocity.minus(
      normal.multiply(relativeVelocity.dot(normal))
    );
    tangent = tangent.normalize();

    // 마찰력의 크기를 구한다.
    let jt = -relativeVelocity.dot(tangent);
    jt /= objA.getInverseMass() + objB.getInverseMass();

    // 두 객체 사이의 정지 마찰 계수를 구한다.
    const staticFriction = Math.sqrt(
      objA.getStaticFriction() * objA.getStaticFriction() +
        objB.getStaticFriction() * objB.getStaticFriction()
    );

    // 정지 마찰 계수보다 큰 힘이 주어질 경우
    // 운동 마찰 계수를 이용해 마찰력을 결정한다.
    let frictionImpulse = null;
    if (Math.abs(jt) < j * staticFriction) {
      frictionImpulse = tangent.multiply(jt);
    } else {
      // 두 객체 사이의 운동 마찰 계수를 구한다.
      const dynamicFriction = Math.sqrt(
        objA.getDynamicFriction() * objA.getDynamicFriction() +
          objB.getDynamicFriction() * objB.getDynamicFriction()
      );
      frictionImpulse = tangent.multiply(-j * dynamicFriction);
    }

    objA.addVelocity(frictionImpulse.multiply(-objA.getInverseMass()));
    objB.addVelocity(frictionImpulse.multiply(objB.getInverseMass()));
  }

  /**
   * 충돌한 모든 객체에 대해 각 객체의 속도를 적분하여
   * 각각의 좌표값에 누적한다.
   * @static
   */
  static integrateVelocity(deltaTime) {
    PhysicsManager.physicsEnableGameObjectList.forEach((obj) => {
      obj.integrateVelocity(deltaTime);
    });
  }

  /**
   * 충돌한 모든 객체가 물리 연산으로 인해서
   * 서로 겹쳐지는 상황을 피하기 위해
   * 겹친 도형끼리 멀어지는 연산을 한다.
   * @static
   */
  static runPositionalCorrection() {
    PhysicsManager.manifoldList.forEach((manifold) => {
      if (
        manifold.objA.rigidbody.isTrigger === false &&
        manifold.objB.rigidbody.isTrigger === false
      ) {
        PhysicsManager.runPositionCorrectionToCollidedObjects(manifold);
      }
    });
  }

  /**
   * 충돌처리가 되었지만 서서히 빠져버리는 버그를 해결하기 위해
   * 충돌된 위치에서 정해진 값만큼 강제로 떨어지게 한다.
   * @static
   * @param {Manifold} manifold - 충돌체크의 결과
   */
  static runPositionCorrectionToCollidedObjects(manifold) {
    const percentage = 0.4; // ??? 0.2 ~ 0.8
    const slop = 0.05; // ??? 0.01 ~ 0.1
    const correction = manifold.normal.multiply(
      (Math.max(manifold.penetrationDepth - slop, 0) /
        (manifold.objA.getInverseMass() + manifold.objB.getInverseMass())) *
        percentage
    );

    let objACorrection = correction.multiply(-manifold.objA.getInverseMass());
    let objBCorrection = correction.multiply(manifold.objB.getInverseMass());
    manifold.objA.addPosition(objACorrection);
    manifold.objB.addPosition(objBCorrection);
  }

  /**
   * 객체와 트리거가 충돌한 상황이 담긴 triggerManifoldList의
   * 모든 객체의 onCollision을 호출한다.
   * @static
   */
  static callOnCollisionForAllTriggeredObject() {
    PhysicsManager.triggerManifoldList.forEach((triggerManifold) => {
      triggerManifold[0].onCollision(triggerManifold[1]);
      triggerManifold[1].onCollision(triggerManifold[0]);
    });
  }
}

export default PhysicsManager;
