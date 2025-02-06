<template>
  <div class="note-manage-container">
    <el-form ref="ruleFormRef" :inline="true" label-width="auto" :model="state.formData" class="operation-container">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="state.formData.title" placeholder="" clearable/>
      </el-form-item>
      <el-form-item label="标签：" prop="tagsList">
        <el-select v-model="state.formData.tagsList" placeholder="" filterable multiple :multiple-limit="3"
                   :max-collapse-tags="1" collapse-tags collapse-tags-tooltip clearable
                   :popper-class="'dark-selected-option'">
          <template v-for="(item, index) in state.tagsOption" :key="index">
            <el-option :label="item" :value="item"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select v-model="state.formData.status" placeholder="" clearable
                   :popper-class="'dark-selected-option'">
          <template v-for="(item, index) in state.statusOption" :key="index">
            <el-option :label="item.label" :value="item.value"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="note-btn" type="primary" text :icon="Search" @click="queryNoteList">查询</el-button>
        <el-button class="note-btn" type="primary" text :icon="Plus" @click="addShowDialog">新增</el-button>
      </el-form-item>
    </el-form>

    <Table class="note-manage-table" :columns="state.columns" :table-data="state.tableData" :show-index="true"
           :is-border="true" :show-page="true" :page-size="state.page.pageSize" :curr-page="state.page.currPage"
           :total="state.page.total" @table-list-change="tableListChange">
      <template #Btn="scope">
        <el-button :type="'primary'" text :icon="View" @click="viewNote(scope.row)"> 查看</el-button>
        <el-button :type="'primary'" text :icon="View" @click="editNote(scope.row)"> 编辑</el-button>
        <el-button :type="'primary'" text :icon="View" @click="changeNoteStatus(scope.row)">
          {{ scope.row.isShow ? '隐藏' : '展示' }}
        </el-button>
      </template>
    </Table>
  </div>

  <note-dialog v-model:show-note-dialog="showDialog.isShow" :type="showDialog.type"
               :form-data="showDialog.formData" @change-list="getList"></note-dialog>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from "vue"
import {Plus, Search, View,} from "@element-plus/icons-vue"
import type {FormInstance} from 'element-plus'
import Table from "@/components/Table.vue"
import router from "@/router";
import {ElMessage} from 'element-plus'
import NoteDialog from "@/views/systemManage/components/NoteDialog.vue";
import {getNotesList, getAllArticle, changeNoteStatusById} from "@/api/notes.ts"

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
    status: null,
  },
  tagsOption: ["tag1", "tag2", "tag3", "tag4"],
  statusOption: [
    {label: "显示中", value: 1},
    {label: "已隐藏", value: 0}
  ],

  columns: [
    {
      prop: "title",
      label: "标题",
    },
    {
      prop: "tagsList",
      label: "标签",
      slotName: "Tag",
    },
    {
      prop: "description",
      label: "简介",
    },
    {
      prop: "commentNum",
      label: "评论数",
    },
    {
      prop: "voteNum",
      label: "点赞数",
    },
    {
      prop: "viewNum",
      label: "浏览量",
    },
    {
      prop: "createTime",
      label: "创建时间",
    },
    {
      prop: "updateTime",
      label: "最后更新时间",
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
  page: {
    currPage: 1,
    pageSize: 10,
    total: 1,
  }
})
const showDialog = reactive({
  isShow: false,
  type: 'add',
  formData: {},
})

const queryNoteList = () => {
  resetPage()
  getAll()
  getList()
}

const resetPage = () => {
  state.page.currPage = 1
  state.page.pageSize = 10
}

const addShowDialog = () => {
  showDialog.formData = {}
  showDialog.type = 'add'
  showDialog.isShow = true
}

const viewNote = (data: NoteTableData) => {
  router.push("/notes/showMd?id=" + data.id)
}

const editNote = (data: NoteTableData) => {
  showDialog.formData = data
  showDialog.type = 'edit'
  showDialog.isShow = true
}

const changeNoteStatus = (data: NoteTableData) => {
//    TODO: 请求
  changeNoteStatusById(`notes/changeNoteStatus?id=${data.id!}`, data.isShow ? 0 : 1).then((res) => {
    if (res.status === 200) {
      getList()
    } else {
      ElMessage.warning(res.msg)
    }
  }).catch((err: string) => {
    ElMessage.error((err))
  }).finally(() => {

  })
}

const tableListChange = (value: { pageSize: number, currPage: number }) => {
  console.log("分页", value)
  state.page.currPage = value.currPage
  state.page.pageSize = value.pageSize
  getList()
}

// -------------------- 请求数据 ---------------------
const getList = () => {
  let params = {
    ...state.formData,
    pageSize: state.page.pageSize,
    currPage: state.page.currPage,
  }
  getNotesList("notes/getNotes", params).then((res) => {
    if (res.status === 200) {
      state.tableData = res.data
      state.tableData.forEach(item => {
        item.tagsList = item.tagsList.toString().split(",")
        if(item.tagsList[0] === "") {
          item.tagsList = []
        }
        console.log("标签：", item.tagsList)
      })
    } else {
      ElMessage.warning(res.msg)
    }
  }).catch((err: any) => {
    ElMessage.error(err)
  }).finally(() => {
  })
}

const getAll = () => {
  getAllArticle("notes/getAll", state.formData).then((res) => {
    if (res.status === 200) {
      state.page.total = res.data
    } else {
      ElMessage.warning(res.msg)
    }
  }).catch((err: any) => {
    ElMessage.error(err)
  }).finally(() => {
  })
}

onMounted(() => {
  getList()
  getAll()
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

.note-manage-table {
  width: 100%;
  //min-height: 300px;
}
</style>

<style lang="less">
.dark-selected-option {
  --el-bg-color-overlay: #2523239c;
  --el-text-color-regular: #e7e8ea;
  --el-fill-color-light: #38343487;

  .el-select-dropdown__item:hover {
    background-color: #38343487;
  }
}
</style>