<template>
  <div class="notes-container">
    <!--  TODO: 留作用于背景特效的渲染  -->
    <div class="ground-effects"></div>
    <!--   目录主体列表   -->
    <div class="toc-main">
      <div class="left-person-msg card-item" id="leftPersonMsg"></div>
      <div class="notes-toc-box card-item">
        <template v-for="(note, index) in notesList" :key="note.id">
          <div class="note-item" :style="note.flexDirection">
            <div class="note-img">
              <div class="img-item" :style="'background-image: url(' + note.coverImg + ');'"></div>
            </div>
            <div class="note-cover">
              <div class="note-msg">
                <p class="note-title">
                  {{ note.title }}
                </p>
                <span class="create-time"> 创建时间: {{ note.createTime }}</span>
              </div>
              <!-- 感觉也没必要弄一个显示 -->
              <div class="note-description">
                {{ note.description }}
              </div>
              <div class="note-tags">
                <el-tag v-for="(tag, tagIndex) in note.tags" class="note-tag" :key="tagIndex"
                        :color="tag.backgroundColor" :style="'color: ' + tag.color + ';'" effect="light" round @click="clickNoteTag(tag.label)">
                  {{ tag.label }}
                </el-tag>
              </div>
            </div>
          </div>
        </template>
      </div>
      <!--   右侧粘性定位，座右铭等个性信息   -->
      <div class="right-sticky">
        <div class="flow-cnt card-item"></div>
        <div class="motto card-item" id="mottoCard"></div>
        <div class="contact-information card-item"></div>
      </div>
    </div>
    <div class="bottom-msg"></div>
    <!--   TODO: 右下角桌宠   -->
    <div class="desktop-pet-box"></div>
    <!--   TODO: 左下角音乐播放器   -->
    <div class="player-box"></div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onBeforeUnmount, ref} from "vue";

interface NoteList {
  id: number
  title: string
  coverImg: string
  description: string
  createTime: string
  updateTime: string
  tags: Array<{
    label: string
    color: string
    backgroundColor: string
  }>
  isOmit?: boolean
  flexDirection?: string
}

const notesList = ref<Array<NoteList>>([
  {
    id: 1,
    title: "样例1",
    coverImg: "/src/assets/image/bg1.jpg",
    description:
        "布局样式的示例，写两套啊得，不急xwxwhw",
    createTime: "2024-01-31 10:30:21",
    updateTime: "2024-01-31 14:28:21",
    tags: [
      { label: "测试", color: "rgba(230, 162, 60)", backgroundColor: "rgba(230, 162, 60, 0.2)" },
      { label: "样例", color: "rgba(79, 166, 255)", backgroundColor: "rgba(79, 166, 255, 0.2)" },
    ],
  },
  {
    id: 2,
    title: "样例2",
    coverImg: "/src/assets/image/ta.jpg",
    description: "布局样式的示例，写两套啊得，不急",
    createTime: "2024-01-31 10:30:21",
    updateTime: "2024-01-31 14:28:21",
    tags: [
      { label: "测试", color: "rgba(230, 162, 60)", backgroundColor: "rgba(230, 162, 60, 0.2)" },
      { label: "样例", color: "rgba(79, 166, 255)", backgroundColor: "rgba(79, 166, 255, 0.2)" },
    ],
  },
])

const initNoteList = () => {
  notesList.value.forEach((note, index) => {
    note.isOmit = note.description.length > 200;
    if(index % 2 === 0) {
      note.flexDirection = "flex-direction: row;"
    } else {
      note.flexDirection = "flex-direction: row-reverse;"
    }
  })
}

const clickNoteTag = (tagLabel: string) => {
  console.log("点击标签：", tagLabel)
}

onMounted(()=>{
  initNoteList()
})
</script>

<style scoped lang="less">
.card-item {
  min-height: 400px;
  //(190, 190, 190, .5)
  background-color: rgba(51, 54, 61, 0.35);
  border: 1px solid #e4e7ed;
  border-radius: 5px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
}

.notes-container {
  position: relative;

  .left-person-msg {
    position: sticky;
    top: 10px;
    //position: fixed;
    //top: 95px;
    left: 8%;
    width: 300px;
    height: 500px;
  }

  .toc-main {
    width: 80%;
    margin: 0 auto;
    padding-top: 10px;
    display: flex;
    column-gap: 15px;
    //background-color: rgba(129, 119, 127, 0.40);

    .notes-toc-box {
      flex: 1;
      min-height: 1230px;
      padding: 15px 10px;
      display: flex;
      flex-direction: column;
      row-gap: 15px;

      .note-item {
        height: 150px;
        display: flex;
        position: relative;

        &:hover {
          background-color: #ababab4a;
          box-shadow: 0 0 10px #cbcbcb;
        }

        .note-img {
          width: 40%;
          position: relative;
          overflow: hidden;

          .img-item {
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-position: center top;
            background-size: cover;
            transition: transform 1s ease-in-out;

            &:hover {
              transform: scale(1.2);
            }
          }
        }

        .note-cover {
          flex: 1;
        }
      }
    }

    .right-sticky {
      width: 300px;
      display: flex;
      flex-direction: column;
      row-gap: 15px;

      .contact-information {
        position: sticky;
        top: 10px;
      }
    }
  }

  .bottom-msg {
    height: 50px;
    margin-top: 15px;
    background-color: black;
  }
}

.ground-effects {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
}
</style>