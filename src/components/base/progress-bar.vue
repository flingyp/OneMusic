<template>
  <div
    class="progress-bar"
    ref="progressBar"
    @click="progressClick"
  >
    <div class="bar-inner">
      <div
        class="progress"
        ref="progress"
      ></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart="progressTouchStart"
        @touchmove="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    precent: {
      type: Number,
      default: 0
    }
  },
  created () {
    // 存放有关 触摸事件 的数据
    this.touch = {}
  },
  computed: {
    progressBthWidth () {
      return this.$refs.progressBtn.clientWidth
    }
  },
  watch: {
    precent (NewPrecent) {
      if (NewPrecent >= 0 && !this.touch.init) {
        // 进度条的宽度 - 小球的宽度
        const barWidth = this.$refs.progressBar.clientWidth - this.progressBthWidth
        // 音乐播放的比例 * （进度条的宽度 - 小球的宽度） = offset的距离
        const offsetWidth = NewPrecent * barWidth
        this.offsetWidth(offsetWidth)
      }
    }
  },
  methods: {
    progressTouchStart (e) {
      // 触摸开始
      this.touch.init = true
      // 记录刚刚开始时触摸的小球位置
      this.touch.startX = e.touches[0].pageX
      // 记录小球偏移的位置 (小球偏移的位置 = 已经播放部分的进度条的clientWidth)
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove (e) {
      // 触摸过程
      // 没有经过  progressTouchStart函数时 return
      if (!this.touch.init) {
        return
      }
      // 现在触摸的位置 - 刚刚开始时触摸的位置 = 移动了多少的距离
      const deltaX = e.touches[0].pageX - this.touch.startX
      // this.$refs.progressBar.clientWidth - this.progressBthWidth（进度条的宽度 - 小球的宽度）
      // this.touch.left + deltaX  （小球偏移的位置 + 移动了多少距离）
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - this.progressBthWidth, Math.max(0, this.touch.left + deltaX))
      this.offsetWidth(offsetWidth)
    },
    progressTouchEnd () {
      // 触摸结束
      this.touch.init = false
      this.triggerPercent()
    },
    offsetWidth (offsetWidth) {
      // 进度条的宽度 不断变化
      this.$refs.progress.style.width = `${offsetWidth}px`
      // 小球位置 不断变化
      this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
    },
    triggerPercent () {
      // 进度条的宽度 - 小球的宽度
      const barWidth = this.$refs.progressBar.clientWidth - this.progressBthWidth
      // 歌曲已播放部分进度条的宽度 / barWidth = （百分比）
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    },
    progressClick (e) {
      // 获取它的偏移量
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this.offsetWidth(offsetWidth)
      // this.offsetWidth(e.offsetX)
      this.triggerPercent()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background: #fff;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: #ccc;
      }
    }
  }
}
</style>