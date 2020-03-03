<template>
  <div
    class="player"
    v-show="playlist.length > 0"
  >
    <transition name="normal">
      <div
        class="normal-player"
        v-show="fullScreen"
      >
        <div class="background">
          <img
            :src="currentSong.image"
            width="100%"
            height="100%"
          >
        </div>
        <div class="top">
          <div
            class="back"
            @click="back"
          >
            <i class="fa fa-chevron-left"></i>
          </div>
          <h1
            class="title"
            v-html="currentSong.name"
          ></h1>
          <h2
            class="subtitle"
            v-html="currentSong.singer"
          ></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div
                class="cd"
                :class="rotateCd"
              >
                <img
                  class="image"
                  v-lazy="currentSong.image"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper"></div>
            <span class="time time-r">{{format(duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence iconfont">&#xe6cc;</i>
            </div>
            <div class="icon i-left">
              <i
                @click="prev"
                class="fa fa-angle-double-left"
              ></i>
            </div>
            <div class="icon i-center">
              <i
                @click="togglePlaying"
                class="fa"
                :class="playIcon"
              ></i>
            </div>
            <div class="icon i-right">
              <i
                @click="next"
                class="fa fa-angle-double-right"
              ></i>
            </div>
            <div class="icon i-right">
              <i class="fa fa-heartbeat"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="mini">
      <div
        class="mini-player"
        v-show="!fullScreen"
        @click="open"
      >
        <div class="icon">
          <img
            :class="rotateCd"
            v-lazy="currentSong.image"
            width="40"
            height="40"
          >
        </div>
        <div class="text">
          <h2
            class="name"
            v-html="currentSong.name"
          ></h2>
          <p
            class="desc"
            v-html="currentSong.singer"
          ></p>
        </div>
        <div
          class="control"
          @click.stop="togglePlaying"
        >
          <i
            class="fa"
            :class="miniIcon"
          ></i>
        </div>
        <div class="control">
          <i class="fa fa-random"></i>
        </div>
      </div>
    </transition>

    <audio
      ref="audio"
      :src="currentUrl"
      @canplay="ready"
      @error="error"
      @timeupdate="updataTime"
    ></audio>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
// import { getUrl } from 'common/axios.js'
import axios from 'axios'
export default {
  data () {
    return {
      songReady: false,
      currentTime: 0,
      // 歌曲播放的总时长
      duration: 0
    }
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'currentUrl',
      'playing',
      'currentIndex'
    ]),
    playIcon () {
      // playing 为 ture时 显示暂停的图标 false时 显示播放的图标
      return this.playing ? 'fa-pause-circle-o' : 'fa-play-circle'
    },
    miniIcon () {
      // playing 为 ture时 显示暂停的图标 false时 显示播放的图标
      return this.playing ? 'fa-pause-circle-o' : 'fa-play-circle'
    },
    rotateCd () {
      // 歌曲cd磁盘图片 旋转 类名 true 转动 false 不转动
      return this.playing ? 'play' : 'play pause'
    }
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setCurrentUrl: 'SET_CURRENT_URL'
    }),
    // 发送url请求 获取url地址 再改变vuex 的 setCurrentUrl值
    getUrl (id) {
      axios.get('api/song/url', {
        params: {
          // 歌曲的id值
          id
        }
      }).then((res) => {
        const url = res.data.data[0].url
        this.setCurrentUrl(url)
      })
    },
    back () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    togglePlaying () {
      this.setPlayingState(!this.playing)
    },
    ready () {
      this.songReady = true
      // 歌曲准备好后 就播放 解决点击上/下一首按钮后 不播放的问题
      this.$refs.audio.play()
      // 获取歌曲的总时长
      this.duration = this.$refs.audio.duration
    },
    error () {
      this.songReady = true
    },
    next () {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playlist.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      // 根据当前索引 获取 id值 再发送请求获取 歌曲url值 再修改 vuex中的 currentUrl
      this.getUrl(this.playlist[index].id)

      // 如果切换到下一首歌时 按钮是暂停的状态 则 变成 播放
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    prev () {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playlist.length - 1
      }
      this.setCurrentIndex(index)
      // 根据当前索引 获取 id值 再发送请求获取 歌曲url值 再修改 vuex中的 currentUrl
      this.getUrl(this.playlist[index].id)

      // 如果切换到下一首歌时 按钮是暂停的状态 则 变成 播放
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    updataTime (e) {
      // e.target.currentTime 获取的是歌曲正在播放的时间 一直播放则一直获取
      this.currentTime = e.target.currentTime
    },
    // 歌曲时间歌手处理
    format (int) {
      int = int | 0
      const minute = int / 60 | 0
      const second = this.pad(int % 60)
      return `${minute}:${second}`
    },
    // 补零操作
    pad (num, m = 2) {
      let length = num.toString().length
      while (length < m) {
        num = '0' + num
        length++
      }
      return num
    }
  },
  watch: {
    currentSong () {
      this.$nextTick(() => {
        // 调用 audio标签的 play()方法 播放歌曲
        this.$refs.audio.play()
      })
    },
    // 监听 播放状态 true 播放  false 暂停
    playing (NewPlaying) {
      // console.log(NewPlaying)
      const audio = this.$refs.audio
      this.$nextTick(() => {
        NewPlaying ? audio.play() : audio.pause()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/mixin';
@import '~assets/stylus/variable';

.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: #535c68;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }

    .top {
      position: relative;
      margin-bottom: 25px;

      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;

        .fa-chevron-left {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: #e84118;
          transform: rotate(-90deg);
        }
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }

      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: #f1f2f6;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;

          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;

            &.play {
              animation: rotate 20s linear infinite;
            }

            &.pause {
              animation-play-state: paused;
            }

            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .dot-wrapper {
        text-align: center;
        font-size: 0;

        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;

          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;

        .time {
          color: #e17055;
          font-size: 15px;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;

          &.time-l {
            text-align: left;
          }

          &.time-r {
            text-align: right;
          }
        }

        .progress-bar-wrapper {
          flex: 1;
        }
      }

      .operators {
        display: flex;
        align-items: center;

        .icon {
          flex: 1;
          color: #e84118;

          &.disable {
            color: $color-theme-d;
          }

          i {
            font-size: 30px;
          }
        }

        .i-left {
          text-align: right;
        }

        .i-center {
          padding: 0 20px;
          text-align: center;

          i {
            font-size: 40px;
          }
        }

        .i-right {
          text-align: left;
        }

        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }

    &.normal-enter-active, &.normal-leave-active {
      transition: all 0.4s;

      .top, .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }

    &.normal-enter, &.normal-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100px, 0);
      }

      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }

  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: $color-highlight-background;

    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.4s;
    }

    &.mini-enter, &.mini-leave-to {
      opacity: 0;
    }

    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;

      img {
        border-radius: 50%;

        &.play {
          animation: rotate 20s linear infinite;
        }

        &.pause {
          animation-play-state: paused;
        }
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;

      .name {
        margin-bottom: 2px;
        no-wrap();
        font-size: $font-size-medium;
        color: $color-text;
      }

      .desc {
        no-wrap();
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }

    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;

      .icon-play-mini, .icon-pause-mini, .fa {
        font-size: 30px;
        color: #4834d4;
      }

      .icon-mini {
        font-size: 32px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>