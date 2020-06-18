<template>
  <div class="search-bar">
    <div class="search-bar-wrapper" @click.stop="onSearchBarClick">
      <van-icon class="search" name="search" size="16px" color="#858C96"></van-icon>
      <input
        type="text"
        class="search-bar-input"
        :focus="focus"
        :disabled="disabled"
        :maxlength="limit"
        :placeholder="hotSearch.length===0?'搜索':hotSearch"
        v-model="searchWord"
        @input="onChange"
        confirm-type="search"
        @confirm="onConfirm"
        placeholder-style="color:#ADB4BE;font-size:15px"
      />
      <!-- input是wx提供的组件 不是html input -->
      <!-- confirm-type="search" 弹出的键盘右下角按钮为搜索 -->
      <!-- confirm 弹出键盘时用户点击搜索按钮时触发 -->
      <!--  placeholder-style="color:#ADB4BE" 修改placeholder的样式-->
      <van-icon
        class="clear"
        name="clear"
        xize="16px"
        color="#ccc"
        @click="onClearClick"
        v-if="searchWord.length>0"
      ></van-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    focus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 50
    },
    hotSearch: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchWord: ""
    };
  },
  methods: {
    //上传搜索框点击事件
    onSearchBarClick() {
      this.$emit("onClick");
    },
    //上传清空点击事件
    onClearClick() {
      this.searchWord = "";
      this.$emit("onClear");
    },
    //上传搜索框内容input点击事件
    onChange(e) {
      const { value } = e.mp.detail;
      this.$emit("onChange", value);
    },
    //上传键盘搜索按钮点击事件
    onConfirm(e) {
      let value;
      if (typeof e == "string") {
        value = e;
      } else {
        value = e.mp.detail.value;
      }
      this.$emit("onConfirm", value);
    },
    setValue(v) {
      this.searchWord = v;
    },
    getValue() {
      return this.searchWord;
    }
  }
};
</script>

<style lang="scss" scoped>
.search-bar {
  padding: 15px 15.5px;
  .search-bar-wrapper {
    display: flex;
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    background: #f5f7f9;
    border-radius: 20px;
    padding: 12px 17px;
    .search-bar-input {
      flex: 1;
      width: 100%;
      margin: 0 8px;
      color: #333;
      font-size: 15px;
    }
    .search,
    .clear {
      flex: 0 0 20px;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>