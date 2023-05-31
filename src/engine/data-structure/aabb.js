import Vector from "/src/engine/data-structure/vector.js";

class AABB {
  constructor() {
    this.min = new Vector(0, 0);
    this.max = new Vector(0, 0);
  }
}

export default AABB;
