<template>
  <div class="header-container" :class="{ 'expand-header': props.expand}">
    <div class="blog-title">
      <div class="avater-name">
        <div class="blog-avatar"></div>
        <a href="/">Screw Lake</a>
      </div>
      <div v-if="props.expand" class="personalized-signature"> {{ personalizedSignature }}</div>
    </div>
    <div class="blog-menu">
      <blog-menu-native/>
      <div v-if="props.expand" class="blog-tags">
        <div class="tags">
          <template v-for="(item, index) in tags" :key="index">
            <span class="tag-title"> {{ item }} </span>
            <span v-if="index != (tags.length - 1)" class="separator"> / </span>
          </template>
        </div>
        <div class="search">
          <el-icon>
            <Search/>
          </el-icon>
        </div>
        <div class="website">
          <a v-for="(item, index) in websiteList" :href="item.address" target="_blank" :key="index">
            <MyIcons :icon="item.icon" :style="myIconsFont"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue"
import BlogMenuNative from "./components/BlogMenuNative.vue"
import MyIcons from "@/components/MyIcons.vue";

interface LabelItem {
  name: string
  icon: string
  color?: string
  address: string
}

const props = defineProps({
  expand: {
    type: Boolean,
    required: true,
    default: true
  }
})

const personalizedSignature = ref("人生顺遂，且逐心安处")
const tags = reactive([
  "二次元", "花里胡哨", "随笔", "记录成长"
])
const websiteList = reactive<Array<LabelItem>>([
  {name: "B站", icon: "bzhan", address: "https://space.bilibili.com/35469398?spm_id_from=333.1007.0.0"},
  {name: "github", icon: "github", address: "https://github.com/myhname"},
])

// 字体大小在父级设置不生效
const myIconsFont = ref("font-size: 1rem")
</script>

<style scoped lang="less">
.header-container {
  width: 100%;
  height: 100%;

  background: rgba(47, 65, 84, 0.5);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);

  will-change: background, height;
  -webkit-transition: background 0.5s ease-in-out, height 0.5s ease-in-out;
  transition: background 0.5s ease-in-out;

  padding: 0 7%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .blog-title {
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
    word-spacing: 0.5rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 5px;

    .avater-name {
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 15px;

      .blog-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-image: url("../../../assets/image/玫瑰凛.jpg");
        background-position: top center;
        background-size: cover;
        background-repeat: no-repeat;
      }

      a {
        cursor: url("../../../assets/cursor_link.cur"), auto;
      }

    }

    .personalized-signature {
      font-size: 12px;
      color: #86867c;
    }

  }

  .blog-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;

    .blog-tags {
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 10px;

      .tags {
        font-size: 12px;
        color: #86867c;
      }

      .search {
        font-size: 1rem;

        &:hover {
          color: #3f6bfb;
          background-color: #e8e6e6;
        }
      }

      .website {
        display: flex;
        column-gap: 3px;

        a {
          cursor: url("../../../assets/cursor_link.cur"), auto;

          &:hover {
            color: #3f6bfb;
            background-color: #e8e6e6;
          }
        }
      }
    }
  }
}

.expand-header {

  background-color: transparent;
  font-size: 0.875rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

  will-change: background, height;
  -webkit-transition: background 0.5s ease-in-out, height 0.5s ease-in-out;
  transition: background 0.5s ease-in-out;

  .blog-menu {
    padding-top: 15px;
  }
}
</style>
