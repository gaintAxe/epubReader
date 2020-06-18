<template>
  <div>
    <home-book
      title="分类"
      :data="categoryList"
      :row="row"
      col="2"
      mode="category"
      :showBtn="false"
      :showTitle="false"
      @onCategoryClick="onCategoryClick"
    ></home-book>
  </div>
</template>

<script>
import HomeBook from "../../components/home/HomeBook";
import { bookCategoryList } from "../../api/index";
import { HOME_BOOK_MODE } from "../../utils/const";
export default {
  components: { HomeBook },
  data() {
    return {
      categoryList: [],
      row: 3
    };
  },
  methods: {
    onCategoryClick(category) {
      this.$router.push({
        path: "/pages/list/main",
        query: {
          text: category.categoryText,
          key: "category",
          title: category.categoryText
        }
      });
    }
  },
  mounted() {
    bookCategoryList().then(response => {
      this.categoryList = response.data.data;
      const len = this.categoryList.length;
      this.row = Math.ceil(len / 2);
    });
  }
};
</script>

<style>
</style>