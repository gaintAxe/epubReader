<template>
  <div class="tag-wrapper" @click="onClick">
    <div class="tag">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      defalut: ""
    }
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-wrapper {
  display: flex;
  justify-content: center;
  background: #f5f7f9;
  border-radius: 16px;
  padding: 6px 17px;
  .tag {
    width: 100%;
    overflow: hidden;
    //文本不换行
    white-space: nowrap;
    //超出省略号
    text-overflow: ellipsis;
    font-size: 14px;
    color: #272e37;
  }
}
</style>