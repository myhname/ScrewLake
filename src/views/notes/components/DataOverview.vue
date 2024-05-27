<template>
  <div class="left-person-msg card-item" id="leftPersonMsg">
    <div class="background-img">
      <div class="name-and-signature">
            <span class="user-name font-3">
              {{ state.userName }}
            </span>
        <span class="user-signature font-5">
              {{ state.userSignature }}
            </span>
      </div>
    </div>
    <div class="resource-tags">
      <div class="resource-tag-item" v-for="(tagItem, tagIndex) in state.resourceTagsList" :key="tagIndex">
        <span class="resource-tag-label font-3"> {{ tagItem.label }} </span>
        <span class="resource-tag-number font-4"> {{ tagItem.value }} </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";

const state = reactive({
  userName: "螺丝湖水怪之家",
  userSignature: "时代的一粒沙，也想随风向天空去",
  resourceTagsList: [
    { label: "笔记", value: 10, },
    { label: "组件", value: 18, },
    { label: "项目", value: 101, },
    { label: "图片", value: 10, },
  ] as Array<LabelData>,
})

</script>

<style scoped lang="less">
.left-person-msg {
  width: 300px;
  height: 300px;
  border-radius: 5px;
  overflow: hidden;

  .background-img {
    height: 80%;
    background: url("../../../assets/image/yanhuanianjie.jpg") no-repeat center center / cover;
    display: flex;
    flex-direction: column-reverse;

    .name-and-signature {
      width: 100%;
      height: 50px;
      background-color: rgba(129, 119, 127, 0.60);
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .user-name {
        color: #f2ecec;
      }

      .user-signature {
        color: #c8c8c8;
        margin-top: 2px;
      }
    }
  }

  .resource-tags {
    height: 20%;
    display: flex;
    flex-direction: row;
    background-color: rgb(122 109 109 / 40%);
    color: #e8e8e8;
    position: relative;

    .resource-tag-item {
      height: 60%;
      margin: auto;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      border-right: 1px solid #d3d3d3;

      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>