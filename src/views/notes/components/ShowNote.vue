<template>
  <div class="test-md-container">
    <div class="note-container">
      <!--        <md-preview-component class="left-preview-container"></md-preview-component>-->
      <MdPreview class="left-preview-container" :editorId="id" :modelValue="markdown" :theme="'dark'"
                 :previewTheme="'mk-cute'"/>

      <div class="right-msg-container">
        <data-overview></data-overview>
        <div class="note-toc">
          <el-scrollbar max-height="300px">
            <MdCatalog :editorId="id" :scrollElement="scrollElement" @onClick="clickToc"/>
          </el-scrollbar>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {MdPreview, MdCatalog} from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';
import DataOverview from "./DataOverview.vue"
// import MdPreviewComponent from "@/components/editors/MdPreviewComponent.vue";
import emitter from '@/utils/eventBus'

const id = 'preview-only';
const scrollElement = document.documentElement;
const markdown = ref(`# ScrewLake

个人博客项目，螺丝湖水怪的居所——Personal blog project, the residence of the Screw Lake Monster

## 项目开发记录

### 已完成模块/功能

2024/3/10

1. 整体
   - 路由切换效果：淡入淡出
   - 主体内容背景轮播切换
2. 封面
   - 樱花飘落
   - 旋转六面体
   - 双击/点击箭头进入
3. 头部菜单栏
   - 伸缩动画

### 待改进

颜色、风格问题不急，先实现功能问题

1. 轮播/路由切换效果优化：淡出有效，淡入有点突然
2. 图片优化：有两张轮播的背景图片清晰度不是很够，而且多张图的风格不搭
3. ~~头部菜单栏背景颜色、背景模糊效果~~，这个需要找好图片之后再适配一下

### 未完成

功能点：

1. 封面点击箭头向下滚动进入：这个一直有点Bug，同淡出效果一样，滚动移除可以平滑实现，滚动进入不行
2. 菜单栏的方法
   - 点击跳转其它网站
   - 点击头像跳转个人/网站介绍页面

模块：

- 笔记目录页
- 笔记内容展示
- 个人/网站介绍
- 日志
- 组件库
- 留言板
- 聊天室

有些部分需要配合后端，不急

### 开发计划

计划赶不上变化.jpg

1. 2024/3/11：完成度 70%
   - ~~返回顶部效果~~
   - 首页内容块布局整理，进行基础布局
     - 50% only
   - ~~滚动条优化~~
   - 鼠标点击 爱心 + 文字
   - 计划外：可视区域进出监听动画demo
2. 2024/3/14
   - 音乐播放器
   - 桌宠
   - 首页布局完成`)
const tocTitleDivList = ref<HTMLCollectionOf<HTMLElement>>()
const currHightTitle = ref(-1)

const clickToc = (e: MouseEvent, t: any) => {
  console.log("点击目录", e, t)
  let PageId = document.getElementById(t.text)
  console.log("dddd", PageId)
  if(PageId) {
    // window.scrollTo({
    //   top: PageId.offsetTop,
    //   behavior: "smooth"
    // })
    emitter.emit('clickNoteToc', PageId.offsetTop)
  }

//   高亮
  if(!tocTitleDivList.value || !tocTitleDivList.value.length) {
    tocTitleDivList.value = document.getElementsByClassName("md-editor-catalog-link")!
  }
  console.log(("目录类"), tocTitleDivList.value)
  console.log("字节点",)
  if(currHightTitle.value != -1) {
    tocTitleDivList.value![currHightTitle.value].children[0].classList.remove("highlight-title")
  }
  currHightTitle.value = Number(t.index - 1)
  tocTitleDivList.value![currHightTitle.value].children[0].classList.add("highlight-title")

}

</script>

<style lang="less" scoped>
.test-md-container {
  position: relative;
  width: 100%;
  //padding: 20px 5% 20px 8%;
  display: flex;

  .note-container {
    position: relative;
    margin: 20px auto;
    display: flex;
    flex-direction: row;
    column-gap: 20px;

    .left-preview-container {
      width: 70vw;
    }

    #preview-only {
      background-color: rgba(0, 0, 0, 0.75);
      border: 1px solid #e4e7ed;
      border-radius: 5px;
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
      backdrop-filter: blur(10px);
    }

    .right-msg-container {
      width: 300px;
      display: flex;
      flex-direction: column;
      row-gap: 15px;

      .note-toc {
        position: sticky;
        top: 10px;

        color: #fff;
        background-color: rgba(0, 0, 0, 0.6);
        border: 1px solid #e4e7ed;
        border-radius: 5px;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
        backdrop-filter: blur(8px);
      }
    }
  }
}
</style>

<style lang="less">
.highlight-title {
  color: #01b4ff!important;
}
</style>