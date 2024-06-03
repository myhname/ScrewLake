<template>
  <div class="log-manage-container">
    <el-form ref="ruleFormRef" :inline="true" label-width="auto" :model="state.formData" class="operation-container">
      <el-form-item label="内容：" prop="content">
        <el-input v-model="state.formData.content" placeholder="" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button class="note-btn" type="primary" text :icon="Search" @click="queryNoteList">查询</el-button>
        <el-button class="note-btn" type="primary" text :icon="Plus" @click="addShowDialog">新增</el-button>
      </el-form-item>
    </el-form>

    <Table class="log-manage-table" :columns="state.columns" :table-data="state.tableData" :show-index="true"
           :is-border="true" :show-page="true" :page-size="state.page.pageSize" :curr-page="state.page.currPage"
           :total="state.page.total">
      <template #CanEdit="scope">
        <template v-if="scope.row.isEdit">
          <el-input v-model="scope.row.content" @blur="editFinish(scope.row)" @keyup.enter="editFinish(scope.row)"></el-input>
        </template>
        <template v-else>
          <span> {{ scope.row.content }} </span>
        </template>
      </template>
      <template #Btn="scope">
        <el-button :type="'primary'" text :icon="View" @click="editLog(scope.row)"> 编辑</el-button>
        <el-button :type="'primary'" text :icon="View" @click="changeNoteStatus(scope.row)">
          {{ scope.row.isShow ? '隐藏' : '展示' }}
        </el-button>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue"
import {Plus, Search, View,} from "@element-plus/icons-vue"
import type {FormInstance} from 'element-plus'
import Table from "@/components/Table.vue";

interface LogTableData {
  id?: number
  content: string
  createTime: string
  updateTime: string
  isShow: boolean
  isEdit?: boolean
}

const ruleFormRef = ref<FormInstance>()
const state = reactive({
  formData: {
    content: "",
  },

  columns: [
    {
      prop: "content",
      label: "内容",
      align: "center",
      slotName: "CanEdit",
    },
    {
      prop: "createTime",
      label: "创建时间",
      width: 200,
    },
    {
      prop: "updateTime",
      label: "最后更新时间",
      width: 200,
    },
    {
      prop: "action",
      label: "操作",
      slotName: "Btn",
      width: 300,
    }
  ],
  tableData: [
    {
      id: 1,
      content: "dddd",
      createTime: "23-ddd",
      updateTime: "dw22",
      isShow: true,
      isEdit: false,
    },
  ] as Array<LogTableData>,
  page: {
    currPage: 1,
    pageSize: 10,
    total: 1,
  }
})

const queryNoteList = () => {
  resetPage()
  if (state.tableData.length) {
    state.tableData.length = 0
  } else {
    state.tableData = [
      {
        id: 1,
        content: "dddd",
        createTime: "23-ddd",
        updateTime: "dw22",
        isShow: true,
        isEdit: false,
      },
    ]
  }
}

const resetPage = () => {
  state.page.currPage = 1
  state.page.pageSize = 10
}

const addShowDialog = () => {
  state.tableData.push({
    content: "",
    createTime: "",
    updateTime: "",
    isShow: true,
    isEdit: true,
  })
}

const editLog = (data: LogTableData) => {
  data.isEdit = true
}

const editFinish = (data: LogTableData) => {
  data.isEdit = false
}

const changeNoteStatus = (data: LogTableData) => {
//    TODO: 请求
  data.isShow = !data.isShow
}

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

.log-manage-table {
  width: 100%;
  //min-height: 300px;
}
</style>