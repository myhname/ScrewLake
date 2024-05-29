<template>
  <div class="note-manage-container">
    <el-form ref="ruleFormRef" :inline="true" label-width="auto" :model="state.formData" class="operation-container">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="state.formData.title" placeholder="" clearable/>
      </el-form-item>
      <el-form-item label="标签：" prop="tagsList">
        <el-select v-model="state.formData.tagsList" placeholder="" filterable multiple :multiple-limit="3" :max-collapse-tags="1" collapse-tags collapse-tags-tooltip clearable :popper-class="'dark-selected-option'">
          <template v-for="(item, index) in state.tagsOption" :key="index">
            <el-option :label="item" :value="item"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="note-btn" type="primary" text :icon="Search">查询</el-button>
        <el-button class="note-btn" type="primary" text :icon="Plus">新增</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue"
import {Plus, Search} from "@element-plus/icons-vue"
import type {FormInstance} from 'element-plus'

interface NoteTableData {
  id?: number
  title: string
  tagsList: Array<string>
  description: string
  commentNum: number
  voteNum: number
  viewNum: number
  createTime: string
  updateTime: string
  isShow: boolean
}

const ruleFormRef = ref<FormInstance>()
const state = reactive({
  formData: {
    title: "",
    tagsList: [] as Array<string>,
  },
  tagsOption: ["tag1", "tag2", "tag3", "tag4"],

  tableData: [
    {
      id: 1,
      title: "111",
      tagsList: ["a", "b"] as Array<string>,
      description: "12e",
      commentNum: 0,
      voteNum: 0,
      viewNum: 0,
      createTime: "23-ddd",
      updateTime: "dw22",
      isShow: true,
    },
  ] as Array<NoteTableData>,
})

</script>

<style scoped lang="less">
.operation-container {
  --el-text-color-regular: #f1f4fa;

  :deep(.el-form-item__content) {
    --el-input-bg-color: #1a18185c;
    --el-fill-color-blank: #26212159;

    width: 200px;
  }
}
</style>

<style lang="less">
.dark-selected-option {
  --el-bg-color-overlay: #4741414d;
  --el-text-color-regular: #e7e8ea;
  --el-fill-color-light: #38343487;

  .el-select-dropdown__item:hover {
    background-color: #38343487;
  }
}
</style>