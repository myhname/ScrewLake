<template>
  <div class="system-manage-container">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
      <template v-for="(item, index) in systemMenuList" :key="index">
        <el-tab-pane :label="item.label" :name="item.key"></el-tab-pane>
      </template>
    </el-tabs>
    <div class="manage-container">
      <user-center v-if="activeName === systemMenuList[0].key"></user-center>
      <note-manage v-if="activeName === systemMenuList[1].key" ></note-manage>
      <log-manage v-if="activeName === systemMenuList[2].key" ></log-manage>
      <system-setting v-if="activeName === systemMenuList[3].key" ></system-setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from "vue"
import type {TabPaneName} from 'element-plus'
import UserCenter from "@/views/systemManage/components/UserCenter.vue";
import NoteManage from "@/views/systemManage/components/NoteManage.vue";
import LogManage from "@/views/systemManage/components/LogManage.vue";
import SystemSetting from "@/views/systemManage/components/SystemSetting.vue";

const activeName = ref()
const systemMenuList = reactive([
  {label: "个人中心", key: "userCenter"},
  {label: "笔记管理", key: "noteManage"},
  {label: "日志管理", key: "logManage"},
  {label: "系统设置", key: "systemSetting"},
])

const handleClick = (name: TabPaneName) => {
  console.log("tab", name, activeName.value)
}

onMounted(() => {
  activeName.value = systemMenuList[0].key
})

</script>

<style scoped lang="less">

.system-manage-container {
  position: relative;
  width: calc(100% - 80px);
  box-sizing: border-box;
  margin: 20px 40px;
  padding: 10px 20px;

  color: #fff;
  background-color: rgb(0 0 0 / 60%);
  border: 1px solid #a5aab2;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(5px);

  .demo-tabs {
    --el-text-color-primary: #fff;
    --el-border-color-light: #5c616b;
  }

  .manage-container {
    min-height: 500px;
    width: 100%;
  }
}
</style>