<template>
  <div class="test-md-container">
    <div class="note-container">
      <!--        <md-preview-component class="left-preview-container"></md-preview-component>-->
      <MdPreview class="left-preview-container" :editorId="id" :modelValue="markdown" :theme="'dark'"
                 :previewTheme="'mk-cute'"/>

      <div class="right-msg-container">
        <data-overview></data-overview>
        <div class="note-toc">
          <el-scrollbar max-height="300px">
            <MdCatalog :editorId="id" :scrollElement="scrollElement" @onClick="clickToc"/>
          </el-scrollbar>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {MdPreview, MdCatalog} from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';
import DataOverview from "./DataOverview.vue"
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
// import MdPreviewComponent from "@/components/editors/MdPreviewComponent.vue";
import emitter from '@/utils/eventBus'
import { getNoteContent, viewTracks } from "@/api/notes.ts"
import notesData from "@/data/notesData.json"
import { fetchMarkdown } from "@/utils/readMdFile.ts"

const route = useRoute()
const id = 'preview-only';
const scrollElement = document.documentElement;
const markdown = ref<string>()
const tocTitleDivList = ref<HTMLCollectionOf<HTMLElement>>()
const currHeightTitle = ref(-1)

const clickToc = (e: MouseEvent, t: any) => {
  console.log("点击目录", e, t)
  let PageId = document.getElementById(t.text)
  console.log("dddd", PageId)
  if(PageId) {
    // window.scrollTo({
    //   top: PageId.offsetTop,
    //   behavior: "smooth"
    // })
    emitter.emit('clickNoteToc', PageId.offsetTop)
  }

//   高亮
  if(!tocTitleDivList.value || !tocTitleDivList.value.length) {
    tocTitleDivList.value = document.getElementsByClassName("md-editor-catalog-link")!
  }
  console.log(("目录类"), tocTitleDivList.value)
  console.log("字节点",)
  if(currHeightTitle.value != -1) {
    tocTitleDivList.value![currHeightTitle.value].children[0].classList.remove("highlight-title")
  }
  currHeightTitle.value = Number(t.index - 1)
  tocTitleDivList.value![currHeightTitle.value].children[0].classList.add("highlight-title")

}

const getContext = (id: string) => {
  // getNoteContent("notes/getNoteContent?id=" + id).then((res)=>{
  //   if(res.status === 200){
  //     markdown.value = res.data
  //   } else {
  //     ElMessage.warning(res.msg)
  //   }
  // }).catch((err: any)=>{
  //   ElMessage.error(err)
  // }).finally(()=>{})
  (notesData as Array<{id: number, title: string}>).forEach((item) => {
    if(item.id.toString() === id) {
      fetchMarkdown(item.title).then((res: any) => {
        console.log("读取文件", res)
        markdown.value = res
      }).catch((err: any)=>{
        ElMessage.error(err)
      }).finally(()=>{})
    }
  })
}

const view = (id: number) => {
  viewTracks("notes/view", id).then((res)=>{
    if(res.status === 200){

    } else {
      ElMessage.warning(res.msg)
    }
  }).catch((err: any)=>{
    ElMessage.error(err)
  }).finally(()=>{})
}

onMounted(()=>{
  if(route.query && route.query.id) {
    getContext(String(route.query.id))
    // view(Number(route.query.id))
  }
})

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

    #preview-only {
      background-color: rgba(0, 0, 0, 0.75);
      border: 1px solid #e4e7ed;
      border-radius: 5px;
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
      backdrop-filter: blur(10px);
    }

    .right-msg-container {
      width: 300px;
      display: flex;
      flex-direction: column;
      row-gap: 15px;

      .note-toc {
        position: sticky;
        top: 10px;
        padding: 10px;

        color: #fff;
        background-color: rgba(0, 0, 0, 0.45);
        border: 1px solid #e4e7ed;
        border-radius: 5px;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
        backdrop-filter: blur(2px);
      }
    }
  }
}
</style>

<style lang="less">
.highlight-title {
  color: #01b4ff!important;
}
</style>