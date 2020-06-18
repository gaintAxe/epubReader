<template>
  <div>
    <search-tabs :data="data" v-if="data&&data.length>0" @onClick="onBookClickInList"></search-tabs>
  </div>
</template>

<script>
import SearchTabs from "../../components/search/SearchTab";
import { bookSearchList } from "../../api/index";
import { setNavigationBarTitle, showToast } from "../../api/weChat";
import { store } from "../../store/index";
export default {
  data() {
    return {
      data: [],
      page: 1
    };
  },
  components: { SearchTabs },
  methods: {
    //书籍点击事件
    onBookClickInList(book) {
      console.log("onBookClickInList", book);
      this.$router.push({
        path: "/pages/detail/main",
        query: {
          // openId:this.openId,
          fileName: book.fileName
        }
      });
    },
    getBookSearchList(isNor = false) {
      if (isNor) {
        this.data = [];
        this.page = 1;
      }
      const { text, key } = this.$route.query;
      bookSearchList({
        [key]: text,
        page: this.page
      }).then(response => {
        const { data } = response.data;
        if (data.length > 0) {
          this.data.push(...data);
          this.page++;
        } else {
          if (this.data.length === 0) {
          } else {
            showToast("没有更多数据了");
          }
        }
      });
    }
  },
  mounted() {
    const { text, key, title } = this.$route.query;
    this.getBookSearchList(true);
    // setNavigationBarTitle(store.state.keyword);
    setNavigationBarTitle(title);
  },
  onReachBottom() {
    this.getBookSearchList();
  }
};
</script>

<style>
</style>