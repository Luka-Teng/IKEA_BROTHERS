import { math, EventTarget } from "cc"
import { PlayerPreference } from "./PlayerPreference"

/**
 * 游戏设置
 * 继承eventtarget是将数据和逻辑隔离开
 */
export class Setting extends EventTarget {
  /* 单例 */
  _instance: Setting = null
  get instance(): Setting {
    if (!this._instance) {
      this._instance = new Setting()
    }
    return this._instance
  }

  private _bgmVolume: number = 1
  set bgmVolumn(value: number) {
    this._bgmVolume = math.clamp01(value)
    PlayerPreference.setFloat('bgmVolume', this._bgmVolume)

    /* 事件派发 */
    // this.emit('xxxx')
  }
  get bgmVolumn(): number {
    return this._bgmVolume
  }
}