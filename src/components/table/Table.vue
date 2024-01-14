<template>
    <div class="common-table">
        <el-table ref="CommonTableRef" v-loading="loading" :data="tableData" style="width: 100%" :row-style="{ height: '10px', color: '#a6aca6' }" row-key="id" default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" @selection-change="handleSelectionChange"
            v-bind="childrenProps" :empty-text="emptyText">
            <el-table-column v-if="showSelecColumn" type="selection" align="center"
                :selectable="selectable"></el-table-column>
            <el-table-column v-if="showIndex" type="index" label="序号" width="60" fixed :align="'center'" />
            <template v-for="(propItem, index) in <PropListItemType[]>propList" :key="propItem.prop" :data-index="index">
                <el-table-column v-bind="propItem" :show-overflow-tooltip="propItem.showTooltip" :fixed="propItem.fixed"
                    :prop="propItem.prop" :align="propItem.prop === 'action' ? 'center' : propItem.align">
                    <template v-if="propItem.type === 'Link'" #default="scope">
                        <slot :name="propItem.slotName" :row="scope.row">
                            <span class="t-link" @click="tLink(scope.row, scope)">
                                {{ scope.row[propItem.prop] }}
                            </span>
                        </slot>
                    </template>
                    <template v-else-if="propItem.type === 'Tag'" #default="{ row }">
                        <slot :name="propItem.type" :row="row">
                            <el-tag round v-if="Object.prototype.toString.call(propItem.typeObj) === '[object Object]'"
                                :type="propItem?.typeObj?.type" :effect="propItem?.typeObj?.effect"
                                :class="'t-tag--' + propItem?.typeObj?.type">
                                {{ row[propItem.prop] }}
                            </el-tag>
                            <el-tag round v-else class="t-tag-default" :type="row.tagType || ''">{{ row[propItem.prop]
                                }}</el-tag>
                        </slot>
                    </template>
                    <template v-else-if="propItem.type === 'Switch'" #default="{ row }">
                        <slot :name="propItem.slotName" :row="row">
                            <el-switch v-model:value="row[propItem.prop]" class="t-switch"
                                @click="tSwitch(row, propItem.prop)" />
                        </slot>
                    </template>
                    <template v-else #default="scope">
                        <slot :name="propItem.slotName" :row="scope.row" :scope="scope">
                            {{ scope.row[propItem.prop] }}
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <el-pagination v-if="showTablePage" class="pagination" layout="total,sizes,prev,pager,next,jumper"
            v-model:current-page="page.currentPage" v-model:page-size="page.pageSize" :total="total"
            :page-sizes="[10, 30, 50, 100, 500]" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const CommonTableRef = ref(null)
interface PropListItemType {
    label: string,
    prop: string,
    slotName?: string,
    width?: number,
    fixed?: string | boolean,
    align?: string,
    type?: string, // Link Tag Switch AttrBtn Result
    typeObj?: { type?: string, effect?: string },
    showTooltip?: boolean,
}

interface Props {
    tableData: object[],
    propList: PropListItemType[],
    loading?: boolean,
    showSelecColumn?: boolean,
    showIndex?: boolean,
    showTablePage?: boolean,
    total?: number,
    page?: {
        currentPage: string | number,
        pageSize: string | number
    },
    childrenProps?: object,
    attValueListTip?: string,
    // maxHeight?: string,
    emptyText?: string,
}
const props = withDefaults(defineProps<Props>(), {
    tableData: () => [],
    propList: () => [],
    loading: false,
    showSelecColumn: false,
    showIndex: false,
    showTablePage: true,
    total: 1,
    page: () => ({
        currentPage: 1,
        pageSize: 10
    }),
    childrenProps: () => ({}),
    attValueListTip: '',
    // maxHeight: '600px',
    showTooltip: true,
    emptyText: "暂无数据"
});
const emits = defineEmits([
    "update:page",
    "tableListChange",
    "handleSelectionChange",
    "tLink",
    "tSwitch",
]);

const handleSelectionChange = (value: []) => {
    emits("handleSelectionChange", value);
};
const selectable = (row: { disabled?: boolean }) => {
    if (!!row?.disabled) {
        return false;
    } else {
        return true;
    }
};


const tLink = (row: object, scope: object) => {
    emits("tLink", row, scope);
};
const tSwitch = (row: { [key: string]: boolean | string | number }, key: string) => {
    // row[key] = !row[key];
    emits("tSwitch", row, key);
};



//分页导航
const handleCurrentChange = (currentPage: number | string) => {
    props.page.currentPage = currentPage;
    emits("tableListChange");
};
//切换分页条数
const handleSizeChange = (pageSize: number | string) => {
    props.page.currentPage = 1;
    props.page.pageSize = pageSize;
    emits("tableListChange");
};

defineExpose({
    CommonTableRef,
});
</script>

<style scoped>
.el-table {
    --el-table-border-color: transparent;
    --el-table-border: none;
    --el-table-text-color: #bdbdbe;
    --el-table-header-text-color: #bdbdbe;
    --el-table-row-hover-bg-color: transparent;
    --el-table-current-row-bg-color: transparent;
    --el-table-header-bg-color: transparent;
    --el-table-bg-color: transparent;
    --el-table-tr-bg-color: transparent;
    --el-table-expanded-cell-bg-color: transparent;
}

.icon_name {
    width: 1em;
    height: 1em;
    color: #cac7c7;
    margin-left: 5px;
    vertical-align: middle;
}

.t-link {
    color: #409eff;
}

.t-link:hover {
    cursor: pointer;
    text-decoration: underline;
}

.pagination {
    padding: 10px 0;
    float: right;
}

::v-deep .el-table__cell {
    color: #515a6e;
}

.width_50 {
    display: inline-block;
    width: 50px;
}

.icon_style {
    width: 1em;
    height: 1em;
    vertical-align: middle;
}

.color_green {
    color: rgb(24, 206, 24);
}

.color_red {
    color: rgb(245, 35, 35);
}

.el-tag {
    min-width: 45px;
}
</style>