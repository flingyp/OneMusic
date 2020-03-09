export const singer = (state) => {
  return state.singer
}

// 播放状态
export const playing = (state) => {
  return state.playing
}

// 播放器的展开 和 隐藏
export const fullScreen = (state) => {
  return state.fullScreen
}

// 播放列表
export const playlist = (state) => {
  return state.playlist
}

// 顺序列表
export const sequenceList = (state) => {
  return state.sequenceList
}

// 播放模式
export const mode = (state) => {
  return state.mode
}

// 播放当前歌曲的索引
export const currentIndex = (state) => {
  return state.currentIndex
}

// 当前播放歌曲
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

// 当前播放歌曲map3的url地址
export const currentUrl = (state) => {
  return state.currentUrl
}

// 歌单
export const disc = (state) => {
  return state.disc
}

// 排行 详情数据
export const topList = (state) => {
  return state.topList
}

// 搜索历史 数据
export const searchHistory = (state) => {
  return state.searchHistory
}