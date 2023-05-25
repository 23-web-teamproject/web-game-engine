import Vector from "/src/engine/data-structure/vector.js";

import { typeCheck } from "/src/engine/utils.js";

/** 충돌처리에서 물체의 외형을 간단하게 표현하기 위해 Collider를 이용한다.*/
class Collider {
  constructor() {}

  getBoundary() {}
}

/**
 * 상자 형태의 외형을 나타낸다.
 * 외형의 크기에 따라 충돌체크의 범위가 달라진다.
 *
 * @extends {Collider}
 * */
class BoxCollider extends Collider {
  /**
   * @constructor
   * @param {object} [boundary]
   * @param {number} [boundary.width=0]
   * @param {number} [boundary.height=0]
   */
  constructor(boundary = {}) {
    super();

    /**
     * 상자의 크기값이다.
     *
     * @type {Vector}
     */
    this.boundary = new Vector(
      typeCheck(boundary.width, "number", 0),
      typeCheck(boundary.height, "number", 0)
    );
  }

  /**
   * 외형의 크기를 반환한다.
   *
   * @returns {Vector}
   */
  getBoundary() {
    return this.boundary;
  }

  /**
   * 외형의 크기를 설정한다.
   *
   * @param {Vector} boundary
   */
  setBoundary(boundary) {
    this.boundary = typeCheck(boundary, Vector, this.boundary);
  }
}

/**
 * 원 형태의 외형을 나타낸다.
 * 외형의 크기에 따라 충돌체크의 범위가 달라진다.
 *
 * @extends {Collider}
 * */
class CircleCollider extends Collider {
  /**
   * @constructor
   * @param {object} [boundary]
   * @param {number} [boundary.radius=0]
   */
  constructor(boundary = {}) {
    super();

    this.radius = typeCheck(boundary.radius, "number", 0);
  }

  /**
   * 외형의 크기를 반환한다.
   * 원 형태이므로 반지름을 반환한다.
   *
   * @returns {number}
   */
  getBoundary() {
    return this.radius;
  }

  /**
   * 외형의 크기를 설정한다.
   * 원 형태이므로 반지름의 길이가 외형의 크기가 된다.
   *
   * @param {number} radius
   */
  setBoundary(radius) {
    this.radius = typeCheck(radius, "number", this.radius);
  }
}

export { BoxCollider, CircleCollider };
