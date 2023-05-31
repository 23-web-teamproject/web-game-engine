import { BoxCollider, CircleCollider } from "/src/engine/data-structure/collider.js";

import BoxCollisionResolver from "/src/engine/core/box-collision-resolver.js";
import CircleCollisionResolver from "/src/engine/core/circle-collision-resolver.js";

class CollisionResolverFactory {
  constructor() {}

  static create(gameObject) {
    if (gameObject.collider instanceof BoxCollider) {
      return new BoxCollisionResolver(gameObject);
    }
    if (gameObject.collider instanceof CircleCollider) {
      return new CircleCollisionResolver(gameObject);
    }
  }
}

export default CollisionResolverFactory;
