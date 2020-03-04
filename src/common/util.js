function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 打乱顺序列表 变成 随机列表
export function random (arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}