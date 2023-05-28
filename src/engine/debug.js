import Engine from "/src/engine/engine.js";

class Debug {
  static addPauseToggleEventListener() {
    document.addEventListener("keydown", (event) => {
      if(event.ctrlKey && event.altKey && event.key === " "){
        if(Engine.isPause) {
          Debug.resume();
        } else {
          Debug.pause();
        }
      }
    })
  }
  /**
   * 엔진을 일시정지한다.
   */
  static pause() {
    Engine.isPause = true;
  }

  /**
   * 엔진이 일시정지 되어있다면 그 상태를 해제한다.
   */
  static resume() {
    Engine.isPause = false;
  }
}

export default Debug;