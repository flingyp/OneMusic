import * as types from './mutation-type'
import { playMode } from '../common/config'
import { random } from 'common/util.js'
import { saveSearch, deleteSearch, clearSearch } from 'common/cache.js'
import axios from 'axios'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({ commit, state }, { list, index, url }) {
  commit(types.SET_SEQUENCE_LIST, list)

  if (state.mode === playMode.random) {
    let randomList = random(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_CURRENT_URL, url)
}

export const insertSong = function ({ commit, state }, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // 查找当前播放列表有没有这首歌 并且返回它的索引
  let fpIndex = findIndex(playlist, song)
  // 因为 插入歌曲 索引+1
  currentIndex++
  // 插入这首歌 到当前 播放列表
  playlist.splice(currentIndex, 0, song)
  // 如果已经包含这首歌 就要删除原来的那首歌
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  let currentSIndex = findIndex(sequenceList, currentSong) + 1

  let fsIndex = findIndex(sequenceList, song)

  sequenceList.splice(currentSIndex, 0, song)

  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({ commit }, query) {
  // 存放到vuex 并且 缓存localStorage 执行了两个函数
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({ commit }, query) {
  // 存放到vuex 并且 缓存localStorage 执行了两个函数
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({ commit }) {
  // 存放到vuex 并且 缓存localStorage 执行了两个函数
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteSong = function ({ commit, state }, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let currentSong = playlist[currentIndex]

  // 删除 在 播放列表中的这首歌
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  // 删除 在 顺序列表中的这首歌
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)

  // 如果删除的这首歌是正在播放的歌曲
  if (song === currentSong) {
    // 如果播放列表就一首歌 我们就不去请求
    if (!playlist.length) {
      return
    }
    // 去请求下一首歌的url
    axios.get('api/song/url', {
      params: {
        // 歌曲的id值
        id: playlist[pIndex].id
      }
    }).then((res) => {
      const url = res.data.data[0].url
      commit(types.SET_CURRENT_URL, url)
    })
  }

  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  if (!playlist.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    commit(types.SET_PLAYING_STATE, true)
  }
}

export const deleteSongList = function ({ commit }) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
  commit(types.SET_CURRENT_URL, '')
}