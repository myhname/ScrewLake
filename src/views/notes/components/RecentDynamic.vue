<template>
  <div class="recent-dynamic-container">
    <template v-for="(item, index) in recentDynamicList" :key="index">
      <div class="recent-dynamic-item" @click="pushTo(item.url)">
        <div class="img" :style="'background-image: url(' + item.img + ');'"></div>
        <div class="msg">
          <p class="title">{{ item.context }}</p>
          <p class="information">{{ item.creator }} | {{ item.type }} | {{ item.createTime }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"

enum RecentDynamicType {
  msg = "留言",
  up = "最近更新",
  maximumBrowsing = "最多浏览",
  notice = "公告",
}

interface RecentDynamicData {
  creator: string
  createTime: string
  type: RecentDynamicType
  img: string
  context: string
  url: string
}

const router = useRouter()
const recentDynamicList = ref<Array<RecentDynamicData>>([
  {
    creator: "ww",
    createTime: "2024-04-02",
    type: RecentDynamicType.msg,
    img: "/src/assets/image/fate2.jpg",
    context: "留个言呢呢呢",
    url: "/cover",
  },
  {
    creator: "dddd",
    createTime: "2024-04-02",
    type: RecentDynamicType.up,
    img: "/src/assets/image/fate1.jpg",
    context: "【更新文章简介】",
    url: "/cover",
  },
  {
    creator: "aaaa",
    createTime: "2024-04-02",
    type: RecentDynamicType.maximumBrowsing,
    img: "/src/assets/image/fate3.jpg",
    context: "【最多人看嫩】",
    url: "/cover",
  },
  {
    creator: "aaaa",
    createTime: "2024-04-02",
    type: RecentDynamicType.notice,
    img: "/src/assets/image/fate4.jpg",
    context: "留个言呢呢呢",
    url: "/cover",
  },
])

const pushTo = (target: string) => {
  router.push(target)
}
</script>

<style scoped lang="less">
.recent-dynamic-container {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  .recent-dynamic-item {
    height: 60px;
    border-radius: 5px;
    display: flex;

    &:hover {
      background-color: rgba(176, 152, 152, 0.4);
    }

    .img {
      flex: 1;
      background-repeat: no-repeat;
      background-position: center top;
      background-size: cover;
      border-radius: 5px;
    }

    .msg {
      flex: 2;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 5px;
      border-bottom: 0.3px solid #b7b7b7;

      p {
        margin: 0;
        font-size: 16px;
        color: #ddd;

        &:last-child {
          font-size: 12px;
        }
      }
    }
  }
}
</style>