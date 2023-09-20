import { _decorator, Component, instantiate, Layout, Prefab, resources, Sprite, Pool, SpriteFrame, Node } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

const replace = new Map<string, string>()
replace.set('/', 'Slash')

/**
 * 图片文字
 * 用于艺术字展现
 */
@ccclass('UIImageLabel')
@requireComponent(Layout)
export class UIImageLabel extends Component {
  private _text: string = ''
  get text() {
    return this._text
  }
  set text(value: string) {
    this._text = value
    this.resetString(value)
  }

  @property(Prefab)
  numPrefab: Prefab = null

  numberPool: Pool<Node> = null

  start() {
    this.numberPool = new Pool(() => {
      const node = instantiate(this.numPrefab)
      this.node.addChild(node)
      node.active = false
      return node
    }, 5, (node) => {
      node.removeFromParent()
    })
  }

  onDestroy() {
    this.numberPool.destroy()
  }

  resetString(text: string) {
    const dir = 'ui/art/num/'
    /**
     * 记载过可以优化为不需要再加载
     */
    resources.loadDir(dir, SpriteFrame, (err, assets) => {
      for (let i = 0; i < text.length; i++) {
        let char = text[i]

        if (replace.has(char)) {
          char = replace.get(char)
        }

        const path = dir + char + '/spriteFrame'
        const spriteFrame = resources.get(path, SpriteFrame)

        const spriteNode = this.numberPool.alloc()
        const spriteComponent = spriteNode.getComponent(Sprite)
        spriteComponent.spriteFrame = spriteFrame
        spriteNode.active = true
        spriteNode.setSiblingIndex(i)
      }
    })
  }

  clearString() {
    for (let child of this.node.children) {
      this.numberPool.free(child)
      child.active = false
    }
  }
}

