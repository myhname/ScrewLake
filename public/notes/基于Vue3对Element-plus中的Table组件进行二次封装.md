# 基于Vue3对Element-plus中的Table组件进行二次封装

- 个人学习使用，记录学习过程

## 一、项目环境

- Vue.js：3.3.11
- Vite：5.0.8
- typescript：5.2.2
- element-plus：2.4.4

## 二、封装实践

element-plus的具体使用参数配置相见：[官网链接](https://element-plus.org/zh-CN/component/table.html)

封装之前首先要明确我们期望封装好的Table组件有什么样的效果：

1. 动态列
2. 根据情景需求有不同的样式表现（序号、边框等）
3. 特殊列有特殊显示（比如说按钮、标签链接等）
4. 具备分页效果

一条一条来看

### 1. 动态列

动态实际上是子组件可以通过处理父组件传入的参数，利用循环、模板等语法来渲染页面元素，因此我们期望有动态效果的部分需要依赖父组件的传参，也就是说我们需要在父组件中编辑好el-table-column的各项属性，作为参数传入Table组件，在Table组件中循环渲染，生成我们期望的列。

el-table-column至少需要prop和label两个属性，可以根据需要选配width、align等属性，基于此，实现如下：

- HTML部分

```html
<el-table class="table-container" :data="props.tableData" style="width: 100%">
  <template v-for="item in props.columns" :key="item">
    <el-table-column :prop="item.prop" :label="item.label" :width="item.width"
                       :align="item.prop === 'action' ? 'center' : item.align"
                       :fixed="item.prop === 'action' ? 'right' : item.fixed">
    </el-table-column>
  </template>
</el-table>
```

- TS部分

```ts
interface TableConfigInterface {
  tableData: Array<any> // 数据
  columns: {
    prop: string // 键名
    label?: string // 表头显示名称
    width?: number | string // 宽度
    fixed?: boolean // 是否固定在左侧或右侧
    align?: string // 对齐方式
  }[]
}

const props = withDefaults(defineProps<TableConfigInterface>(), {})
```

- 可以通过withDefaults中定义部分参数的初始值，这样就不需要每次都传入所有需要的样式参数了

### 2. 根据情景需求有不同的样式表现

这部分我们期望能方便自由的改变表格的样式，因此需要在Props中增加关于边框、序号等属性，实现如下：

- HTML部分

```html
<el-table class="table-container" :data="props.tableData" style="width: 100%" :border="props.isBorder" :stripe="props.isStripe">
<!-- 序号和多选列中的内容大多数场景下都是固定的，因此可以直接在循环渲染之前定义两列 -->
  <el-table-column v-if="props.multiple" type="selection" width="55"></el-table-column>
  <el-table-column v-if="props.showIndex" type="index" width="55"></el-table-column>
  <template v-for="item in props.columns" :key="item">
    <el-table-column :prop="item.prop" :label="item.label" :width="item.width"
                       :align="item.prop === 'action' ? 'center' : item.align"
                       :fixed="item.prop === 'action' ? 'right' : item.fixed">
    </el-table-column>
  </template>
</el-table>
```

- TS部分

```ts
interface TableConfigInterface {
  tableData: Array<any> // 数据
  columns: {
    prop: string // 键名
    label?: string // 表头显示名称
    width?: number | string // 宽度
    fixed?: boolean // 是否固定在左侧或右侧
    align?: string // 对齐方式
    tooltip?: string // 表头tooltip
    sortable?: boolean // 是否可以排序
    formatter?: (row: unknown) => string // 自定义单元格格式化方法，参数为当前行数据
    type?: any // 定义组件样式的相关属性
  }[]
  isBorder?: boolean // 是否带边框
  isStripe?: boolean // 斑马纹
  multiple?: boolean // 是否可多选
  showIndex?: boolean // 是否显示序号
}
```

- 如果期望有其它属性，请自行参阅官网文档补成
- 其实还能有更多的个性化设置，但是封装组件更考虑通用性，如果为了诸如序列号不连续等需求去增加Tabl组件的代码量和逻辑复杂度，不如在特殊场景下单独写或封装专用组件，这样实际上更有利于后续代码维护或迭代

### 3. 特殊列有特殊显示

首先，我们要有一个字段来标识特殊列，这类采用slotName字段，相对语义化的表明我们使用使用特殊的插槽来渲染html模板

- HTML部分

```html
<!-- 以Tag为例 -->
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
```

- TS部分：

```ts
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
```

### 4. 具备分页效果

这个很简单，加个element-plus的分页组件即可

- html部分：

```html
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
```

- TS部分：

```ts
// props中
showIndex?: boolean // 是否显示序号
showPage: boolean // 是否显示分页
currPage?: number
pageSize?: number
total?: number

// 分页操作之后要重新请求数据，这部分操作在父组件中，因此涉及子传父的事件
const emits = defineEmits(["table-list-change"])
const handleSizeChange = () => {
  emits("table-list-change")
}
const handleCurrentChange = () => {
  emits("table-list-change")
}
```

## 三、总结

整体来说还是一个比较简单、常用的封装实现，也没有太多需要语言去描述、梳理的逻辑，如果还需要一些个性化的设计可以自行修改。整体代码实现如下：

- html部分：

```html
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
```

- TS部分：

```ts
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
```

css大家就自己去写吧
