<template>
  <el-tree
    ref="treeRef"
    class="filter-tree"
    :data="state.data"
    :props="state.defaultProps"
    default-expand-all
    :filter-node-method="filterNode"
    @node-click="checkDeptId"
  >
    <!-- <template #default="{ node, data }">
      <span class="custom-tree-node">
        <span>{{ node.label }}</span>
        <i v-if="data.isLock" class="yun-iconfont icon-lock" />
      </span>
    </template> -->
  </el-tree>
</template>


<script>
/**
 * el-tree组件
 */
const state = reactive({
  defaultProps: {
    children: "children",
    label: "name",
  },
  treeRef: null,
  data: [],
  deptId: "",
});
const filterNode = (value, data) => {
  if (!value) return true;
  return data.name.indexOf(value) !== -1;
};
const checkDeptId = (row) => {
  state.deptId = row.id;
};

/**
 * if-else-if
 */
const columns = computed(() => {
  if (props.isWarehouse) {
    return [
      {
        label: "货主货品编码",
        prop: "shipperGoodsCode",
        width: 180,
      },
    ];
  }
  return [
    {
      label: "货主货品编码",
      prop: "skuCode",
    },
  ];
});
/**
 * 去除表单空字符串
 */
const getSearchData = () =>
  Object.keys(form.value).reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: form.value[curr] || undefined,
    }),
    {}
  );
/**
 * Promise.all
 */
const p = new Promise((resolve, reject) => {
  http(params)
    .then((res) => {
      resolve(res);
    })
    .catch(() => {
      reject();
    });
});
/**
 * 覆盖下一张图片
 */

function handleExceed(files) {
  upload.value.clearFiles();
  const file = files[0];
  upload.value.handleStart(file);
}

const [data] = await Promise.all([p]);
</script>


<style scoped>
</style>