import { _decorator, Component, director, Button, find, Node, Label } from 'cc';
import UIManager, { DIALOG_TYPES } from './UIManager';
const { ccclass } = _decorator;

@ccclass('UIGame')
export class UIGame extends Component {
  start() {
    /* 退出 */
    const nodeExit = find('UIRoot/UIGame/Btns/BtnExit')
    if (nodeExit) {
      nodeExit.on(Button.EventType.CLICK, () => {
        this.onExit()
      })
    }

    /* 暂停/继续 */
    const nodePause = find('UIRoot/UIGame/Btns/BtnPause')
    if (nodePause) {
      nodePause.on(Button.EventType.CLICK, () => {
        this.pauseOrContinue(nodePause)
      })
    }

    /* 设置 */
    const nodeSetting = find('UIRoot/UIGame/Btns/BtnSetting')
    if (nodeSetting) {
      nodeSetting.on(Button.EventType.CLICK, () => {
        this.openSetting()
      })
    }
  }

  /* 退出 */
  onExit() {
    if (director.isPaused()) return

    director.loadScene('Game-Home')
  }

  /* 打开配置 */
  openSetting() {
    if (director.isPaused()) return
    UIManager.instance.openPanel(DIALOG_TYPES.SETTING, (panel: Node) => {
      panel.getChildByName('Close').once(Button.EventType.CLICK, () => {
        UIManager.instance.closePanel(DIALOG_TYPES.SETTING)
      })
    })
  }

  /* 暂停/继续 */
  pauseOrContinue(node: Node) {
    const label = node.getComponentInChildren(Label)

    if (director.isPaused()) {
      director.resume()
      label.string = 'Pause'
      return
    }

    label.string = 'Continue'
    director.pause()
  }
}

