import storage from 'good-storage'
const SEARCH_KEY = '_search_'
const SEARCH_MAX_LEGNTH = 15

const PLAY_KEY = '_play_'
const PLAY_MAX_LENGTH = 200

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEGNTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function deleteSearch (query) {
  // 首先获取
  let searches = storage.get(SEARCH_KEY, [])

  deleteFromArray(searches, (item) => {
    return item === query
  })

  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}

// 写入 播放历史 数据 （本地缓存中 和 vuex）
export function savePlay (song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, songs)
  return songs
}
// 读 播放历史 数据 从本地缓存中
export function loadPlay () {
  return storage.get(PLAY_KEY, [])
}