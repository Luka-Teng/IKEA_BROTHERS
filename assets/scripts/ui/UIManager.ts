import { Node, Prefab, find, instantiate, resources } from 'cc'

export const enum DIALOG_TYPES {
  /* 设置面板 */
  SETTING = 'UISetting',
}

/* 用于UI相关管理 */
export default class UIManager {
  /* 单例 */
  private static _instance: UIManager;
  public static get instance(): UIManager {
    if (!this._instance) {
      this._instance = new UIManager();
    }
    return this._instance;
  }

  private _uiRoot: Node = null;

  private panels: Map<string, Node> = new Map<string, Node>();

  public openPanel(name: string, onComplete?: (panel: Node) => void) {

    if (!this._uiRoot) {
      this._uiRoot = find('UIRoot')
    }

    if (this.panels.has(name)) {
      const panel = this.panels.get(name)
      panel.active = true
      onComplete && onComplete(panel)
      return
    }

    resources.load(`prefab/ui/${name}`, Prefab, (err, prefab: Prefab) => {
      const panel = instantiate(prefab)
      this.panels.set(name, panel)

      this._uiRoot.addChild(panel)
      onComplete && onComplete(panel)
    })
  }

  public closePanel(name: string) {
    const panel = this.panels.get(name)

    if (!panel) return

    panel.active = false
  }
}   