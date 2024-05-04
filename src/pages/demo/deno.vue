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

  <el-autocomplete
    v-model="form.address"
    :size="size"
    placeholder="请输入关键词搜索"
    :disabled="!edit || i.disabled"
    :trigger-on-focus="false"
    style="width: 275px"
    :fetch-suggestions="handleChangeAddr"
    @select="handleSelectAddr"
  >
    <template #default="{ item }">
      <span>{{ item.name }}</span>
    </template>
  </el-autocomplete>
</template>


<script>
/**
 * el-autocomplete组件
 */
const handleChangeAddr = async (val, cb) => {
  if (val) {
    // const { provinceName, cityName } = this.form;
    const data = {
      keywords: val || "",
    };
    // if (cityName || provinceName) {
    //   data.city = cityName || provinceName;
    //   data.citylimit = true;
    // }
    const res = await getAddressPoi(data);
    cb(res || []);
  } else {
    cb([]);
  }
};

/**
 * el-select组件
 */
const handleChangeCity = (val) => {
  const provinceRef = this.$refs.provinceRef?.[0] || this.$refs.provinceRef;
  const pathLabels = provinceRef?.getCheckedNodes?.()?.[0]?.pathLabels || [];
  const [provinceName, cityName, countyName] = pathLabels;
  const [provinceCode, cityCode, countyCode] = val;
  console.log("pathLabels", pathLabels);
  this.form.address = null;
  this.form.provinceCode = provinceCode;
  this.form.provinceName = provinceName;
  this.form.cityCode = cityCode;
  this.form.cityName = cityName;
  this.form.countyCode = countyCode;
  this.form.countyName = countyName;
};
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
const [data] = await Promise.all([p]);
/**
 * 覆盖下一张图片
 */
function handleExceed(files) {
  upload.value.clearFiles();
  const file = files[0];
  upload.value.handleStart(file);
}
/**
 * 根据数组对象值转对象
 */
const arr = [
  {
    bk: "qq",
    fgs: "qwe",
  },
  {
    bk: "qq",
    fgs: "2qeq",
  },
  {
    bk: "ewqe",
    fgs: "das",
  },
];
const filterArr = (arr) => {
  let data = {};
  arr.forEach((item) => {
    if (!data[item.bk]) {
      data[item.bk] = [item];
    } else {
      data[item.bk].push(item);
    }
  });
  return Object.keys(data).map((key) => {
    return {
      itemName: key,
      checked: false,
      isShow: false,
      children: data[key],
    };
  });
};
console.log("filterArr(arr): ", filterArr(arr));

/**
 * 根据数组对象值转对象
 */
</script>


<style scoped>
</style>