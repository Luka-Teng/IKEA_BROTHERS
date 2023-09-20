import { _decorator, Component, Node, UITransform, Input, EventTouch, Vec3, Pool } from 'cc';
import { VirtualInput } from '../input/VirtualInput';
const { ccclass, property } = _decorator;

@ccclass('UIJoyStick')
export class UIJoyStick extends Component {
  @property(Node)
  stickBg: Node = null

  @property(Node)
  stcik: Node = null

  radius: number

  originPos: Vec3

  start() {
    this.stickBg = this.stickBg || this.node.getChildByName('StickBg')
    this.stcik = this.stcik || this.stickBg.getChildByName('Stick')
    this.radius = this.stickBg.getComponent(UITransform).contentSize.width / 3
    this.originPos = this.stickBg.getWorldPosition()

    this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this)
    this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)
    this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this)
    this.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this)
  }

  onTouchStart(event: EventTouch) {
    const { x, y } = event.getUILocation()

    this.stickBg.setWorldPosition(new Vec3(x, y, 0))
  }

  onTouchMove(event: EventTouch) {
    const { x, y } = event.getUILocation()
    const worldPosition = new Vec3(x, y, 0)
    const localPosition = new Vec3()
    this.stickBg.inverseTransformPoint(localPosition, worldPosition)

    const length = localPosition.length()
    
    if (length > this.radius) {
      localPosition.normalize().multiplyScalar(this.radius)    
    }

    this.stcik.setPosition(localPosition)

    VirtualInput.vertical = localPosition.y / this.radius
    VirtualInput.horizontal = localPosition.x / this.radius

  }

  onTouchEnd() {
    this.stickBg.setWorldPosition(this.originPos)
    this.stcik.setPosition(new Vec3())
    VirtualInput.vertical = 0
    VirtualInput.horizontal = 0
  }
}

