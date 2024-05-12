<template>
  <div class="personal-data-container">
    <div class="personal-data-card card-item-about">
      <div class="avatar-container">
        <img src="../../assets/image/不可以瑟瑟.jpg" alt=""/>
        <div class="ripple-effect-bg"></div>
        <div class="ripple-effect"></div>
      </div>
      <p v-typewriter="{ delay: 100}"> 虽生如草芥，也愿随风而起，追云逐日，俯瞰山海 </p>
      <h3 class="personalized-details-title title-font">个人资料</h3>
      <div class="personalized-details">
        <template v-for="(item, index) in personalizedDetailsList" :key="index">
          <div class="personalized-details-item">
            <p class="detail-title font-3">{{ item.title }}</p>
            <p class="detail-context font-2">{{ item.context }}</p>
          </div>
        </template>
      </div>
      <div class="technology-stack"> 相关技术</div>
      <div class="tech-list"> {{ techList.join("、") }}</div>
      <div class="personalized-logs-title title-font"> 关于博客</div>
      <div class="tech-list font-3" v-html="aboutBlog"></div>
      <h3 class="personalized-logs-title title-font">更新日志</h3>
      <div class="logs-list-container" :class="{ 'hidden-logs': !showLogs }">
        <template v-for="(item, index) in logsList" :key="index">
          <div class="logs-item">
            <div class="technology-stack font-4"> {{ item.time }}</div>
            <div class="tech-list font-3"> {{ item.context }}</div>
          </div>
        </template>
      </div>
      <div class="logs-show-control" @click="changeLogsShow"> {{ showLogs ? '收起日志' : '点击展示更多日志' }}</div>
    </div>

<!--    <div class="test-boder"></div>-->
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";

const personalizedDetailsList = reactive<
    Array<{
      title: string
      context: string
    }>
>([
  {
    title: "职业",
    context: "web前端",
  },
  {
    title: "星座",
    context: "天秤",
  },
  {
    title: "爱好",
    context: "卡通、动漫",
  },
])

const techList = reactive([
  "JavaScript", "CSS", "HTML", "Vue.js"
])

const aboutBlog = ref("<p>练手 + 记录</p>")

const showLogs = ref(false)
const logsList = reactive([
  {time: "2024-04-16", context: "开始构建博客"},
  {time: "2024-04-26", context: "笔记目录首页"},
  {time: "2024-05-05", context: "个人结束"},
])

const changeLogsShow = () => {
  showLogs.value = !showLogs.value
}

</script>

<style scoped lang="less">
@titleColor: #00d3fb;

.personal-data-container {
  //min-height: 1350px;
  position: relative;
  //background-color: black;
  padding: 30px 0;
  color: #fff;

  .personal-data-card {
    width: 80%;
    //height: 800px;
    margin: 0 auto;
    padding: 30px;
    text-align: center;
    //text-shadow: 0 0 15px #fff, 0 0 30px #fff;
    backdrop-filter: blur(10px);

    .avatar-container {
      width: 126px;
      height: 126px;
      margin: 0 auto;
      position: relative;
      padding: 17px;

      img {
        width: 92px;
        height: 92px;
        border-radius: 50%;
      }

      .ripple-effect-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 126px;
        height: 126px;
        border: 2px solid #e1afbe;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        z-index: 3;
        opacity: 0;
        -webkit-animation: warn 1.5s ease-out;
        -moz-animation: warn 1.5s ease-out;
        animation: warn 1.5s ease-out;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        box-shadow: 1px 1px 30px #000;
      }

      .ripple-effect {
        position: absolute;
        width: 126px;
        height: 126px;
        top: 0;
        left: 0;
        border: 1px solid #e1afbe;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        z-index: 3;
        opacity: 0;
        -webkit-animation: warn1 1.5s ease-out;
        -moz-animation: warn1 1.5s ease-out;
        animation: warn1 1.5s ease-out;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        box-shadow: 1px 1px 30px #000;
      }
    }

    .personalized-signature {
      //font-size: 17px;
      margin: 30px 5%;
      padding-bottom: 30px;
      border-bottom: dashed 2px #6a6363;
    }

    .personalized-details {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      margin: 30px 5%;

      .personalized-details-item {
        p {
          margin: 0;
          padding: 5px;
        }

        .detail-title {
          padding: 5px 80px;
          border-bottom: solid 2px #605e5e;
          //font-size: 14px;
        }

        .detail-context {
          //font-size: 18px;
        }
      }
    }

    .technology-stack {
      //font-size: 17px;
      border-bottom: solid 2px #605e5e;
      width: 60%;
      margin: auto;
      padding-bottom: 5px;
      margin-bottom: 5px;
    }

    .personalized-logs-title {
      margin-top: 2rem;
      margin-bottom: 2rem;
    }

    .logs-list-container {
      padding: 20px;
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      overflow: hidden;
      transition: all 0.5s ease-in-out;

      .technology-stack {
        font-size: 14px;
      }
    }

    .hidden-logs {
      height: 85px;
      transition: all 0.5s ease-in-out;
    }

    .logs-show-control {
      color: darkgrey;
    }
  }

  .card-item-about {
    background-color: rgba(0,0,0,0.45);
    border: 1px solid #e4e7ed;
    border-radius: 5px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
  }
}

.title-font {
  color: @titleColor;
  font-size: 19px;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: solid 2px;
  width: 150px;
  margin: auto;
}

.text-shadow {
  text-shadow: 0 0 15px #fff, 0 0 30px #fff;
}

@keyframes warn {
  0% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0;
  }
  25% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.1;
  }
  50% {
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    opacity: 0.3;
  }
  75% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 0;
  }
}

@keyframes warn1 {
  0% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0;
  }
  25% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.1;
  }
  50% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.3;
  }
  75% {
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    opacity: 0;
  }
}


//.test-boder {
//  width: 200px;
//  height: 200px;
//  //background-color: red;
//  border-top: 12px solid #000000;
//  border-radius: 50%;
//  position: relative;
//  filter: drop-shadow(0 0 2px red) drop-shadow(0 0 5px red) drop-shadow(0 0 10px red) drop-shadow(0 0 20px red);;
//
//  //&::before {
//  //  position: absolute;
//  //  left: 0;
//  //  top: 0;
//  //  right: 0;
//  //  bottom: 0;
//  //
//  //}
//}
</style>
