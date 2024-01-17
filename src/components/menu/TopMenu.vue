<template>
  <div class="top-menu">
    <div class="blog-title">
      <div class="blog-avatar"></div>
      <a href="/">Screw Lake</a>
    </div>
    <div class="blog-menu">
      <blog-menu-native />
      <div class="blog-btn"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // import { reactive } from "vue"
  import BlogMenuNative from "./components/BlogMenuNative.vue"
</script>

<style scoped lang="less">
  .top-menu {
    width: 100%;
    height: 100%;

    padding: 0 7%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .blog-title {
      display: inline-block;
      padding-top: 0.3125rem;
      padding-bottom: 0.3125rem;
      margin-right: 1rem;
      font-size: 1.25rem;
      line-height: inherit;
      white-space: nowrap;
      word-spacing: 0.5rem;

      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 15px;

      .blog-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-image: url("../../assets/image/玫瑰凛.jpg");
        background-position: top center;
        background-size: cover;
        background-repeat: no-repeat;
      }

      a {
        text-decoration: none;
        cursor: pointer;
        color: #fff;
      }
    }
  }
</style>
