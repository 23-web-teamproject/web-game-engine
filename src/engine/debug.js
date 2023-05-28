import Engine from "/src/engine/engine.js";

class Debug {
  /**
   * 엔진을 일시정지한다.
   */
  static pause() {
    Engine.isPause = true;
  }
}

export default Debug;
