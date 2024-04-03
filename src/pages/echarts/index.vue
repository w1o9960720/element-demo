<template>
  <div class="o">
    <div class="form">
      <el-form ref="formDom" v-model="form">
        <el-row>
          <el-col :span="6">
            <el-form-item label="开始时间" prop="time">
              <el-date-picker
                v-model="form.startTime"
                type="datetime"
                placeholder="选择时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束时间" prop="time">
              <el-date-picker
                v-model="form.endTime"
                type="datetime"
                placeholder="选择时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="级别" prop="type">
              <el-select v-model="form.type" filterable @change="handlefilter">
                <el-option
                  v-for="(item, index) in typeList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="success" @click="handlereset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="echarts">
      <lineCharts
        :option="option"
        :style="{ width: '100% ', height: '60vh' }"
      ></lineCharts>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { levelList as typeList } from "../firrst/constant";
import lineCharts from "./components/echarts.vue";
let datainfo = reactive([]);
const formDom = ref(null);
let form = reactive({
  startTime: "",
  endTime: "",
  type: "",
});
let option = ref({});

const getDataApi = () => {
  return new Promise((reslove, reject) => {
    const { startTime, endTime, type } = form;
    let datainfo = [
      {
        level: "A",
        children: [
          {
            barnd: "桑塔纳",
            num: 250,
          },
          {
            barnd: "捷达",
            num: 300,
          },
        ],
      },
      {
        level: "B",
        children: [
          {
            barnd: "迈腾380",
            num: 900,
          },
          {
            barnd: "丰田凯美瑞",
            num: 700,
          },
          {
            barnd: "帕萨特330",
            num: 1100,
          },
        ],
      },
      {
        level: "C",
        children: [
          {
            barnd: "奥迪A6L",
            num: 300,
          },
          {
            barnd: "宝马530",
            num: 120,
          },
          {
            barnd: "奔驰E300L",
            num: 90,
          },
        ],
      },
      {
        level: "D",
        children: [
          {
            barnd: "奔驰S400L",
            num: 109,
          },
          {
            barnd: "奥迪A8L",
            num: 205,
          },
          {
            barnd: "宝马730i",
            num: 90,
          },
        ],
      },
    ];
    if (type) {
      if (type === "A") {
        datainfo = datainfo.filter((item) => item.level === type);
      } else if (type === "B") {
        datainfo = datainfo.filter((item) => item.level === type);
      } else if (type === "C") {
        datainfo = datainfo.filter((item) => item.level === type);
      } else if (type === "D") {
        datainfo = datainfo.filter((item) => item.level === type);
      }
    }
    setTimeout(() => {
      reslove(datainfo.map((item) => item.children).flat());
    }, 600);
  });
};
const handlereset = () => {
  form.startTime = "";
  form.endTime = "";
  form.type = "";
  getDataInfo();
};
const handlefilter = () => {
  getDataInfo();
};
const getDataInfo = async () => {
  datainfo = await getDataApi();
  // let params = {
  //   xAxis: {
  //     type: "category",
  //     boundaryGap: false,
  //     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //   },
  //   yAxis: {
  //     type: "value",
  //   },
  //   series: [
  //     {
  //       data: [820, 932, 901, 934, 1290, 1330, 1320],
  //       type: "line",
  //       areaStyle: {},
  //     },
  //   ],
  // };
  let params = {
    title: {
      text: "车辆销量",
    },
    tooltip: {},
    legend: {
      data: ["销量"],
    },
    xAxis: {
      data: datainfo.map(({ barnd }) => barnd),
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: datainfo.map(({ num }) => num),
      },
    ],
  };
  option.value = params;
};

onMounted(() => {
  getDataInfo();
});

onUnmounted(() => {});
</script>

<style lang="scss" scoped>
.o {
  .echarts {
    // display: grid;
    // grid-template-columns: repeat(2, 1fr);
    // gap: 8px;
  }
}
</style>