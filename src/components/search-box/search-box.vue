<template>
  <div class="search-box">
    <i class="fa fa-search"></i>
    <input
      class="box"
      :placeholder="placeholder"
      v-model="query"
      ref="query"
    >
    <i
      v-show="query"
      class="fa fa-times"
      @click="clear"
    ></i>
  </div>
</template>

<script>
import { debounce } from 'common/util'
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    // 清空搜索框
    clear () {
      this.query = ''
    },
    // 当点击热门搜索的关键词 关键词会同步在 搜索框中
    setQuery (query) {
      this.query = query
    },
    blur () {
      this.$refs.query.blur()
    }
  },
  created () {
    // 监听输入框 输入的 query的变化 触发 query 自定义事件 将新输入的 newquery 传给 search 组件
    this.$watch('query', newquery => {
      // console.log('执行了')
      debounce(this.$emit('query', newquery), 220)
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background: #fffaf0;
  border-radius: 6px;

  .fa-search {
    font-size: 20px;
    color: #636e72;
  }

  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: #636e72;
    color: #fff;
    font-size: $font-size-medium;
    border-radius: 2px;
    padding: 3px 0;

    &::placeholder {
      color: $color-text-d;
    }
  }

  .fa-times {
    font-size: 20px;
    color: #636e72;
  }
}
</style>