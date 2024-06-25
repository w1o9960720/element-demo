# 1. 修改对象中某一个 key 的值

```js
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
```

# 2. 遍历 key 成为标准键值对

```js
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
```

# 3. 根据数组对象值转对象(分类)

```js
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
```

# 4. if-else-if

```js
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
```

# 5. 去除表单空字符串

```js
const getSearchData = () =>
  Object.keys(form.value).reduce(
    (prev, curr) => ({
      ...prev,
      "[curr]": form.value[curr] || undefined,
    }),
    {}
  );
```

# 6. Promise.all 并发请求

```js
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
```

# 7. upload 组件覆盖下一张图片

```js
function handleExceed(files) {
  upload.value.clearFiles();
  const file = files[0];
  upload.value.handleStart(file);
}
```

# 8. 利用 map 实现更新列表内某项字段

```js
this.goods = this.goods.map((item, index) => {
  // 当货品 ID，已添加货品序号，才确认为同一条数据
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
```

# 9. 利用 evevry 实现列表是否为空

```js
const handSave = async (type) => {
  try {
    let list = [];
    const everyFill = list.every((item) => {
      const keys = [
        "area",
        "minTemperature",
        "maxTemperature",
        "availableArea",
        "floorHeight",
      ];
      return keys.every((key) => item[key]);
    });
    if (!everyFill) {
      this.$message.warning("请完善温层信息");
      return;
    }
    this.fetchData(type);
  } catch (error) {
    this.$message.warning("请完善必填项");
  }
};
```

# 10. 使用 map()实现 Promise.all 并发请求

```js
const baseInfoValidateFns = this.$refs.baseInfo.map((i) => {
  return new Promise((resolve, reject) => {
    const formRef = i?.$refs?.form;
    if (formRef) {
      return formRef.validate((valid) => {
        if (valid) {
          resolve();
        } else {
          reject("请完善必填项");
        }
      });
    } else {
      reject("请完善必填项");
    }
  });
});
const [data] = Promise.all([baseInfoValidateFns]);
```

# 11. 使用变量防止重复请求

```js
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
```

# 12. new map()

```js
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
```

# 13. es6 写法

```js
const confirmHandler1 = (doClose) => {
  const formEl = formRef.value.elForm;
  if (!formEl) return;
  formEl.validate((valid, noValidObj) => {
    if (!valid) {
      const errorArr = Object.keys(noValidObj).filter(
        (key) => Array.isArray(noValidObj[key]) && noValidObj[key][0]?.field
      );
      formEl.scrollToField(errorArr[0]);
      return false;
    }
    const [provinceCode, cityCode, countyCode] = form.province; //解构
    const [provinceName, cityName, countyName] = getNames(form.province);
    const { province, ...restparams } = form; //剩余参数
    const data = {
      //对象字面量增强
      ...restparams,
      provinceCode,
      cityCode: cityCode || "",
      countyCode: countyCode || "",
      provinceName,
      cityName: cityName || "",
      countyName: countyName || "",
    };
    if (!data.id) {
      create(data);
    } else {
      update(data);
    }
    doClose();
  });
};
```

# 14. 扁平数组转树形结构数组

```js
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

function changeData(data, parentId = 0) {
  let tree = []; //新建空数组
  //遍历每条数据
  data.map((item) => {
    //每条数据中的和parentId和传入的相同
    if (item.parentId == parentId) {
      //就去找这个元素的子集去  找到元素中parentId==item.id 这样层层递归
      item.children = changeData(data, item.id);
      tree.push(item);
    }
  });
  return tree;
}

// console.log("handleTree: ", handleTree(arrs));
// console.log("tree: ", tree(arr, null));
```

# 15. 树形结构数组转扁平数组

