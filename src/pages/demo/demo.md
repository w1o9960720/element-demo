## 修改对象中某一个key的值 
let res = {
  enfUrl: "sdfs",
  sadas: "eqe",
  sdfsfUrl: "erwr",
};
Object.keys(res).forEach((key) => {
  const temp = res[key];
  if (key.endsWith("Url")) {
    if (temp) {
      res[key] = JSON.parse(temp);
    } else {
      res[key] = [];
    }
  }
});
console.log("res: ", res);

## 遍历key成为标准键值对 

const fn = (obj) => {
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    const first = obj[key];
    const keys2 = Object.keys(first);
    keys2.forEach((key2) => {
      const second = first[key2];
      const keys3 = Object.keys(second);
      keys3.forEach((key3) => {
        state.rules[type].push({
          label: `${key}-[${key2}]-${key3}`,
          value: second[key3].map((v) => v.id),
        });
      });
    });
  });
};



 ##  根据数组对象值转对象(分类)
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


##  if-else-if

const columns = computed(() => {
  if (h) {
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

## 去除表单空字符串

const getSearchData = () =>
  Object.keys(form.value).reduce(
    (prev, curr) => ({
      ...prev,
      "[curr]": form.value[curr] || undefined,
    }),
    {}
  );

## Promise.all并发请求

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

## upload组件覆盖下一张图片
function handleExceed(files) {
  upload.value.clearFiles();
  const file = files[0];
  upload.value.handleStart(file);
}

## 利用map 实现更新列表内某项字段

this.goods = this.goods.map((item, index) => {
  // 当货品ID，已添加货品序号，才确认为同一条数据
  if (updateRow.id === item.id && index === updateRow.rowIndex) {
    const { bigUnitNumber, smallUnitNumber } = unitNumber.calculate({
      smallUnitNumber: updateRow.num,
      conversionRate: item.conversionRate,
    });
    return {
      ...item,
      bookingNumBig: bigUnitNumber,
      bookingNumSmall: smallUnitNumber,
      "[updateRow.field]": updateRow.num,
    };
  }
  return item;
});

## 利用evevry 实现列表是否为空

const handSave = async (type) => {
  try {
    let list = [];
    const everyFill = list.every((item) => {
      const keys = ["area","minTemperature","maxTemperature","availableArea","floorHeight"];
      return keys.every((key) => item[key])});
    if (!everyFill) {
      this.$message.warning("请完善温层信息");
      return;
    }
    this.fetchData(type);
  } catch (error) {
    this.$message.warning("请完善必填项");
  }
};

## 使用map()实现Promise.all并发请求

const baseInfoValidateFns = this.$refs.baseInfo.map((i) => {
  return new Promise((resolve, reject) => {
    const formRef = i?.$refs?.form;
    if (formRef) {
      return formRef.validate((valid) => {
        if (valid) {
          resolve();
        } else {
          reject('请完善必填项');
        }
      });
    } else {
      reject('请完善必填项');
    }
  });
});
const [data] = Promise.all([baseInfoValidateFns]);


## 使用变量防止重复请求

let loading = false;
const confirmHandler = async (data) => {
  if (loading) {
    return;
  }
  loading = true;
  try {
    await upsertMsg({
      ...data,
    });
    loading = false;
    ElMessage({
      type: "success",
      message: data.id ? "编辑成功" : "新增成功",
    });
    initTable();
  } finally {
    loading = false;
  }
};

## new map()

const Dict = {
  Warehouse: "WAREHOUSE",
  Transportation: "STORE_TRANSIT",
  Shop: "STORE",
  Factory: "FACTORY",
  Diff: "diff",
};
const getOptions = (map) =>
  Array.from(map, ([value, label]) => ({
    label,
    value,
  }));
const operationType = (type) => {
  const options = new Map([
    ["IN_WAREHOUSE", "入库"],
    ["OUT_WAREHOUSE", "出库"],
    ["RETURN_WAREHOUSE", "回库"],
    ["RETURN_FACTORY", "回厂"],
  ]);
  switch (type) {
    case Dict.Transportation:
      options.delete("IN_WAREHOUSE");
      break;
    case Dict.Shop:
      options.delete("IN_WAREHOUSE");
      options.delete("RETURN_FACTORY");
      options.set("OUT_WAREHOUSE", "入店");
      break;
    case Dict.Diff:
      options.delete("IN_WAREHOUSE");
      break;
    default:
      break;
  }
  return getOptions(options);
};


## es6写法

const confirmHandler1 = (doClose) => {
  const formEl = formRef.value.elForm;
  if (!formEl) return;
  formEl.validate((valid, noValidObj) => {
    if (!valid) {
      const errorArr = Object.keys(noValidObj).filter(
        (key) => Array.isArray(noValidObj[key]) && noValidObj[key][0]?.field,
      );
      formEl.scrollToField(errorArr[0]);
      return false;
    }
    const [provinceCode, cityCode, countyCode] = form.province;//解构
    const [provinceName, cityName, countyName] = getNames(form.province);
    const { province, ...restparams } = form;//剩余参数
    const data = { //对象字面量增强
      ...restparams,
      provinceCode,
      cityCode: cityCode || '',
      countyCode: countyCode || '',
      provinceName,
      cityName: cityName || '',
      countyName: countyName || '',
    };
    if (!data.id) {
      create(data);
    } else {
      update(data);
    }
    doClose();
  });
};


 ## 扁平数组转树形结构数组

const arrs = [
  { id: 4, pid: 3 },
  { id: "aa", pid: "a" },
  { id: 1, pid: null },
  { id: 3, pid: 2 },
  { id: "a", pid: "a0" },
  { id: 2, pid: 1 },
  { id: "a0", pid: null },
];
const handleTree = (arr) => {
  return arr.reduce((o, i) => {
    i = Object.assign((o[i.id] ??= {}), i);
    ((o[i.pid ?? ""] ??= {}).children ??= []).push(i);
    return o;
  }, {})[""]?.children;
};

const tree = (arr, pid) => {
  const first = arr.filter((item) => item.pid === pid);
  first.forEach((item) => {
    const children = tree(arr, item.id);
    if (children.length > 0) {
      item.children = children;
    }
  });
  return first || [];
};
// console.log("handleTree: ", handleTree(arrs));
// console.log("tree: ", tree(arr, null));


## 树形结构数组转扁平数组

let list = [];
const treetoarr = (arr, list) => {
  arr.forEach((item) => {
    list.push(item);
    if (item.children) {
      treetoarr(item.children, list);
    }
  });
};
treetoarr(tree(arr, null), list);
console.log("treetoarr: ", list);

## Promise.reslove()三种入参

const test1 = (params) => {
  return Promise.resolve(params).then((res) => {
    console.log(res);
  });
};
let params = true;
// console.log("test1(): ", test1(params));

## 数组之间去重

const fns = () => {
  const cloneTableData = cloneDeep(this.tableData);
  if (this.checkedPassData.length) {
    this.checkedPassData.forEach((i) => {
      const useI = i;
      const findIdx = cloneTableData.findIndex(
        (k) => k.staffCode === useI.staffCode
      );
      if (findIdx > -1) {
        useI.id = cloneTableData[findIdx].id;
        cloneTableData.splice(findIdx, 1, useI);
      } else {
        cloneTableData.push(useI);
      }
    });
    this.tableData = cloneTableData;
  }
};