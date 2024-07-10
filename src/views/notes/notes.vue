<template>
  <div class="notes-container">
    <!--  TODO: 留作用于背景特效的渲染  -->
    <div class="ground-effects"></div>
    <!--   目录主体列表   -->
    <div class="toc-main">
      <data-overview></data-overview>
      <div class="notes-toc-box card-item" id="noteListBox">
        <template v-for="(note, index) in notesList" :key="note.id">
          <div class="note-item" :id="'noteItem' + index" :style="note.flexDirection" @click="showNote(note)">
            <div class="note-img">
              <div class="img-item" :style="'background-image: url(' + note.coverImg + ');'"></div>
            </div>
            <div class="note-cover">
              <p class="note-title font-2">
                {{ note.title }}
              </p>
              <div class="note-msg font-4">
                <div class="note-time">
                  <el-icon>
                    <Calendar/>
                  </el-icon>
                  <span class="create-time"> {{ note.createTime }}</span>
                </div>
                <div class="note-statistics">
                  <EyeOutlined/>
                  <span> {{ note.statistics[0].value }} |</span>
                  <MessageOutlined/>
                  <span> {{ note.statistics[1].value }} |</span>
                  <LikeOutlined/>
                  <span> {{ note.statistics[2].value }} </span>
                </div>
              </div>
              <div class="note-description font-3">
                {{ note.description }}
              </div>
              <div class="note-tags">
                <TagsOutlined/>
                <template v-for="(tag, tagIndex) in note.tags" :key="tagIndex">
                  <span class="tag-item"> #{{ tag.label }} </span>
                </template>
              </div>
            </div>
          </div>
        </template>
      </div>
      <!--   右侧粘性定位，座右铭等个性信息   -->
      <div class="right-sticky">
        <div class="recent-dynamic card-item">
          <recent-dynamic/>
        </div>
        <div class="flow-cnt card-item">
          <div class="technology-tags">
            <word-cloud/>
          </div>
          <div class="technology-title">
            <art-word-by-echarts :id="'artWordTechnology'" :context="'聚沙成塔'" :font-size="45"/>
          </div>
        </div>
        <!--        <div class="motto card-item" id="mottoCard"></div>-->
        <!--        <div class="contact-information card-item"></div>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onBeforeUnmount, ref, reactive} from "vue";
import {EyeOutlined, MessageOutlined, LikeOutlined, TagsOutlined} from '@ant-design/icons-vue';
import router from "@/router";
import WordCloud from "@/views/notes/components/WordCloud.vue";
import ArtWordByEcharts from "@/views/notes/components/ArtWordByEcharts.vue";
import RecentDynamic from "@/views/notes/components/RecentDynamic.vue";
import DataOverview from "@/views/notes/components/DataOverview.vue";
import {computeRunTime} from "@/utils/timeCompute.ts"
import {createStarCanvas, stopMouseMoveStar} from "@/utils/mouseMoveStar.ts"
import {getNotesList} from "@/api/notes.ts"
import {ElMessage} from "element-plus";
import notesData from "@/data/notesData.json"

const runTime = ref("")
let timer: null | number = null
const fromTime = new Date("2024-04-02 00:00:00").getTime()

const notesList = ref<Array<NoteList>>([
  // {
  //   id: 1,
  //   title: "样例1",
  //   coverImg: "/src/assets/image/bg1.jpg",
  //   description:
  //       "布局样式的示例，写两套啊得，不急xwxwhw",
  //   createTime: "2024-01-31 10:30:21",
  //   updateTime: "2024-01-31 14:28:21",
  //   tags: [
  //     {label: "测试", color: "rgba(230, 162, 60)", backgroundColor: "rgba(230, 162, 60, 0.2)"},
  //     {label: "样例", color: "rgba(79, 166, 255)", backgroundColor: "rgba(79, 166, 255, 0.2)"},
  //   ],
  //   statistics: [
  //     {label: "浏览", value: 123, icon: ""},
  //     {label: "回复", value: 456, icon: ""},
  //     {label: "点赞", value: 111, icon: ""},
  //   ],
  // },
])

const initNoteList = () => {
  notesList.value.forEach((note, index) => {
    note.isOmit = note.description.length > 200;
    if (index % 2 === 0) {
      note.flexDirection = "flex-direction: row;"
    } else {
      note.flexDirection = "flex-direction: row-reverse;"
    }
  })

  let height = 20 + notesList.value.length * 180
  let noteTopDom = document.getElementById("noteListBox")
  if (noteTopDom && height > 1230) {
    noteTopDom.style.height = height + 'px'
  }
}

const clickNoteTag = (tagLabel: string) => {
  console.log("点击标签：", tagLabel)
}

/**
 * 监听元素是否进出可视区域
 */
