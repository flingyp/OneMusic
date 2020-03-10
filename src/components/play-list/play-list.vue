<template>
  <transition
    leave-active-class="fadeOutDown"
    enter-active-class="fadeInUp"
    :duration="{enter: 200, leave: 100}"
  >
    <div
      class="playlist animated"
      v-show="showFlag"
      @click="hide"
    >
      <div
        class="list-wrapper"
        @click.stop
      >
        <div class="list-header">
          <h1 class="title">
            <i class="icon"></i>
            <span class="text">全部歌曲</span>
            <span
              class="clear"
              @click="showConfirm"
            ><i class="fa fa-trash"></i></span>
          </h1>
        </div>
        <scroll
          ref="listContent"
          :data="sequenceList"
          class="list-content"
        >
          <transition-group
            name="list"
            tag="ul"
          >
            <li
              class="item"
              ref="listItem"
              v-for="(item, index) in sequenceList"
              :key="item.id"
              @click="selectItem(item,index)"
            >
              <i
                class="current fa"
                :class="getCurrentIcon(item)"
              ></i>
              <span class="text">{{item.name}}</span>
              <span class="like">
                <i class="fa fa-heart-o"></i>
              </span>
              <span
                class="delete"
                @click.stop="deleteOne(item)"
              >
                <i class="fa fa-times"></i>
              </span>
            </li>
          </transition-group>
        </scroll>

        <div
          class="list-close"
          @click="hide"
        >
          <span>关闭</span>
        </div>
      </div>

      <confirm
        ref="confirm"
        text="是否清空播放列表歌曲"
        confirBtnText="清空"
        @confirm="confirmClear"
      ></confirm>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Scroll from 'components/base/scroll'
import { playMode } from 'common/config'
import Confirm from 'components/base/confirm'
export default {
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
      setTimeout(() => {
        this.$refs.listContent.refresh()
        this.scrollToCurrent(this.currentSong)
      }, 20)
    },
    hide () {
      this.showFlag = false
    },
    getCurrentIcon (item) {
      if (this.currentSong.id === item.id) {
        return 'fa-play-circle-o'
      } else {
        return ''
      }
    },
    selectItem (item, index) {
      console.log(item)
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex((song) => {
          return song.id === item.id
        })
      }
      this.setCurrentIndex(index)
      this.setPlayingState(true)
      // 调用父组件的 getUrl 事件 当点击 另外一首歌时 去请求它的URL 并且改变Vuex 的 CurrentUrl
      this.$parent.getUrl(item.id)
    },
    scrollToCurrent (current) {
      const index = this.sequenceList.findIndex((song) => {
        return current.id === song.id
      })
      this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300)
    },
    deleteOne (item) {
      if (this.playlist.length === 1) {
        this.hide()
      }
      this.deleteSong(item)
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
    confirmClear () {
      console.log('ok')
      this.deleteSongList()
      this.hide()
    },
    ...mapActions([
      'deleteSong',
      'deleteSongList'
    ]),
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE'
    })
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return
      }
      this.scrollToCurrent(newSong)
    }
  },
  computed: {
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playlist',
      'mode'
    ])
  },
  components: {
    Scroll,
    Confirm
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';
@import '~assets/stylus/mixin';

.playlist {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  background: $color-background-d;

  &.list-fade-enter-active, &.list-fade-leave-active {
    transition: opacity 0.3s;

    .list-wrapper {
      transition: all 0.3s;
    }
  }

  &.list-fade-enter, &.list-fade-leave-to {
    opacity: 0;

    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }

  .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: $color-highlight-background;

    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;

      .title {
        display: flex;
        align-items: center;

        .icon {
          margin-right: 10px;
          font-size: 30px;
          color: $color-theme-d;
        }

        .text {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-l;
        }

        .clear {
          extend-click();

          .fa-trash {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }

    .list-content {
      max-height: 240px;
      overflow: hidden;

      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;

        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: #f1c40f;
        }

        .text {
          flex: 1;
          no-wrap();
          font-size: $font-size-medium;
          color: $color-text-d;
        }

        .like {
          extend-click();
          margin-right: 15px;
          font-size: $font-size-small;
          color: $color-theme;

          .icon-favorite {
            color: $color-sub-theme;
          }
        }

        .delete {
          extend-click();
          font-size: $font-size-small;
          color: $color-theme;
        }
      }
    }

    .list-close {
      text-align: center;
      line-height: 50px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
  }
}
</style>