```js
//树级结构转平级
treeToList(tree) {
  let arrs = [];
  let result = [];
  arrs = arrs.concat(tree);
  // 把数组中每一项全部拉平
  while (arrs.length) {
    let first = arrs.shift(); // 弹出第一个元素
    // 直到每一项数据都没有children
    if (first.$children) {
      //如果有children
      arrs = arrs.concat(first.$children);
      delete first['$children'];
    }
    result.push(first);
  }
  return result;
},
// let list = [];
// const treetoarr = (arr, list) => {
//   arr.forEach((item) => {
//     list.push(item);
//     if (item.children) {
//       treetoarr(item.children, list);
//     }
//   });
// };
// treetoarr(tree(arr, null), list);
// console.log("treetoarr: ", list);
```

# 16. Promise.reslove()三种入参

```js
const test1 = (params) => {
  return Promise.resolve(params).then((res) => {
    console.log(res);
  });
};
let params = true;
// console.log("test1(): ", test1(params));
```

# 17. 数组之间去重

```js
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
```

# 18. elementui 用法

## el-tree 组件筛选

```js
  <el-tree
    ref="treeRef"
    class="filter-tree"
    :data="data"
    :props="defaultProps"
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

  defaultProps: {
    children: "children",
    label: "name",
  },

  const filterNode = (value, data) => {
    if (!value) return true;
    return data.name.indexOf(value) !== -1;
  };

  const checkDeptId = (row) => {
    state.deptId = row.id;
  };
```

### 级联选择收集 label 和 value

```js
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
```

## el-autocomplete 组件

```js

  <el-autocomplete
    v-model="form.address"
    :size="size"
    placeholder="请输入关键词搜索"
    :disabled="!edit || i.disabled"
    :trigger-on-focus="false"
    style="width: 275px"
    :fetch-suggestions="handleChangeAddr"
    @select="handleSelectAddr">

    <template #default="{ item }">
      <span>{{ item.name }}</span>
    </template>
  </el-autocomplete>

  const handleChangeAddr = async (val, cb) => {
  if (val) {
    const data = {
      keywords: val || "",
    };
    const res = await getAddressPoi(data);
    cb(res || []);
  } else {
    cb([]);
  }
};
```

## el-form(el-row el-col el-table)

```js

  <el-form ref="ruleForm" :model="froms">
    <el-row>
      <el-col>
        <el-form-item
          :prop="limitRules"
          :rules="[{ require, trigger: 'blur' }]"
        >
          <el-input v-model.trim="froms.limitRules" placeholder="请填写" />
        </el-form-item>
      </el-col>
      <el-col>
        <el-input v-model.trim="froms.limit" placeholder="请填写" />
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="froms.turnoverRule">
        <!-- 有验证 用el-form-item -->
        <el-table-column label="限定规则" width="360px">
          <template v-slot:default="scope">
            <el-form-item
              :prop="'turnoverRule.' + scope.$index + '.limitRule'"
              :rules="[{ validator: validateNumber, trigger: 'blur' }]"
            >
              <el-input
                v-model.trim="scope.row.limitRule"
                placeholder="请填写0-1之间的小数，只支持填写到小数点后3位"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <!-- 无验证 不用el-form-item-->
        <el-table-column label="批属性字段" min-width="160px">
          <template v-slot:default="scope">
            <el-input v-model.trim="scope.row.fieldCode" placeholder="请填写" />
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-form>
```

## el-tree 组件

# 19. vue 具体实现原理

https://segmentfault.com/img/bVdcrRt

Vue.js 是一个流行的前端框架，以其简洁、高效和易用性著称。Vue 2 引入了响应式系统，该系统能够自动追踪数据的变化，并在数据变化时更新视图。这一系统的核心组件包括 Observer、Dep 和 Watcher。在本文中，我们将深入探讨这些组件的工作原理。

## 1. Observer：数据观测者

Observer 是响应式系统的数据观测者，它负责将普通的 JavaScript 对象转换成响应式对象。这个过程主要通过递归遍历对象的属性，并使用 Object.defineProperty 重新定义每个属性的 setter 和 getter 来实现。

