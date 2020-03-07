<template>
  <transition name="slide">
    <music-list
      :title="title"
      :bgImage="bgImage"
      :songs="songs"
    ></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { createRankMusic } from 'common/song'
import { mapGetters } from 'vuex'
export default {
  name: 'TopList',
  data () {
    return {
      // 整理好的 排行榜的音乐数据
      songTopList: []
    }
  },
  components: {
    MusicList
  },
  computed: {
    ...mapGetters([
      'topList'
    ]),
    title () {
      return this.topList.name
    },
    bgImage () {
      return this.topList.coverImgUrl
    },
    songs () {
      return this.songTopList
    }
  },
  created () {
    if (!this.topList.id) {
      this.$router.push('/rank')
      return
    }
    this._createRankMusic(this.topList.tracks)
  },
  methods: {
    // 对从 getters 获取的数据进行处理
    _createRankMusic (list) {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      let ret = []
      list.forEach((item) => {
        ret.push(createRankMusic(item))
      })
      this.songTopList = ret
    }
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
</style>