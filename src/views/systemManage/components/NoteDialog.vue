<template>
  <el-dialog v-if="props.showNoteDialog" v-model="props.showNoteDialog" width="50%" modal-class="note-dialog"
             @close="handleClose">
    <template #header="{ close, titleId, titleClass }">
      <div class="dialog-header">
        <h2> {{ props.type === 'add' ? '新增' : '编辑' }}笔记 </h2>
      </div>
    </template>
    <el-form
        ref="ruleFormRef"
        :model="noteForm"
        :rules="rules"
        label-width="auto"
        class="note-ruleForm"
        status-icon
    >
      <el-form-item label="标题：" prop="title">
        <el-input v-model="noteForm.title" placeholder="请输入文章标题" maxlength="20"/>
      </el-form-item>
      <el-form-item label="标签：" prop="tagsList">
        <el-select v-model="noteForm.tagsList" placeholder="请选择标签" multiple :multiple-limit="3">
          <template v-for="(item, index) in tagsList" :key="index">
            <el-option :label="item" :value="item"/>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="简介：" prop="description">
        <el-input v-model="noteForm.description" placeholder="请输入文章简介" :rows="3" type="textarea" maxlength="100"
                  show-word-limit/>
      </el-form-item>
      <el-form-item label="文章：" prop="content">
        <!--        <el-input v-model="noteForm.content" placeholder="请上传文章" />-->
        <el-upload
            ref="upload"
            v-model:file-list="fileList"
            class="upload-demo"
            action=""
            :http-request="uploadFile"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
        >
          <el-button type="primary">点击选择文件</el-button>
          <template #tip>
            <div class="el-upload__tip">
              仅支持md/txt格式文件且小于20MB
            </div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submit(ruleFormRef)" :loading="loading">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref, reactive, watch} from "vue";
import type {ComponentSize, FormInstance, FormRules, UploadInstance, UploadProps, UploadRawFile} from 'element-plus'
import {ElMessage,ElMessageBox,genFileId} from 'element-plus'
import { editNote } from "@/api/notes.ts"
// import axiosInstance from "@/utils/request/testAjax.ts"

const props = defineProps({
  showNoteDialog: {
    type: Boolean,
    required: true
  },
  type: {
    type: String,
    default: "add"
  },
  formData: {
    type: Object
  }
})

const emits = defineEmits(["update:showNoteDialog"])

interface RuleForm {
  id: number | string,
  title: string,
  tagsList: Array<string>,
  description: string,
  content: string,
}

const ruleFormRef = ref<FormInstance>()
const noteForm = reactive<RuleForm>({
  id: "",
  title: "",
  tagsList: [],
  description: "",
  content: "",
})
const rules = reactive<FormRules<RuleForm>>({
  title: {required: true, message: '请输入标题', trigger: 'blur'},
  tagsList: {required: true, message: '请选择文章分类', trigger: 'change'},
  description: {required: true, message: '请输入文章描述', trigger: 'blur'},
  content: {required: true, message: '请上传文章内容', trigger: 'blur'},
})
const loading = ref(false)
const tagsList = reactive([
  "Vue", "JS特效", "那些年，踩过的坑"
])
const fileList = ref([])
const upload = ref<UploadInstance>()

const handleClose = () => {
  reset()
  emits("update:showNoteDialog", false)
}

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  loading.value = true
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      loading.value = false
      handleClose()
    } else {
      console.log("校验失败：", Object.values(fields)[0][0].message)
      ElMessage.warning(Object.values(fields)[0][0].message)
      loading.value = false
    }
  })
  let params = {
    title: "测试.txt",
    authority: "myh",
    name: "测试文章",
    type: "txt",
    description: "测试接口",
    createTime: "2024-03-12 12:22:34",
    updateTime: "2024-03-12 12:22:34",
    url: "路径",
    commentNum: 0,
    voteUpNum: 0,
    imageUrl: null,
    tagsList: "",
    viewNum: 0,
  }
  console.log("参数：", params)
  editNote("notes/newNote", params).then((res)=>{
    if(res.status === 200) {

    } else {
      ElMessage.warning(res.msg)
    }
  }).catch((err: string)=>{
    ElMessage.error((err))
  }).finally(()=>{

  })

  // try {
  //   const response = await axiosInstance.post('/notes/newNote', params);
  //   console.log('Response:', response.data);
  //   // 处理响应数据
  // } catch (error) {
  //   console.error('Error:', error);
  //   // 处理错误
  // }

}

const reset = () => {
  noteForm.tagsList = []
  noteForm.id = ""
  noteForm.content = ""
  noteForm.title = ""
  noteForm.description = ""
  loading.value = false
}

//  ---------------- 文件上传 ----------------------
const uploadFile = () => {

}

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log("ddd", rawFile)
  let type = rawFile.name.split(".").pop()
  console.log("文件上传", type)
  if (type != 'md' && type != 'txt') {
    ElMessage.error('仅支持md/txt格式文件!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('文件大小请不要超过20MB!')
    return false
  }
  return true
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  console.log("删除", uploadFile, uploadFiles)
  return ElMessageBox.confirm(
      `是否取消上传 ${uploadFile.name} ?`
  ).then(
      () => true,
      () => false
  )
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

watch(
    () => props.showNoteDialog,
    () => {
      if (props.showNoteDialog) {
        if (props.type === 'edit') {
          Object.keys(noteForm).forEach((item) => {
            noteForm[item] = props.formData[item]
          })
        } else {
          reset()
        }
      }
    }
)

</script>

<style scoped lang="less">
.note-dialog {
  width: 70%;
  margin: auto;
}
</style>