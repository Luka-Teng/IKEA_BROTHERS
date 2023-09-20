import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass } = _decorator;

@ccclass('UIStartUp')
export class GameStartUp extends Component {
  start() {
    const node = this.node.getChildByName('StartButton')
    if (node) {
      node.on(Button.EventType.CLICK, () => {
          director.loadScene('Game-Main')
      })
    }
  }
}

