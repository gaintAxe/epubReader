<template>
  <div class="detail-bottom" v-if="!loading">
    <div class="detail-btn-wrapper">
      <van-button
        :custom-class="isInShelfOwn ? 'detail-btn-remove' : 'detail-btn-shelf'"
        round
        @click="handleShelf"
      >{{isInShelfOwn==true ? '移出书架' : '加入书架'}}</van-button>
    </div>
    <div class="detail-btn-wrapper">
      <van-button custom-class="detail-btn-read" round @click="() => readBook()">阅读</van-button>
    </div>
  </div>
</template>

<script>
import {store} from '../../store/index'
export default {
  computed: {
    isInShelfOwn() {
      return store.state.isInShelf;
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    handleShelf() {
      this.$emit("handleShelf");
    },
    readBook() {
      this.$emit("readBook");
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-top: 1px solid #eee;
  box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.1);

  .detail-btn-wrapper {
    flex: 1;
  }
}
</style>

<style lang="scss">
.detail-bottom {
  .detail-btn-read {
    width: 100%;
    border: none;
    color: #fff;
    background: #1ea3f5;
    margin-left: 7.5px;
  }

  .detail-btn-shelf {
    width: 100%;
    color: #1ea3f5;
    background: #fff;
    border: 1px solid #1ea3f5;
    margin-right: 7.5px;
  }

  .detail-btn-remove {
    width: 100%;
    color: #f96128;
    background: rgba(255, 175, 155, 0.3);
    border: 1px solid #ffaf9b;
    margin-right: 7.5px;
  }
}
</style>
