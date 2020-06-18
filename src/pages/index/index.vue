<template>
  <div class="index-wrapper">
    <div @click="changeFouce()" v-if="isAuth">
      <!-- :disabled="true" 和disabled等价 -->
      <search-bar
        :disabled="false"
        @onClick="onSearchBarClick"
        :hot-search="hotSearch"
        :focus="focus"
      ></search-bar>
      <home-card :data="homeCard" @onBookClick="onBookClick"></home-card>
      <home-banner
        img="http://www.youbaobao.xyz/book/res/bg.jpg"
        title="啥四部分多说几句看得见的数据库"
        subTitle="立即体验"
        @onBannerClick="onBannerClick"
      ></home-banner>
      <div class="book-home">
        <home-book
          title="为你推荐"
          :data="recommend"
          row="1"
          col="3"
          mode="col"
          btnText="换一批"
          @onMoreClick="onMoreClickForChange('recommend')"
          @onBookClick="onBookClick"
        ></home-book>
      </div>
      <div>
        <home-book
          title="免费阅读"
          :data="freeRead"
          row="2"
          col="2"
          mode="row"
          btnText="换一批"
          @onMoreClick="onMoreClickForChange('freeRead')"
          @onBookClick="onBookClick"
        ></home-book>
      </div>
      <div>
        <home-book
          title="当前最热"
          :data="hotBook"
          row="1"
          col="4"
          mode="col"
          btnText="换一批"
          @onMoreClick="onMoreClickForChange('hotBook')"
          @onBookClick="onBookClick"
        ></home-book>
      </div>
      <div>
        <home-book
          title="分类"
          :data="category"
          row="3"
          col="2"
          mode="category"
          btnText="查看全部"
          @onMoreClick="onCategoryAllClick"
          @onCategoryClick="onCategoryClick"
        ></home-book>
      </div>
    </div>
    <auth @getUserInfo="init" v-if="!isAuth"></auth>
  </div>
</template>

<script>
import {
  getHomeData,
  recommend,
  freeRead,
  hotBook,
  register
} from "../../api/index";
import {
  getSetting,
  getUserInfo,
  setStorageSync,
  getStorageSync,
  getUserOpenId,
  showLoading,
  hideLoading,
  setNavigationBarTitle
} from "../../api/weChat";
import SearchBar from "../../components/home/SearchBar";
import ImageView from "../../components/base/ImageView";
import HomeCard from "../../components/home/HomeCard";
import HomeBanner from "../../components/home/HomeBanner";
import HomeBook from "../../components/home/HomeBook";
import Auth from "../../components/base/Auth";
export default {
  //编写一个新的组件是要重新运行项目
  components: { SearchBar, ImageView, HomeCard, HomeBanner, HomeBook, Auth },
  data() {
    return {
      hotSearch: "",
      homeCard: {},
      banner: {},
      recommend: [],
      freeRead: [],
      hotBook: [],
      category: [],
      focus: false,
      isAuth: false,
      openId: ""
    };
  },
  methods: {
    getHomeData(openId, userInfo) {
      getHomeData({
        openId
      })
        .then(response => {
          const {
            data: {
              hotSearch: { keyword },
              shelf,
              banner,
              recommend,
              freeRead,
              hotBook,
              category,
              shelfCount
            }
          } = response.data;
          this.hotSearch = keyword;
          this.banner = banner;
          this.recommend = recommend;
          this.freeRead = freeRead;
          this.hotBook = hotBook;
          this.category = category;
          this.homeCard = {
            bookList: shelf,
            num: shelfCount,
            userInfo
          };
          hideLoading();
        })
        .catch(err => {
          hideLoading();
        });
    },
    //换一批点击事件
    onMoreClickForChange(key) {
      switch (key) {
        case "recommend":
          recommend().then(response => {
            this.recommend = response.data.data;
          });
          break;
        case "freeRead":
          freeRead().then(response => {
            this.freeRead = response.data.data;
          });
          break;
        case "hotBook":
          hotBook().then(response => {
            this.hotBook = response.data.data;
          });
          break;
      }
    },
    //查看全部
    onCategoryAllClick() {
      this.$router.push({
        path: "/pages/category/main",
        query: {}
      });
    },
    //分类点击事件
    onCategoryClick(category) {
      console.log(category);
      this.$router.push({
        path: "/pages/list/main",
        query: {
          text: category.categoryText,
          key: "category",
          title: category.categoryText
        }
      });
    },
    //搜索框点击事件
    onSearchBarClick(e) {
      // this.focus = true;
      this.$router.push({
        path: "/pages/search/main",
        query: {
          hotSearch: this.hotSearch
        }
      });
      //跳转至搜索页面
    },
    onBannerClick() {
      console.log("banner click...");
    },
    onBookClick(book) {
      this.$router.push({
        path: "/pages/detail/main",
        query: {
          // openId:this.openId,
          fileName: book.fileName
        }
      });
    },

    changeFouce() {
      this.focus = false;
    },
    //获取用户授权信息
    getSetting() {
      getSetting(
        "userInfo",
        () => {
          this.isAuth = true;
          showLoading("正在加载");
          this.getUserInfo();
        },
        () => {
          if (mpvuePlatform === "wx") {
            this.isAuth = false;
          } else {
            this.isAuth = true;
            showLoading("正在加载");
            this.getUserInfo();
          }
        }
      );
    },
    //获取用户信息
    getUserInfo() {
      const onOpenIdComplete = (openId, userInfo) => {
        this.getHomeData(openId, userInfo);
        this.openId = openId;
        //注册
        register(openId, userInfo).then(response => {});
      };
      getUserInfo(
        userInfo => {
          //缓存数据
          setStorageSync("userInfo", userInfo);
          const openId = getStorageSync("openId");
          if (!openId || openId.length === 0) {
            getUserOpenId(openId => onOpenIdComplete(openId, userInfo));
          } else {
            onOpenIdComplete(openId, userInfo);
          }
        },
        () => {
          console.log("fail...");
        }
      );
    },
    init() {
      this.getSetting();
    }
  },
  mounted() {
    setNavigationBarTitle("推荐");
    this.init();
    // this.getHomeData();
  }
};
</script>

<style lang="scss" scoped >
.book-home {
  margin-top: 23px;
}
.index-wrapper {
  width: 100%;
  height: 100%;
}
</style>
