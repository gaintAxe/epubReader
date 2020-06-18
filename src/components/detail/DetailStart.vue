<template>
  <div class="detail-stat">
    <div class="detail-stat-l">
      <div class="detail-stat-rate-wrapper">
        <span class="detail-stat-rate">评分</span>
        <van-rate
          :value="rankAvg"
          :size="16"
          color="#717882"
          void-color="#DEE0E2"
          void-icon="star"
          allow-half="true"
        ></van-rate>
      </div>
      <div class="detail-stat-rate-hint">{{rankNum}}人点评</div>
    </div>
    <div class="detail-stat-r">
      <div class="detail-stat-num-wrapper">
        <span class="detail-stat-num">{{readerNum}}</span>
        次访问
      </div>
      <div class="detail-stat-readers">
        <div class="detail-stat-readers-avatar" v-for="(item,index) in readers" :key="index">
          <ImageView
            :src="item.avatarUrl"
            v-if="item.avatarUrl"
            mode="scaleToFill"
            height="100%"
            round
          ></ImageView>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageView from "../base/ImageView";
export default {
  components: { ImageView },

  computed: {
    readers() {
      if (this.book && this.book.readers) {
        let book = this.book.readers.filter(item => {
          return item.avatarUrl !== undefined && item.avatarUrl !== null;
        });

        return book;
      } else {
        return [];
      }
    },
    readerNum() {
      return (this.book && this.book.readerNum) || 0;
    },
    rankAvg() {
      return (this.book && this.book.rankAvg) || 0;
    },
    rankNum() {
      return (this.book && this.book.rankNum) || 0;
    }
  },
  props: {
    book: Object
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.detail-stat {
  display: flex;
  padding: 10px 15px;
  height: 80px;
  box-sizing: border-box;

  .detail-stat-l {
    flex: 0 0 50%;
    width: 50%;
    box-sizing: border-box;
    height: 100%;
    border-right: 1px solid #cdcdcd;

    .detail-stat-rate-wrapper {
      display: flex;
      align-items: center;
      height: 50%;

      .detail-stat-rate {
        font-size: 24px;
        color: #5e5e5e;
      }
    }

    .detail-stat-rate-hint {
      height: 50%;
      display: flex;
      align-items: center;
      font-size: 11px;
      color: #99a0aa;
    }
  }

  .detail-stat-r {
    flex: 0 0 50%;
    width: 50%;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .detail-stat-num-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #868686;

      .detail-stat-num {
        font-size: 24px;
        color: #5e5e5e;
        margin-right: 5px;
      }
    }

    .detail-stat-readers {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #909090;

      .detail-stat-readers-avatar {
        width: 25px;
        height: 25px;
        margin-left: -8px;
        border-radius: 50%;
        border: 1px solid #ccc;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);

        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
}
</style>