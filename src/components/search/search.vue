<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box
        ref="searchBox"
        @query="onQueryChange"
      ></search-box>
    </div>
    <div
      class="shortcut-wrapper"
      v-show="!query"
    >
      <div class="shortcut">
        <div class="hot-key">
          <h1 class=title>热门搜索</h1>
          <ul>
            <li
              @click="addQuery(item.first)"
              class="item"
              v-for="(item, index) in hots"
              :key="index"
            >
              <span>{{item.first}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      class="search-result"
      v-show="query"
    >
      <suggest :query="query"></suggest>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from 'components/search-box/search-box'
import axios from 'axios'
import Suggest from 'components/suggest/suggest'
export default {
  data () {
    return {
      // 热门搜索数据
      hots: [],
      query: ''
    }
  },
  created () {
    // 请求热门搜索数据
    this._getHotKey()
  },
  components: {
    SearchBox,
    Suggest
  },
  methods: {
    _getHotKey () {
      axios.get('api/search/hot').then(res => {
        if (res.status === 200) {
          this.hots = res.data.result.hots
        }
      })
    },
    // 当点击热门搜索的关键词 关键词会同步在 搜索框中
    addQuery (query) {
      // 调用 searchBox 组件的 setQuery 事件 传过去的query参数为关键词
      this.$refs.searchBox.setQuery(query)
    },
    onQueryChange (newquery) {
      this.query = newquery
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';
@import '~assets/stylus/mixin';

.search {
  .search-box-wrapper {
    padding: 20px 20px 10px 20px;
    background: #fffaf0;
  }

  .shortcut-wrapper {
    position: fixed;
    top: 155px;
    bottom: 0;
    width: 100%;
    background: #fffaf0;

    .shortcut {
      height: 100%;
      overflow: hidden;

      .hot-key {
        margin: 0 20px 20px 20px;

        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: #757575;
        }

        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          font-size: $font-size-medium;
          color: #2d3436;
        }
      }

      .search-history {
        position: relative;
        margin: 0 20px;

        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;

          .text {
            flex: 1;
          }

          .clear {
            extend-click();

            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
  }

  .search-result {
    position: fixed;
    width: 100%;
    top: 155px;
    bottom: 0;
  }
}
</style>