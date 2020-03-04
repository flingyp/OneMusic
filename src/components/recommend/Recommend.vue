<template>
  <div>
    <div>
      <!-- 轮播组件 -->
      <swiper :swiper="swiper"></swiper>

      <div>
        <!-- 推荐歌单 -->
        <div
          class="songlist"
          v-show="listData.length"
        >
          <div class="song-title">
            <h1 class="title">推荐歌单</h1>
          </div>

          <ul class="song-list">
            <li
              class="song-item"
              v-for="item in listData"
              :key="item.id"
            >
              <div class="item-icon">
                <img
                  class="icon"
                  v-lazy="item.picUrl"
                  alt=""
                >
              </div>
              <div class="item-count">
                <i class="iconfont icon">&#xe601;</i>
                <i class="conunt">
                  {{item.playCount.toFixed().slice(0,4)}}万
                </i>
              </div>
              <div class="song-text">
                <p class="text">{{item.name}}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- 推荐音乐 -->
        <div
          class="songlist"
          v-show="Data.length"
        >
          <div class="song-title">
            <h1 class="title">推荐音乐</h1>
          </div>

          <ul class="song-list">
            <li
              class="song-item"
              v-for="item in Data"
              :key="item.id"
            >
              <div class="item-icon">
                <img
                  class="icon"
                  v-lazy="item.picUrl"
                  alt=""
                >
              </div>
              <div class="song-text">
                <p class="text">{{item.name}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- loading部分 -->
      <div
        class="loading"
        v-show="!(listData.length&&Data.length)"
      >
        <loading></loading>
      </div>

    </div>
  </div>
</template>

<script>
import Swiper from './swiper/Swiper'
import axios from 'axios'
import loading from 'components/base/loading'
export default {
  name: 'Recommend',
  components: {
    Swiper,
    loading
  },
  data () {
    return {
      // 存放推荐歌单数据
      listData: [],
      // 存放推荐音乐数据
      Data: [],
      // 存放轮播数据
      swiper: [],
      // 轮播数据的 手机
      type: 2
    }
  },
  mounted () {
    setTimeout(() => {
      this.getSongList()
      this.GetSwiperData()
    }, 500)
  },
  methods: {
    // 获取轮播图数据函数
    GetSwiperData () {
      axios.get('api/banner', {
        params: {
          type: this.type
        }
      }).then(this.SwiperData)
        .catch(function (err) {
          console.log(err)
        })
    },
    SwiperData (res) {
      if (res.status === 200 || res.data) {
        this.swiper = res.data.banners
        // console.log(this.Data)
      }
    },
    getSongList () {
      // 请求推荐歌单数据
      axios.get('api/personalized', {
        params: {
          limit: 50
        }
      }).then(this.SongList).catch(function (err) {
        console.log(err)
      })

      // 请求推荐音乐数据
      axios.get('api/personalized/newsong').then(this.Song).catch(function (err) {
        console.log(err)
      })
    },
    SongList (res) {
      if (res.status === 200 || res.data.code === 200) {
        // 获取推荐歌单数据
        this.listData = res.data.result
      }
    },
    Song (res) {
      if (res.status === 200 || res.data.code === 200) {
        // 获取推荐音乐数据
        this.Data = res.data.result
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.songlist {
  overflow: hidden;
  width: 100%;

  .song-title {
    height: 65px;
    line-height: 65px;
    background: #FFFAF0;

    .title {
      font-size: 15px;
      font-weight: 600;
      color: #CD853F;
      padding-left: 8px;
    }
  }

  .song-list {
    display: flex;
    flex-wrap: wrap;
    padding: 4px 0;
    background: #FFFAF0;

    .song-item {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      width: 33.3%;
      padding: 0 1%;

      .icon {
        max-width: 100%;
        border-radius: 4px;
      }

      .item-count {
        position: absolute;
        display: inline-block;
        color: #f1f1f1;
        right: 6px;
        top: 5px;

        .icon, .conunt {
          font-size: 12px;
        }
      }

      .song-text {
        height: 50px;
        line-height: 48px;

        .text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 11px;
          font-weight: 700;
        }
      }
    }
  }
}

.loading {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>