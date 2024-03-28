<template>
  <div class="notes-container">
    <!--  TODO: 留作用于背景特效的渲染  -->
    <div class="ground-effects"></div>
    <!--   目录主体列表   -->
    <div class="toc-main">
      <div class="left-person-msg card-item" id="leftPersonMsg"></div>
      <div class="notes-toc-box card-item">
        <template v-for="(note, index) in notesList" :key="note.id">
          <div class="note-item" :id="'noteItem' + index" :style="note.flexDirection">
            <div class="note-img">
              <div class="img-item" :style="'background-image: url(' + note.coverImg + ');'"></div>
            </div>
            <div class="note-cover">
              <p class="note-title">
                {{ note.title }}
              </p>
              <div class="note-msg">
                <div class="note-time">
                  <el-icon><Calendar /></el-icon>
                  <span class="create-time"> {{ note.createTime }}</span>
                </div>
                <div class="note-statistics">
                  <EyeOutlined />
                  <span> {{ note.statistics[0].value }} |</span>
                  <MessageOutlined />
                  <span> {{ note.statistics[1].value }} |</span>
                  <LikeOutlined />
                  <span> {{ note.statistics[2].value }} </span>
                </div>
              </div>
              <div class="note-description">
                {{ note.description }}
              </div>
              <div class="note-tags">
                <TagsOutlined />
                <template  v-for="(tag, tagIndex) in note.tags" :key="tagIndex">
                  <span class="tag-item"> #{{ tag.label }} </span>
                </template>
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
import { EyeOutlined, MessageOutlined, LikeOutlined, TagsOutlined } from '@ant-design/icons-vue';

interface NoteList {
  id: number
  title: string
  coverImg: string
  description: string
  createTime: string
  updateTime: string
  tags: Array<LabelData>
  isOmit?: boolean
  flexDirection?: string
  statistics: Array<LabelData>
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
    statistics: [
      { label: "浏览", value: 123, icon: ""},
      { label: "回复", value: 456, icon: ""},
      { label: "点赞", value: 111, icon: ""},
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
    statistics: [
      { label: "浏览", value: 123, icon: ""},
      { label: "回复", value: 456, icon: ""},
      { label: "点赞", value: 111, icon: ""},
    ],
  },
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
    statistics: [
      { label: "浏览", value: 123, icon: ""},
      { label: "回复", value: 456, icon: ""},
      { label: "点赞", value: 111, icon: ""},
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
    statistics: [
      { label: "浏览", value: 123, icon: ""},
      { label: "回复", value: 456, icon: ""},
      { label: "点赞", value: 111, icon: ""},
    ],
  },
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
    statistics: [
      { label: "浏览", value: 123, icon: ""},
      { label: "回复", value: 456, icon: ""},
      { label: "点赞", value: 111, icon: ""},
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
    statistics: [
      { label: "浏览", value: 123, icon: ""},
      { label: "回复", value: 456, icon: ""},
      { label: "点赞", value: 111, icon: ""},
    ],
  },
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
    statistics: [
      { label: "浏览", value: 123, icon: ""},
      { label: "回复", value: 456, icon: ""},
      { label: "点赞", value: 111, icon: ""},
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
    statistics: [
      { label: "浏览", value: 123, icon: ""},
      { label: "回复", value: 456, icon: ""},
      { label: "点赞", value: 111, icon: ""},
    ],
  },
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
    statistics: [
      { label: "浏览", value: 123, icon: ""},
      { label: "回复", value: 456, icon: ""},
      { label: "点赞", value: 111, icon: ""},
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
    statistics: [
      { label: "浏览", value: 123, icon: ""},
      { label: "回复", value: 456, icon: ""},
      { label: "点赞", value: 111, icon: ""},
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

/**
 * 监听元素是否进出可视区域
 */
const intersectionObserver = new IntersectionObserver((entries, observer)=>{
  console.log("检测可视区域：", entries, "右侧第二个元素", observer)
  entries.forEach(item => {
    console.log("变化：", item.isIntersecting, item.target, item.target.classList )
    if(item.isIntersecting) {
      item.target.className += " xx"
      item.target.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
      item.target.style.opacity = 1
      item.target.style.transition = "transform .6s ease-in-out, opacity .6s ease-in-out"
    } else {
      item.target.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 10, 0, 1)"
      item.target.style.opacity = 0
    }
  })
})

onMounted(()=>{
  initNoteList()

  let targets: HTMLCollectionOf<Element> = document.getElementsByClassName("note-item")
  console.log("获取元素：", targets, targets[0] )
  for (let i in targets){
    console.log(targets[i], targets[i] instanceof HTMLElement)
    if(targets[i] instanceof HTMLElement) {
      intersectionObserver.observe(targets[i])
    }
  }
})

onBeforeUnmount(()=>{
  intersectionObserver.disconnect()
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
          padding: 0 10px;
          display: flex;
          flex-direction: column;

          .note-title {
            margin: 0;
            font-size: 1.2rem;
            font-weight: 600;
            line-height: 30px;
          }

          .note-msg {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            margin: 5px 0;

            .note-time {
              display: flex;
              flex-direction: row;
              align-items: center;
              column-gap: 3px;
            }

            .note-statistics {
              display: flex;
              flex-direction: row;
              align-items: center;
              column-gap: 3px;
            }
          }

          .note-description {
            flex: 1;
            padding: 5px;
            text-indent: 2rem;
          }

          .note-tags {
            display: flex;
            flex-direction: row;
            margin-bottom: 5px;
            font-size: 14px;
            column-gap: 7px;
            letter-spacing: 1px;

            .tag-item:hover {
              color: #5ebbe4;
            }
          }
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