当属性的 setter 被调用时，它会通知所有依赖于该属性的 Watcher 更新视图；当属性的 getter 被调用时，Observer 会记录依赖于该属性的 Watcher，以便在属性变化时通知它们。

## 2. Dep：依赖收集器

Dep 是依赖收集器，它的职责是收集所有依赖于某个响应式属性的 Watcher。在属性的 getter 中，Dep 会记录所有访问该属性的 Watcher，并将它们存储在一个数组中。

当响应式属性发生变化时，Dep 会遍历存储的 Watcher 列表，并通知它们进行更新。这样，Watcher 就可以重新计算表达式的值，并将结果更新到视图中。

## 3. Watcher：视图更新者

Watcher 是视图更新者，它负责将响应式属性的值与视图层绑定。Watcher 的核心工作流程包括：

初始化：在初始化时，Watcher 会执行一次属性的 getter，以收集依赖，并缓存属性的当前值。
计算：当依赖的响应式属性发生变化时，Watcher 会重新执行属性的 getter，计算新的值。
更新视图：计算出新的值后，Watcher 会将这个值更新到视图层，从而触发视图的重新渲染。
Watcher 还支持异步更新，以提高性能。在同一个事件循环中，如果响应式属性被多次修改，Watcher 会将这些修改汇总到下一个事件循环中，只执行一次视图更新。

## 4.结论

Vue 2 的响应式系统是其核心特性之一，它通过 Observer、Dep 和 Watcher 这三个组件实现了对数据变化的自动追踪和视图更新。理解这些组件的工作原理，有助于我们更好地使用 Vue，以及在必要时对其进行定制和扩展。

响应式系统的设计展示了 Vue 的设计理念：简洁、高效和易于理解。随着前端技术的不断发展，Vue 也在不断进化，其后续版本 Vue 3 引入了基于 ES6 Proxy 的响应式系统，进一步提升了性能和可维护性。但不论技术如何演进，Vue 核心的响应式原理和设计理念仍将继续保持其独特的价值。

## 5. 响应式系统的工作原理

### Vue 2 的响应式系统工作原理可以概括为以下几个步骤：

#### 1. 创建响应式对象：

    Vue 使用 Observer 将组件的 data 选项中的对象转换成响应式对象。

#### 2. 依赖收集：

    在组件的模板或计算属性中访问响应式属性时，它们的 getter 会被调用，触发 Dep 的依赖收集。

#### 3. 创建 Watcher：

     Vue 为每个组件创建一个或多个 Watcher，用于监听响应式属性的变化。

#### 4. 变更通知：

     当响应式属性的 setter 被调用，触发属性变化时，Observer 通知 Dep，由 Dep 通知所有依赖于此属性的 Watcher。

#### 5. 视图更新：

     Watcher 收到通知后，重新计算并更新视图。

# 20. responsetype 和 content-type

## 1 responsetype 类型(ajax 的属性)

”“（空字符串）：等同于 text，表示服务器返回文本数据。
“arraybuffer”：ArrayBuffer 对象，表示服务器返回二进制数组。
“blob”：Blob 对象，表示服务器返回二进制对象。
“document”：Document 对象，表示服务器返回一个文档对象。
“json”：JSON 对象。
“text”：字符串。

## 2 content-type 类型(http headers 的属性)

### 1 content-disposition

使用 express 模拟请求下载接口，返回流文件的时候只需要统一设置 content-type: 'application/octet-stream' 即可，不需要因为不同的文件类型设置不同的 content-type。
另外对于 content-disposition 在设置 filename 的时候，需要对 filename 进行转码，防止下载的文件名中有中文时出现乱码。

### 常见的媒体格式类型：

text/html ： HTML 格式
text/plain ：纯文本格式
text/xml ： XML 格式
image/gif ：gif 图片格式
image/jpeg ：jpg 图片格式
image/png：png 图片格式
以 application 开头的媒体格式类型：

