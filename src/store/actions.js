import * as types from './mutation-type'
import { playMode } from '../common/config'
import { random } from 'common/util.js'

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