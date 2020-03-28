<template>
  <div class="singer">
    <list-view
      @select="selectSinger"
      :data="singers"
    ></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import pinyin from 'pinyin'
import Singer from '../../common/singer.js'
import ListView from 'components/base/listview'
import { mapMutations } from 'vuex'
const HOTname = '热门'
const HOTsingers = 15
export default {
  name: 'Singer',
  data () {
    return {
      // 处理过后的歌手数据
      singers: []
    }
  },
  components: {
    ListView
  },
  created () {
    this.getSingerList()
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    // 获取请求歌手数据
    getSingerList () {
      axios.get('/top/artists', {
        params: {
          limit: 150
        }
      }).then(this.SingerList).catch(function (err) {
        console.log(err)
      })
    },
    // 得到歌手数据
    SingerList (res) {
      // 添加歌手名字 首拼音字母
      if (res.status === 200) {
        // console.log(res)
        let singer = res.data.artists
        singer.map(item => {
          let py = pinyin(item.name[0], {
            style: pinyin.STYLE_FIRST_LETTER
          })
          item.py = py[0][0].toUpperCase()
        })
        // 对数据进一步处理
        this.singers = this.normalizeSinger(singer)
      }
    },
    // 对歌手数据进行处理
    normalizeSinger (list) {
      // 存放热门歌手
      let map = {
        hot: {
          title: HOTname,
          items: []
        }
      }
      // 获得热门歌手数据 处理
      list.forEach((item, index) => {
        if (index < HOTsingers) {
          map.hot.items.push(new Singer({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url,
            aliaName: item.alias.join(' / ')
          }))
        }
        // 处理 不是热门歌手的数据
        const key = item.py
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.id,
          name: item.name,
          avatar: item.img1v1Url,
          aliaName: item.alias[0]
        }))
      })

      // 热门处理过后的数据 再处理变成有序的对象
      let hot = []
      let ret = []
      for (const key in map) {
        let val = map[key]
        if (val.title.match(/[A-Z]/)) {
          ret.push(val)
        } else if (val.title === HOTname) {
          hot.push(val)
        }
      }
      // 对 不是热门歌手 进行排序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    selectSinger (singer) {
      // console.log(singer)
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      // 把singer数据存放在 vuex的 state中
      this.setSinger(singer)
    }
  }
}
</script>

<style lang="stylus" scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>