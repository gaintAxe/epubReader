<template>
  <div>
    <shelf-user-info :userInfo="userInfo" :readDay="day" :num="shelfList.length-1"></shelf-user-info>
    <home-book
      :showTitle="false"
      :data="shelfList"
      :row="row"
      col="3"
      mode="col"
      :showBtn="false"
      @onBookClick="onBookClick"
    ></home-book>
  </div>
</template>

<script>
import ShelfUserInfo from "../../components/shelf/ShelfUserInfo";
import HomeBook from "../../components/home/HomeBook";
import { getStorageSync } from "../../api/weChat";
import { userDay, bookisInShelf } from "../../api/index";
export default {
  components: { ShelfUserInfo, HomeBook },
  data() {
    return {
      userInfo: {},
      shelfList: [],
      day: 0
    };
  },
  methods:{
    onBookClick(book){
      console.log(book)
      this.$router.push({
        path:'/pages/detail/main',
        query:{
          // openId:this.openId,
          fileName:book.fileName
        }
      })
    }
  },
  onShow() {
    this.userInfo = getStorageSync("userInfo");
    const openId = getStorageSync("openId");
    userDay({ openId }).then(response => {
      this.day = response.data.data.day;
    });
    bookisInShelf({ openId }).then(response => {
      this.shelfList = response.data.data; 
      console.log(this.shelfList);
      this.shelfList.push({isGotoHome:true})
      this.row = Math.ceil(this.shelfList.length/3)
    });
  }
};
</script>

<style>
</style>