const intersectionObserver = new IntersectionObserver((entries, observer) => {
  console.log("检测可视区域：", entries, "右侧第二个元素", observer)
  entries.forEach(item => {
    console.log("变化：", item.isIntersecting, item.target, item.target.classList)
    if (item.isIntersecting) {
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

const showNote = (data: NoteList) => {
  router.push("/ScrewLake/notes/showMd?id=" + data.id)
}

const getList = () => {
  let params = {
    title: "",
    tagsList: [],
    status: 1,
    pageSize: 5000,
    currPage: 1,
  }
  // getNotesList("notes/getNotes", params).then((res) => {
  //   if (res.status === 200) {
  //     notesList.value = []
  //     res.data.forEach((item: any) => {
  //       let currTags = [] as Array<LabelData>
  //       let arr = item.tagsList.toString().split(",")
  //       arr.forEach((tag: string) => {
  //         currTags.push({
  //           label: tag,
  //           color: "rgba(230, 162, 60)",
  //           backgroundColor: "rgba(230, 162, 60, 0.2)"
  //         })
  //       })
  //       let imgUrl = import.meta.env.VITE_BASE_IMG_PATH
  //       if(item.imageUrl) {
  //         imgUrl += item.imageUrl
  //       } else {
  //         imgUrl += "uploads/noteImg/default.jpg"
  //       }
  //       notesList.value.push({
  //         id: item.id,
  //         title: item.title,
  //         coverImg: imgUrl,
  //         description: item.description,
  //         createTime: item.createTime,
  //         updateTime: item.updateTime,
  //         tags: currTags,
  //         statistics: [
  //           {label: "浏览", value: item.viewNum, icon: ""},
  //           {label: "回复", value: item.commentNum, icon: ""},
  //           {label: "点赞", value: item.voteNum, icon: ""},
  //         ]
  //       })
  //     })
  //   } else {
  //     ElMessage.warning(res.msg)
  //   }
  // }).catch((err: any) => {
  //   ElMessage.error(err)
  // }).finally(() => {
  //   initNoteList()
  //   startIntersectionObserver()
  // })

  notesList.value = notesData as Array<NoteList>
  initNoteList()
  startIntersectionObserver()
}

const startIntersectionObserver = () => {
  let targets: HTMLCollectionOf<Element> = document.getElementsByClassName("note-item")
  console.log("获取元素：", targets, targets[0])
  for (let i in targets) {
    console.log(targets[i], targets[i] instanceof HTMLElement)
    if (targets[i] instanceof HTMLElement) {
      intersectionObserver.observe(targets[i])
    }
  }
}

onMounted(() => {
  getList()
  createStarCanvas()

  if (!timer) {
    timer = setInterval(() => {
      runTime.value = computeRunTime(fromTime)
    }, 1000)
  }

})

onBeforeUnmount(() => {
  intersectionObserver.disconnect()
  if (timer) {
    clearInterval(timer)
  }
  stopMouseMoveStar()
})

</script>

<style scoped lang="less">

.notes-container {
  position: relative;
  color: #fffdef;

  .toc-main {
    width: 80%;
    margin: 0 auto;
    padding-top: 10px;
    display: flex;
    column-gap: 15px;
    padding-bottom: 15px;
    //background-color: rgba(129, 119, 127, 0.40);

    .notes-toc-box {
      flex: 1;
      min-height: 1230px;
      padding: 20px 15px;
      display: flex;
      flex-direction: column;
      row-gap: 30px;
      //color: #ddd;

      .note-item {
        height: 150px;
        display: flex;
        position: relative;
        //border: 1px solid;
        //border-radius: 5px;
        //overflow: hidden;

        &::after {
          content: "";
          width: 100%;
          height: 1px;
          position: absolute;
          left: 0;
          bottom: -15px;
          background-color: #e4e7ed;
        }

        &:hover {
          background-color: #ababab4a;
          box-shadow: 0 0 10px #cbcbcb;
        }

        .note-img {
          width: 40%;
          position: relative;
          border-radius: 5px;
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
            //font-size: 1.2rem;
            //font-weight: 600;
            line-height: 30px;
          }

          .note-msg {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            //font-size: 12px;
            margin: 5px 0;
            color: #dcd7d7;

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
            padding: 5px 0;
            //text-indent: 2rem;
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

      .card-item:last-child {
        position: sticky;
        top: 10px;
      }

      .recent-dynamic {
        height: 310px;
      }

      .flow-cnt {
        height: 250px;
        display: flex;
        flex-direction: column;

        .technology-tags {
          flex: 1;
        }

        .technology-title {
          height: 60px;
          background-color: rgba(255, 255, 255, 0.1);
          border-top: 1px solid #838181;
          border-radius: 3px;
        }

      }
    }
  }

}

.ground-effects {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
}
</style>