## 修改对象中的一个值 
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