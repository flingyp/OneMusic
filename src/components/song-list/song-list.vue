<template>
  <div class="song-list">
    <div class="all">
      <i class="iconfont">&#xe60f;</i>
      <i>播放全部(共{{songs.length}}首)</i>
    </div>
    <ul>
      <li
        class="item"
        v-for="(song,index) in songs"
        :key="song.id"
        @click="selectItem(song, index)"
      >
        <div class="content">
          <div class="IndexName">
            <span class="number">{{index+1}}</span>
            <span class="name">{{song.name }}</span>
          </div>
          <div class="SongName">
            <span class="desc">{{song.singer}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SongList',
  props: {
    songs: {
      type: Array
    }
  },
  methods: {
    selectItem (item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>

<style lang="stylus" scoped>
.song-list {
  background: #f2f3f4;

  .all {
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 0 0 0 16px;

    i {
      font-size: 17px;
      font-weight: 600;
      padding: 0 1px;
    }
  }

  .item {
    width: 100%;
    height: 65px;
    // line-height: 65px;
    padding: 0 0 0 16px;
    font-size: 16px;
    color: #2e3030;
    letter-spacing: 0.5px;
    border-top: 1px solid #ccc;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;

    .content {
      width: 100%;
      height: 100%;

      .IndexName {
        padding: 14px 0 0 0;
        font-size: 16px;

        .number {
          color: #757575;
          font-size: 16px;
          padding: 10px 10px 0 0;
        }

        .name {
          font-weight: 700;
        }
      }

      .SongName {
        padding: 12px 0 0 26px;
        color: #757575;
        font-size: 12px;
        font-weight: 700;
      }
    }
  }
}
</style>