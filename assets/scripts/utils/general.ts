export const getPromise = <T = any>() => {
  let res: any
  let rej: any
  const promise = new Promise<T>((resolve, reject) => {
    res = resolve
    rej = reject
  })
  return { promise, res, rej }
}