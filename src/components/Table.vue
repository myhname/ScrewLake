<template>
  <el-table class="table-container" :data="props.tableData" style="width: 100%" :border="props.isBorder"
            :stripe="props.isStripe">
    <el-table-column v-if="props.multiple" type="selection" width="55"></el-table-column>
    <el-table-column v-if="props.showIndex" type="index" width="55"></el-table-column>
    <template v-for="item in props.columns" :key="item">
      <el-table-column :prop="item.prop" :label="item.label" :width="item.width"
                       :align="item.prop === 'action' ? 'center' : item.align"
                       :fixed="item.prop === 'action' ? 'right' : item.fixed">
        <template v-if="item.slotName === 'Tag'" #default="scope">
          <slot :name="item.prop" :row="scope.row">
            <template v-if="typeof scope.row[item.prop] === 'object' && scope.row[item.prop].length">
              <template v-for="(tagItem, i) in scope.row[item.prop]" :key="i">
                <el-tag :type="tagItem.type ?? 'danger'"
                        effect="plain"
                        round>
                  {{ item.label ?? item }}
                </el-tag>
                <!--                <br />-->
              </template>

            </template>
            <template v-else>
              <span> - </span>
            </template>
          </slot>
        </template>
        <template v-else #default="scope">
          <slot :name="item.slotName ?? item.prop" :row="scope.row">
            {{ scope.row[item.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <el-pagination
      class="table-pagination"
      :popper-class="'table-pagination-popper'"
      v-if="props.showPage"
      v-model:current-page="props.currPage"
      v-model:page-size="props.pageSize"
      :page-sizes="[10, 20, 30, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="props.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import {ref, reactive, watch} from "vue"

interface TableConfigInterface {
  tableData: Array<any> // 数据
  columns: {
    prop: string // 键名
    label?: string // 表头显示名称
    formatter?: (row: unknown) => string // 自定义单元格格式化方法，参数为当前行数据
    tooltip?: string // 表头tooltip
    sortable?: boolean // 是否可以排序
    width?: number | string // 宽度
    slotName?: string // 自定义插槽名称
    fixed?: boolean // 是否固定在左侧或右侧
    align?: string // 对齐方式
    type?: any //
  }[]
  isBorder?: boolean // 是否带边框
  isStripe?: boolean // 斑马纹
  multiple?: boolean // 是否可多选
  showIndex?: boolean // 是否显示序号
  showPage: boolean // 是否显示分页
  currPage?: number
  pageSize?: number
  total?: number
}

const props = withDefaults(defineProps<TableConfigInterface>(), {})

// const props = defineProps({
//   tableData: Array<any>, // 数据
//   columns: Array<any>,
//   isBorder: Boolean, // 是否带边框
//   isStripe: Boolean, // 斑马纹
//   multiple: Boolean, // 是否可多选
//   showIndex: Boolean, // 是否显示序号
// })

watch(
    () => props.tableData,
    () => {
      console.log("表格列名：", props.columns)
    },
    {
      deep: true,
      immediate: true,
    }
)

const emits = defineEmits(["table-list-change"])
const handleSizeChange = () => {
  emits("table-list-change")
}
const handleCurrentChange = () => {
  emits("table-list-change")
}

</script>

<style lang="less">
.table-container {
  margin-bottom: 50px;

  --el-text-color-secondary: #a6a6a6;
  --el-bg-color: transparent;
  --el-text-color-regular: #ffffff;
  --el-fill-color-blank: transparent;
  --el-fill-color-light: rgba(0,0,0,0.4)

}

.table-pagination {
  float: right;
  margin-top: -35px;

  --el-pagination-bg-color: transparent;
  --el-text-color-regular: #ffffff;
  --el-fill-color-blank: transparent;
}

.table-pagination-popper {
  --el-color-primary: #69adf4;
  --el-fill-color-light: #38343487;
  --el-bg-color-overlay: #2523239c;
  --el-text-color-regular: #e7e8ea;
}

</style>