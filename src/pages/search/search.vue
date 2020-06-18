<template>
  <div @click="BodyClick" ref="searchBody">
    <search-bar
      :disabled="false"
      @onClick="onSearchBarClick"
      :hot-search="hotSearch"
      :focus="focus"
      @onChange="onChange"
      @onConfirm="onConfirm"
      @onClear="onClear"
      ref="searchBar"
    ></search-bar>
    <div class="tag-group-wrapper" v-if="!showList && hotSearchTag.length!==0">
      <tag-group
        :value="hotSearchTagTitleArray"
        header-text="热门搜索"
        btn-text="换一批"
        @onTagClick="(text,index)=>{showTagDetail(text,index,'hot')}"
        @onBtnClick="changeHotSearch"
      ></tag-group>
    </div>
    <div class="tag-group-wrapper his-wrapper" v-if="!showList && hisSearchTag.length!==0">
      <tag-group
        :value="hisSearchTag"
        header-text="历史搜索"
        btn-text="清空"
        @onTagClick="(text,index)=>{showTagDetail(text,index,'history')}"
        @onBtnClick="clearHistorySearch"
      ></tag-group>
    </div>

    <search-list :data="searchList" @onBookCLick="onBookCLick" v-if="showList"></search-list>
  </div>
</template>

<script>
import TagGroup from "../../components/base/TagGroup";
import SearchList from "../../components/search/SearchList";
import SearchBar from "../../components/home/SearchBar";
import { getStorageSync, setStorageSync, showToast } from "../../api/weChat";
import { search, hotSearch } from "../../api/index";
import { store } from "../../store/index";
const KEY_HSITORY_SERCH = "historySearch";
export default {
  components: { TagGroup, SearchList, SearchBar },
  computed: {
    showList() {
      if (!this.searchList.author) {
        return Object.keys(this.searchList).length > 0;
      } else {
        let authorLen = this.searchList.author.length;
        let categoryLen = this.searchList.category.length;
        let publisherLen = this.searchList.publisher.length;
        let bookLen = this.searchList.book.length;
        return (
          authorLen > 0 || categoryLen > 0 || publisherLen > 0 || bookLen > 0
        );
      }
    },
    hotSearchTagTitleArray() {
      const _hotSearch = [];
      this.hotSearchTag.forEach(o => {
        _hotSearch.push(o.title);
      });
      return _hotSearch;
    }
  },
  data() {
    return {
      hotSearch: "",
      focus: false,
      hotSearchTag: ["aaaa", "bbbb", "cccc", "ssssssssssssssssssss"],
      hisSearchTag: [],
      searchList: {},
      openId: "",
      curPage: 1
    };
  },
  methods: {
    //清除历史记录
    clearHistorySearch() {
      this.hisSearchTag = [];
      setStorageSync(KEY_HSITORY_SERCH, this.hisSearchTag);
    },
    //换一批点击事件
    changeHotSearch() {
      hotSearch().then(response => {
        if (response && response.data && response.data.error_code == 0) {
          this.hotSearchTag = [];
          this.hotSearchTag = response.data.data;
        }
      });
    },
    //搜索结果图书点击事件
    onBookCLick(book) {
      console.log("onBookCLick", book);
      this.$router.push({
        path: "/pages/detail/main",
        query: {
          // openId:this.openId,
          fileName: book.fileName
        }
      });
    },

    //点击键盘搜索按钮触发
    onConfirm(keyword, isUpdateSearchData = false) {
      //切换为搜索结果;
      this.focus = false;
      if (!keyword || keyword.trim().length === 0) {
        keyword = this.hotSearch;
        this.$refs.searchBar.setValue(keyword);
        if (!keyword || keyword.trim().length === 0) {
          return;
        }
      }
      if (isUpdateSearchData) {
        this.$refs.searchBar.setValue(keyword);
      }
      this.onSearch(keyword).then(() => {
        //历史记录修改
        this.hisSearchTag = this.hisSearchTag.filter(i => {
          return i !== keyword;
        });
        this.hisSearchTag.unshift(keyword);
        this.hisSearchTag = this.hisSearchTag.filter((i, index) => {
          return index < 10;
        });
        setStorageSync(KEY_HSITORY_SERCH, this.hisSearchTag);
      });
    },
    //请求获取信息
    onSearch(keyword) {
      // //全局保存keyword 作为结果列表的标题
      // store.dispatch("setKeyword", keyword);
      let page = this.curPage;
      return search({
        openId: this.openId,
        keyword,
        page
      })
        .then(response => {
          if (response && response.data && response.data.error_code == 0) {
            if (this.curPage == 1) {
              const { book, author, category, publisher } = response.data.data;
              this.searchList = response.data.data;
              if (!this.showList) {
                // mpvue.showToast({
                //   title: "未搜索到结果",
                //   duration: 2000
                // });
                this.searchList = {};
              } else {
                this.curPage++;
              }
            } else {
              const { book } = response.data.data;
              if (book.length !== 0) {
                this.searchList.book = [...this.searchList.book, ...book];
                this.curPage++;
              } else {
                showToast("没有更多数据了");
              }
            }
          }
        })
        .catch(() => {
          this.searchList = {};
        });
    },
    //input的内容变化时触发
    onChange(keyword) {
      this.curPage = 1;
      this.searchList = {};
      this.onSearch(keyword).then(() => {});
    },
    onClear() {
      this.focus = false;
      this.searchList = {};
      this.curPage = 1;
    },
    //热门搜索词标签点击事件
    showTagDetail(text, index, type) {
      //   this.hotSearch = text;
      // this.$refs["searchBar"].setValue(text);
      // this.$refs["searchBar"].onConfirm(text);
      this.onConfirm(text, true);
    },
    //点击input搜索框获取焦点
    onSearchBarClick(e) {
      this.focus = true;
    },
    //点击屏幕取消searchBar的focus
    BodyClick() {
      this.focus = false;
    }
  },
  mounted() {
    this.openId = getStorageSync("openId");
    this.changeHotSearch();
    this.hotSearch = this.$route.query.hotSearch;
    this.hisSearchTag = getStorageSync(KEY_HSITORY_SERCH) || [];
  },
  onPageScroll(e) {
    //滚动条滑动
    this.focus = false;
  },
  onReachBottom() {
    let keyword = this.$refs.searchBar.getValue();
    if (keyword && this.showList) {
      this.onSearch(keyword).then(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-group-wrapper {
  //   padding: 10px 0;
  padding-top: 35px;
  &.his-wrapper {
    padding-bottom: 35px;
  }
}
</style>