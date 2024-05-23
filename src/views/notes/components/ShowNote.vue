<template>
  <div class="test-md-container">
      <div class="note-container">
        <md-preview-component class="left-preview-container"></md-preview-component>

        <data-overview class="right-msg-container" ></data-overview>
      </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import MdPreviewComponent from "@/components/editors/MdPreviewComponent.vue";
import DataOverview from  "./DataOverview.vue"


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

    .right-msg-container {
      position: relative;
      top: 0;
      left: 0;
    }
  }

//
}
</style>