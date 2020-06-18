<template>
  <div>
    <detail-book :book="data"></detail-book>
    <detail-start :book="data"></detail-start>
    <detail-rate :rateValue="data.rateValue" @onRateChange="onDetailRateChange" ref="detailRate"></detail-rate>
    <detail-contents :contents="contents" @readBook="onDetailReadBook"></detail-contents>
    <detail-bottom
      :isInShelf="isInShelf"
      @handleShelf="addToShelf"
      ref="detailBottom"
      @readBook="onDetailReadBook"
    ></detail-bottom>
  </div>
</template>

<script>
import {
  bookDetail,
  bookRankSave,
  bookContents,
  bookisInShelf,
  bookshelfSave,
  bookshelfRemove
} from "../../api/index";
import { getStorageSync, setNavigationBarTitle } from "../../api/weChat";
import DetailBook from "../../components/detail/DetailBook";
import DetailStart from "../../components/detail/DetailStart";
import DetailRate from "../../components/detail/DetailRate";
import DetailContents from "../../components/detail/DetailContents";
import DetailBottom from "../../components/detail/DetailBottom";
import { store } from "../../store/index";
export default {
  components: {
    DetailBook,
    DetailStart,
    DetailRate,
    DetailContents,
    DetailBottom
  },
  data() {
    return {
      data: {},
      contents: [],
      isInShelf: false,
      loading: false
    };
  },
  computed: {
    isInShelfComputed() {
      return this.isInShelf;
    }
  },
  methods: {
    //根据路由传参获取书籍信息
    getBookDetail() {
      const { fileName } = this.$route.query;
      const openId = getStorageSync("openId");
      if (openId && fileName) {
        bookDetail({ fileName, openId }).then(response => {
          if (response && response.data && response.data.error_code === 0) {
            this.data = response.data.data;
          }
        });
      }
    },
    //根据filename获取书籍目录
    getBookContents() {
      const { fileName } = this.$route.query;
      this.contents = null;
      bookContents({ fileName }).then(response => {
        if (response && response.data && response.data.error_code === 0) {
          this.contents = response.data.data;
          this.$forceUpdate();
        }
      });
    },
    //评分
    onDetailRateChange(value) {
      const { fileName } = this.$route.query;
      const openId = getStorageSync("openId");
      bookRankSave({ fileName, openId, rank: value }).then(response => {
        if (response && response.data && response.data.error_code === 0) {
          this.getBookDetail();

          // this.$refs.detailRate.changeDisbaled(true)
        }
      });
    },
    //目录点击事件
    onDetailReadBook(href) {
      if(href){
        const index = href.indexOf('/')
        if(index>=0){
          href = href.slice(index+1)
        }
      }
      console.log(href, this.data);
      if (this.data && this.data.fileName) {
        this.$router.push({
          path: "/pages/read/main",
          query: {
            opf: this.data.opf,
            fileName: this.data.fileName,
            navigation:href
          }
        });
      }
    },
    //当前书籍是否在书架中
    getBookisInShelf() {
      this.$refs.detailBottom.loading = true;
      const { fileName } = this.$route.query;
      const openId = getStorageSync("openId");
      bookisInShelf({
        openId,
        fileName
      })
        .then(response => {
          this.$refs.detailBottom.loading = false;

          let { data } = response.data;

          if (data.length > 0) {
            store.dispatch("setIsInShelf", true);
          } else {
            store.dispatch("setIsInShelf", false);
          }
        })
        .catch(() => {
          this.$refs.detailBottom.loading = false;
        });
    },
    //加入书架
    addToShelf() {
      this.$refs.detailBottom.loading = true;
      const { fileName } = this.$route.query;
      const openId = getStorageSync("openId");
      if (!store.state.isInShelf) {
        // 加入书架
        bookshelfSave({ openId, fileName })
          .then(response => {
            this.$refs.detailBottom.loading = false;
            this.getBookisInShelf();
          })
          .catch(() => {
            this.$refs.detailBottom.loading = false;
          });
      } else {
        //从书架移除
        let that = this;
        mpvue.showModal({
          title: "提示",
          content: `是否将《${this.data.title}》移除书架`,
          success(res) {
            if (res.confirm) {
              bookshelfRemove({ openId, fileName })
                .then(response => {
                  that.$refs.detailBottom.loading = false;
                  that.getBookisInShelf();
                })
                .catch(() => {
                  that.$refs.detailBottom.loading = false;
                  that.getBookisInShelf();
                });
            } else {
              that.$refs.detailBottom.loading = false;
            }
          }
        });
      }
    }
  },
  mounted() {
    setNavigationBarTitle("详情");
    this.getBookDetail();
    this.getBookContents();
    this.getBookisInShelf();
  }
};
</script>

<style lang="scss" scoped>
</style>
