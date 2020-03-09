<template>
  <div
    class="search-list"
    v-show="searches.length"
  >
    <ul>
      <li
        class="search-item"
        v-for="(item, index) in searches"
        :key="index"
        @click="selectItem(item)"
      >
        <span class=text>{{item}}</span>
        <span
          class="icon"
          @click.stop="deleteOne(item)"
        >
          <i class="fa fa-times"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    searches: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    },
    deleteOne (item) {
      this.$emit('delete', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.search-list {
  .search-item {
    display: flex;
    align-items: center;
    height: 40px;

    .text {
      flex: 1;
      color: #000;
    }

    .icon {
      extend-click();

      .fa-times {
        font-size: $font-size-small;
        color: #ccc;
      }
    }
  }
}
</style>