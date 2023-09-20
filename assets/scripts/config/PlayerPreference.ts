import { sys } from "cc"

/**
 * 数据本地存储
 */
export class PlayerPreference {
  /* 设置浮点型参数 */
  static setFloat(key: string, value: number) {
    sys.localStorage.setItem(key, value.toString())
  }

  /* 获取浮点型参数 */
  static getFloat(key: string, defaultValue: number = 0) {
    const value = sys.localStorage.getItem(key)
    if (value) {
      return parseFloat(value)
    }
    return defaultValue
  }
}