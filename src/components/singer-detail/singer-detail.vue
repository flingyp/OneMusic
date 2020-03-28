<template>
  <music-list
    :songs="songs"
    :title="title"
    :bg-image="bgImage"
  ></music-list>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import { createSong } from 'common/song.js'
import MusicList from 'components/music-list/music-list'
export default {
  name: 'SingerDetail',
  data () {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    }
  },
  created () {
    this._getDetail()
    // console.log(this.singer)
  },
  methods: {
    // 获取具体歌手单曲数据
    _getDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      axios.get('/artists', {
        params: {
          id: this.singer.id
        }
      }).then(res => {
        if (res.status === 200) {
          // console.log(res.data)
          this.songs = this._normalizeSongs(res.data.hotSongs)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach(item => {
        ret.push(createSong(item))
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped></style>