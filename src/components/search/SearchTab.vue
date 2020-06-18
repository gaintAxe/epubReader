<template>
  <div class="search-tab-wrapper">
    <div class="search-table-inner">
      <div
        class="search-table-booke"
        v-for="(book,index) in data"
        :key="index"
        @click="onClick(book)"
      >
        <div class="book-img-wrapper">
          <div class="book-img">
            <image-view :src="book.cover"></image-view>
          </div>
        </div>
        <div class="book-info-wrapper">
          <div class="book-title">{{book.title}}</div>
          <div class="book-author">{{book.author}}</div>
          <div class="book-category">{{book.categoryText}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageView from "../base/ImageView";
export default {
  components: { ImageView },
  props: {
    data: Array
  },
  methods: {
    onClick(book) {
      this.$emit("onClick", book);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-tab-wrapper {
  padding: 0 16px;
  box-sizing: border-box;
  width:100%;
  .search-table-inner {
    .search-table-booke {
      margin: 14.5px 0;
      width:100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .book-img-wrapper {
        flex: 0 0 47px;
        width: 47px;
        .book-img {
          width: 47px;
          height: 68.5px;
        }
      }
      .book-info-wrapper {
        flex: 1;
        width:70%;
        margin-left:15.5px;
        box-sizing: border-box;
        .book-title {
          color: #333;
          font-size: 16px;
          line-height: 22.5px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-weight: 500;
        }
        .book-author {
          color: rgba(0, 0, 0, 0.65);
          font-size: 13px;
          line-height: 18px;
          margin-top:5px;
        }
        .book-category {
          color: rgba(0, 0, 0, 0.45);
          font-size: 13px;
          line-height: 18px;
        }
      }
    }
  }
}
</style>