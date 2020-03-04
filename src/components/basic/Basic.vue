<template>
  <div class="basic">
    <!-- header头部部分 -->
    <div class="header">
      <div class="iconfont header-icon">
        &#xe62b;
      </div>
      <div class="header-title">
        <router-link
          to="/"
          class="recommend"
          tag="span"
        >ONEMUSIC</router-link>
      </div>
      <div class="iconfont header-search">&#xe710;</div>
    </div>

    <!-- router导航部分 -->
    <div class="router">
      <div class="router-content">
        <router-link
          to="/recommend"
          class="recommend"
          tag="div"
        >推荐</router-link>
        <router-link
          to="/rank"
          class="rank"
          tag="div"
        >排行</router-link>
        <router-link
          to="/singer"
          class="singer"
          tag="div"
        >热门歌手</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Basic'
}
</script>

<style lang="stylus" scoped>
.basic {
  background: rgb(231, 23, 23);
}

.header {
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  padding: 8px 8px;

  .header-icon, .header-search, .header-title {
    font-size: 21px;
  }

  .header-title {
    font-family: TitleFont;
  }
}

.router {
  padding: 16px 0px;

  .router-content {
    display: flex;
    justify-content: space-around;

    .recommend, .rank, .singer {
      font-size: 17px;
      color: #ffffff;
    }
  }
}
</style>