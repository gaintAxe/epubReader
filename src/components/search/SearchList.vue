<template>
  <div class="search-list-wrapper">
    <search-item
      icon="apps-o"
      :title="category"
      v-if="category.length>0"
      sub-title="类别"
      @onClick="showList(category,'category')"
    ></search-item>
    <search-item
      icon="contact"
      :title="author"
      v-if="author.length>0"
      sub-title="作者"
      @onClick="showList(author,'author')"
    ></search-item>
    <search-item
      icon="newspaper-o"
      :title="publisher"
      v-if="publisher.length>0"
      sub-title="出版社"
      @onClick="showList(publisher,'publisher')"
    ></search-item>

    <search-tab :data="data.book" @onClick="onBookCLick" v-if="data.book&&data.book.length>0"></search-tab>
  </div>
</template>

<script>
import SearchItem from "./SearchItem";
import SearchTab from "./SearchTab";

export default {
  components: {
    SearchItem,
    SearchTab
  },
  computed: {
    category() {
      return (
        (this.data.category[0] && this.data.category[0].categoryText) || ""
      );
    },
    author() {
      return (this.data.author[0] && this.data.author[0].author) || "";
    },
    publisher() {
      return (this.data.publisher[0] && this.data.publisher[0].publisher) || "";
    }
  },
  data() {
    return {};
  },
  props: {
    data: Object
  },
  methods: {
    showList(text, key) {
      this.$router.push({
        path: "/pages/list/main",
        query: {
          text,
          key,title:text
        }
      });
    },
    onBookCLick(book) {
      this.$emit("onBookCLick", book);
    }
  },mounted(){

  }
};
</script>

<style lang="scss" scoped>
</style>