<template>
  <div class="music-list">
    <div class="back">
      <i
        @click="back"
        class="iconfont icon-back"
      >&#xe653;<span>歌手</span></i>
    </div>
    <h1
      class="title"
      v-html="title"
    ></h1>
    <div
      class="bg-img"
      :style="bgStyle"
    >
      <div class="filter"></div>
    </div>
    <scroll
      :data="songs"
      class="content"
    >
      <div class="song-list-wrapper">
        <song-list
          @select="selectItem"
          :songs="songs"
        ></song-list>
      </div>

      <div
        class="loading-container"
        v-show="!songs.length"
      >
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from 'components/song-list/song-list'
import Scroll from 'components/base/scroll'
import Loading from 'components/base/loading'
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      scrollY: 0,
      url: ''
      // 歌曲播放地址
    }
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  components: {
    SongList,
    Scroll,
    Loading
  },
  methods: {
    ...mapActions([
      'selectPlay'
    ]),
    back () {
      this.$router.back()
    },
    selectItem (item, index) {
      axios.get('api/song/url', {
        params: {
          id: item.id
        }
      }).then((res) => {
        if (res.status === 200) {
          // 获取url地址
          const url = res.data.data[0].url
          this.selectPlay({
            list: this.songs,
            index,
            url: url
            // url是歌曲mp3播放地址
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.music-list {
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fffaf0;

  .back {
    position: absolute;
    top: 0px;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      font-size: 16px;
      color: #ffffff;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    text-align: center;
    line-height: 40px;
    font-size: 17px;
    color: #ccc;
    font-weight: 700;
    letter-spacing: 3px;
  }

  .bg-img {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .song-list-wrapper {
      // padding: 10px 30px;
    }

    .loading-container {
      position: absolute;
      width: 100px;
      height: 47px;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      padding-bottom: 100%;
    }
  }
}
</style>