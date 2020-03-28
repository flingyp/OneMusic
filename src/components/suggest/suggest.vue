<template>
  <scroll
    class="suggest"
    :data="songs"
    :pullup="pullup"
    :beforeScroll="beforeScroll"
    @beforeScroll="listScroll"
    @scrollToEnd="searchMore"
    ref="suggest"
  >
    <ul class="suggest-list">
      <li
        class="suggest-item"
        v-for="(item, index) in songs"
        :key="index"
        @click="selectItem(item)"
      >
        <div class="name">
          <p class="text">{{item.name}} — {{item.singer}}</p>
        </div>
      </li>
    </ul>

    <loading v-show="hasMore"></loading>

    <transition
      enter-active-class="bounceInLeft"
      leave-active-class="fadeOutUp"
      :duration="{ enter: 500, leave: 800 }"
    >
      <div
        class="prompt-container animated"
        v-show="prompt"
      >
        <prompt></prompt>
      </div>
    </transition>

    <div
      v-show="!hasMore && !songs.length"
      class="no-result-wrapper"
    >
      抱歉，未搜索出结果
    </div>
  </scroll>

</template>

<script>
import axios from 'axios'
import { createSearchSong } from 'common/song'
import Scroll from 'components/base/scroll'
import Loading from 'components/base/loading'
import { mapActions, mapMutations } from 'vuex'
import Prompt from 'components/base/prompt'
export default {
  data () {
    return {
      page: 0,
      songs: [],
      // 上拉刷新 启动
      pullup: true,
      hasMore: true,
      prompt: false,
      beforeScroll: true
    }
  },
  components: {
    Scroll,
    Loading,
    Prompt
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    query (val) {
      if (val === '') {
        this.songs = []
        this.hasMore = false
        this.page = 0
        return
      }
      this.songs = []
      this.page = 0
      this.hasMore = true
      this.search()
    }
  },
  methods: {
    search () {
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      axios.get('/search', {
        params: {
          keywords: this.query,
          offset: this.page
        }
      }).then((res) => {
        if (res.status === 200) {
          // console.log(res.data.result.songs)
          let list = res.data.result.songs
          let ret = []
          list.forEach((item) => {
            ret.push(createSearchSong(item))
          })
          this.songs = ret
        }
      })
      this.page += 30
    },
    searchMore () {
      if (!this.hasMore) {
        return
      }
      axios.get('/search', {
        params: {
          keywords: this.query,
          offset: this.page
        }
      }).then(res => {
        let list = res.data.result.songs
        if (!res.data.result.songs) {
          this.hasMore = false
          return
        }
        let ret = []
        list.forEach((item) => {
          ret.push(createSearchSong(item))
        })
        this.songs = this.songs.concat(ret)
        this.page += 30
      })
    },
    ...mapActions([
      'insertSong'
    ]),
    ...mapMutations({
      setCurrentUrl: 'SET_CURRENT_URL'
    }),
    selectItem (item) {
      // 请求歌曲的url
      axios.get('/song/url', {
        params: {
          // 歌曲的id值
          id: item.id
        }
      }).then((res) => {
        const url = res.data.data[0].url
        if (url === null) {
          this.prompt = true
          this.OutPrompt()
          return
        }
        // 请求歌曲的图片
        this.getSongImage(item.id).then((res) => {
          // 将图片放入 item 后
          item.image = res.data.songs[0].al.picUrl
          // 提交到 vuex 中
          this.insertSong(item)
          console.log(item)
        })
        // 把歌曲的URL 提交到Vuex中
        this.setCurrentUrl(url)
      })
      this.$emit('select')
    },
    getSongImage (id) {
      // 请求歌曲的图片
      return axios.get('/song/detail', {
        params: {
          ids: id
        }
      })
    },
    OutPrompt () {
      var timer = setTimeout(() => {
        this.prompt = false
        clearTimeout(timer)
      }, 1800)
    },
    listScroll () {
      this.$emit('listScroll')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';
@import '~assets/stylus/mixin';

.suggest {
  height: 100%;
  overflow: hidden;
  background: #fffaf0;
  padding-top: 20px;

  .suggest-list {
    padding: 0 30px 0 0;
    border: 1px solid #e4e4e4;
    width: 100%;

    .suggest-item {
      display: flex;
      width: 100%;
      height: 50px;
      align-items: center;
      padding: 3px 10px;
      border-bottom: 1px solid #e4e4e4;
    }

    .icon {
      flex: 0 0 30px;
      width: 30px;

      [class^='icon-'] {
        font-size: 14px;
        color: $color-text-d;
      }
    }

    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: #2e3030;
      overflow: hidden;

      .text {
        no-wrap();
      }
    }
  }

  .prompt-container {
    position: absolute;
    top: -10px;
    left: 28%;
    color: #000 !important;
    padding: 8px 20px;
    background: #bdc3c7;
    border-radius: 2px;
  }

  .no-result-wrapper {
    position: fixed;
    left: 50%;
    top: 40vh;
    transform: translatex(-50%);
    color: #000;
    font-size: 16px;
  }
}
</style>