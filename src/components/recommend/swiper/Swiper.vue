<template>
  <div
    class="Swiper"
    :data="Data"
    v-if="Data.length"
  >
    <div>
      <swiper
        class="swiper"
        :options="swiperOption"
        ref="mySwiper"
      >
        <swiper-slide
          v-for="item in this.Data"
          :key="item.bannerId"
        >
          <a href="https://music.163.com/">
            <img
              class="swiper-img"
              :src="item.pic"
              alt=""
            >
          </a>
        </swiper-slide>
        <div
          class="swiper-pagination"
          slot="pagination"
        ></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SwiperImg',
  data () {
    return {
      swiperOption: {
        autoplay: 2100,
        grabCursor: true,
        loop: true,
        // 当用户操作了轮播图后 是否停止 autoplay
        autoplayDisableOnInteraction: false,
        pagination: '.swiper-pagination'
      },
      // 轮播图数据
      Data: {},
      type: 2
    }
  },
  mounted () {
    setTimeout(() => {
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
        this.Data = res.data.banners
        // console.log(this.Data)
      }
    }
  }

}
</script>

<style lang="stylus" scoped>
.Swiper >>>.swiper-pagination-bullet-active {
  background: #FD6C62 !important;
}

.Swiper {
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 38.88%;
  background: rgb(231, 23, 23);
  padding-top: 8px;

  .swiper-img {
    width: 100%;
    background: #eeeeee;
    border-radius: 2px;
  }
}
</style>