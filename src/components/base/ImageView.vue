<template>
  <div class="image-view" @click="onClick" :style="{ height }">
    <img
      :src="src"
      :class="round?'round image':'image'"
      :style="{height}"
      :mode="mode"
      :lazy-load="lazyLoad"
      @load="onLoad"
      @error="onError"
      v-show="!isLoading&&!error"
    />
    <img
      src="https://www.youbaobao.xyz/book/img/loading2.ae9e5924.jpeg"
      :class="round?'round image':'image'"
      :style="{height}"
      :mode="mode"
      :lazy-load="lazyLoad"
      v-show="isLoading||error"
      v-if="mpvuePlatform==='wx'"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, default: "" },
    mode: { type: String, default: "widthFix" }, //默认根据宽度自适应
    lazyLoad: {
      type: Boolean,
      default: true
    },
    //是否是圆形图片
    round: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: "auto"
    }
  },
  watch: {
    src(newValue, preValue) {
      if (newValue && newValue.length > 0 && newValue !== preValue) {
        this.$nextTick(() => {
          this.isLoading = true;
          this.error = false;
        });
      }
    }
  },
  data() {
    return {
      isLoading: true,
      error: false
      //当isLoading为true时表示还在加载中，展示占位符
      //当error为true时表示图片加载失败，展示占位符
    };
  },
  methods: {
    onCLick() {
      this.$emit("onClick");
    },
    onLoad() {
      //图片加载成功时
      this.isLoading = false;
      this.error = false;
      if (this.src == "") {
        this.error = true;
      }
    },
    onError() {
      this.isLoading = false;
      this.error = true;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.image-view {
  width: 100%;
  .image {
    width: 100%;
    &.round {
      border-radius: 50%;
    }
  }
}
</style>