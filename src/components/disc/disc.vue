<template>
  <transition name="slide">
    <music-list
      :title="title"
      :bg-image="bgImage"
      :songs="songs"
    ></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { createRecommendListSong } from 'common/song'
import axios from 'axios'

export default {
  data () {
    return {
      songs: []
    }
  },
  created () {
    // 通过路由的 歌单id 获取歌单歌曲数据
    this.getDiscData(this.disc.id)
  },
  components: {
    MusicList
  },
  computed: {
    ...mapGetters([
      'disc'
    ]),
    title () {
      return this.disc.name
    },
    bgImage () {
      return this.disc.picUrl
    }
  },
  methods: {
    //  歌单id 获取歌单歌曲数据
    getDiscData (id) {
      if (!this.disc.id) {
        this.$router.push('/recommend')
        return
      }

      axios.get('/playlist/detail', {
        params: {
          id: this.disc.id
        }
      }).then((res) => {
        if (res.status === 200) {
          // console.log(res)
          this.songs = res.data.playlist.tracks.map((item) => {
            return createRecommendListSong(item)
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide.leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>