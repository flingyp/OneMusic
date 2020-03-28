<template>
  <div
    class="rank"
    ref="rank"
  >
    <scroll
      class="toplist"
      ref="toplist"
      :data="topList"
    >
      <ul>
        <li
          class="item"
          v-for="(item, index) in topList"
          :key="index"
          @click="selectItem(item)"
        >
          <div class="icon">
            <img
              width="100"
              height="100"
              v-lazy="item.coverImgUrl"
            >
          </div>
          <ul class="songlist">
            <li
              class="song"
              v-for="(song, index) in item.top"
              :key="index"
            >
              <span>{{index+1}}</span>
              <span>{{song.name}}-{{song.ar[0].name}}</span>
            </li>
          </ul>
        </li>
      </ul>

      <div
        class="loading-container"
        v-show="!topList.length"
      >
        <loading></loading>
      </div>
    </scroll>

    <router-view></router-view>

  </div>
</template>

<script>
import axios from 'axios'
import Scroll from 'components/base/scroll'
import Loading from 'components/base/loading'
import { mapMutations } from 'vuex'

var RANK_TOP = [0, 1, 3, 4, 11, 15, 26, 28, 30]

export default {
  name: 'Rank',
  data () {
    return {
      topList: []
    }
  },
  components: {
    Scroll,
    Loading
  },
  created () {
    this.getTopList()
  },
  methods: {
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    }),
    getTopList () {
      for (let i = 0; i < RANK_TOP.length; i++) {
        axios.get('/top/list', {
          params: {
            idx: RANK_TOP[i]
          }
        }).then((res) => {
          // 一共请求 9 歌排行榜
          if (res.status === 200) {
            let list = res.data.playlist
            // 获取 该排行榜 前三位歌曲信息 作为TOP前三名
            list.top = res.data.playlist.tracks.slice(0, 3)
            this.topList.push(list)
          }
        })
      }
    },
    selectItem (item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })
      this.setTopList(item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/mixin.styl';
@import '~assets/stylus/variable.styl';

.rank {
  position: fixed;
  top: 88px;
  left: 0;
  right: 0;
  bottom: 0;

  .toplist {
    height: 100%;
    overflow: hidden;

    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;

      &.last-child {
        padding-bottom: 20px;
      }

      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }

      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: #bdc3c7;
        color: #2c3e50;
        font-size: $font-size-small;

        .song {
          no-wrap();
          line-height: 26px;
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>