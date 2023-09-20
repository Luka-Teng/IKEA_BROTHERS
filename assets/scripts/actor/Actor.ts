import { _decorator, Component, Animation, RigidBody2D, Collider2D, CCFloat, Vec2, v2, v3, Node } from 'cc';
import { StateDefine } from './StateDefine';
import { ActorProperty } from './ActorProperty';
const { ccclass, property } = _decorator;

@ccclass('Actor')
export class Actor extends Component {
  currentState: StateDefine = StateDefine.Idel

  animation: Animation = null
  rigidbody: RigidBody2D = null
  collider: Collider2D = null

  @property(CCFloat)
  linearSpeed: number = 3

  actorProperty = new ActorProperty()

  input: Vec2 = v2()

  start() {
    this.animation = this.getComponent(Animation)
    this.rigidbody = this.getComponent(RigidBody2D)
    this.collider = this.getComponent(Collider2D)
  }

  update() {
    this.move()
    this.rotate()
  }

  /* 切换动画状态 */
  changeState(state: StateDefine) {
    if (this.currentState === StateDefine.Die) {
      return
    }

    if (this.currentState === StateDefine.Hit) {
      if (state === StateDefine.Die || state === StateDefine.Hit) {
        return
      }
    }

    if (this.currentState !== StateDefine.Run) {
      this.stop()
    }

    this.animation.crossFade(state, 0.3)
    this.currentState = state
  }
  

  /* 复活 */
  respawn() {
    this.currentState = StateDefine.Idel
    this.animation.crossFade(this.currentState, 0.3)
  }

  /* 移动 */
  move() {
    this.rigidbody.linearVelocity = this.input.multiplyScalar(this.linearSpeed)
  }

  /* 停止 */
  stop() {
    this.rigidbody.linearVelocity = v2(0, 0)
  }

  /* 旋转 */
  rotate() {
    if (this.input.x < 0 && this.node.scale.x > 0) {
      this.node.setScale(v3(-1, 1, 1))
      return
    }

    if (this.input.x > 0 && this.node.scale.x < 0) {
      this.node.setScale(v3(1, 1, 1))
      return
    }
  }

  /* 攻击结束 */
  onAttackComplete() {
    if (this.input.length() > 0) {
      this.changeState(StateDefine.Run)
    } else {
      this.changeState(StateDefine.Idel)
    }
  }
}

