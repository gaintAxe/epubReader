<template>
  <div class="detail-rate">
    <span class="detail-rate-text">轻点评分</span>
    <div class="detail-rate-wrapper">
      <van-rate
        :value="rateValue"
        :size="25"
        color="#1D89EE"
        void-color="#DEE0E2"
        void-icon="star"
        @change="onRateChange"
        :disabled="disabled"
        :readonly="disabled"
        disabled-color="red"
      ></van-rate>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rateValue: Number
  },
  methods: {
    data() {
      return {
        disabled: false
      };
    },
    onRateChange(e) {
      this.$emit("onRateChange", e.mp.detail);
      this.changeDisbaled(true)
    },
    changeDisbaled(value) {
      this.disabled = value;
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-rate {
  display: flex;
  padding: 10px 0;
  margin: 0 15px;
  align-items: center;
  border-bottom: 1px solid #ebebeb;

  .detail-rate-text {
    font-size: 14px;
    color: #909090;
  }

  .detail-rate-wrapper {
    flex: 1;
    text-align: right;
  }
}
</style>