import LayerManager from "/src/engine/core/layer-manager.js";

/**
 * Layer클래스는 객체가 어느 레이어에 속하는지를 나타내고,
 * 물리엔진에서 이 객체가 다른 객체와 충돌했는지 판단할 때
 * LayerManager에 명시된 상태에 따라 충돌을 무시할지 결정한다.
 *
 * 만약 이 클래스를 상속받아 새로운 레이어를 정의하려고 하면,
 * 클래스를 정의할 때 무조건 addLayerToLayerSet을 호출해야한다.
 *
 * @class
 * @examples
 * class SomeLayer extends Layer {
 *   // 새로운 레이어클래스의 정적함수로 호출해야한다.
 *   // 그래야 레이어 집합에 레이어가 추가된다.
 *   static _ = SomeLayer.addLayerToLayerSet();
 *
 *   constructor() {}
 * }
 */
class Layer {
  /**
   * @constructor
   */
  constructor() {}

  /**
   * 전체 레이어 목록에 새로운 레이어가 없다면 이 레이어를 목록에 추가하고,
   * physicsInteractionMap에 있는 다른 레이어에 이 레이어를 추가하여
   * 충돌체크를 진행하게 한다.
   *
   * @static
   */
  static addLayerToLayerSet() {
    const layerName = this.name;
    if (LayerManager.layerSet.has(layerName) === false) {
      LayerManager.physicsInteractionMap.set(
        layerName,
        new Set(LayerManager.layerSet)
      );
      LayerManager.physicsInteractionMap.forEach((value) => {
        value.add(layerName);
      });
      LayerManager.layerSet.add(layerName);
    }
  }

  /**
   * 이 레이어와 다른 레이어가 충돌체크를 할 수 있다면 true를 반환한다.
   *
   * @param {Layer} otherLayer
   * @returns {boolean}
   */
  canPhysicsInteractLayerWith(otherLayer) {
    return LayerManager.physicsInteractionMap
      .get(this.constructor.name)
      .has(otherLayer.constructor.name);
  }
}

/**
 * 기본 레이어다.
 *
 * @extends {Layer}
 */
class DefaultLayer extends Layer {
  static dummy = DefaultLayer.addLayerToLayerSet();

  constructor() {
    super();
  }
}

/**
 * 지형을 나타내는 레이어다.
 *
 * @extends {Layer}
 */
class TerrainLayer extends Layer {
  static dummy = TerrainLayer.addLayerToLayerSet();

  constructor() {
    super();
  }
}

/**
 * 캐릭터, 적, NPC 등을 나타내는 레이어다.
 *
 * @extends {Layer}
 */
class UnitLayer extends Layer {
  static dummy = UnitLayer.addLayerToLayerSet();

  constructor() {
    super();
  }
}

/**
 * 파티클을 나타내는 레이어다.
 *
 * @extends {Layer}
 */
class ParticleLayer extends Layer {
  static dummy = ParticleLayer.addLayerToLayerSet();

  constructor() {
    super();
  }
}

export { DefaultLayer, Layer, TerrainLayer, UnitLayer, ParticleLayer };
