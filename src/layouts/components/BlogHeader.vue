<template>
  <div class="header-container" :class="{ 'expand-header': props.expand}">
    <div class="blog-title">
      <div class="avatar-name">
        <div class="blog-avatar cursor-pointer" @click="routerToPersonal"></div>
        <a href="/ScrewLake/">Screw Lake</a>
      </div>
      <transition name="backToTop" enter-active-class="animate__animated animate__fadeIn"
                  leave-active-class="animate__animated animate__fadeOut">
        <div v-if="props.expand" class="personalized-signature"> {{ state.personalizedSignature }}</div>
      </transition>
    </div>
    <div class="blog-menu" id="blogMenuBox" ref="blogMenuRef">
      <div class="blog-menu-container">
        <blog-menu-native :menu-white="!props.expand"/>
      </div>
      <transition name="backToTop" enter-active-class="animate__animated animate__fadeIn"
                  leave-active-class="animate__animated animate__fadeOut">
        <div v-if="props.expand" class="blog-tags">
          <div class="tags">
            <template v-for="(item, index) in state.tags" :key="index">
              <span class="tag-title"> {{ item }} </span>
              <span v-if="index != (state.tags.length - 1)" class="separator"> / </span>
            </template>
          </div>
          <div class="search cursor-pointer">
            <el-icon>
              <Search/>
            </el-icon>
          </div>
          <div class="website">
            <a v-for="(item, index) in state.websiteList" :href="item.msg" target="_blank" :key="index">
              <MyIcons :icon="item.icon" :style="'font-size: 16px'"/>
            </a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from "vue"
import BlogMenuNative from "./BlogMenuNative.vue"
import MyIcons from "@/components/MyIcons.vue";
import {useRouter} from "vue-router"

const props = defineProps({
  expand: {
    type: Boolean,
    required: true,
    default: true
  }
})

const router = useRouter()
// 获取菜单容器
const blogMenuRef = ref<HTMLElement>()
const state = reactive({
  personalizedSignature: "人生顺遂，且逐心安处",
  tags: ["二次元", "花里胡哨", "随笔", "记录成长"],
  websiteList: [
    {name: "B站", icon: "bzhan", msg: "https://space.bilibili.com/35469398?spm_id_from=333.1007.0.0"},
    {name: "github", icon: "github", msg: "https://github.com/myhname"},
  ] as Array<LabelValue>
})


const routerToPersonal = () => {
  router.push("/personal")
}

onMounted(() => {
  // 使用ref获取到元素对象之后，没有办法直接将修改作用于实际的元素
  console.log("获取容器：", blogMenuRef.value?.clientWidth)
  if (blogMenuRef.value?.clientWidth) {
    let currDocument = document.getElementById("blogMenuBox")
    if (currDocument) {
      currDocument.style.width = blogMenuRef.value.clientWidth + 'px'
    }
  }
})

</script>

<style scoped lang="less">
@transitionTime: .5s;
@transitionWay: ease-in-out;

.header-container {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 10;

  background: rgba(47, 65, 84, 0.5);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);

  will-change: background, height;
  -webkit-transition: background @transitionTime @transitionWay;
  transition: background @transitionTime @transitionWay;

  padding: 0 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .blog-title {
    height: 100%;
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

    .avatar-name {
      margin-top: 0;
      margin-bottom: 0;
      transition: margin-top @transitionTime @transitionWay, margin-bottom @transitionTime @transitionWay;

      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 15px;

      .blog-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-image: url("../../assets/img/avatar.jpg");
        background-position: top center;
        background-size: cover;
        background-repeat: no-repeat;
      }

      a {
        color: #eee;
        transition: color @transitionTime @transitionWay;
      }

    }

    .personalized-signature {
      font-size: 12px;
      color: #565656;
    }

  }

  .blog-menu {
    //width: 270px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
    //transition: padding-top 0.5s @transitionWay;

    .blog-menu-container {
      margin-top: 15px;
      transition: margin-top @transitionTime @transitionWay;
    }

    .blog-tags {
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 10px;

      .tags {
        font-size: 12px;
        color: #2d2c2c;
        //color: #86867c;
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

  background-color: rgba(196, 196, 196, .5);
  font-size: 0.875rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

  will-change: background, height;
  -webkit-transition: background @transitionTime @transitionWay;
  transition: background @transitionTime @transitionWay;

  .blog-title .avatar-name {
    margin-top: 15px;
    margin-bottom: 5px;
    transition: margin-top @transitionTime @transitionWay, margin-bottom @transitionTime @transitionWay;

    a {
      color: #000000;
      transition: color @transitionTime @transitionWay;
    }
  }

  .blog-menu .blog-menu-container {
    margin-top: 31px;
    transition: margin-top @transitionTime @transitionWay;
  }
}

.animate__animated.animate__fadeIn,
.animate__animated.animate__fadeOut {
  --animate-duration: @transitionTime;
}
</style>
