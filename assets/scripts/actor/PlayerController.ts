import { _decorator, Component, EventKeyboard, input, Input, KeyCode, Node, instantiate, find, Prefab, v3, v2 } from 'cc';
import { Actor } from './Actor';
import { VirtualInput } from '../input/VirtualInput';
import { StateDefine } from './StateDefine';
import { MathUtil } from '../utils/MathUtil';
const { ccclass, requireComponent,property } = _decorator;

@ccclass('PlayerController')
@requireComponent(Actor)
export class PlayerController extends Component {
  actor: Actor = null

  @property(Node)
  projectileStarter: Node = null

  @property(Prefab)
  projectilePrefab: Node = null

  start() {
    this.actor = this.getComponent(Actor)
    input.on(Input.EventType.KEY_DOWN, this.attack, this)
  }

  onDestroy(): void {
    input.off(Input.EventType.KEY_DOWN, this.attack, this)
  }

  update() {
    this.actor.input.x = VirtualInput.horizontal
    this.actor.input.y = VirtualInput.vertical

    if (this.actor.currentState === StateDefine.Attack) {
      return
    }

    if (this.actor.input.length() > 0) {
      this.actor.changeState(StateDefine.Run)
    } else {
      this.actor.changeState(StateDefine.Idel)
    }
  }

  attack(event: EventKeyboard) {
    if (event.keyCode === KeyCode.SPACE) {
      const startPos = this.projectileStarter.getWorldPosition()
      for (let i = 0; i < this.actor.actorProperty.projectileCount; i++) {
        const projectile = instantiate(this.projectilePrefab)
        find('Canvas').addChild(projectile)
        projectile.setWorldPosition(startPos)
        projectile.angle = MathUtil.signAngle(v3(0, 1, 0), v3(this.actor.input.x, this.actor.input.y, 0), v3(0,0,1)) / Math.PI * 180
      }
      this.actor.changeState(StateDefine.Attack)
    }
  }
}

