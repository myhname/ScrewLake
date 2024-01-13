<template>
  <div>ant-design-vue 封装table</div>
  <!--  -->
</template>

<script setup lang="ts">
// columns: [
//           // {
//           // 	title: '',
//           // 	dataIndex: 'icon',
//           // 	// key: 'icon',
//           // 	width: 50,
//           // 	align: 'center',
//           // 	scopedSlots: { customRender: 'icon' },
//           // },
//           {
//             title: '看板名',
//             dataIndex: 'name',
//             // key: 'name',
//             width: 300,
//             // ellipsis: true, // 伸缩列过小时省略号显示
//             align: 'center',
//             scopedSlots: {customRender: 'name'}
//           },
//           {
//             title: '查询VIN',
//             dataIndex: 'vin',
//             // key: 'vin',
//             // width: 150,
//             align: 'center'
//           },
//           {
//             title: '更新时间',
//             dataIndex: 'updateTime',
//             // key: 'updateTime',
//             // width: 120,
//             align: 'center'
//           },
//           {
//             title: '创建时间',
//             dataIndex: 'createTime',
//             // key: 'createTime',
//             // width: 120,
//             align: 'center'
//           },
//           {
//             title: '创建人',
//             dataIndex: 'realName',
//             // key: 'userName',
//             // width: 100,
//             align: 'center'
//           },
//           {
//             title: '操作',
//             dataIndex: 'action',
//             // key: 'action',
//             width: 400,
//             align: 'center',
//             // fixed: 'right',
//             scopedSlots: {customRender: 'action'}
//           }
//         ],
</script>

<style scoped lang="less"></style>
<!-- <div class="table-content">
  <a-table class="board-table" :columns="columns" :data-source="tableData" :rowKey="(record, index) => index"
           :pagination="pagination" :scroll="{ y: tableY }" :loading="loading">
    <template slot="name" slot-scope="text, record">
      <div class="board-name-box" @mousemove="showChangeName(record)" @mouseout="hiddenChangeName(record)">
        <div class="status-icon">
          <a-icon v-if="record.topSort" type="vertical-align-top"/>
          <a-icon v-if="record.isLock" type="lock"/>
        </div>
        这里会超长，这个不能用简单的span -->
        <!-- <div v-if="!record.isChangeName" class="board-name">
          <a-tooltip>
            <template slot="title">
              {{ record.name }}
            </template>
            {{ record.name }}
          </a-tooltip>
        </div>
        <a-input v-else v-model="record.name" class="board-name-input" :maxLength="100"
                 @pressEnter="changeBoardName(record)"/>
        <div class="operation-icon">
          <a-icon v-show="record.isChangableName && !record.isChangeName && record.showChangeName" class="edit-btn"
                  type="edit" @click="startChangeBoardName(record)"/>
          <a-icon v-show="record.isChangeName" type="save" @click="changeBoardName(record)"/>
          <a-icon v-show="record.isChangeName" class="cancel-icon" type="close-circle"
                  @click="cancelChangeName(record)"/>
        </div>
      </div>
    </template>
    <template slot="action" slot-scope="text, record">
      <a-button type="link" @click="checkBroad(record)">查看</a-button>
      <a-divider type="vertical"/>
      <a-button type="link" @click="boardChangeTop(record)">{{ record.topSort ? '取消置顶' : '置顶' }}</a-button>
      <a-divider v-if="record.isOwner" type="vertical"/>
      <a-button v-if="record.isOwner" type="link" @click="boardChangeLock(record)">{{
          record.isLock ? '取消锁定' : '锁定'
        }}
      </a-button>
      <a-divider v-if="record.isDeletable" type="vertical"/>
      <a-popconfirm v-if="record.isDeletable" :title="record.deleteTitle" ok-text="是" cancel-text="否"
                    :overlay-class-name="isDarkBg ? 'canoe-share-confirm confirm-dark' : 'canoe-share-confirm'"
                    placement="right" @confirm="deleteCurrBoard(record)">
        <a-button type="link">删除</a-button>
      </a-popconfirm>
    </template>
  </a-table>
</div> -->