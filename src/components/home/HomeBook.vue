<template>
  <div class="home-book">
    <div class="home-book-header" v-if="showTitle">{{title}}</div>
    <div class="home-book-content">
      <div class="home-book-row" v-for="(item,index) in bookData" :key="index">
        <div
          class="home-book-col"
          v-for="(book,bookIndex) in item"
          :key="bookIndex"
          :style="{'flex':'0 0 '+(100/col)+'%','width':(100/col)+'%'}"
        >
          <div
            class="book-wrapper"
            :style="{flexDirection:mode===HOME_BOOK_MODE.COL?'column':'row'}"
            @click="onBookClick(book)"
            v-if="(mode===HOME_BOOK_MODE.COL||mode===HOME_BOOK_MODE.ROW) &&!book.isGotoHome"
          >
            <image-view :src="book.cover"></image-view>
            <div class="book-title-wrapper book-title-col" v-if="mode===HOME_BOOK_MODE.COL">
              <div class="book-title">{{book.title}}</div>
            </div>
            <div class="book-title-wrapper book-title-row" v-else>
              <div class="book-title">{{book.title}}</div>
              <div class="book-title-author-wrapper">
                <div class="book-author">{{book.author}}</div>
                <div class="book-category">{{book.categoryText}}</div>
              </div>
            </div>
          </div>
          <div
            class="category-wrapper"
            @click="onCategoryClick(book)"
            v-if="mode===HOME_BOOK_MODE.CATEGORY"
          >
            <div class="category-text">{{book.text}}</div>
            <div class="category-num">{{book.num}}本书</div>
            <div class="category-img-wrapper">
              <div class="category-img1">
                <image-view :src="book.cover"></image-view>
              </div>
              <div class="category-img2">
                <image-view :src="book.cover2"></image-view>
              </div>
            </div>
          </div>
          <div
            class="shelf-book-add"
            v-if="mode===HOME_BOOK_MODE.COL&&book.isGotoHome"
            @click="gotoHome"
          >
            <div class="shelf-book-add-wrapper">
              <div class="shelf-book-add-x"></div>
              <div class="shelf-book-add-y"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-book-footer" v-if="showBtn" @click="onMoreClick">
      <van-button round custom-class="home-book-btn">{{btnText}}</van-button>
      <!-- custom-class 添加自定义的class -->
    </div>
  </div>
</template>

<script>
import { HOME_BOOK_MODE, CATEGORY } from "../../utils/const";
import ImageView from "../base/ImageView";
export default {
  components: { ImageView },
  props: {
    title: String,
    data: {
      type: Array,
      default: []
    },
    btnText: String,
    row: {
      type: Number,
      default: 0
    },
    col: {
      type: Number,
      default: 1
    },
    mode: {
      type: String,
      default: HOME_BOOK_MODE.ROW
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    linearBg: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    HOME_BOOK_MODE() {
      return HOME_BOOK_MODE;
    },
    CATEGORY() {
      return CATEGORY;
    },
    bookData() {
      const { data, row, col } = this;
      if (data && data.length > 0) {
        //显示的总数
        if (this.data) {
          this.data.forEach(book => {
            if (book.isGotoHome) {
              return;
            }
            book.text = CATEGORY[book.categoryText.toLowerCase()];
          });
        }
        const number = row * col;
        //获取显示总数大小的数组
        const _bookData = data.slice(0, number);
        const _bookDataRow = [];
        let _row = 0;
        while (_row < row) {
          // 0 2 == 0,2
          //1 2  == 2,4
          _bookDataRow.push(
            _bookData.slice(_row * col, Number(_row * col) + Number(col))
          );
          _row++;
        }
        return _bookDataRow;
      } else {
        return [];
      }
    }
  },
  methods: {
    gotoHome() {
      this.$router.push({
        path: "/pages/index/main"
      });
    },
    onMoreClick() {
      this.$emit("onMoreClick");
    },
    onBookClick(book) {
      this.$emit("onBookClick", book);
    },
    onCategoryClick(book) {
      this.$emit("onCategoryClick", book);
    }
  }
};
</script>

<style lang="scss" scoped>
.home-book {
  .home-book-header {
    padding: 13px 0 0 20.5px;
  }
  .home-book-content {
    padding: 0 12px;
    margin-top: 10.5px;
    box-sizing: border-box;
    .home-book-row {
      display: flex;
      flex-flow: row nowrap;
      margin-top: 12px;
      .home-book-col {
        padding: 0 8px;
        box-sizing: border-box;
        .shelf-book-add {
          width: 100%;
          height: 145px;
          border: 1px solid #cbcbcb;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;

          .shelf-book-add-wrapper {
            position: relative;
            width: 30px;
            height: 30px;

            .shelf-book-add-x {
              position: absolute;
              top: 50%;
              width: 30px;
              height: 2px;
              margin-top: -1px;
              background: #cacaca;
            }

            .shelf-book-add-y {
              position: absolute;
              left: 50%;
              width: 2px;
              height: 30px;
              background: #cacaca;
            }
          }
        }
        // flex: 1;
        .book-wrapper {
          display: flex;
          .book-title-wrapper {
            flex: 1;
            &.book-title-col {
              .book-title {
                font-size: 12px;
                color: #212731;
                line-height: 16.5px;
                max-height: 33px;
                font-weight: 500;
                overflow: hidden;
                //单词溢出时换行
                word-break: break-word;
              }
            }
            &.book-title-row {
              flex: 0 0 50%;
              width: 50%;
              padding: 10px;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .book-title {
                font-size: 14px;
                color: #1f1f1f;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                //文字高度两行
                -webkit-line-clamp: 3;
                overflow: hidden;
                // line-height: 18px;
                // max-height: 36px;
              }
              .book-title-author-wrapper {
                .book-author,
                .book-category {
                  font-size: 12px;
                  color: #868686;
                  line-height: 14px;
                  max-height: 14px;
                  font-weight: 500;
                  overflow: hidden;
                  //单词溢出时换行
                  // word-break: break-word;
                }
              }
            }
          }
        }
        .category-wrapper {
          position: relative;
          display: flex;
          background: #f8f9fb;
          border-radius: 10px;
          height: 96px;
          padding: 13px 0 14.5px 16px;
          box-sizing: border-box;
          flex-direction: column;
          justify-content: space-between;
          .category-text {
            color: #212832;
            font-size: 16px;
            line-height: 22.5px;
            width: 75px;
            height: 45px;
            //省略号
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-word;
          }
          .category-num {
            color: #868686;
            font-size: 12px;
            line-height: 16.5px;
          }
          .category-img-wrapper {
            position: absolute;
            right: 0;
            bottom: -5px;
            .category-img1 {
              position: absolute;
              right: 0;
              bottom: -5px;
              z-index: 100;
              width: 48px;
            }
            .category-img2 {
              position: absolute;
              right: 30px;
              bottom: 0;
              z-index: 90;
              width: 36px;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
//添加组件库样式要放在全局下
.category-img1 {
  .image {
    border-radius: 0 0 10px 0;
  }
}
.home-book-footer {
  padding: 12px 20px 20px;
  .home-book-btn {
    width: 100%;
    font-size: 14px;
    color: #3696ef;
    border: 1px solid #edeeee;
  }
}
</style>