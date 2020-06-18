<template>
  <div class="auth-wrapper">
    <div class="auth-inner-wrapper">
      <div class="auth-info-wrapper">
        <div class="auth-img">
          <image-view
            src="https://www.youbaobao.xyz/mpvue-res/logo.jpg"
            height="100%"
            mode="scaleToFill"
            round
          ></image-view>
        </div>
        <div class="auth-title">登录小慕读书</div>
        <div class="auth-sub-title">全球好书免费读</div>
      </div>
      <button class="auth-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">授权登录</button>
    </div>
  </div>
</template>

<script>
import ImageView from "./ImageView";
export default {
  components: {
    ImageView
  },
  methods: {
    getUserInfo() {
      this.$emit("getUserInfo");
    }
  }
};
</script>

<style lang="scss">
.auth-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #999;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  .auth-inner-wrapper {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.3);
    position: relative;
    width: 270px;
    height: 248px;
    background: #f5f5f5;
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    .auth-info-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .auth-img {
        width: 74px;
        height: 74px;
      }
      .auth-title {
        margin-top: 10px;
        font-size: 13px;
        color: #999;
        line-height: 18.5px;
      }
      .auth-sub-title {
        margin-top: 5px;
        font-size: 16px;
        color: #333;
        font-weight: 400;
        line-height: 22.5px;
      }
    }
    .auth-btn {
      flex: 0 0 50px;
      width: 100%;
      border-bottom-left-radius: 18px;
      border-bottom-right-radius: 18px;
      color: #fff;
      font-size: 15px;
      background-image: linear-gradient(90deg, #1ea3f5 0%, #0f87fc 100%);
      border-radius: 0 0 18px 18px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>