application/xhtml+xml ：XHTML 格式
application/xml： XML 数据格式
application/atom+xml ：Atom XML 聚合格式
application/json： JSON 数据格式
application/pdf：pdf 格式
application/msword ： Word 文档格式
application/octet-stream ： 二进制流数据（如常见的文件下载）
application/x-www-form-urlencoded ： <form encType=””>中默认的 encType，form 表单数据被编码为 key/value 格式发送到服务器（表单默认的提交数据的格式）
另外一种常见的媒体格式是上传文件之时使用的：

multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式

# 22 不同 content-type 对应的前端请求参数处理格式

## 常见的 Content-Type 及其对应的请求参数处理格式：

### 1 Content-Type: application/json：

```js
{
"name": "John Doe",
"email": "johndoe@example.com"
}
```

### 2 Content-Type: application/x-www-form-urlencoded：

```js
"name=John+Doe&email=johndoe%40example.com";
```

### 3 Content-Type: multipart/form-data：

```js
let form = new FormData();
form.append("file", file);
```

# 23 树形数据删除指定 key 的项

```js
let arr = [
  {
    key: 1,
    value: "1",
    children: [
      {
        key: 11,
        value: "1",
        children: [
          {
            key: 12,
            value: "1",
            children: [
              {
                key: 122,
                value: "1",
                children: [
                  {
                    key: 1222,
                    value: "1",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: 211,
        value: "1",
        children: [
          {
            key: 221,
            value: "1",
            children: [],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    value: "2",
    children: [
      {
        key: 21,
        value: "2",
        children: [
          {
            key: 31,
            value: "3",
            children: [],
          },
        ],
      },
      {
        key: 331,
        value: "2",
        children: [
          {
            key: 3331,
            value: "3",
            children: [],
          },
        ],
      },
    ],
  },
];
const deleteArr = (arr, key) => {
  let tree = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item.key !== key) {
      if (item.children.length > 0) {
        item.children = deleteArr(item.children, key);
      }
      tree.push(item);
    }
  }
  return tree || [];
};
const deleteArr = (arr, key) => {
  return arr.filter((item) => {
    if (item.key !== key) {
      if (item?.children.length > 0) {
        item.children = deleteArr(item.children, key);
      }
      return true;
    }
  });
};
console.log("deleteArr(arr,1): ", deleteArr(arr, 3331));
```

# 24 原型链相关

```js
let f = {};
var Fsss = function () {};
Object.prototype.b = "object b";
Function.prototype.a = "function a";
console.log("f.b: ", f.b);
console.log("f.a: ", f.a);
console.log("F.b: ", Fsss.b);
console.log("F.a: ", Fsss.a);
```

# 25 数字转数组(可用数组方法)

```js
function NumbertoArray(n) {
  const num = Number(n);
  return [...new Array(num)];
}
```

# 26 switch 用法

```js
function NumbertoArray(n) {
  switch (n) {
    case 1:
      this.form.tableList = "1";
      break;
    case 2:
      this.form.tableList = "2";
      break;
    default:
      this.form.tableList = "3";
  }
}
```

# 27 非响应式数据定义

```js
  data() {
    const validateStart = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        return callback(new Error('请输入数字值'));
      }
      if (value < 0) {
        return callback(new Error('不能为负数'));
      }
      return callback();
    };
    return {
      visible: false,
    };
  },
```

# 28 重置表单

```js
// el-form实例属性无效或者不用表单方法重置
handleReset() {
  this.formData = {
    batchs: [{}],
    bookingNumBig: 0,
    bookingNumSmall: 0,
    goodsName: undefined,
    goodsCode: undefined,
    internationalCode: undefined,
    goodsSpecifications: undefined,
    weight: undefined,
    shelfLife: undefined,
    temperatureLayerName: undefined,
    goods: {},
  };
  this.$forceUpdate();
},
```
